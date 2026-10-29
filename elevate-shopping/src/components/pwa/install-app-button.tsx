
"use client";

import { useEffect, useState } from "react";

interface InstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export function InstallAppButton() {
  const [isPhone, setIsPhone] = useState(false);
  const [isIos, setIsIos] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);
  const [installEvent, setInstallEvent] =
    useState<InstallPromptEvent | null>(null);

  useEffect(() => {
    const ua = navigator.userAgent;

    const ios = /iPhone|iPod/i.test(ua);
    const androidPhone = /Android/i.test(ua) && /Mobile/i.test(ua);

    setIsPhone(ios || androidPhone);
    setIsIos(ios);

    const standalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      ("standalone" in navigator &&
        (navigator as Navigator & { standalone?: boolean }).standalone === true);

    setIsInstalled(standalone);

    const handleInstallPrompt = (event: Event) => {
      event.preventDefault();
      setInstallEvent(event as InstallPromptEvent);
    };

    const handleInstalled = () => {
      setIsInstalled(true);
      setInstallEvent(null);
    };

    window.addEventListener(
      "beforeinstallprompt",
      handleInstallPrompt,
    );
    window.addEventListener("appinstalled", handleInstalled);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleInstallPrompt,
      );
      window.removeEventListener("appinstalled", handleInstalled);
    };
  }, []);

  if (!isPhone || isInstalled) return null;

  async function installApp() {
    if (isIos) {
      setShowInstructions((current) => !current);
      return;
    }

    if (!installEvent) {
      setShowInstructions(true);
      return;
    }

    await installEvent.prompt();
    const choice = await installEvent.userChoice;

    if (choice.outcome === "accepted") {
      setInstallEvent(null);
    }
  }

  return (
    <div className="space-y-3">
      <button
        type="button"
        onClick={installApp}
        className="inline-flex min-h-11 items-center justify-center bg-[#17130f] px-5 text-xs font-semibold uppercase tracking-[0.15em] text-white"
      >
        Install Elevate
      </button>

      {showInstructions && (
        <p className="max-w-sm text-xs leading-6 text-[#746b61]">
          {isIos
            ? "Open this page in Safari, tap Share, choose Add to Home Screen, enable Open as Web App if available, then tap Add."
            : "Open your browser menu and look for Install app or Add to Home screen. The install prompt may not be available in this browser yet."}
        </p>
      )}
    </div>
  );
}

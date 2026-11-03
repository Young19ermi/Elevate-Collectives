"use client";

import { useEffect, useState } from "react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{
    outcome: "accepted" | "dismissed";
    platform: string;
  }>;
}

export function InstallPrompt() {
  const [installEvent, setInstallEvent] =
    useState<BeforeInstallPromptEvent | null>(null);

  const [installed, setInstalled] = useState(false);

  useEffect(() => {
    const handleBeforeInstall = (event: Event) => {
      event.preventDefault();
      setInstallEvent(event as BeforeInstallPromptEvent);
    };

    const handleInstalled = () => {
      setInstalled(true);
      setInstallEvent(null);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstall);

    window.addEventListener("appinstalled", handleInstalled);

    // Detect an already-installed PWA
    const isStandalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      (navigator as Navigator & { standalone?: boolean }).standalone === true;

    if (isStandalone) {
      setInstalled(true);
    }

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstall);

      window.removeEventListener("appinstalled", handleInstalled);
    };
  }, []);

  async function handleInstall() {
    if (!installEvent) return;

    await installEvent.prompt();

    const choice = await installEvent.userChoice;

    setInstallEvent(null);

    if (choice.outcome === "accepted") {
      setInstalled(true);
    }
  }

  if (installed || !installEvent) return null;

  return (
    <div className="fixed bottom-24 left-4 right-4 z-[100] mx-auto max-w-md">
      <div className="flex items-center gap-3 rounded-2xl border border-[#e8e4dd] bg-white p-4 shadow-xl">
        <img
          src="/icons/icon-192.png"
          alt="Elevate"
          className="h-12 w-12 rounded-xl object-cover"
        />

        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-[#211d19]">
            Install Elevate
          </p>
          <p className="text-xs text-gray-500">
            Shop faster with our mobile app.
          </p>
        </div>

        <button
          onClick={handleInstall}
          className="rounded-full bg-[#211d19] px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-[#393128]"
        >
          Install
        </button>
      </div>
    </div>
  );
}

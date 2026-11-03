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
  const [dismissed, setDismissed] = useState(false);

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

    const isStandalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      (navigator as Navigator & { standalone?: boolean }).standalone === true;

    if (isStandalone) setInstalled(true);

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

  if (installed || dismissed || !installEvent) return null;

  return (
    <div className="fixed inset-x-3 top-[max(12px,env(safe-area-inset-top))] z-[9999] mx-auto max-w-md animate-in slide-in-from-top-4 duration-300">
      <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-[#211d19]/65 p-3 shadow-xl shadow-black/10 backdrop-blur-2xl">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white">
          <img
            src="/icons/icon-512.png"
            alt="Elevate"
            className="h-full w-full object-contain"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
        </div>

        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-white">Install Elevate</p>
          <p className="mt-0.5 text-xs text-white/60">
            Get faster access to your favorite products.
          </p>
        </div>

        <button
          onClick={handleInstall}
          className="shrink-0 rounded-full bg-white px-4 py-2.5 text-xs font-semibold text-[#211d19] transition hover:bg-white/90 active:scale-95"
        >
          Install
        </button>

        <button
          type="button"
          onClick={() => setDismissed(true)}
          aria-label="Dismiss installation notification"
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-white/60 transition hover:bg-white/10 hover:text-white"
        >
          <svg
            width="17"
            height="17"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <path d="m18 6-12 12M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}

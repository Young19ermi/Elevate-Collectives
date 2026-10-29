
"use client";

import { useEffect, useState, type ReactNode } from "react";
import { QRCodeSVG } from "qrcode.react";

export function DeviceGate({ children }: { children: ReactNode }) {
  const [isDesktop, setIsDesktop] = useState<boolean | null>(null);
  const [storeUrl, setStoreUrl] = useState("");

  useEffect(() => {
    const media = window.matchMedia("(min-width: 1024px)");

    const updateViewport = () => setIsDesktop(media.matches);

    updateViewport();
    media.addEventListener("change", updateViewport);

    setStoreUrl(window.location.origin);

    return () => {
      media.removeEventListener("change", updateViewport);
    };
  }, []);

  if (isDesktop === null) {
    return <main className="min-h-screen bg-[#faf7f1]" />;
  }

  if (!isDesktop) {
    return <>{children}</>;
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#faf7f1] px-6 py-12 text-[#211d19]">
      <section className="w-full max-w-lg text-center">
        <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#9b7741]">
          Elevate Collectives
        </p>

        <h1 className="mt-6 font-serif text-4xl leading-tight sm:text-5xl">
          Our desktop experience is under maintenance.
        </h1>

        <p className="mx-auto mt-5 max-w-md text-sm leading-7 text-[#746b61]">
          We’re refining your shopping experience. In the meantime,
          scan the QR code with your phone to browse our store.
        </p>

        <div className="mx-auto mt-8 flex size-52 items-center justify-center border border-[#e1dcd3] bg-white p-3">
          {storeUrl && (
            <QRCodeSVG
              value={storeUrl}
              size={184}
              level="M"
              marginSize={2}
              title="Scan to open Elevate Collectives on your phone"
            />
          )}
        </div>

        <p className="mt-4 text-xs text-[#746b61]">
          Open your phone camera and point it at the code.
        </p>

        <p className="mt-8 text-[10px] uppercase tracking-[0.18em] text-[#9b7741]">
          Thank you for your patience
        </p>
      </section>
    </main>
  );
}

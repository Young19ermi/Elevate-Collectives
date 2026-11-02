"use client";

import { useEffect, useState, type ReactNode } from "react";

export function SplashScreen({ children }: { children: ReactNode }) {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setShowSplash(false);
    }, 1000);

    return () => window.clearTimeout(timer);
  }, []);

  return (
    <>
      {showSplash && (
        <div className="fixed inset-0 flex items-center justify-center  bg-[#211d19] animate-splash-fade">
          <img
            src="/icons/icon-192.png"
            alt=""
            className="h-48 w-48 object-contain"
          />
        </div>
      )}

      <div className={showSplash ? "invisible" : "animate-page-enter"}>
        {children}
      </div>
    </>
  );
}

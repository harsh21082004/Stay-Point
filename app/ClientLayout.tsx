"use client";

import React, { useEffect, useState } from "react";
import LoadingBar from "react-top-loading-bar";
import { usePathname } from "next/navigation";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [progress, setProgress] = useState(0);
  const pathname = usePathname();

  useEffect(() => {
    const handleRouteChangeStart = () => {
      setProgress(40);
    };

    const handleRouteChangeComplete = () => {
      setProgress(100);
    };

    handleRouteChangeStart();
    handleRouteChangeComplete();

    return () => setProgress(0);
  }, [pathname]);

  return (
    <>
      <LoadingBar
        color="#df00a2"
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
        waitingTime={300}
        className="loading-bar"
      />
      {children}
    </>
  );
}

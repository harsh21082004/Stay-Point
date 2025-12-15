"use client";

import React, { useEffect, useState } from 'react';
import styles from './styles/home.module.css';
import RoomsList from './components/roomsList';
import Search from './components/search';
import LoadingBar from 'react-top-loading-bar';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

export default function Home() {
  const router = useRouter(); // For programmatic navigation
  const pathname = usePathname(); // For the current path
  const searchParams = useSearchParams(); // For URL search parameters

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate route change events
    const handleRouteChangeStart = () => {
      setProgress(40);
    };

    const handleRouteChangeComplete = () => {
      setProgress(100);
    };

    // Mocking events (Next.js 13 does not provide `router.events`)
    handleRouteChangeStart(); // Start progress when the component mounts
    handleRouteChangeComplete(); // Complete progress immediately for simplicity

    // You could add more sophisticated logic depending on your use case.
  }, [pathname, searchParams]);

  return (
    <>
      <LoadingBar
        color="#df00a2"
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
        waitingTime={600}
        className="loading-bar"
      />
      <div className={`${styles.main}`}>
        <Search />
        <RoomsList />
        {/* <Maps /> */}
      </div>
    </>
  );
}

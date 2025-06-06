
'use client';

import { useState, useEffect } from 'react';
import type { ComponentType } from 'react';

// Dynamically import SiteHeader to further ensure it's client-side
let SiteHeaderComponent: ComponentType = () => (
  <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
    <div className="container flex h-16 max-w-screen-2xl items-center justify-between">
      {/* Placeholder content or structure can be minimal */}
    </div>
  </header>
);

export function ClientSiteHeader() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Dynamically import SiteHeader only on the client-side
    import('./site-header').then(mod => {
      SiteHeaderComponent = mod.SiteHeader;
      setMounted(true);
    }).catch(err => console.error("Failed to load SiteHeader:", err));
  }, []);

  if (!mounted) {
    // Render a placeholder that mimics the header's height to prevent layout shift
    return (
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 max-w-screen-2xl items-center justify-between">
          {/* This div ensures the header area occupies space during server render / pre-mount */}
        </div>
      </header>
    );
  }

  return <SiteHeaderComponent />;
}

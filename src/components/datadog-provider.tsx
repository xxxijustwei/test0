'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { trackRequest } from '@/lib/datadog';

export function DatadogProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    trackRequest(pathname);
  }, [pathname]);

  return <>{children}</>;
}
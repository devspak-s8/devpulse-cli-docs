import { useEffect, useState } from 'react';

export interface AnalyticsStats {
  visitors: number;
  sessions: number;
  averageSessionDuration: string;
  bounceRate: number;
  pageViews: number;
  topPages: Array<{ page: string; views: number }>;
}

interface GtagWindow extends Window {
  gtag?: (command: string, eventName: string, eventParams?: Record<string, string | number>) => void;
  dataLayer?: Array<unknown>;
}

// Hook to track analytics and retrieve real stats
export function useAnalytics() {
  const [stats, setStats] = useState<AnalyticsStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch analytics data from Google Analytics Reporting API
    // For now, we'll use localStorage to simulate real stats
    const fetchAnalyticsData = async () => {
      try {
        // Simulate fetching real data
        // In production, you would call a backend API that queries Google Analytics
        const simulatedStats: AnalyticsStats = {
          visitors: Math.floor(Math.random() * 5000) + 1000,
          sessions: Math.floor(Math.random() * 8000) + 2000,
          averageSessionDuration: `${Math.floor(Math.random() * 5) + 2}m 30s`,
          bounceRate: Math.floor(Math.random() * 30) + 20,
          pageViews: Math.floor(Math.random() * 15000) + 5000,
          topPages: [
            { page: '/docs', views: Math.floor(Math.random() * 3000) + 1000 },
            { page: '/docs/installation', views: Math.floor(Math.random() * 2000) + 500 },
            { page: '/docs/quick-start', views: Math.floor(Math.random() * 1500) + 300 },
          ],
        };

        setStats(simulatedStats);
      } catch (error) {
        console.error('Failed to fetch analytics:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalyticsData();
  }, []);

  return { stats, loading };
}

// Hook to track custom events
export function useTrackEvent() {
  return (eventName: string, eventParams?: Record<string, string | number>) => {
    if (typeof window !== 'undefined') {
      const gtagWindow = window as GtagWindow;
      if (gtagWindow.gtag) {
        gtagWindow.gtag('event', eventName, eventParams);
      }
    }
  };
}

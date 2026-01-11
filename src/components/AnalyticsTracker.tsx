import { useEffect } from "react";
import { useLocation } from "react-router-dom";

interface GtagWindow extends Window {
  gtag?: (command: string, eventName: string, eventParams?: Record<string, string | number>) => void;
}

export const AnalyticsTracker = () => {
  const location = useLocation();

  useEffect(() => {
    const gtagWindow = window as GtagWindow;
    if (gtagWindow.gtag) {
      gtagWindow.gtag("event", "page_view", {
        page_path: location.pathname + location.search,
        page_location: window.location.href,
        page_title: document.title,
      });
    }
  }, [location.pathname, location.search]);

  return null;
};

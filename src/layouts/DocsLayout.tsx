import { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Header } from "@/components/Header";
import { DocsSidebar } from "@/components/DocsSidebar";
import { Footer } from "@/components/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";
import { ReadingProgress } from "@/components/ReadingProgress";
import { FloatingTOC } from "@/components/TableOfContents";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { DocsNavigation, getDocsNavigation } from "@/components/DocsNavigation";
import { useScrollToHash, useScrollToTop } from "@/hooks/useScrollBehavior";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TOCItem {
  id: string;
  title: string;
  level: number;
}

export function DocsLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [tocItems, setTocItems] = useState<TOCItem[]>([]);
  const location = useLocation();

  useScrollToHash();
  useScrollToTop();

  // Close mobile sidebar on route change
  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  // Extract TOC items from page headings
  useEffect(() => {
    // Small delay to ensure content is rendered
    const timer = setTimeout(() => {
      const headings = document.querySelectorAll("main h2[id], main h3[id]");
      const items: TOCItem[] = [];

      headings.forEach((heading) => {
        items.push({
          id: heading.id,
          title: heading.textContent || "",
          level: heading.tagName === "H2" ? 2 : 3,
        });
      });

      setTocItems(items);
    }, 100);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  // Get prev/next navigation
  const { previous, next } = getDocsNavigation(location.pathname);

  return (
    <div className="min-h-screen flex flex-col">
      <Header variant="docs" />
      <ReadingProgress />
      
      {/* Mobile sidebar toggle */}
      <div className="lg:hidden sticky top-14 z-30 flex items-center gap-2 px-4 py-2 bg-background/95 backdrop-blur border-b border-border">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setSidebarOpen(true)}
          className="gap-2"
        >
          <Menu className="h-4 w-4" />
          <span>Menu</span>
        </Button>
        <span className="text-sm text-muted-foreground">
          {location.pathname.split("/").pop()?.replace(/-/g, " ") || "Docs"}
        </span>
      </div>

      <div className="flex-1 container flex">
        {/* Desktop sidebar */}
        <DocsSidebar />
        
        {/* Mobile sidebar */}
        <DocsSidebar 
          isMobile 
          isOpen={sidebarOpen} 
          onClose={() => setSidebarOpen(false)} 
        />

        {/* Main content */}
        <main className="flex-1 min-w-0 py-8 px-4 sm:px-6 lg:px-12">
          <Breadcrumbs />
          <Outlet />
          <DocsNavigation previous={previous} next={next} />
        </main>

        {/* Floating TOC */}
        <FloatingTOC items={tocItems} />
      </div>
      
      <Footer />
      <ScrollToTop />
    </div>
  );
}

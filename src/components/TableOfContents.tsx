import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { ChevronRight, List, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TOCItem {
  id: string;
  title: string;
  level: number;
}

interface FloatingTOCProps {
  items: TOCItem[];
  className?: string;
}

export function FloatingTOC({ items, className }: FloatingTOCProps) {
  const [activeId, setActiveId] = useState<string>("");
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-80px 0px -80% 0px",
        threshold: 0,
      }
    );

    items.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [items]);

  if (items.length === 0) return null;

  return (
    <aside className={cn("hidden xl:block w-56 shrink-0", className)}>
      <div className="sticky top-20">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-sm font-semibold flex items-center gap-2">
            <List className="h-4 w-4" />
            On this page
          </h4>
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6"
            onClick={() => setIsOpen(!isOpen)}
          >
            <ChevronRight 
              className={cn(
                "h-4 w-4 transition-transform",
                isOpen && "rotate-90"
              )} 
            />
          </Button>
        </div>
        
        <nav
          className={cn(
            "space-y-1 overflow-hidden transition-all",
            isOpen ? "max-h-[70vh] opacity-100" : "max-h-0 opacity-0"
          )}
        >
          {items.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => {
                e.preventDefault();
                const element = document.getElementById(item.id);
                if (element) {
                  element.scrollIntoView({ behavior: "smooth", block: "start" });
                  setActiveId(item.id);
                }
              }}
              className={cn(
                "block text-sm py-1.5 transition-all border-l-2 -ml-px",
                item.level === 2 ? "pl-3" : "pl-6",
                activeId === item.id
                  ? "text-primary border-primary font-medium bg-primary/5"
                  : "text-muted-foreground hover:text-foreground border-transparent hover:border-muted-foreground/50"
              )}
            >
              {item.title}
            </a>
          ))}
        </nav>

        {/* Progress indicator */}
        <div className="mt-6 pt-4 border-t border-border">
          <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
            <span>Reading progress</span>
            <span>{Math.round((items.findIndex(i => i.id === activeId) + 1) / items.length * 100) || 0}%</span>
          </div>
          <div className="h-1 bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary transition-all duration-300"
              style={{ 
                width: `${((items.findIndex(i => i.id === activeId) + 1) / items.length * 100) || 0}%` 
              }}
            />
          </div>
        </div>
      </div>
    </aside>
  );
}

// Hook to extract headings from the page
export function useTableOfContents() {
  const [items, setItems] = useState<TOCItem[]>([]);

  useEffect(() => {
    const headings = document.querySelectorAll("h2[id], h3[id]");
    const tocItems: TOCItem[] = [];

    headings.forEach((heading) => {
      tocItems.push({
        id: heading.id,
        title: heading.textContent || "",
        level: heading.tagName === "H2" ? 2 : 3,
      });
    });

    setItems(tocItems);
  }, []);

  return items;
}

// Simple static TOC component for pages
interface TableOfContentsProps {
  items: TOCItem[];
  activeId?: string;
}

export function TableOfContents({ items, activeId }: TableOfContentsProps) {
  if (items.length === 0) return null;

  return (
    <aside className="hidden xl:block w-56 shrink-0">
      <div className="sticky top-20">
        <h4 className="text-sm font-semibold mb-4">On this page</h4>
        <nav className="space-y-1">
          {items.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={cn(
                "block text-sm py-1 transition-colors border-l-2 -ml-px",
                item.level === 2 ? "pl-3" : "pl-6",
                activeId === item.id
                  ? "text-primary border-primary font-medium"
                  : "text-muted-foreground hover:text-foreground border-transparent hover:border-muted-foreground/50"
              )}
            >
              {item.title}
            </a>
          ))}
        </nav>
      </div>
    </aside>
  );
}

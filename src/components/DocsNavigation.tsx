import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface NavigationLink {
  href: string;
  title: string;
}

interface DocsNavigationProps {
  previous?: NavigationLink;
  next?: NavigationLink;
  className?: string;
}

export function DocsNavigation({ previous, next, className }: DocsNavigationProps) {
  return (
    <nav
      className={cn(
        "flex items-center justify-between gap-4 pt-8 mt-8 border-t border-border",
        className
      )}
    >
      {/* Previous */}
      {previous ? (
        <Button
          variant="ghost"
          asChild
          className="group flex-1 h-auto py-4 px-4 justify-start"
        >
          <Link to={previous.href}>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted group-hover:bg-primary/10 transition-colors">
                <ChevronLeft className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
              <div className="text-left">
                <span className="text-xs text-muted-foreground block mb-0.5">Previous</span>
                <span className="font-medium group-hover:text-primary transition-colors">
                  {previous.title}
                </span>
              </div>
            </div>
          </Link>
        </Button>
      ) : (
        <div className="flex-1" />
      )}

      {/* Next */}
      {next ? (
        <Button
          variant="ghost"
          asChild
          className="group flex-1 h-auto py-4 px-4 justify-end"
        >
          <Link to={next.href}>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <span className="text-xs text-muted-foreground block mb-0.5">Next</span>
                <span className="font-medium group-hover:text-primary transition-colors">
                  {next.title}
                </span>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted group-hover:bg-primary/10 transition-colors">
                <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
            </div>
          </Link>
        </Button>
      ) : (
        <div className="flex-1" />
      )}
    </nav>
  );
}

// Define docs navigation order
const docsOrder = [
  { href: "/docs", title: "Introduction" },
  { href: "/docs/installation", title: "Installation" },
  { href: "/docs/quick-start", title: "Quick Start" },
  { href: "/docs/commands", title: "Commands" },
  { href: "/docs/api-reference", title: "API Reference" },
  { href: "/docs/error-handling", title: "Error Handling" },
  { href: "/docs/configuration", title: "Configuration" },
  { href: "/docs/examples", title: "Examples" },
];

export function getDocsNavigation(currentPath: string) {
  const currentIndex = docsOrder.findIndex((doc) => doc.href === currentPath);
  
  if (currentIndex === -1) {
    return { previous: undefined, next: undefined };
  }

  return {
    previous: currentIndex > 0 ? docsOrder[currentIndex - 1] : undefined,
    next: currentIndex < docsOrder.length - 1 ? docsOrder[currentIndex + 1] : undefined,
  };
}

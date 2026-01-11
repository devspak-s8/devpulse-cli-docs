import { Link, useLocation } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";
import { cn } from "@/lib/utils";

interface BreadcrumbItem {
  label: string;
  href: string;
}

// Map paths to readable labels
const pathLabels: Record<string, string> = {
  docs: "Documentation",
  installation: "Installation",
  "quick-start": "Quick Start",
  commands: "Commands",
  "api-reference": "API Reference",
  "error-handling": "Error Handling",
  configuration: "Configuration",
  examples: "Examples",
  concepts: "Core Concepts",
  sdks: "Language SDKs",
  github: "GitHub",
};

function getLabel(segment: string): string {
  return pathLabels[segment] || segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, " ");
}

export function Breadcrumbs() {
  const location = useLocation();
  const pathSegments = location.pathname.split("/").filter(Boolean);

  // Build breadcrumb items
  const items: BreadcrumbItem[] = [];
  let currentPath = "";

  pathSegments.forEach((segment) => {
    currentPath += `/${segment}`;
    items.push({
      label: getLabel(segment),
      href: currentPath,
    });
  });

  if (items.length === 0) return null;

  return (
    <nav className="flex items-center gap-1 text-sm text-muted-foreground mb-6 animate-fade-in">
      <Link
        to="/"
        className="flex items-center gap-1 hover:text-foreground transition-colors"
      >
        <Home className="h-3.5 w-3.5" />
      </Link>

      {items.map((item, index) => (
        <div key={item.href} className="flex items-center gap-1">
          <ChevronRight className="h-3.5 w-3.5 text-muted-foreground/50" />
          {index === items.length - 1 ? (
            <span className="font-medium text-foreground">{item.label}</span>
          ) : (
            <Link
              to={item.href}
              className="hover:text-foreground transition-colors"
            >
              {item.label}
            </Link>
          )}
        </div>
      ))}
    </nav>
  );
}

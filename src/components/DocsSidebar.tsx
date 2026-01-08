import { Link, useLocation } from "react-router-dom";
import {
  BookOpen,
  Download,
  Terminal,
  Layers,
  Code,
  AlertTriangle,
  Zap,
  Settings,
  ChevronDown,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface NavItem {
  title: string;
  href: string;
  icon?: React.ElementType;
  items?: NavItem[];
}

const navigation: NavItem[] = [
  {
    title: "Getting Started",
    href: "/docs",
    icon: BookOpen,
    items: [
      { title: "Introduction", href: "/docs" },
      { title: "Installation", href: "/docs/installation" },
      { title: "Quick Start", href: "/docs/quick-start" },
    ],
  },
  {
    title: "Commands",
    href: "/docs/commands",
    icon: Terminal,
    items: [
      { title: "Overview", href: "/docs/commands" },
      { title: "AI Commands", href: "/docs/commands/ai" },
      { title: "Stats Commands", href: "/docs/commands/stats" },
      { title: "Track Commands", href: "/docs/commands/track" },
      { title: "Focus Commands", href: "/docs/commands/focus" },
    ],
  },
  {
    title: "API Reference",
    href: "/docs/api-reference",
    icon: Code,
    items: [
      { title: "Overview", href: "/docs/api-reference" },
      { title: "Authentication", href: "/docs/api-reference/auth" },
      { title: "Endpoints", href: "/docs/api-reference/endpoints" },
    ],
  },
  {
    title: "Examples",
    href: "/docs/examples",
    icon: Layers,
  },
  {
    title: "Error Handling",
    href: "/docs/error-handling",
    icon: AlertTriangle,
  },
  {
    title: "Configuration",
    href: "/docs/configuration",
    icon: Settings,
  },
];

interface SidebarGroupProps {
  item: NavItem;
  currentPath: string;
}

function SidebarGroup({ item, currentPath }: SidebarGroupProps) {
  const isActive = currentPath === item.href || 
    item.items?.some((sub) => currentPath === sub.href);
  const [isOpen, setIsOpen] = useState(isActive);

  const Icon = item.icon;

  if (!item.items) {
    return (
      <Link
        to={item.href}
        className={cn(
          "flex items-center gap-2 px-3 py-2 text-sm rounded-md transition-colors",
          currentPath === item.href
            ? "text-primary bg-primary/10 font-medium"
            : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
        )}
      >
        {Icon && <Icon className="h-4 w-4" />}
        {item.title}
      </Link>
    );
  }

  return (
    <div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex items-center justify-between w-full px-3 py-2 text-sm rounded-md transition-colors",
          isActive
            ? "text-foreground font-medium"
            : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
        )}
      >
        <span className="flex items-center gap-2">
          {Icon && <Icon className="h-4 w-4" />}
          {item.title}
        </span>
        <ChevronDown
          className={cn(
            "h-4 w-4 transition-transform",
            isOpen && "rotate-180"
          )}
        />
      </button>
      {isOpen && (
        <div className="ml-4 mt-1 space-y-1 border-l border-border pl-3">
          {item.items.map((subItem) => (
            <Link
              key={subItem.href}
              to={subItem.href}
              className={cn(
                "block px-3 py-1.5 text-sm rounded-md transition-colors",
                currentPath === subItem.href
                  ? "text-primary font-medium"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {subItem.title}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export function DocsSidebar() {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <aside className="w-64 shrink-0 border-r border-border">
      <div className="sticky top-14 h-[calc(100vh-3.5rem)] overflow-y-auto py-6 pr-4">
        <nav className="space-y-1">
          {navigation.map((item) => (
            <SidebarGroup
              key={item.href}
              item={item}
              currentPath={currentPath}
            />
          ))}
        </nav>
      </div>
    </aside>
  );
}

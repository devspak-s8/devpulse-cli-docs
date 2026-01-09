import { Link, useLocation } from "react-router-dom";
import {
  BookOpen,
  Terminal,
  Layers,
  Code,
  AlertTriangle,
  Settings,
  ChevronDown,
  ChevronRight,
  Github,
  Database,
  Shield,
  Workflow,
  Clock,
  BarChart3,
  Cpu,
  FileCode,
  Rocket,
  HelpCircle,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

interface NavItem {
  title: string;
  href: string;
  icon?: React.ElementType;
  items?: NavItem[];
  badge?: string;
}

const navigation: NavItem[] = [
  {
    title: "Getting Started",
    href: "/docs",
    icon: Rocket,
    items: [
      { title: "Introduction", href: "/docs" },
      { title: "Installation", href: "/docs/installation" },
      { title: "Quick Start", href: "/docs/quick-start" },
    ],
  },
  {
    title: "Core Concepts",
    href: "/docs/concepts",
    icon: BookOpen,
    items: [
      { title: "Architecture", href: "/docs/concepts/architecture" },
      { title: "Caching", href: "/docs/concepts/caching" },
      { title: "Rate Limiting", href: "/docs/concepts/rate-limiting" },
    ],
  },
  {
    title: "CLI Commands",
    href: "/docs/commands",
    icon: Terminal,
    items: [
      { title: "Overview", href: "/docs/commands" },
      { title: "GitHub Stats", href: "/docs/commands/github-stats" },
      { title: "GitHub Activity", href: "/docs/commands/github-activity" },
      { title: "GitHub Languages", href: "/docs/commands/github-languages" },
      { title: "GitHub Contributors", href: "/docs/commands/github-contributors" },
      { title: "GitHub Issues", href: "/docs/commands/github-issues" },
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
      { title: "Response Format", href: "/docs/api-reference/response" },
      { title: "Error Codes", href: "/docs/api-reference/errors" },
    ],
  },
  {
    title: "Language SDKs",
    href: "/docs/sdks",
    icon: FileCode,
    badge: "New",
    items: [
      { title: "JavaScript", href: "/docs/sdks/javascript" },
      { title: "Python", href: "/docs/sdks/python" },
      { title: "Go", href: "/docs/sdks/go" },
      { title: "Rust", href: "/docs/sdks/rust" },
      { title: "Java", href: "/docs/sdks/java" },
    ],
  },
  {
    title: "GitHub Integration",
    href: "/docs/github",
    icon: Github,
    items: [
      { title: "Setup", href: "/docs/github/setup" },
      { title: "Personal Access Token", href: "/docs/github/token" },
      { title: "Rate Limits", href: "/docs/github/rate-limits" },
      { title: "Webhooks", href: "/docs/github/webhooks" },
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
  {
    title: "Troubleshooting",
    href: "/docs/troubleshooting",
    icon: HelpCircle,
  },
];

interface SidebarGroupProps {
  item: NavItem;
  currentPath: string;
  collapsed?: boolean;
  onNavigate?: () => void;
}

function SidebarGroup({ item, currentPath, collapsed, onNavigate }: SidebarGroupProps) {
  const isActive = currentPath === item.href || 
    currentPath.startsWith(item.href + "/") ||
    item.items?.some((sub) => currentPath === sub.href || currentPath.startsWith(sub.href));
  const [isOpen, setIsOpen] = useState(isActive);

  useEffect(() => {
    if (isActive && !isOpen) {
      setIsOpen(true);
    }
  }, [isActive]);

  const Icon = item.icon;

  if (!item.items) {
    return (
      <Link
        to={item.href}
        onClick={onNavigate}
        className={cn(
          "flex items-center gap-2 px-3 py-2 text-sm rounded-md transition-colors",
          currentPath === item.href
            ? "text-primary bg-primary/10 font-medium"
            : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
        )}
      >
        {Icon && <Icon className="h-4 w-4 shrink-0" />}
        {!collapsed && <span>{item.title}</span>}
      </Link>
    );
  }

  if (collapsed) {
    return (
      <Link
        to={item.href}
        onClick={onNavigate}
        className={cn(
          "flex items-center justify-center p-2 rounded-md transition-colors",
          isActive
            ? "text-primary bg-primary/10"
            : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
        )}
        title={item.title}
      >
        {Icon && <Icon className="h-4 w-4" />}
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
          {Icon && <Icon className="h-4 w-4 shrink-0" />}
          <span>{item.title}</span>
          {item.badge && (
            <span className="px-1.5 py-0.5 text-[10px] font-medium bg-primary/20 text-primary rounded">
              {item.badge}
            </span>
          )}
        </span>
        <ChevronDown
          className={cn(
            "h-4 w-4 transition-transform shrink-0",
            isOpen && "rotate-180"
          )}
        />
      </button>
      <div
        className={cn(
          "ml-4 mt-1 space-y-1 border-l border-border pl-3 overflow-hidden transition-all",
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        )}
      >
        {item.items.map((subItem) => (
          <Link
            key={subItem.href}
            to={subItem.href}
            onClick={onNavigate}
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
    </div>
  );
}

interface DocsSidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
  isMobile?: boolean;
}

export function DocsSidebar({ isOpen = true, onClose, isMobile = false }: DocsSidebarProps) {
  const location = useLocation();
  const currentPath = location.pathname;

  const handleNavigate = () => {
    if (isMobile && onClose) {
      onClose();
    }
  };

  // Mobile overlay
  if (isMobile) {
    return (
      <>
        {/* Overlay */}
        <div
          className={cn(
            "fixed inset-0 z-40 bg-background/80 backdrop-blur-sm transition-opacity lg:hidden",
            isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          )}
          onClick={onClose}
        />
        
        {/* Sidebar */}
        <aside
          className={cn(
            "fixed left-0 top-14 z-50 h-[calc(100vh-3.5rem)] w-72 bg-background border-r border-border transition-transform lg:hidden",
            isOpen ? "translate-x-0" : "-translate-x-full"
          )}
        >
          <div className="flex items-center justify-between p-4 border-b border-border">
            <span className="font-semibold">Navigation</span>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          <div className="overflow-y-auto h-[calc(100%-4rem)] py-4 px-3">
            <nav className="space-y-1">
              {navigation.map((item) => (
                <SidebarGroup
                  key={item.href}
                  item={item}
                  currentPath={currentPath}
                  onNavigate={handleNavigate}
                />
              ))}
            </nav>
          </div>
        </aside>
      </>
    );
  }

  // Desktop sidebar
  return (
    <aside className="hidden lg:block w-64 shrink-0 border-r border-border">
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

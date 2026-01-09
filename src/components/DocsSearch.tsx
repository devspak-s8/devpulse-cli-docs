import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  BookOpen,
  Terminal,
  Code,
  AlertTriangle,
  Settings,
  Layers,
  Download,
  Zap,
  FileText,
  Search,
  ArrowRight,
} from "lucide-react";

interface SearchItem {
  title: string;
  href: string;
  description?: string;
  icon: React.ElementType;
  category: string;
  keywords?: string[];
}

const searchItems: SearchItem[] = [
  // Getting Started
  {
    title: "Introduction",
    href: "/docs",
    description: "Get started with DevPulse CLI",
    icon: BookOpen,
    category: "Getting Started",
    keywords: ["intro", "start", "begin", "overview"],
  },
  {
    title: "Installation",
    href: "/docs/installation",
    description: "Install DevPulse on your machine",
    icon: Download,
    category: "Getting Started",
    keywords: ["install", "setup", "pip", "python", "venv"],
  },
  {
    title: "Quick Start",
    href: "/docs/quick-start",
    description: "Get up and running in 5 minutes",
    icon: Zap,
    category: "Getting Started",
    keywords: ["quick", "start", "tutorial", "guide"],
  },

  // Commands
  {
    title: "Commands Overview",
    href: "/docs/commands",
    description: "All CLI commands reference",
    icon: Terminal,
    category: "Commands",
    keywords: ["cli", "command", "terminal", "shell"],
  },
  {
    title: "GitHub Stats",
    href: "/docs/commands",
    description: "devpulse github stats --repo owner/name",
    icon: Terminal,
    category: "Commands",
    keywords: ["github", "stats", "repo", "repository", "stars", "forks"],
  },
  {
    title: "GitHub Activity",
    href: "/docs/commands",
    description: "devpulse github activity username",
    icon: Terminal,
    category: "Commands",
    keywords: ["github", "activity", "commits", "user"],
  },
  {
    title: "GitHub Languages",
    href: "/docs/commands",
    description: "devpulse github top-languages owner/name",
    icon: Terminal,
    category: "Commands",
    keywords: ["github", "languages", "top", "programming"],
  },
  {
    title: "GitHub Contributors",
    href: "/docs/commands",
    description: "devpulse github contributors owner/name",
    icon: Terminal,
    category: "Commands",
    keywords: ["github", "contributors", "team", "members"],
  },
  {
    title: "GitHub Issues",
    href: "/docs/commands",
    description: "devpulse github issues owner/name",
    icon: Terminal,
    category: "Commands",
    keywords: ["github", "issues", "bugs", "tickets"],
  },

  // API Reference
  {
    title: "API Reference",
    href: "/docs/api-reference",
    description: "REST API documentation",
    icon: Code,
    category: "API",
    keywords: ["api", "rest", "http", "endpoint", "request"],
  },
  {
    title: "Authentication",
    href: "/docs/api-reference",
    description: "API authentication with GitHub token",
    icon: Code,
    category: "API",
    keywords: ["auth", "token", "github", "api key"],
  },
  {
    title: "Rate Limiting",
    href: "/docs/api-reference",
    description: "Understanding API rate limits",
    icon: Code,
    category: "API",
    keywords: ["rate", "limit", "throttle", "429"],
  },

  // Error Handling
  {
    title: "Error Handling",
    href: "/docs/error-handling",
    description: "Handle errors and rate limits gracefully",
    icon: AlertTriangle,
    category: "Guides",
    keywords: ["error", "exception", "rate limit", "cache", "fallback"],
  },

  // Configuration
  {
    title: "Configuration",
    href: "/docs/configuration",
    description: "Configure DevPulse settings",
    icon: Settings,
    category: "Guides",
    keywords: ["config", "settings", "environment", "env", "token"],
  },

  // Examples
  {
    title: "Examples",
    href: "/docs/examples",
    description: "Real-world usage examples",
    icon: Layers,
    category: "Guides",
    keywords: ["example", "sample", "tutorial", "use case"],
  },
];

export function DocsSearch() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const handleSelect = useCallback(
    (href: string) => {
      setOpen(false);
      navigate(href);
    },
    [navigate]
  );

  const categories = [...new Set(searchItems.map((item) => item.category))];

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Search documentation..." />
      <CommandList>
        <CommandEmpty>
          <div className="flex flex-col items-center gap-2 py-6">
            <Search className="h-10 w-10 text-muted-foreground/50" />
            <p className="text-muted-foreground">No results found.</p>
            <p className="text-sm text-muted-foreground/70">
              Try searching for commands, API, or configuration
            </p>
          </div>
        </CommandEmpty>
        {categories.map((category, index) => (
          <div key={category}>
            {index > 0 && <CommandSeparator />}
            <CommandGroup heading={category}>
              {searchItems
                .filter((item) => item.category === category)
                .map((item) => (
                  <CommandItem
                    key={item.href + item.title}
                    value={`${item.title} ${item.description} ${item.keywords?.join(" ")}`}
                    onSelect={() => handleSelect(item.href)}
                    className="flex items-center gap-3 py-3"
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded-md bg-muted">
                      <item.icon className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div className="flex-1 overflow-hidden">
                      <p className="font-medium truncate">{item.title}</p>
                      {item.description && (
                        <p className="text-sm text-muted-foreground truncate">
                          {item.description}
                        </p>
                      )}
                    </div>
                    <ArrowRight className="h-4 w-4 text-muted-foreground/50" />
                  </CommandItem>
                ))}
            </CommandGroup>
          </div>
        ))}
      </CommandList>
    </CommandDialog>
  );
}

export function useDocsSearch() {
  const [open, setOpen] = useState(false);

  const toggle = useCallback(() => {
    setOpen((prev) => !prev);
  }, []);

  return { open, setOpen, toggle };
}

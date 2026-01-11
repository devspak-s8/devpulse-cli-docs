import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Github, Search, Moon, Sun, Menu, X, Terminal, Command } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
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
  Code,
  AlertTriangle,
  Settings,
  Layers,
  Download,
  Zap,
  ArrowRight,
} from "lucide-react";

interface HeaderProps {
  variant?: "landing" | "docs";
}

const searchItems = [
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
    keywords: ["install", "setup", "pip", "python"],
  },
  {
    title: "Quick Start",
    href: "/docs/quick-start",
    description: "Get up and running in 5 minutes",
    icon: Zap,
    category: "Getting Started",
    keywords: ["quick", "start", "tutorial"],
  },
  {
    title: "Commands Overview",
    href: "/docs/commands",
    description: "All CLI commands reference",
    icon: Terminal,
    category: "Commands",
    keywords: ["cli", "command", "terminal"],
  },
  {
    title: "GitHub Stats",
    href: "/docs/commands",
    description: "devpulse github stats --repo owner/name",
    icon: Terminal,
    category: "Commands",
    keywords: ["github", "stats", "repo", "stars"],
  },
  {
    title: "API Reference",
    href: "/docs/api-reference",
    description: "REST API documentation",
    icon: Code,
    category: "API",
    keywords: ["api", "rest", "http", "endpoint"],
  },
  {
    title: "Error Handling",
    href: "/docs/error-handling",
    description: "Handle errors and rate limits",
    icon: AlertTriangle,
    category: "Guides",
    keywords: ["error", "rate limit", "cache"],
  },
  {
    title: "Configuration",
    href: "/docs/configuration",
    description: "Configure DevPulse settings",
    icon: Settings,
    category: "Guides",
    keywords: ["config", "settings", "env"],
  },
  {
    title: "Examples",
    href: "/docs/examples",
    description: "Real-world usage examples",
    icon: Layers,
    category: "Guides",
    keywords: ["example", "sample", "tutorial"],
  },
];

export function Header({ variant = "landing" }: HeaderProps) {
  const [isDark, setIsDark] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const shouldBeDark = savedTheme === "dark" || (!savedTheme && prefersDark);
    
    setIsDark(shouldBeDark);
    document.documentElement.classList.toggle("dark", shouldBeDark);
  }, []);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setSearchOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    document.documentElement.classList.toggle("dark", newIsDark);
    localStorage.setItem("theme", newIsDark ? "dark" : "light");
  };

  const handleSelect = (href: string) => {
    setSearchOpen(false);
    navigate(href);
  };

  const navLinks = [
    { href: "/docs", label: "Docs" },
    { href: "/docs/api-reference", label: "API" },
    { href: "/docs/examples", label: "Examples" },
  ];

  const categories = [...new Set(searchItems.map((item) => item.category))];

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 w-full border-b border-border/50 backdrop-blur-md",
          variant === "landing" ? "bg-background/80" : "bg-background/95"
        )}
      >
        <div className="container flex h-14 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 font-semibold group">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary transition-transform group-hover:scale-110">
              <Terminal className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="text-lg">DevPulse</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={cn(
                  "px-3 py-2 text-sm font-medium rounded-md transition-colors",
                  location.pathname.startsWith(link.href)
                    ? "text-foreground bg-muted"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right side actions */}
          <div className="flex items-center gap-2">
            {/* Search */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSearchOpen(true)}
              className={cn(
                "flex items-center gap-2 text-muted-foreground",
                variant === "docs" 
                  ? "hidden sm:flex w-64 justify-start" 
                  : "hidden sm:flex"
              )}
            >
              <Search className="h-4 w-4" />
              <span>{variant === "docs" ? "Search docs..." : "Search"}</span>
              <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
                <span className="text-xs">⌘</span>K
              </kbd>
            </Button>

            {/* Mobile search button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSearchOpen(true)}
              className="sm:hidden"
            >
              <Search className="h-5 w-5" />
            </Button>

            {/* GitHub */}
            <Button variant="ghost" size="icon" asChild>
              <a
                href="https://github.com/devpulse/cli"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
            </Button>

            {/* Theme toggle */}
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleTheme}
              className="relative"
            >
              <Sun className={cn(
                "h-5 w-5 transition-all",
                isDark ? "rotate-0 scale-100" : "rotate-90 scale-0"
              )} />
              <Moon className={cn(
                "absolute h-5 w-5 transition-all",
                isDark ? "rotate-90 scale-0" : "rotate-0 scale-100"
              )} />
            </Button>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-border animate-in slide-in-from-top-2">
            <nav className="container py-4 flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={cn(
                    "px-3 py-2 text-sm font-medium rounded-md transition-colors",
                    location.pathname.startsWith(link.href)
                      ? "text-foreground bg-muted"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </header>

      {/* Command palette search - redesigned */}
      <CommandDialog open={searchOpen} onOpenChange={setSearchOpen}>
        <div className="flex flex-col max-h-[80vh]">
          {/* Search header */}
          <div className="px-4 py-3 border-b border-border">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                <Search className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1">
                <CommandInput 
                  placeholder="Search documentation..." 
                  className="border-0 focus:ring-0 px-0 h-auto text-base"
                />
              </div>
              <kbd className="pointer-events-none inline-flex h-6 select-none items-center gap-1 rounded-lg border bg-muted px-2 font-mono text-[10px] font-medium text-muted-foreground">
                ESC
              </kbd>
            </div>
          </div>

          {/* Results */}
          <CommandList className="max-h-[60vh] overflow-y-auto p-2">
            <CommandEmpty>
              <div className="flex flex-col items-center gap-3 py-12">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-muted">
                  <Search className="h-8 w-8 text-muted-foreground/50" />
                </div>
                <div className="text-center">
                  <p className="font-medium text-foreground">No results found</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Try searching for commands, API, or configuration
                  </p>
                </div>
              </div>
            </CommandEmpty>
            {categories.map((category, index) => (
              <div key={category} className="mb-2">
                {index > 0 && <CommandSeparator className="my-2" />}
                <CommandGroup heading={category} className="px-1">
                  {searchItems
                    .filter((item) => item.category === category)
                    .map((item) => (
                      <CommandItem
                        key={item.href + item.title}
                        value={`${item.title} ${item.description} ${item.keywords?.join(" ")}`}
                        onSelect={() => handleSelect(item.href)}
                        className="flex items-center gap-3 py-3 px-3 rounded-xl cursor-pointer data-[selected=true]:bg-primary/10"
                      >
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted group-data-[selected=true]:bg-primary/20 transition-colors">
                          <item.icon className="h-5 w-5 text-muted-foreground" />
                        </div>
                        <div className="flex-1 overflow-hidden">
                          <p className="font-medium truncate">{item.title}</p>
                          {item.description && (
                            <p className="text-sm text-muted-foreground truncate">
                              {item.description}
                            </p>
                          )}
                        </div>
                        <ArrowRight className="h-4 w-4 text-muted-foreground/50 opacity-0 group-data-[selected=true]:opacity-100 transition-opacity" />
                      </CommandItem>
                    ))}
                </CommandGroup>
              </div>
            ))}
          </CommandList>

          {/* Footer */}
          <div className="flex items-center justify-between px-4 py-2 border-t border-border text-xs text-muted-foreground">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 rounded bg-muted font-mono">↑</kbd>
                <kbd className="px-1.5 py-0.5 rounded bg-muted font-mono">↓</kbd>
                <span>navigate</span>
              </div>
              <div className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 rounded bg-muted font-mono">↵</kbd>
                <span>select</span>
              </div>
            </div>
            <span>Powered by DevPulse</span>
          </div>
        </div>
      </CommandDialog>
    </>
  );
}

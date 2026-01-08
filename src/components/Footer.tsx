import { Link } from "react-router-dom";
import { Github, Twitter, Terminal } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="container py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 font-semibold mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <Terminal className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="text-lg">DevPulse</span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs">
              Developer productivity & GitHub analytics CLI. Track, analyze, and optimize your workflow.
            </p>
          </div>

          {/* Documentation */}
          <div>
            <h4 className="font-semibold mb-4">Documentation</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/docs" className="text-muted-foreground hover:text-foreground transition-colors">
                  Getting Started
                </Link>
              </li>
              <li>
                <Link to="/docs/installation" className="text-muted-foreground hover:text-foreground transition-colors">
                  Installation
                </Link>
              </li>
              <li>
                <Link to="/docs/commands" className="text-muted-foreground hover:text-foreground transition-colors">
                  Commands
                </Link>
              </li>
              <li>
                <Link to="/docs/api-reference" className="text-muted-foreground hover:text-foreground transition-colors">
                  API Reference
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/docs/examples" className="text-muted-foreground hover:text-foreground transition-colors">
                  Examples
                </Link>
              </li>
              <li>
                <Link to="/docs/error-handling" className="text-muted-foreground hover:text-foreground transition-colors">
                  Error Handling
                </Link>
              </li>
              <li>
                <a href="https://github.com/devpulse/cli/releases" className="text-muted-foreground hover:text-foreground transition-colors">
                  Changelog
                </a>
              </li>
            </ul>
          </div>

          {/* Community */}
          <div>
            <h4 className="font-semibold mb-4">Community</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="https://github.com/devpulse/cli" className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2">
                  <Github className="h-4 w-4" />
                  GitHub
                </a>
              </li>
              <li>
                <a href="https://twitter.com/devpulse" className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2">
                  <Twitter className="h-4 w-4" />
                  Twitter
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} DevPulse. Released under MIT License.
          </p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">
              Privacy
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

import { Link } from "react-router-dom";
import { ArrowRight, Terminal, BookOpen, Code, Zap, Github, Database, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CodeBlock } from "@/components/CodeBlock";
import { Callout } from "@/components/Callout";

const quickLinks = [
  {
    icon: Terminal,
    title: "Installation",
    description: "Get DevPulse up and running in your environment",
    href: "/docs/installation",
  },
  {
    icon: Zap,
    title: "Quick Start",
    description: "Learn the basics with a 5-minute tutorial",
    href: "/docs/quick-start",
  },
  {
    icon: BookOpen,
    title: "Commands",
    description: "Explore all available CLI commands",
    href: "/docs/commands",
  },
  {
    icon: Code,
    title: "API Reference",
    description: "Integrate DevPulse into your applications",
    href: "/docs/api-reference",
  },
];

const features = [
  { icon: Github, title: "GitHub Analytics", desc: "Repo stats, user stats, languages, contributors, issues, activity, and health score" },
  { icon: Terminal, title: "CLI + API", desc: "Full CLI with table and JSON output, plus local FastAPI server" },
  { icon: Database, title: "Smart Caching", desc: "Caching and stale-cache fallback when GitHub rate limits are hit" },
  { icon: Clock, title: "Rate-Limit Aware", desc: "Optional GitHub token for higher rate limits (5,000 req/hour)" },
];

export default function DocsHome() {
  return (
    <div className="prose-docs max-w-3xl">
      <div className="animate-fade-in">
        <div className="flex items-center gap-2 mb-4">
          <span className="px-2.5 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
            Version 0.1.3
          </span>
        </div>
        <h1>DevPulse Documentation</h1>
      </div>
      
      <p className="text-lg text-muted-foreground animate-fade-in-up">
        DevPulse is a Python-based developer analytics and productivity toolkit that you can run as a CLI,
        a local API (FastAPI), or embed as a reusable backend service. Its GitHub integration is fully
        implemented and provides repository and user insights.
      </p>

      <Callout type="tip" title="New to DevPulse?">
        Start with the <Link to="/docs/quick-start">Quick Start guide</Link> to get
        up and running in under 5 minutes.
      </Callout>

      {/* Who it's for */}
      <div className="animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
        <h2 id="who-its-for">Who It's For</h2>
        <p>
          Open-source users, backend developers, frontend developers, API consumers, and DevOps engineers
          who need quick GitHub insights with caching, safe rate-limit handling, and machine-friendly output.
        </p>
      </div>

      {/* Key Features */}
      <div className="animate-fade-in-up" style={{ animationDelay: "0.15s" }}>
        <h2 id="key-features">Key Features</h2>
        <div className="grid sm:grid-cols-2 gap-4 not-prose mb-6">
          {features.map((feature, i) => (
            <div 
              key={feature.title} 
              className="flex gap-3 p-4 rounded-lg border border-border hover:border-primary/50 transition-all duration-200 hover:shadow-sm"
              style={{ animationDelay: `${0.2 + i * 0.05}s` }}
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <feature.icon className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-medium mb-1">{feature.title}</h4>
                <p className="text-sm text-muted-foreground">{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Problems it solves */}
      <div className="animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
        <h2 id="problems-solved">Problems It Solves</h2>
        <ul>
          <li>Aggregates multiple GitHub API calls into a compact, consistent schema</li>
          <li>Provides a single command and endpoint for the most relevant repository insights</li>
          <li>Survives temporary rate limits and network hiccups using cache fallback</li>
          <li>Supplies machine-readable JSON for dashboards, CI/CD, and integrations</li>
        </ul>
      </div>

      <Callout type="warning" title="Current Limitations">
        Many non-GitHub commands are placeholders. The included API uses an in-memory rate limiter
        and no authentication; treat it as a local/development server unless hardened.
      </Callout>

      <h2 id="quick-install">Quick Install</h2>
      
      <CodeBlock
        code={`# Create virtual environment
python3 -m venv .venv
source .venv/bin/activate  # Windows: .venv\\Scripts\\Activate.ps1

# Install DevPulse
pip install devpulse-cli`}
        language="bash"
      />

      <p>
        For more installation options including extras and development setup, see the{" "}
        <Link to="/docs/installation">Installation guide</Link>.
      </p>

      <h2 id="verify-installation">Verify Installation</h2>

      <CodeBlock
        code={`devpulse --version
# DevPulse CLI v0.1.3

devpulse --help
# Show all available commands`}
        language="bash"
      />

      <h2 id="quick-links">Quick Links</h2>

      <div className="grid sm:grid-cols-2 gap-4 not-prose">
        {quickLinks.map((link, i) => (
          <Link
            key={link.href}
            to={link.href}
            className="group flex items-start gap-4 p-4 rounded-lg border border-border hover:border-primary/50 hover:bg-muted/30 transition-all duration-200 animate-fade-in-up"
            style={{ animationDelay: `${0.3 + i * 0.05}s` }}
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
              <link.icon className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors">
                {link.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {link.description}
              </p>
            </div>
          </Link>
        ))}
      </div>

      <h2 id="github-features">GitHub Features (Fully Implemented)</h2>

      <p>The <code>GitHubService</code> powers the CLI and API with:</p>

      <table>
        <thead>
          <tr>
            <th>Command</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>github stats</code></td>
            <td>Repository or user-level stats with health score</td>
          </tr>
          <tr>
            <td><code>github activity</code></td>
            <td>User activity summary (7-day and 30-day)</td>
          </tr>
          <tr>
            <td><code>github top-languages</code></td>
            <td>Language distribution for a repo</td>
          </tr>
          <tr>
            <td><code>github contributors</code></td>
            <td>Top contributors for a repo</td>
          </tr>
          <tr>
            <td><code>github issues</code></td>
            <td>Issue metrics for a repo</td>
          </tr>
        </tbody>
      </table>

      <h2 id="command-groups">All Command Groups</h2>

      <p>DevPulse includes 17 command groups with 120+ subcommands:</p>

      <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 not-prose mb-6">
        {["track", "stats", "health", "logs", "secrets", "sync", "ai", "project", "timer", "notes", "focus", "breaks", "report", "config", "export", "habits", "dashboard"].map((group) => (
          <div key={group} className="px-3 py-2 rounded-md bg-muted text-sm font-mono text-center">
            {group}
          </div>
        ))}
      </div>

      <Callout type="info">
        Currently, only the <code>github</code> command group is fully implemented.
        Other groups are present as demos or stubs.
      </Callout>

      <div className="mt-8 animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
        <Button asChild>
          <Link to="/docs/quick-start">
            Continue to Quick Start
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  );
}

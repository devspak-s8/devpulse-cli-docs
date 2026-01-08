import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CodeBlock } from "@/components/CodeBlock";
import { Callout } from "@/components/Callout";

const commandGroups = [
  {
    name: "github",
    description: "GitHub analytics (fully implemented)",
    badge: "Production",
    commands: [
      { cmd: "github stats", desc: "Repository or user-level stats with health score" },
      { cmd: "github activity", desc: "User activity summary" },
      { cmd: "github top-languages", desc: "Language distribution for a repo" },
      { cmd: "github contributors", desc: "Top contributors for a repo" },
      { cmd: "github issues", desc: "Issue metrics for a repo" },
    ],
  },
  {
    name: "track",
    description: "Time tracking and session management",
    badge: "Demo",
    commands: [
      { cmd: "track start", desc: "Start a new tracking session" },
      { cmd: "track stop", desc: "Stop the current session" },
      { cmd: "track status", desc: "Show current session status" },
      { cmd: "track list", desc: "List all sessions" },
    ],
  },
  {
    name: "stats",
    description: "View analytics and statistics",
    badge: "Demo",
    commands: [
      { cmd: "stats show", desc: "Display productivity statistics" },
      { cmd: "stats report", desc: "Generate detailed reports" },
      { cmd: "stats trends", desc: "Show productivity trends" },
    ],
  },
  {
    name: "ai",
    description: "AI-powered insights and suggestions",
    badge: "Demo",
    commands: [
      { cmd: "ai suggest", desc: "Get AI suggestions" },
      { cmd: "ai analyze", desc: "Analyze code or logs" },
      { cmd: "ai insights", desc: "Show AI insights" },
    ],
  },
  {
    name: "focus",
    description: "Focus mode and distraction blocking",
    badge: "Demo",
    commands: [
      { cmd: "focus start", desc: "Start a focus session" },
      { cmd: "focus stop", desc: "End focus mode" },
      { cmd: "focus block", desc: "Block distracting sites" },
    ],
  },
];

export default function Commands() {
  return (
    <div className="prose-docs max-w-3xl">
      <div className="animate-fade-in">
        <h1>Commands</h1>

        <p className="text-lg text-muted-foreground">
          DevPulse organizes its functionality into 17 command groups with 120+ subcommands.
          The GitHub command group is fully implemented; others are demos or stubs.
        </p>
      </div>

      <div className="animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
        <h2 id="cli-syntax">CLI Syntax</h2>

        <p>General syntax:</p>

        <CodeBlock
          code={`devpulse <command-group> <command> [options]`}
          language="bash"
        />
      </div>

      <div className="animate-fade-in-up" style={{ animationDelay: "0.15s" }}>
        <h2 id="getting-help">Getting Help</h2>

        <p>View available commands and options:</p>

        <CodeBlock
          code={`# Show all commands
devpulse --help

# Show help for a command group
devpulse github --help

# Show help for a specific subcommand
devpulse github stats --help`}
          language="bash"
        />
      </div>

      <Callout type="tip">
        Use <code>--help</code> on any command to see its available options and
        usage examples.
      </Callout>

      <div className="animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
        <h2 id="output-formats">Output Formats</h2>

        <ul>
          <li><strong>Default:</strong> Rich tables in the terminal</li>
          <li><strong>JSON:</strong> Add <code>--json</code> to any GitHub command for machine-readable output</li>
        </ul>

        <h3>Force Refresh</h3>
        <p>Add <code>--force-refresh</code> to bypass the local cache and call GitHub directly.</p>

        <h3>Caching Behavior</h3>
        <ul>
          <li><strong>Cache location:</strong> <code>~/.devpulse/cache/github/</code></li>
          <li><strong>Cache TTL:</strong> 10 minutes</li>
          <li>On GitHub rate-limit errors (HTTP 403), DevPulse serves stale cache if available</li>
        </ul>
      </div>

      <div className="animate-fade-in-up" style={{ animationDelay: "0.25s" }}>
        <h2 id="command-groups">Command Groups</h2>

        {commandGroups.map((group, i) => (
          <div key={group.name} className="mb-8 animate-fade-in-up" style={{ animationDelay: `${0.3 + i * 0.05}s` }}>
            <div className="flex items-center gap-3 mb-2">
              <h3 id={group.name} className="!mb-0">{group.name}</h3>
              <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                group.badge === "Production" 
                  ? "bg-tip/10 text-tip" 
                  : "bg-warning/10 text-warning"
              }`}>
                {group.badge}
              </span>
            </div>
            <p className="text-muted-foreground">{group.description}</p>

            <div className="not-prose">
              <div className="rounded-lg border border-border overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="bg-muted/50">
                      <th className="text-left p-3 font-medium text-sm">Command</th>
                      <th className="text-left p-3 font-medium text-sm">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {group.commands.map((cmd) => (
                      <tr key={cmd.cmd} className="border-t border-border">
                        <td className="p-3 font-mono text-sm text-primary">
                          devpulse {cmd.cmd}
                        </td>
                        <td className="p-3 text-sm text-muted-foreground">
                          {cmd.desc}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="animate-fade-in-up" style={{ animationDelay: "0.5s" }}>
        <h2 id="github-examples">GitHub Command Examples</h2>

        <CodeBlock
          code={`# Repo stats (table)
devpulse github stats --repo owner/name

# Repo stats (json)
devpulse github stats --repo owner/name --json

# Filtered sections
devpulse github stats --repo owner/name --include languages,issues,health

# User stats (top repos by stars)
devpulse github stats --username octocat --top 3 --json

# Force bypass cache
devpulse github stats --repo owner/name --force-refresh

# Languages distribution
devpulse github top-languages owner/name

# Contributors
devpulse github contributors owner/name --top 10

# Issues metrics
devpulse github issues owner/name

# Activity summary
devpulse github activity octocat`}
          language="bash"
          showLineNumbers
        />
      </div>

      <div className="animate-fade-in-up" style={{ animationDelay: "0.55s" }}>
        <h2 id="all-command-groups">All 17 Command Groups</h2>

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2 not-prose mb-6">
          {["github", "track", "stats", "health", "logs", "secrets", "sync", "ai", "project", "timer", "notes", "focus", "breaks", "report", "config", "export", "habits", "dashboard"].map((group) => (
            <div 
              key={group} 
              className={`px-3 py-2 rounded-md text-sm font-mono text-center transition-colors ${
                group === "github" 
                  ? "bg-tip/10 text-tip border border-tip/20" 
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {group}
            </div>
          ))}
        </div>

        <Callout type="info">
          Only the <code>github</code> command group is fully implemented.
          Other groups are present as demos or stubs with mocked outputs.
        </Callout>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between mt-12 pt-6 border-t border-border not-prose animate-fade-in">
        <Button variant="outline" asChild>
          <Link to="/docs/quick-start">
            <ArrowLeft className="h-4 w-4" />
            Quick Start
          </Link>
        </Button>
        <Button asChild>
          <Link to="/docs/api-reference">
            API Reference
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  );
}

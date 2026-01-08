import { Link } from "react-router-dom";
import { ArrowRight, Terminal, BookOpen, Code, Zap } from "lucide-react";
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

export default function DocsHome() {
  return (
    <div className="prose-docs max-w-3xl">
      <h1>DevPulse Documentation</h1>
      
      <p className="text-lg text-muted-foreground">
        DevPulse is a developer productivity and GitHub analytics CLI tool. Track your
        coding time, analyze your GitHub activity, and optimize your workflow.
      </p>

      <Callout type="tip" title="New to DevPulse?">
        Start with the <Link to="/docs/quick-start">Quick Start guide</Link> to get
        up and running in under 5 minutes.
      </Callout>

      <h2 id="quick-install">Quick Install</h2>
      
      <CodeBlock
        code="pip install devpulse-cli"
        language="bash"
      />

      <p>
        For more installation options including extras and development setup, see the{" "}
        <Link to="/docs/installation">Installation guide</Link>.
      </p>

      <h2 id="verify-installation">Verify Installation</h2>

      <CodeBlock
        code={`devpulse --version
# DevPulse CLI v2.0.0

devpulse --help
# Show all available commands`}
        language="bash"
      />

      <h2 id="quick-links">Quick Links</h2>

      <div className="grid sm:grid-cols-2 gap-4 not-prose">
        {quickLinks.map((link) => (
          <Link
            key={link.href}
            to={link.href}
            className="group flex items-start gap-4 p-4 rounded-lg border border-border hover:border-primary/50 hover:bg-muted/30 transition-colors"
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

      <h2 id="features">Key Features</h2>

      <ul>
        <li>
          <strong>Time Tracking</strong> — Track coding sessions with start, stop,
          pause, and resume functionality
        </li>
        <li>
          <strong>GitHub Analytics</strong> — Analyze commits, PRs, issues, and
          contribution patterns
        </li>
        <li>
          <strong>AI Insights</strong> — Get AI-powered suggestions and productivity
          recommendations
        </li>
        <li>
          <strong>Focus Mode</strong> — Block distracting websites during deep work
          sessions
        </li>
        <li>
          <strong>Cloud Sync</strong> — Sync your data across devices
        </li>
        <li>
          <strong>Export Options</strong> — Export data in JSON, CSV, or HTML formats
        </li>
      </ul>

      <h2 id="command-groups">Command Groups</h2>

      <p>DevPulse organizes commands into logical groups:</p>

      <table>
        <thead>
          <tr>
            <th>Group</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>track</code></td>
            <td>Time tracking and session management</td>
          </tr>
          <tr>
            <td><code>stats</code></td>
            <td>View analytics and statistics</td>
          </tr>
          <tr>
            <td><code>ai</code></td>
            <td>AI-powered insights and suggestions</td>
          </tr>
          <tr>
            <td><code>focus</code></td>
            <td>Focus mode and distraction blocking</td>
          </tr>
          <tr>
            <td><code>sync</code></td>
            <td>Cloud synchronization</td>
          </tr>
          <tr>
            <td><code>export</code></td>
            <td>Data export in various formats</td>
          </tr>
        </tbody>
      </table>

      <div className="mt-8">
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

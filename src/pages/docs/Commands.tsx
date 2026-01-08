import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CodeBlock } from "@/components/CodeBlock";
import { Callout } from "@/components/Callout";

const commandGroups = [
  {
    name: "track",
    description: "Time tracking and session management",
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
    commands: [
      { cmd: "stats show", desc: "Display productivity statistics" },
      { cmd: "stats report", desc: "Generate detailed reports" },
      { cmd: "stats trends", desc: "Show productivity trends" },
    ],
  },
  {
    name: "ai",
    description: "AI-powered insights and suggestions",
    commands: [
      { cmd: "ai suggest", desc: "Get AI suggestions" },
      { cmd: "ai analyze", desc: "Analyze code or logs" },
      { cmd: "ai insights", desc: "Show AI insights" },
    ],
  },
  {
    name: "focus",
    description: "Focus mode and distraction blocking",
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
      <h1>Commands</h1>

      <p className="text-lg text-muted-foreground">
        DevPulse organizes its functionality into command groups. Each group
        contains related subcommands for specific tasks.
      </p>

      <h2 id="getting-help">Getting Help</h2>

      <p>View available commands and options:</p>

      <CodeBlock
        code={`# Show all commands
devpulse --help

# Show help for a command group
devpulse track --help

# Show help for a specific subcommand
devpulse track start --help`}
        language="bash"
      />

      <Callout type="tip">
        Use <code>--help</code> on any command to see its available options and
        usage examples.
      </Callout>

      <h2 id="command-groups">Command Groups</h2>

      {commandGroups.map((group) => (
        <div key={group.name} className="mb-8">
          <h3 id={group.name}>{group.name}</h3>
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

      <h2 id="common-options">Common Options</h2>

      <p>These options are available for most commands:</p>

      <table>
        <thead>
          <tr>
            <th>Option</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>--format</code></td>
            <td>Output format (json, table, csv)</td>
          </tr>
          <tr>
            <td><code>--quiet</code></td>
            <td>Suppress non-essential output</td>
          </tr>
          <tr>
            <td><code>--verbose</code></td>
            <td>Show detailed output</td>
          </tr>
          <tr>
            <td><code>--debug</code></td>
            <td>Enable debug logging</td>
          </tr>
        </tbody>
      </table>

      <h2 id="examples">Quick Examples</h2>

      <CodeBlock
        code={`# Start tracking a task
devpulse track start "Building API endpoints"

# Check your stats for today
devpulse stats show --today

# Get AI suggestions based on your patterns
devpulse ai suggest

# Start a 25-minute focus session
devpulse focus start --duration 25

# Export your data
devpulse export --format json --output data.json`}
        language="bash"
      />

      {/* Navigation */}
      <div className="flex items-center justify-between mt-12 pt-6 border-t border-border not-prose">
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

import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CodeBlock } from "@/components/CodeBlock";
import { Callout } from "@/components/Callout";

export default function QuickStart() {
  return (
    <div className="prose-docs max-w-3xl">
      <h1>Quick Start</h1>

      <p className="text-lg text-muted-foreground">
        Get up and running with DevPulse in under 5 minutes. This guide covers
        the essential commands to start tracking your productivity.
      </p>

      <h2 id="step-1">Step 1: Verify Installation</h2>

      <p>Make sure DevPulse is installed correctly:</p>

      <CodeBlock
        code={`$ devpulse --version
DevPulse CLI v2.0.0

$ devpulse health check
✅ CPU: 25%
✅ Memory: 42%
✅ Disk: 68%
All systems healthy!`}
        language="bash"
      />

      <h2 id="step-2">Step 2: Start Tracking</h2>

      <p>Begin your first tracking session:</p>

      <CodeBlock
        code={`# Start tracking with a task name
$ devpulse track start "Building new feature"
🟢 Started tracking: Building new feature
   Session ID: abc123
   Started at: 10:30 AM

# Check your current status
$ devpulse track status
📊 Current Session
   Task: Building new feature
   Duration: 45 minutes
   Status: Active`}
        language="bash"
      />

      <h2 id="step-3">Step 3: View Your Stats</h2>

      <p>See your productivity statistics:</p>

      <CodeBlock
        code={`$ devpulse stats show --today
📊 Today's Stats
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Total Time:     3h 45m
Sessions:       4
Productivity:   85%
Top Project:    api-server (2h 15m)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`}
        language="bash"
      />

      <h2 id="step-4">Step 4: Stop and Review</h2>

      <p>End your session and see the summary:</p>

      <CodeBlock
        code={`$ devpulse track stop
🔴 Stopped tracking: Building new feature
   Duration: 1h 23m
   Productivity Score: 92%

# View your session history
$ devpulse track list --today
┌────────┬─────────────────────┬──────────┬───────┐
│ ID     │ Task                │ Duration │ Score │
├────────┼─────────────────────┼──────────┼───────┤
│ abc123 │ Building new feature│ 1h 23m   │ 92%   │
│ def456 │ Code review         │ 45m      │ 88%   │
│ ghi789 │ Documentation       │ 1h 37m   │ 78%   │
└────────┴─────────────────────┴──────────┴───────┘`}
        language="bash"
      />

      <Callout type="tip" title="Pro Tip">
        Use <code>devpulse ai suggest</code> to get personalized recommendations
        based on your productivity patterns.
      </Callout>

      <h2 id="next-steps">Next Steps</h2>

      <ul>
        <li>
          <Link to="/docs/commands">Explore all commands</Link> — Learn about
          focus mode, AI insights, and more
        </li>
        <li>
          <Link to="/docs/configuration">Configure DevPulse</Link> — Customize
          settings and connect integrations
        </li>
        <li>
          <Link to="/docs/examples">See examples</Link> — Real-world workflows
          and automation tips
        </li>
      </ul>

      {/* Navigation */}
      <div className="flex items-center justify-between mt-12 pt-6 border-t border-border not-prose">
        <Button variant="outline" asChild>
          <Link to="/docs/installation">
            <ArrowLeft className="h-4 w-4" />
            Installation
          </Link>
        </Button>
        <Button asChild>
          <Link to="/docs/commands">
            Commands
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  );
}

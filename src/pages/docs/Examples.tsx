import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CodeBlock } from "@/components/CodeBlock";
import { Callout } from "@/components/Callout";

export default function Examples() {
  return (
    <div className="prose-docs max-w-3xl">
      <h1>Examples</h1>

      <p className="text-lg text-muted-foreground">
        Real-world examples and workflows to help you get the most out of DevPulse.
      </p>

      <h2 id="daily-workflow">Daily Workflow</h2>

      <p>A typical developer's day with DevPulse:</p>

      <CodeBlock
        code={`# Morning: Check health and yesterday's summary
devpulse health check
devpulse stats show --yesterday

# Start your day
devpulse track start "Project: API Development"

# Check what you should focus on
devpulse ai suggest --context "morning priorities"

# Take a break (DevPulse will remind you)
devpulse breaks suggest

# End of day: Generate report
devpulse stats report --format html --output daily-report.html
devpulse track stop`}
        language="bash"
        filename="daily-workflow.sh"
      />

      <h2 id="focus-session">Focus Session</h2>

      <p>Run a distraction-free coding session:</p>

      <CodeBlock
        code={`# Start 45-minute focus session
devpulse focus start --duration 45 --task "Implement auth"

# Block distracting websites
devpulse focus block --preset social

# Check remaining time
devpulse focus status

# End session early if needed
devpulse focus stop`}
        language="bash"
      />

      <Callout type="tip">
        Focus mode can optionally block distracting websites by modifying your
        hosts file. This requires elevated permissions.
      </Callout>

      <h2 id="weekly-review">Weekly Review</h2>

      <CodeBlock
        code={`# Get weekly summary
devpulse stats show --week

# Compare to last week
devpulse stats compare --this-week --last-week

# View productivity trends
devpulse stats trends --metric productivity --chart

# Get AI insights on patterns
devpulse ai insights --detailed

# Export for team standup
devpulse stats report --week --format json | jq '.summary'`}
        language="bash"
      />

      <h2 id="project-tracking">Project-Based Tracking</h2>

      <CodeBlock
        code={`# Set up project context
devpulse project create "api-server"
devpulse project switch "api-server"

# Track with project context
devpulse track start "Fix authentication bug"

# View project-specific stats
devpulse stats show --project "api-server"

# Compare projects
devpulse stats breakdown --by project --top 5`}
        language="bash"
      />

      <h2 id="automation">Shell Aliases & Automation</h2>

      <p>Add these to your shell profile for quick access:</p>

      <CodeBlock
        code={`# ~/.bashrc or ~/.zshrc

# Quick tracking
alias dps="devpulse track start"
alias dpx="devpulse track stop"
alias dpp="devpulse track status"

# Quick stats
alias dpt="devpulse stats show --today"
alias dpw="devpulse stats show --week"

# Focus mode
alias dpf="devpulse focus start --duration 25"

# Morning routine
morning() {
  devpulse health check
  devpulse stats show --yesterday
  devpulse ai suggest --context "morning"
}

# End of day
eod() {
  devpulse stats report --today
  devpulse track stop
  devpulse sync push
}`}
        language="bash"
        filename="~/.bashrc"
        showLineNumbers
      />

      <h2 id="cron-automation">Cron Job Examples</h2>

      <p>Automate reports and backups:</p>

      <CodeBlock
        code={`# Weekly report every Friday at 5pm
0 17 * * 5 devpulse stats report --week --format html --output ~/reports/week-$(date +%Y%m%d).html

# Daily backup at midnight
0 0 * * * devpulse export --format json --output ~/backups/devpulse-$(date +%Y%m%d).json

# Sync data every 30 minutes
*/30 * * * * devpulse sync push --quiet`}
        language="bash"
        filename="crontab"
      />

      <h2 id="ci-integration">CI/CD Integration</h2>

      <p>Generate commit stats in your pipeline:</p>

      <CodeBlock
        code={`# GitHub Actions example
- name: Generate DevPulse Report
  run: |
    pip install devpulse-cli
    devpulse config set github.token \${{ secrets.GITHUB_TOKEN }}
    devpulse stats report --format json > report.json
    
- name: Upload Report
  uses: actions/upload-artifact@v3
  with:
    name: productivity-report
    path: report.json`}
        language="yaml"
        filename=".github/workflows/stats.yml"
      />

      {/* Navigation */}
      <div className="flex items-center justify-between mt-12 pt-6 border-t border-border not-prose">
        <Button variant="outline" asChild>
          <Link to="/docs/api-reference">
            <ArrowLeft className="h-4 w-4" />
            API Reference
          </Link>
        </Button>
      </div>
    </div>
  );
}

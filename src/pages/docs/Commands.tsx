import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CodeBlock } from "@/components/CodeBlock";
import { Callout } from "@/components/Callout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";

export default function Commands() {
  return (
    <div className="prose-docs max-w-4xl">
      <div className="animate-fade-in">
        <h1>DevPulse CLI Commands</h1>

        <p className="text-lg text-muted-foreground">
          DevPulse organizes its functionality into 17+ command groups with 120+ subcommands for tracking, analytics, automation, and productivity.
        </p>
      </div>

      {/* Quick Start */}
      <div className="animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
        <h2 id="quick-start">Quick Start</h2>

        <h3>Installation</h3>
        <CodeBlock
          code={`pip install devpulse-cli`}
          language="bash"
        />

        <h3>Getting Help</h3>
        <CodeBlock
          code={`devpulse --help              # Show all available commands
devpulse COMMAND --help      # Show help for specific command
devpulse COMMAND SUBCOMMAND --help  # Show help for subcommand`}
          language="bash"
        />
      </div>

      {/* Tabbed Command Groups */}
      <div className="animate-fade-in-up not-prose my-8" style={{ animationDelay: "0.15s" }}>
        <h2 className="text-2xl font-bold mb-6">Command Reference</h2>
        
        <Tabs defaultValue="core" className="w-full">
          <div className="mb-8 relative overflow-x-auto scrollbar-hide">
            <TabsList className="inline-flex w-auto min-w-full justify-start gap-2 bg-transparent p-0">
              <TabsTrigger 
                value="core"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg px-4 py-2 whitespace-nowrap transition-all"
              >
                Core Commands
              </TabsTrigger>
              <TabsTrigger 
                value="github"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg px-4 py-2 whitespace-nowrap transition-all"
              >
                GitHub & Git
              </TabsTrigger>
              <TabsTrigger 
                value="productivity"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg px-4 py-2 whitespace-nowrap transition-all"
              >
                Productivity
              </TabsTrigger>
              <TabsTrigger 
                value="advanced"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg px-4 py-2 whitespace-nowrap transition-all"
              >
                Advanced
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Core Commands Tab */}
          <TabsContent value="core" className="prose-docs">
            <div className="space-y-8">

      {/* Track Commands */}
      <div>
        <h2 id="track-commands">⏱️ Track Command Group</h2>
        <p>Track time and commands</p>

        <h3>track start</h3>
        <CodeBlock
          code={`devpulse track start                   # Start tracking
devpulse track start "task name"       # Start with task name
devpulse track start --tag important   # Add tag`}
          language="bash"
        />

        <h3>track stop / pause / resume</h3>
        <CodeBlock
          code={`devpulse track stop                    # Stop current session
devpulse track pause                   # Pause session
devpulse track resume                  # Resume session`}
          language="bash"
        />

        <h3>track list & edit</h3>
        <CodeBlock
          code={`devpulse track list                    # List all sessions
devpulse track list --limit 10         # Show last 10
devpulse track edit 1 --task "new name"
devpulse track edit 1 --duration 45    # Change duration (minutes)`}
          language="bash"
        />

        <h3>track export</h3>
        <CodeBlock
          code={`devpulse track export                  # Export as CSV
devpulse track export --format json    # Export as JSON
devpulse track export --range 2026-01-01:2026-01-31`}
          language="bash"
        />
      </div>

      {/* Stats Commands */}
      <div>
        <h2 id="stats-commands">📊 Stats Command Group</h2>
        <p>View analytics and statistics</p>

        <h3>stats show</h3>
        <CodeBlock
          code={`devpulse stats show                    # Show today's stats
devpulse stats show --week             # Weekly stats
devpulse stats show --month            # Monthly stats`}
          language="bash"
        />

        <h3>stats report</h3>
        <CodeBlock
          code={`devpulse stats report                  # Console report
devpulse stats report --format json    # JSON format
devpulse stats report --format html    # HTML report`}
          language="bash"
        />

        <h3>stats trends</h3>
        <CodeBlock
          code={`devpulse stats trends                  # Show trends
devpulse stats trends --metric productivity
devpulse stats trends --chart          # Display chart`}
          language="bash"
        />

        <h3>stats compare</h3>
        <CodeBlock
          code={`devpulse stats compare                 # Compare periods
devpulse stats compare --metric productivity`}
          language="bash"
        />

        <h3>stats breakdown</h3>
        <CodeBlock
          code={`devpulse stats breakdown               # Breakdown by project
devpulse stats breakdown --by project
devpulse stats breakdown --top 5       # Top 5 categories`}
          language="bash"
        />

        <h3>stats productivity</h3>
        <CodeBlock
          code={`devpulse stats productivity            # Productivity score
devpulse stats productivity --score    # Show score details
devpulse stats productivity --insights # Get insights`}
          language="bash"
        />

        <h3>stats goals</h3>
        <CodeBlock
          code={`devpulse stats goals                   # List goals
devpulse stats goals --weekly          # Weekly goals
devpulse stats goals set "Goal Name"   # Set new goal`}
          language="bash"
        />
      </div>

      {/* Config Commands */}
      <div>
        <h2 id="config-commands">⚙️ Config Command Group</h2>
        <p>Manage configuration settings</p>

        <CodeBlock
          code={`devpulse config show                   # Show all config
devpulse config show user.name         # Show specific key
devpulse config set theme dark
devpulse config get theme
devpulse config import-config config.json`}
          language="bash"
        />
      </div>

      {/* Export Commands */}
      <div>
        <h2 id="export-commands">📤 Export Command Group</h2>
        <p>Export data in various formats</p>

        <CodeBlock
          code={`devpulse export all                    # Export as CSV
devpulse export all --format json
devpulse export all --range 2026-01-01:2026-01-31
devpulse export sessions
devpulse export projects
devpulse export notes`}
          language="bash"
        />
      </div>
            </div>
          </TabsContent>

          {/* GitHub & Git Tab */}
          <TabsContent value="github" className="prose-docs">
            <div className="space-y-8">

      {/* GitHub Commands */}
      <div>
        <h2 id="github-commands">🔗 GitHub Command Group</h2>
        <p>GitHub integration, analytics, and PR management</p>

        <h3>github stats</h3>
        <CodeBlock
          code={`devpulse github stats --repo owner/name              # Repository statistics
devpulse github stats --username torvalds            # User statistics
devpulse github stats --repo owner/name --json       # JSON output
devpulse github stats --repo owner/name --include health,contributors`}
          language="bash"
        />

        <h3>github activity</h3>
        <CodeBlock
          code={`devpulse github activity username                    # User activity
devpulse github activity username --events push,pr   # Filter events
devpulse github activity username --since 7d         # Last 7 days
devpulse github activity username --json             # JSON format`}
          language="bash"
        />

        <h3>github contributors</h3>
        <CodeBlock
          code={`devpulse github contributors owner/repo              # Top contributors
devpulse github contributors owner/repo --top 5      # Show top 5
devpulse github contributors owner/repo --json       # JSON output`}
          language="bash"
        />

        <h3>github top-languages</h3>
        <CodeBlock
          code={`devpulse github top-languages owner/repo             # Language breakdown
devpulse github top-languages owner/repo --json      # JSON output`}
          language="bash"
        />

        <h3>github prs (List Pull Requests) ✨ NEW</h3>
        <CodeBlock
          code={`devpulse github prs owner/repo                       # List open PRs
devpulse github prs owner/repo --state all           # All PRs (open + closed)
devpulse github prs owner/repo --state closed        # Closed PRs only
devpulse github prs owner/repo --conflicts-only      # Only conflicted PRs
devpulse github prs owner/repo --json                # JSON output
devpulse github prs owner/repo --force-refresh       # Bypass cache`}
          language="bash"
        />

        <h3>github pr view (View Single PR) ✨ NEW</h3>
        <CodeBlock
          code={`devpulse github pr view owner/repo 123               # View PR details
devpulse github pr view owner/repo 123 --json        # JSON output
devpulse github pr view owner/repo 123 --force-refresh`}
          language="bash"
        />

        <h3>github pr merge (Merge Pull Request) ✨ NEW</h3>
        <CodeBlock
          code={`# Preview merge (no token needed if env var set)
devpulse github pr merge owner/repo 123 --dry-run --json

# Squash merge (default strategy)
devpulse github pr merge owner/repo 123 --strategy squash --confirm

# Full merge
devpulse github pr merge owner/repo 123 --strategy merge --confirm

# Rebase merge
devpulse github pr merge owner/repo 123 --strategy rebase --confirm

# Override failing CI checks (conflicts still block)
devpulse github pr merge owner/repo 123 --strategy squash --confirm --force`}
          language="bash"
        />

        <Callout type="info">
          <strong>Merge Safety Features:</strong>
          <ul>
            <li>✅ Conflicts block merge (mergeable_state: dirty)</li>
            <li>✅ Requires <code>--confirm</code> flag (no accidental merges)</li>
            <li>✅ Permission validation (token must have repo scope)</li>
            <li>✅ CI status awareness (<code>--force</code> overrides failures, not conflicts)</li>
            <li>✅ <code>--dry-run</code> shows what would happen without merging</li>
          </ul>
        </Callout>

        <h3>github readme (Generate README) ✨ NEW</h3>
        <CodeBlock
          code={`# Generate and preview README
devpulse github readme --preview

# Generate minimal style
devpulse github readme --template minimal

# Generate standard style (recommended)
devpulse github readme --template standard

# Generate detailed style
devpulse github readme --template detailed

# Custom output file
devpulse github readme --output ./docs/SETUP.md

# Force write without confirmation
devpulse github readme --force`}
          language="bash"
        />

        <Callout type="tip">
          <strong>README Generator Features:</strong>
          <ul>
            <li>Detects languages (Python, JavaScript, TypeScript, Go, Rust, etc.)</li>
            <li>Identifies frameworks and dependencies</li>
            <li>Reads config files (package.json, pyproject.toml, etc.)</li>
            <li>Detects license and repository metadata</li>
            <li>Generates professional, customizable README</li>
          </ul>
        </Callout>

        <h3>github commit (Generate Commit Message) ✨ NEW</h3>
        <CodeBlock
          code={`# Simple feature commit
devpulse github commit --type feat

# Feature with scope
devpulse github commit --type feat --scope auth

# Bug fix
devpulse github commit --type fix --scope api

# Breaking change
devpulse github commit --type feat --scope db --breaking

# Documentation update
devpulse github commit --type docs

# Dry run (preview only)
devpulse github commit --type feat --dry-run

# Force commit without confirmation
devpulse github commit --type feat --force`}
          language="bash"
        />

        <Callout type="info">
          <strong>Valid Commit Types:</strong>
          <ul>
            <li><code>feat</code> - New feature</li>
            <li><code>fix</code> - Bug fix</li>
            <li><code>docs</code> - Documentation</li>
            <li><code>style</code> - Code style changes</li>
            <li><code>refactor</code> - Code refactoring</li>
            <li><code>perf</code> - Performance improvements</li>
            <li><code>test</code> - Test additions</li>
            <li><code>chore</code> - Build, CI, dependencies</li>
            <li><code>ci</code> - CI/CD changes</li>
            <li><code>build</code> - Build system changes</li>
          </ul>
        </Callout>
      </div>

      {/* GitHub Generators Workflow */}
      <div>
        <h2 id="github-workflow">Complete Generator Workflow</h2>
        
        <h3>Step 1: Make Changes</h3>
        <CodeBlock
          code={`# Edit some files...
git add my_changes.py`}
          language="bash"
        />

        <h3>Step 2: Generate Commit Message</h3>
        <CodeBlock
          code={`devpulse github commit generate --type feat --scope core

# The CLI will:
# 1. ✅ Detect your changes
# 2. ✅ Generate a conventional commit message
# 3. ✅ Show you a preview
# 4. ✅ Ask for confirmation`}
          language="bash"
        />

        <h3>Step 3: Generate README (Optional)</h3>
        <CodeBlock
          code={`devpulse github readme --template standard

# The CLI will:
# 1. ✅ Analyze your repository
# 2. ✅ Detect technologies and frameworks
# 3. ✅ Generate a professional README
# 4. ✅ Show you a preview
# 5. ✅ Ask for confirmation before saving`}
          language="bash"
        />
      </div>

      {/* Logs Commands */}
      <div>
        <h2 id="logs-commands">📝 Logs Command Group</h2>
        <p>Analyze and search logs</p>

        <CodeBlock
          code={`devpulse logs analyze [FILE]           # Analyze log file
devpulse logs search "error"           # Search for keyword
devpulse logs filter --level ERROR     # Filter by level
devpulse logs tail --lines 50          # Show last 50 lines
devpulse logs errors                   # Show all errors
devpulse logs stats                    # Log statistics`}
          language="bash"
        />
      </div>

      {/* Secrets Commands */}
      <div>
        <h2 id="secrets-commands">🔐 Secrets Command Group</h2>
        <p>Scan and manage secrets</p>

        <CodeBlock
          code={`devpulse secrets scan                  # Scan current directory
devpulse secrets scan --path /src      # Scan specific path
devpulse secrets list                  # List found secrets
devpulse secrets check [FILE]          # Check specific file
devpulse secrets report                # Generate report
devpulse secrets report --severity high`}
          language="bash"
        />
      </div>

      {/* Sync Commands */}
      <div>
        <h2 id="sync-commands">🔄 Sync Command Group</h2>
        <p>Synchronize data with cloud</p>

        <CodeBlock
          code={`devpulse sync push                     # Push to cloud
devpulse sync pull                     # Pull from cloud
devpulse sync login --email user@example.com
devpulse sync auto enable              # Enable auto-sync
devpulse sync history                  # Show all sync events
devpulse sync conflicts --resolve      # Attempt resolve`}
          language="bash"
        />
      </div>
            </div>
          </TabsContent>

          {/* Productivity Tab */}
          <TabsContent value="productivity" className="prose-docs">
            <div className="space-y-8">

      {/* Timer Commands */}
      <div>
        <h2 id="timer-commands">⏰ Timer Command Group</h2>
        <p>Pomodoro and time management</p>

        <CodeBlock
          code={`devpulse timer start                   # 25-min Pomodoro
devpulse timer start 45                # 45-minute timer
devpulse timer preset pomodoro         # 25 minutes
devpulse timer preset shortbreak       # 5 minutes
devpulse timer status
devpulse timer history`}
          language="bash"
        />
      </div>

      {/* Focus Commands */}
      <div>
        <h2 id="focus-commands">🎯 Focus Command Group</h2>
        <p>Focus sessions and website blocking</p>

        <CodeBlock
          code={`devpulse focus start                   # 60-minute focus
devpulse focus start --duration 90
devpulse focus block twitter           # Block website
devpulse focus unblock twitter
devpulse focus history
devpulse focus stats`}
          language="bash"
        />
      </div>

      {/* Breaks Commands */}
      <div>
        <h2 id="breaks-commands">☕ Breaks Command Group</h2>
        <p>Schedule and track breaks</p>

        <CodeBlock
          code={`devpulse breaks schedule               # Default schedule
devpulse breaks schedule --interval 45 --duration 10
devpulse breaks take
devpulse breaks skip
devpulse breaks history`}
          language="bash"
        />
      </div>

      {/* Notes Commands */}
      <div>
        <h2 id="notes-commands">📝 Notes Command Group</h2>
        <p>Quick note-taking and organization</p>

        <CodeBlock
          code={`devpulse notes add "Remember to review PR"
devpulse notes add "Fix bug" --tag bugs
devpulse notes list
devpulse notes search "meeting"
devpulse notes delete 1
devpulse notes tags`}
          language="bash"
        />
      </div>

      {/* Project Commands */}
      <div>
        <h2 id="project-commands">📦 Project Command Group</h2>
        <p>Project management and organization</p>

        <CodeBlock
          code={`devpulse project create "my-project"   # Create new project
devpulse project list                  # Show all projects
devpulse project switch "my-project"   # Switch to project
devpulse project delete "my-project"
devpulse project archive "my-project"`}
          language="bash"
        />
      </div>

      {/* Habits Commands */}
      <div>
        <h2 id="habits-commands">🔗 Habits Command Group</h2>
        <p>Build and track habits</p>

        <CodeBlock
          code={`devpulse habits create meditate
devpulse habits create exercise --frequency weekly
devpulse habits list
devpulse habits log meditate
devpulse habits streak meditate
devpulse habits progress meditate
devpulse habits stats`}
          language="bash"
        />
      </div>

      {/* Dashboard Commands */}
      <div>
        <h2 id="dashboard-commands">📱 Dashboard Command Group</h2>
        <p>Visualize your productivity data</p>

        <CodeBlock
          code={`devpulse dashboard show                # Show dashboard
devpulse dashboard show --period week
devpulse dashboard quick
devpulse dashboard goals
devpulse dashboard projects
devpulse dashboard stats`}
          language="bash"
        />
      </div>

      {/* Report Commands */}
      <div>
        <h2 id="report-commands">📊 Report Command Group</h2>
        <p>Generate productivity reports</p>

        <CodeBlock
          code={`devpulse report daily                  # Daily report
devpulse report daily --detailed
devpulse report weekly
devpulse report monthly
devpulse report summary
devpulse report insights`}
          language="bash"
        />
      </div>
            </div>
          </TabsContent>

          {/* Advanced Tab */}
          <TabsContent value="advanced" className="prose-docs">
            <div className="space-y-8">

      {/* AI Commands */}
      <div>
        <h2 id="ai-commands">🔍 AI Command Group</h2>
        <p>AI-powered insights and suggestions</p>

        <h3>ai suggest</h3>
        <CodeBlock
          code={`devpulse ai suggest                    # Get AI suggestion
devpulse ai suggest --context "task"   # Suggest with context`}
          language="bash"
        />
        <p>Generates smart suggestions based on your activity patterns.</p>

        <h3>ai analyze</h3>
        <CodeBlock
          code={`devpulse ai analyze [FILE]`}
          language="bash"
        />
        <p>Analyzes logs or code for improvements.</p>

        <h3>ai chat</h3>
        <CodeBlock
          code={`devpulse ai chat                       # Interactive AI chat
devpulse ai chat "your question"       # Ask specific question
devpulse ai chat --interactive         # Start chat session`}
          language="bash"
        />

        <h3>ai recommend</h3>
        <CodeBlock
          code={`devpulse ai recommend                  # Get recommendations
devpulse ai recommend --category "code"`}
          language="bash"
        />

        <h3>ai insights</h3>
        <CodeBlock
          code={`devpulse ai insights                   # Show AI insights
devpulse ai insights --detailed        # Detailed breakdown
devpulse ai insights --export file.json`}
          language="bash"
        />

        <h3>ai predict</h3>
        <CodeBlock
          code={`devpulse ai predict                    # Predict trends (7 days)
devpulse ai predict --days 30          # Predict 30 days ahead`}
          language="bash"
        />

        <h3>ai optimize</h3>
        <CodeBlock
          code={`devpulse ai optimize                   # Get optimization suggestions
devpulse ai optimize --apply           # Apply recommendations`}
          language="bash"
        />
      </div>

      {/* Health Commands */}
      <div>
        <h2 id="health-commands">💊 Health Command Group</h2>
        <p>System health and monitoring</p>

        <CodeBlock
          code={`devpulse health check                  # Check all metrics
devpulse health check --cpu            # CPU only
devpulse health check --memory         # Memory only
devpulse health processes --top 20     # Top 20 processes
devpulse health alert --cpu 80         # Alert if CPU > 80%`}
          language="bash"
        />
      </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Common Patterns */}
      <div className="animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
        <h2 id="common-patterns">Common Patterns</h2>

        <h3>Output Formats</h3>
        <CodeBlock
          code={`devpulse stats report --format json    # JSON output
devpulse stats report --format csv     # CSV output
devpulse stats report --format html    # HTML report
devpulse stats report --format text    # Plain text (default)`}
          language="bash"
        />

        <h3>Date Ranges</h3>
        <CodeBlock
          code={`--from 2026-01-01                      # From date
--to 2026-01-31                        # To date
--range 2026-01-01:2026-01-31          # Range (start:end)`}
          language="bash"
        />

        <h3>Sorting</h3>
        <CodeBlock
          code={`--sort field                           # Sort by field
--sort field:asc                       # Ascending
--sort field:desc                      # Descending`}
          language="bash"
        />

        <h3>Limits & Pagination</h3>
        <CodeBlock
          code={`--limit 10                             # Show 10 items
--skip 5                               # Skip first 5
--top 20                               # Top 20`}
          language="bash"
        />
      </div>

      {/* Workflow Examples */}
      <div className="animate-fade-in-up" style={{ animationDelay: "0.45s" }}>
        <h2 id="examples">Examples</h2>

        <h3>Daily Workflow</h3>
        <CodeBlock
          code={`# Start tracking
devpulse track start "Bug fixing"

# Check progress
devpulse health check
devpulse stats show --week

# Take a break
devpulse breaks take

# Stop work
devpulse track stop

# Daily report
devpulse report daily --detailed`}
          language="bash"
        />

        <h3>Weekly Review</h3>
        <CodeBlock
          code={`# Weekly stats
devpulse stats show --week

# Weekly report
devpulse report weekly

# Productivity insights
devpulse ai insights --detailed

# Check habits
devpulse habits stats`}
          language="bash"
        />

        <h3>Data Export</h3>
        <CodeBlock
          code={`# Export all data for backup
devpulse export all --format json

# Export specific period
devpulse track export --range 2026-01-01:2026-01-31

# Generate HTML report
devpulse stats report --format html --output week-report.html`}
          language="bash"
        />
      </div>

      {/* Tips & Tricks */}
      <div className="animate-fade-in-up" style={{ animationDelay: "0.5s" }}>
        <h2 id="tips">Tips & Tricks</h2>

        <ol>
          <li>
            <strong>Use aliases for frequently used commands:</strong>
            <CodeBlock
              code={`alias dpt='devpulse track'
alias dps='devpulse stats'`}
              language="bash"
            />
          </li>
          <li>
            <strong>Pipe to other tools:</strong>
            <CodeBlock
              code={`devpulse track export --format json | jq '.sessions | length'`}
              language="bash"
            />
          </li>
          <li>
            <strong>Schedule regular reports:</strong>
            <CodeBlock
              code={`# In crontab: Generate daily report at 6 PM
0 18 * * * devpulse report daily --output ~/reports/daily.html`}
              language="bash"
            />
          </li>
          <li><strong>Use --help liberally:</strong> <code>devpulse COMMAND --help</code></li>
        </ol>
      </div>

      {/* Troubleshooting */}
      <div className="animate-fade-in-up" style={{ animationDelay: "0.55s" }}>
        <h2 id="troubleshooting">Troubleshooting</h2>

        <h3>Command not found</h3>
        <CodeBlock
          code={`# Ensure installation
pip install devpulse-cli

# Add to PATH if needed
export PATH=$PATH:~/.local/bin`}
          language="bash"
        />

        <h3>Permission denied</h3>
        <CodeBlock
          code={`# Use with Python directly
python -m devpulse COMMAND`}
          language="bash"
        />

        <h3>Help not showing options</h3>
        <CodeBlock
          code={`# Update to latest version
pip install --upgrade devpulse-cli`}
          language="bash"
        />
      </div>

      <Callout type="tip">
        For more help, run: <code>devpulse --help</code>
      </Callout>

      {/* Navigation */}
      <div className="flex items-center justify-between mt-12 pt-6 border-t border-border not-prose animate-fade-in">
        <Button variant="outline" asChild className="text-foreground">
          <Link to="/docs/quick-start">
            <ArrowLeft className="h-4 w-4" />
            Quick Start
          </Link>
        </Button>
        <Button asChild className="text-foreground">
          <Link to="/docs/api-reference">
            API Reference
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  );
}

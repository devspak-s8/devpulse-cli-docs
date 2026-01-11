import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, Shield, GitBranch, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CodeBlock } from "@/components/CodeBlock";
import { Callout } from "@/components/Callout";

export default function GitHubIntegration() {
  return (
    <div className="prose-docs max-w-4xl">
      <div className="animate-fade-in">
        <h1>GitHub Integration & PR Management</h1>

        <p className="text-lg text-muted-foreground">
          Complete guide to DevPulse GitHub integration, analytics, and pull request management.
        </p>
      </div>

      {/* Repository Statistics */}
      <div className="animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
        <h2 id="repository-stats">Repository Statistics</h2>

        <CodeBlock
          code={`# Get repository stats
devpulse github stats --repo torvalds/linux

# Include health score and contributors
devpulse github stats --repo microsoft/vscode --include health,contributors

# JSON output
devpulse github stats --repo nodejs/node --json`}
          language="bash"
        />
      </div>

      {/* User Activity */}
      <div className="animate-fade-in-up" style={{ animationDelay: "0.15s" }}>
        <h2 id="user-activity">User Activity Tracking</h2>

        <CodeBlock
          code={`# Get user public events
devpulse github activity torvalds

# Filter by event type
devpulse github activity torvalds --events push,pr,issues

# Time window
devpulse github activity torvalds --since 7d     # Last 7 days
devpulse github activity torvalds --since 30d    # Last 30 days

# JSON output with debug info
devpulse github activity torvalds --json --debug`}
          language="bash"
        />
      </div>

      {/* Language Analysis */}
      <div className="animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
        <h2 id="language-analysis">Language Analysis</h2>

        <CodeBlock
          code={`# Language distribution
devpulse github top-languages owner/repo

# JSON output
devpulse github top-languages owner/repo --json`}
          language="bash"
        />
      </div>

      {/* Contributors */}
      <div className="animate-fade-in-up" style={{ animationDelay: "0.25s" }}>
        <h2 id="contributors">Contributor Analysis</h2>

        <CodeBlock
          code={`# List top contributors
devpulse github contributors owner/repo

# Top 5 contributors
devpulse github contributors owner/repo --top 5

# JSON output
devpulse github contributors owner/repo --json`}
          language="bash"
        />
      </div>

      {/* PR Management */}
      <div className="animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
        <h2 id="pr-management">✨ Pull Request Management</h2>

        <h3>List Pull Requests</h3>
        <CodeBlock
          code={`# List open PRs
devpulse github prs owner/repo

# List all PRs (open + closed)
devpulse github prs owner/repo --state all

# Show only PRs with conflicts
devpulse github prs owner/repo --conflicts-only

# JSON output with debug info
devpulse github prs owner/repo --json --debug

# Bypass cache
devpulse github prs owner/repo --force-refresh`}
          language="bash"
        />

        <h3>View Single PR</h3>
        <CodeBlock
          code={`# View PR details
devpulse github pr view owner/repo 123

# JSON format
devpulse github pr view owner/repo 123 --json

# With debug info
devpulse github pr view owner/repo 123 --debug

# Fresh data (no cache)
devpulse github pr view owner/repo 123 --force-refresh`}
          language="bash"
        />

        <h3>Merge Pull Request</h3>
        <CodeBlock
          code={`# Dry-run (preview only)
devpulse github pr merge owner/repo 123 --dry-run --json

# Squash merge (default)
devpulse github pr merge owner/repo 123 --strategy squash --confirm

# Full merge (preserve commits)
devpulse github pr merge owner/repo 123 --strategy merge --confirm

# Rebase merge
devpulse github pr merge owner/repo 123 --strategy rebase --confirm

# Override failing CI (conflicts still block)
devpulse github pr merge owner/repo 123 --confirm --force`}
          language="bash"
        />

        <Callout type="info">
          <strong>Merge Safety Features:</strong>
          <ul>
            <li>✅ Conflicts block merge (mergeable_state: dirty)</li>
            <li>✅ Requires <code>--confirm</code> flag</li>
            <li>✅ Permission validation (token with repo scope)</li>
            <li>✅ CI status awareness (<code>--force</code> overrides failures only)</li>
            <li>✅ <code>--dry-run</code> previews without executing</li>
          </ul>
        </Callout>
      </div>

      {/* Authentication */}
      <div className="animate-fade-in-up" style={{ animationDelay: "0.35s" }}>
        <h2 id="authentication">Authentication & Security</h2>

        <h3>GitHub Token Setup</h3>

        <h4>Option 1: Environment Variable</h4>
        <CodeBlock
          code={`# Set in shell
export GITHUB_TOKEN="ghp_your_token_here"

# Or in .env file
echo "GITHUB_TOKEN=ghp_your_token_here" >> .env`}
          language="bash"
        />

        <h4>Option 2: Interactive Prompt</h4>
        <p>When running merge operations without GITHUB_TOKEN:</p>
        <CodeBlock
          code={`devpulse github pr merge owner/repo 123 --confirm

# 🔐 Authentication required for this operation.
# A GitHub token with 'repo' scope is needed.
# Create one at: https://github.com/settings/tokens
#
# Enter GITHUB_TOKEN with repo scope: ••••••••••••••••••
# ✓ Token set.`}
          language="bash"
        />

        <h3>Token Requirements</h3>

        <h4>For Merge Operations</h4>
        <ul>
          <li>Scope: <code>repo</code> (Full control of private repositories)</li>
          <li>Permissions: <code>push</code> and <code>pull_requests</code></li>
        </ul>

        <h4>For Read-Only Operations</h4>
        <ul>
          <li>No token required for public repos</li>
          <li>Token recommended for higher rate limits (5000/hour vs 60/hour)</li>
        </ul>

        <h3>Token Creation</h3>
        <ol>
          <li>Visit: <a href="https://github.com/settings/tokens/new" target="_blank" rel="noopener noreferrer">https://github.com/settings/tokens/new</a></li>
          <li>Select scope: <code>repo</code> (Full control of private repositories)</li>
          <li>Generate token</li>
          <li>Save securely (never commit to git)</li>
        </ol>
      </div>

      {/* Error Handling */}
      <div className="animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
        <h2 id="error-handling">Error Handling & Validation</h2>

        <h3>Repository Format</h3>
        <CodeBlock
          code={`# ✓ Valid
devpulse github prs owner/repo

# ✗ Invalid
devpulse github prs owner         # Missing repo name
devpulse github prs ownerrepo     # Missing separator

# Error:
# ❌ Repository must be in 'owner/name' format.`}
          language="bash"
        />

        <h3>Merge Conflicts</h3>
        <Callout type="warning">
          <strong>Merge Blocked:</strong> PR has merge conflicts. Resolve conflicts in the branch and try again.
        </Callout>

        <h3>Rate Limiting</h3>
        <p><strong>Unauthenticated:</strong> 60 requests/hour</p>
        <p><strong>Authenticated:</strong> 5000 requests/hour</p>

        <CodeBlock
          code={`# Solution: Set GitHub token
export GITHUB_TOKEN="your_token_here"
devpulse github prs owner/repo`}
          language="bash"
        />

        <h3>Common Errors</h3>

        <h4>Repository Not Found</h4>
        <CodeBlock
          code={`❌ Repository not found: owner/repo
Please check the owner and repository name.`}
          language="text"
        />

        <h4>Insufficient Permissions</h4>
        <CodeBlock
          code={`❌ Insufficient permissions to merge PR.
Ensure your token has repo scope and push access.`}
          language="text"
        />

        <h4>Authentication Required</h4>
        <CodeBlock
          code={`❌ Authentication required.
Set GITHUB_TOKEN with repo scope to merge pull requests.`}
          language="text"
        />
      </div>

      {/* Workflows */}
      <div className="animate-fade-in-up" style={{ animationDelay: "0.45s" }}>
        <h2 id="workflows">Workflow Examples</h2>

        <h3>Review and Merge a PR</h3>
        <CodeBlock
          code={`# 1. List open PRs
devpulse github prs owner/repo

# 2. View PR details
devpulse github pr view owner/repo 42

# 3. Check conflicts
# If mergeable_state is "dirty", conflict exists

# 4. Dry-run merge
devpulse github pr merge owner/repo 42 --dry-run --json

# 5. Merge PR (if safe)
devpulse github pr merge owner/repo 42 --strategy squash --confirm`}
          language="bash"
        />

        <h3>Find and Handle Conflicted PRs</h3>
        <CodeBlock
          code={`# List only PRs with conflicts
devpulse github prs owner/repo --conflicts-only

# View specific conflicted PR
devpulse github pr view owner/repo 99

# Attempt merge (will fail safely if conflicts exist)
devpulse github pr merge owner/repo 99 --confirm`}
          language="bash"
        />

        <h3>Bulk Analysis with JSON</h3>
        <CodeBlock
          code={`# Get all PR data as JSON
devpulse github prs owner/repo --state all --json > prs.json

# Parse with jq
cat prs.json | jq '.pull_requests | length'  # Total PRs
cat prs.json | jq '.pull_requests[] | select(.mergeable_state=="dirty")'  # Conflicted`}
          language="bash"
        />

        <h3>Monitor CI Status</h3>
        <CodeBlock
          code={`# Check PRs with failing CI
devpulse github prs owner/repo --json | jq '.pull_requests[] | select(.ci_status=="failure")'

# View specific PR's CI status
devpulse github pr view owner/repo 123 --json | jq '.ci_status'`}
          language="bash"
        />
      </div>

      {/* Troubleshooting */}
      <div className="animate-fade-in-up" style={{ animationDelay: "0.5s" }}>
        <h2 id="troubleshooting">Troubleshooting</h2>

        <h3>"Token cannot be empty"</h3>
        <p><strong>Issue:</strong> Pressing Enter without inputting token when prompted.</p>
        <p><strong>Solution:</strong> Paste your token when prompted (input is hidden).</p>

        <h3>"Authentication required"</h3>
        <p><strong>Issue:</strong> Merge attempted without token.</p>
        <CodeBlock
          code={`export GITHUB_TOKEN="your_token_here"
devpulse github pr merge owner/repo 123 --confirm`}
          language="bash"
        />

        <h3>"Repository not found"</h3>
        <p><strong>Issue:</strong> Typo in repository name.</p>
        <p><strong>Solution:</strong> Verify repo exists and spelling is correct.</p>

        <h3>"Merge requires --confirm flag"</h3>
        <p><strong>Solution:</strong> Add the <code>--confirm</code> flag to authorize merge:</p>
        <CodeBlock
          code={`devpulse github pr merge owner/repo 123 --strategy squash --confirm`}
          language="bash"
        />

        <h3>"PR has merge conflicts"</h3>
        <p><strong>Solution:</strong></p>
        <ol>
          <li>Resolve conflicts in branch</li>
          <li>Push updates</li>
          <li>Try merge again</li>
        </ol>

        <h3>"Rate limit exceeded"</h3>
        <p><strong>Solution:</strong> Set GitHub token for higher limits (60→5000 requests/hour).</p>
        <CodeBlock
          code={`export GITHUB_TOKEN="your_token_here"`}
          language="bash"
        />
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between mt-12 pt-6 border-t border-border not-prose animate-fade-in">
        <Button variant="outline" asChild className="text-foreground">
          <Link to="/docs/commands">
            <ArrowLeft className="h-4 w-4" />
            Commands
          </Link>
        </Button>
        <Button asChild className="text-foreground">
          <Link to="/docs/error-handling">
            Error Handling
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  );
}

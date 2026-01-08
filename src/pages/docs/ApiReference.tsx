import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, ChevronDown, ExternalLink, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CodeBlock } from "@/components/CodeBlock";
import { Callout } from "@/components/Callout";
import { cn } from "@/lib/utils";

const endpoints = [
  {
    method: "GET",
    path: "/github-stats",
    description: "Get GitHub repository or user statistics",
    params: [
      { name: "username", type: "string", required: false, desc: "GitHub username (mutually exclusive with repo)" },
      { name: "repo", type: "string", required: false, desc: "Repository in owner/name format" },
      { name: "include_health", type: "bool", default: "true", desc: "Include health score" },
      { name: "include_contributors", type: "bool", default: "true", desc: "Include contributor data" },
      { name: "include_activity", type: "bool", default: "true", desc: "Include activity metrics" },
      { name: "top_repos_for_user", type: "int", default: "3", desc: "Number of top repos to return for user queries" },
    ],
  },
];

const codeExamples = {
  curl: `curl -fS "http://localhost:8000/github-stats?repo=owner/name"`,
  javascript: `const url = "http://localhost:8000/github-stats?repo=owner/name";

async function run() {
  const res = await fetch(url);
  if (res.status === 429) {
    console.error("Rate limited. Try again later.");
    return;
  }
  if (!res.ok) {
    console.error("Error:", res.status, await res.text());
    return;
  }
  const data = await res.json();
  console.log("Health:", data.stats?.health_score);
}
run();`,
  python: `import requests

resp = requests.get(
    "http://localhost:8000/github-stats",
    params={"repo": "owner/name"}
)
if resp.status_code == 429:
    print("Rate limited. Try again later.")
elif not resp.ok:
    print("Error:", resp.status_code, resp.text)
else:
    data = resp.json()
    print("Health:", data.get("stats", {}).get("health_score"))`,
  go: `package main

import (
  "encoding/json"
  "fmt"
  "io"
  "net/http"
)

func main() {
  resp, err := http.Get("http://localhost:8000/github-stats?repo=owner/name")
  if err != nil { panic(err) }
  defer resp.Body.Close()
  if resp.StatusCode == 429 {
    fmt.Println("Rate limited. Try again later.")
    return
  }
  var data map[string]any
  json.NewDecoder(resp.Body).Decode(&data)
  stats := data["stats"].(map[string]any)
  fmt.Println("Health:", stats["health_score"])
}`,
  java: `import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

public class Main {
  public static void main(String[] args) throws Exception {
    var client = HttpClient.newHttpClient();
    var req = HttpRequest.newBuilder(
      URI.create("http://localhost:8000/github-stats?repo=owner/name")
    ).GET().build();
    var res = client.send(req, HttpResponse.BodyHandlers.ofString());
    if (res.statusCode() == 429) {
      System.err.println("Rate limited. Try again later.");
      return;
    }
    System.out.println(res.body());
  }
}`,
  rust: `use reqwest::blocking::get;
use std::error::Error;

fn main() -> Result<(), Box<dyn Error>> {
    let resp = get("http://localhost:8000/github-stats?repo=owner/name")?;
    if resp.status() == reqwest::StatusCode::TOO_MANY_REQUESTS {
        eprintln!("Rate limited. Try again later.");
        return Ok(());
    }
    println!("{}", resp.text()?);
    Ok(())
}`,
};

const responseExample = `{
  "target": { "type": "repo", "owner": "owner", "name": "name" },
  "stats": {
    "repository": {
      "full_name": "owner/name",
      "name": "name",
      "owner": "owner",
      "stars": 1234,
      "forks": 56,
      "open_issues": 7,
      "size_kb": 8901,
      "default_branch": "main",
      "created_at": "2021-01-01T00:00:00Z",
      "updated_at": "2026-01-01T00:00:00Z",
      "last_commit_date": "2026-01-01T00:00:00Z",
      "license": "MIT",
      "is_stale": false,
      "watchers": 1234,
      "description": "Project description"
    },
    "languages": { "Python": 92.13, "Shell": 7.87 },
    "activity": {
      "commits_last_7_days": 5,
      "commits_last_30_days": 17,
      "active": true
    },
    "issues": {
      "open_issues": 7,
      "closed_issues": 140,
      "oldest_open_issue_date": "2025-12-15T12:34:56Z",
      "last_closed_issue_date": "2026-01-06T09:10:11Z",
      "avg_open_issue_age_days": 24
    },
    "pull_requests": {
      "open_pull_requests": 4,
      "merged_pull_requests": 320,
      "avg_merge_time_hours": 12.75
    },
    "contributors": {
      "total_contributors": 25,
      "total_commits": 4200,
      "top_contributors": [
        { "login": "alice", "contributions": 1200, "percentage": 28.57 },
        { "login": "bob", "contributions": 900, "percentage": 21.43 }
      ]
    },
    "license": "MIT",
    "health_score": 86
  }
}`;

const errorCodes = [
  { code: "400", name: "Bad Request", description: "Missing or conflicting parameters (provide either username or repo, not both)" },
  { code: "429", name: "Too Many Requests", description: "Per-IP rate limit exceeded (8 req/hour for local API)" },
  { code: "502", name: "Bad Gateway", description: "Upstream/network/GitHub error" },
];

const fieldExplanations = [
  { field: "repository.full_name", desc: "owner/repo format" },
  { field: "repository.stars/forks/watchers", desc: "Standard GitHub counters" },
  { field: "repository.open_issues", desc: "Includes PRs (GitHub semantics)" },
  { field: "repository.size_kb", desc: "Repository size in kilobytes" },
  { field: "repository.is_stale", desc: "True when no push in the last 180 days" },
  { field: "languages", desc: "Percentage share per language (0–100, two decimals)" },
  { field: "activity.commits_last_7_days/30_days", desc: "Recent commit counts (approximate)" },
  { field: "activity.active", desc: "True if 30-day commits > 0" },
  { field: "issues.avg_open_issue_age_days", desc: "Days since the oldest open issue" },
  { field: "pull_requests.avg_merge_time_hours", desc: "Average time to merge across recent closed PRs" },
  { field: "contributors.top_contributors", desc: "Top N by commits with percentage of total" },
  { field: "health_score", desc: "0–100 composite score based on stars, forks, contributors, recent commits, issue closure ratio, merged PRs, staleness" },
];

type LanguageKey = keyof typeof codeExamples;

interface CollapsibleSectionProps {
  title: string;
  id: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

function CollapsibleSection({ title, id, children, defaultOpen = false }: CollapsibleSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border border-border rounded-lg overflow-hidden mb-4 animate-fade-in">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 bg-muted/30 hover:bg-muted/50 transition-colors text-left"
      >
        <h3 className="font-semibold" id={id}>{title}</h3>
        <ChevronDown className={cn("h-5 w-5 transition-transform duration-200", isOpen && "rotate-180")} />
      </button>
      <div className={cn(
        "overflow-hidden transition-all duration-300 ease-in-out",
        isOpen ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
      )}>
        <div className="p-4 border-t border-border">
          {children}
        </div>
      </div>
    </div>
  );
}

export default function ApiReference() {
  const [activeTab, setActiveTab] = useState<LanguageKey>("curl");

  return (
    <div className="prose-docs max-w-4xl">
      {/* Header with animation */}
      <div className="animate-fade-in">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
          <span className="px-2 py-0.5 rounded-full bg-tip/10 text-tip font-medium">v0.1.3</span>
        </div>
        <h1>API Reference</h1>

        <p className="text-lg text-muted-foreground">
          DevPulse provides a REST API for programmatic access to GitHub analytics,
          repository insights, and productivity data. The API runs locally via FastAPI.
        </p>
      </div>

      <Callout type="info" title="Production Status">
        The GitHub analytics API is fully implemented. The API uses an in-memory rate limiter
        and no authentication — treat it as a local/development server unless hardened.
      </Callout>

      {/* Quick Start */}
      <div className="animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
        <h2 id="quick-start">Quick Start</h2>
        
        <p>Start the API server locally:</p>

        <CodeBlock
          code={`uvicorn devpulse.api:app --host 0.0.0.0 --port 8000 --reload`}
          language="bash"
        />

        <p>Test with a simple request:</p>

        <CodeBlock
          code={`curl "http://localhost:8000/github-stats?repo=owner/name"`}
          language="bash"
        />
      </div>

      {/* Base URL */}
      <div className="animate-fade-in-up" style={{ animationDelay: "0.15s" }}>
        <h2 id="base-url">Base URL</h2>

        <CodeBlock
          code="http://localhost:8000"
          language="plaintext"
        />
      </div>

      {/* Endpoints */}
      <div className="animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
        <h2 id="endpoints">Endpoints</h2>

        {endpoints.map((endpoint) => (
          <div key={endpoint.path} className="border border-border rounded-lg overflow-hidden mb-6">
            <div className="flex items-center gap-3 p-4 bg-muted/30 border-b border-border">
              <span className="inline-flex px-2 py-1 rounded text-xs font-mono font-bold bg-tip/10 text-tip">
                {endpoint.method}
              </span>
              <code className="text-sm font-mono">{endpoint.path}</code>
            </div>
            <div className="p-4">
              <p className="text-muted-foreground mb-4">{endpoint.description}</p>
              
              <h4 className="font-medium mb-3">Query Parameters</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left p-2 font-medium">Parameter</th>
                      <th className="text-left p-2 font-medium">Type</th>
                      <th className="text-left p-2 font-medium">Default</th>
                      <th className="text-left p-2 font-medium">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {endpoint.params.map((param) => (
                      <tr key={param.name} className="border-b border-border/50">
                        <td className="p-2 font-mono text-primary">{param.name}</td>
                        <td className="p-2 text-muted-foreground">{param.type}</td>
                        <td className="p-2 text-muted-foreground">{param.default || "—"}</td>
                        <td className="p-2">{param.desc}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Language Examples */}
      <div className="animate-fade-in-up" style={{ animationDelay: "0.25s" }}>
        <h2 id="language-examples">Language Examples</h2>

        <p>All examples call the local API and handle HTTP 429 (rate-limited) gracefully.</p>

        <div className="not-prose mb-4">
          <div className="flex gap-1 border-b border-border overflow-x-auto">
            {(Object.keys(codeExamples) as LanguageKey[]).map((lang) => (
              <button
                key={lang}
                onClick={() => setActiveTab(lang)}
                className={cn(
                  "px-4 py-2 text-sm font-medium border-b-2 -mb-px transition-all duration-200 whitespace-nowrap",
                  activeTab === lang
                    ? "border-primary text-foreground"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                )}
              >
                {lang === "curl" ? "cURL" : lang === "javascript" ? "JavaScript" : lang.charAt(0).toUpperCase() + lang.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="transition-all duration-200">
          <CodeBlock
            code={codeExamples[activeTab]}
            language={activeTab === "curl" ? "bash" : activeTab === "javascript" ? "javascript" : activeTab}
            showLineNumbers
          />
        </div>
      </div>

      {/* Response Format */}
      <div className="animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
        <h2 id="response-format">Response Format</h2>

        <p>Successful responses return JSON with the following structure:</p>

        <ul className="mb-4">
          <li>For <code>repo</code>: <code>{`{ target: {type:"repo", owner, name}, stats: {...} }`}</code></li>
          <li>For <code>username</code>: <code>{`{ target: {type:"user", username}, repos: [...] }`}</code></li>
        </ul>

        <CollapsibleSection title="Full Response Example" id="response-example" defaultOpen>
          <CodeBlock
            code={responseExample}
            language="json"
            showLineNumbers
          />
        </CollapsibleSection>

        <CollapsibleSection title="Field Explanations" id="field-explanations">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-2 font-medium">Field</th>
                  <th className="text-left p-2 font-medium">Description</th>
                </tr>
              </thead>
              <tbody>
                {fieldExplanations.map((field) => (
                  <tr key={field.field} className="border-b border-border/50">
                    <td className="p-2 font-mono text-primary text-xs">{field.field}</td>
                    <td className="p-2 text-muted-foreground">{field.desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CollapsibleSection>
      </div>

      {/* Error Responses */}
      <div className="animate-fade-in-up" style={{ animationDelay: "0.35s" }}>
        <h2 id="error-responses">Error Responses</h2>

        <div className="not-prose">
          <div className="rounded-lg border border-border overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-muted/50">
                  <th className="text-left p-3 font-medium text-sm w-20">Code</th>
                  <th className="text-left p-3 font-medium text-sm w-40">Name</th>
                  <th className="text-left p-3 font-medium text-sm">Description</th>
                </tr>
              </thead>
              <tbody>
                {errorCodes.map((error) => (
                  <tr key={error.code} className="border-t border-border">
                    <td className="p-3 font-mono text-sm">{error.code}</td>
                    <td className="p-3 text-sm font-medium">{error.name}</td>
                    <td className="p-3 text-sm text-muted-foreground">{error.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Rate Limiting */}
      <div className="animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
        <h2 id="rate-limiting">Rate Limiting & Caching</h2>

        <h3>API Rate Limits</h3>
        <ul>
          <li><strong>In-memory limiter:</strong> 8 requests per IP per hour</li>
          <li>No authentication required; intended for local use</li>
        </ul>

        <h3>GitHub API Limits</h3>
        <ul>
          <li><strong>Unauthenticated:</strong> ~60 requests/hour</li>
          <li><strong>With <code>GITHUB_TOKEN</code>:</strong> ~5,000 requests/hour</li>
        </ul>

        <Callout type="warning" title="Stale Cache Fallback">
          On HTTP 403 from GitHub due to rate limits, DevPulse attempts to return the most recent
          cached response. If none exists, it fails fast with a clear message.
        </Callout>

        <h3>Cache Configuration</h3>
        <ul>
          <li><strong>Cache location:</strong> <code>~/.devpulse/cache/github/</code></li>
          <li><strong>Cache TTL:</strong> 10 minutes</li>
        </ul>

        <h3>Best Practices</h3>
        <ul>
          <li>Set <code>GITHUB_TOKEN</code> in production</li>
          <li>Prefer cached results for dashboards that refresh frequently</li>
          <li>Increase cache TTL or add server-side cache (e.g., Redis) for multi-user APIs</li>
          <li>Limit per-request scope (e.g., fetch one repo at a time) for predictable budgets</li>
        </ul>
      </div>

      {/* Authentication */}
      <div className="animate-fade-in-up" style={{ animationDelay: "0.45s" }}>
        <h2 id="authentication">Authentication</h2>

        <p>The API uses the server's environment (<code>GITHUB_TOKEN</code>) if set, increasing upstream limits to ~5,000 req/hour.</p>

        <CodeBlock
          code={`# Windows (PowerShell)
$env:GITHUB_TOKEN = "<your-token>"

# macOS/Linux
export GITHUB_TOKEN="<your-token>"`}
          language="bash"
        />

        <Callout type="tip" title="Token Security">
          Use a fine-scoped PAT; store it in your process environment or a secret manager.
          Do not commit it to source control.
        </Callout>
      </div>

      {/* Production Notes */}
      <div className="animate-fade-in-up" style={{ animationDelay: "0.5s" }}>
        <h2 id="production-notes">Production Readiness</h2>

        <div className="grid md:grid-cols-2 gap-4 not-prose mb-6">
          <div className="p-4 rounded-lg border border-tip/30 bg-tip/5">
            <h4 className="font-semibold text-tip mb-2">✓ Production-Ready</h4>
            <ul className="text-sm space-y-1 text-muted-foreground">
              <li>• GitHub analytics (CLI and service)</li>
              <li>• Caching layer with stale-on-rate-limit</li>
              <li>• FastAPI endpoint /github-stats</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg border border-warning/30 bg-warning/5">
            <h4 className="font-semibold text-warning mb-2">⚠ Demo/Stub Only</h4>
            <ul className="text-sm space-y-1 text-muted-foreground">
              <li>• Non-GitHub command groups</li>
              <li>• focus, secrets, logs, timer, etc.</li>
              <li>• API authentication</li>
            </ul>
          </div>
        </div>

        <h3>Scaling Recommendations</h3>
        <ul>
          <li>Replace file-system cache with Redis or a database</li>
          <li>Add background jobs for prewarming caches</li>
          <li>Introduce API keys and per-key quotas</li>
          <li>Add structured logging/metrics and request tracing</li>
          <li>Run behind a reverse proxy with TLS termination</li>
        </ul>
      </div>

      {/* CLI Reference */}
      <div className="animate-fade-in-up" style={{ animationDelay: "0.55s" }}>
        <h2 id="cli-reference">CLI Quick Reference</h2>

        <p>The CLI provides the same functionality with additional convenience options:</p>

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
devpulse github top-languages owner/name --json

# Contributors
devpulse github contributors owner/name --top 10

# Issues metrics
devpulse github issues owner/name --json

# Activity summary
devpulse github activity octocat --json`}
          language="bash"
          showLineNumbers
        />
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between mt-12 pt-6 border-t border-border not-prose animate-fade-in">
        <Button variant="outline" asChild>
          <Link to="/docs/commands">
            <ArrowLeft className="h-4 w-4" />
            Commands
          </Link>
        </Button>
        <Button asChild>
          <Link to="/docs/error-handling">
            Error Handling
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  );
}

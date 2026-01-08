import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CodeBlock } from "@/components/CodeBlock";
import { Callout } from "@/components/Callout";
import { cn } from "@/lib/utils";

const errorCodes = [
  {
    code: "400",
    name: "Bad Request",
    description: "Missing or conflicting parameters (provide either username or repo, not both)",
  },
  {
    code: "403",
    name: "Forbidden",
    description: "GitHub API rate limit exceeded",
  },
  {
    code: "429",
    name: "Too Many Requests",
    description: "Per-IP rate limit exceeded on local API (8 req/hour)",
  },
  {
    code: "502",
    name: "Bad Gateway",
    description: "Upstream/network/GitHub error",
  },
];

const commonErrors = [
  {
    symptom: 'CLI shows "GitHub API rate limit exceeded. Reset in ~N minute(s)."',
    fix: "Set GITHUB_TOKEN; reduce --force-refresh usage; allow cache to serve interim responses",
  },
  {
    symptom: "You hit limits faster on busy dashboards",
    fix: "Export/set GITHUB_TOKEN to increase limit from 60 to 5,000 req/hour",
  },
  {
    symptom: "RequestException or HTTP 502 from the API",
    fix: "Retry; rely on stale cache; verify outbound connectivity and proxies",
  },
  {
    symptom: 'Data appears "stale" shortly after a change',
    fix: "Use --force-refresh for a one-off bypass; cache TTL is 10 minutes",
  },
  {
    symptom: "400 error from API",
    fix: "Provide either username or repo parameter, not both or neither",
  },
];

const retryExample = `import time
import requests

def make_request_with_retry(url, headers, max_retries=3):
    for attempt in range(max_retries):
        response = requests.get(url, headers=headers)
        
        if response.status_code == 429:
            retry_after = response.json().get('error', {}).get('retry_after', 60)
            print(f"Rate limited. Waiting {retry_after}s...")
            time.sleep(retry_after)
            continue
            
        return response
    
    raise Exception("Max retries exceeded")`;

export default function ErrorHandling() {
  return (
    <div className="prose-docs max-w-3xl">
      <div className="animate-fade-in">
        <h1>Error Handling & Troubleshooting</h1>

        <p className="text-lg text-muted-foreground">
          Learn how to handle errors and rate limits gracefully when using the
          DevPulse CLI and API.
        </p>
      </div>

      <div className="animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
        <h2 id="error-codes">HTTP Status Codes</h2>

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
                    <td className="p-3 text-sm text-muted-foreground">
                      {error.description}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="animate-fade-in-up" style={{ animationDelay: "0.15s" }}>
        <h2 id="rate-limits">Rate Limits</h2>

        <h3>GitHub API Limits</h3>
        <ul>
          <li><strong>Unauthenticated:</strong> ~60 requests/hour</li>
          <li><strong>With <code>GITHUB_TOKEN</code>:</strong> ~5,000 requests/hour</li>
        </ul>

        <h3>Local API Limits</h3>
        <ul>
          <li><strong>In-memory limiter:</strong> 8 requests per IP per hour</li>
          <li>No authentication required; intended for local use</li>
        </ul>

        <h3>Detection</h3>
        <p>
          DevPulse inspects <code>X-RateLimit-Remaining</code> and <code>X-RateLimit-Reset</code>{" "}
          response headers when present and raises a rate-limit condition when appropriate.
        </p>
      </div>

      <Callout type="warning" title="Stale Cache Fallback">
        On HTTP 403 from GitHub due to rate limits, DevPulse attempts to return the most recent
        cached response. If none exists, it fails fast with a clear message and guidance.
      </Callout>

      <div className="animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
        <h2 id="common-errors">Common Errors & Fixes</h2>

        <div className="not-prose space-y-4">
          {commonErrors.map((error, i) => (
            <div 
              key={i} 
              className="p-4 rounded-lg border border-border bg-card animate-fade-in-up"
              style={{ animationDelay: `${0.25 + i * 0.05}s` }}
            >
              <p className="font-mono text-sm text-danger mb-2">{error.symptom}</p>
              <p className="text-sm text-muted-foreground">
                <strong className="text-tip">Fix:</strong> {error.fix}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
        <h2 id="best-practices">Best Practices</h2>

        <h3>1. Set a GitHub Token</h3>
        <p>
          Always set <code>GITHUB_TOKEN</code> in production for predictable rate limits:
        </p>

        <CodeBlock
          code={`# macOS/Linux
export GITHUB_TOKEN="ghp_your_token_here"

# Windows PowerShell
$env:GITHUB_TOKEN = "ghp_your_token_here"`}
          language="bash"
        />

        <h3>2. Implement Exponential Backoff</h3>

        <p>
          When encountering rate limits or transient errors, use exponential backoff
          with jitter:
        </p>

        <CodeBlock
          code={retryExample}
          language="python"
          filename="retry_example.py"
          showLineNumbers
        />

        <h3>3. Use the Cache</h3>

        <p>
          DevPulse CLI includes built-in caching. Use it to reduce API calls:
        </p>

        <CodeBlock
          code={`# Cache is enabled by default
# Cache location: ~/.devpulse/cache/github/
# Cache TTL: 10 minutes

# Force refresh when needed (use sparingly)
devpulse github stats --repo owner/name --force-refresh`}
          language="bash"
        />

        <h3>4. Prefer Cached Results</h3>
        <ul>
          <li>Prefer cached results for dashboards that refresh frequently</li>
          <li>Increase cache TTL or add a server-side cache (e.g., Redis) for multi-user APIs</li>
          <li>Limit per-request scope (e.g., fetch one repo at a time) for predictable budgets</li>
        </ul>
      </div>

      <div className="animate-fade-in-up" style={{ animationDelay: "0.45s" }}>
        <h2 id="debugging">Debugging</h2>

        <p>Enable verbose output to debug issues:</p>

        <CodeBlock
          code={`# Check system health
devpulse health check

# View all available commands
devpulse --help

# Check a specific command's options
devpulse github stats --help`}
          language="bash"
        />
      </div>

      <Callout type="tip" title="Handle Errors Gracefully">
        Always check for error responses and provide meaningful feedback to users.
        Don't expose raw error messages in production applications.
      </Callout>

      {/* Navigation */}
      <div className="flex items-center justify-between mt-12 pt-6 border-t border-border not-prose animate-fade-in">
        <Button variant="outline" asChild>
          <Link to="/docs/api-reference">
            <ArrowLeft className="h-4 w-4" />
            API Reference
          </Link>
        </Button>
        <Button asChild>
          <Link to="/docs/configuration">
            Configuration
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  );
}

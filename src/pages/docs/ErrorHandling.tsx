import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CodeBlock } from "@/components/CodeBlock";
import { Callout } from "@/components/Callout";

const errorCodes = [
  {
    code: "400",
    name: "Bad Request",
    description: "The request was malformed or missing required parameters",
  },
  {
    code: "401",
    name: "Unauthorized",
    description: "Invalid or missing API key",
  },
  {
    code: "403",
    name: "Forbidden",
    description: "You don't have permission to access this resource",
  },
  {
    code: "404",
    name: "Not Found",
    description: "The requested resource does not exist",
  },
  {
    code: "429",
    name: "Too Many Requests",
    description: "Rate limit exceeded",
  },
  {
    code: "500",
    name: "Internal Server Error",
    description: "Something went wrong on our end",
  },
];

const rateLimitResponse = `{
  "error": {
    "code": "RATE_LIMIT_EXCEEDED",
    "message": "Too many requests. Please wait before retrying.",
    "retry_after": 60
  }
}`;

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
      <h1>Error Handling</h1>

      <p className="text-lg text-muted-foreground">
        Learn how to handle errors and rate limits gracefully when using the
        DevPulse CLI and API.
      </p>

      <h2 id="error-codes">HTTP Status Codes</h2>

      <p>
        The DevPulse API uses standard HTTP status codes to indicate the success
        or failure of requests.
      </p>

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

      <h2 id="rate-limits">Rate Limits</h2>

      <p>
        The API is rate limited to prevent abuse and ensure fair usage:
      </p>

      <ul>
        <li>
          <strong>100 requests per minute</strong> for authenticated requests
        </li>
        <li>
          <strong>10 requests per minute</strong> for unauthenticated requests
        </li>
      </ul>

      <Callout type="warning" title="Rate Limit Response">
        When you exceed the rate limit, the API returns a 429 status code with
        information about when you can retry.
      </Callout>

      <CodeBlock
        code={rateLimitResponse}
        language="json"
        filename="429 Response"
      />

      <h2 id="best-practices">Best Practices</h2>

      <h3>1. Implement Exponential Backoff</h3>

      <p>
        When encountering rate limits or transient errors, use exponential backoff
        with jitter to avoid thundering herd problems:
      </p>

      <CodeBlock
        code={retryExample}
        language="python"
        filename="retry_example.py"
        showLineNumbers
      />

      <h3>2. Use the Cache</h3>

      <p>
        DevPulse CLI includes built-in caching. Enable it to reduce API calls:
      </p>

      <CodeBlock
        code={`# Enable caching (default: enabled)
devpulse config set cache.enabled true

# Set cache TTL (in seconds)
devpulse config set cache.ttl 300

# View cached data when offline
devpulse stats show --cached`}
        language="bash"
      />

      <h3>3. Handle Errors Gracefully</h3>

      <Callout type="tip">
        Always check for error responses and provide meaningful feedback to users.
        Don't expose raw error messages in production applications.
      </Callout>

      <h2 id="cli-errors">CLI Error Messages</h2>

      <p>Common CLI errors and their solutions:</p>

      <div className="space-y-4 not-prose">
        <div className="callout callout-danger">
          <code className="text-sm">Error: GitHub API rate limit exceeded</code>
          <p className="text-sm text-muted-foreground mt-2">
            <strong>Solution:</strong> Wait for the rate limit to reset, or
            authenticate with a GitHub token to increase your limit.
          </p>
        </div>

        <div className="callout callout-danger">
          <code className="text-sm">Error: Unable to connect to sync server</code>
          <p className="text-sm text-muted-foreground mt-2">
            <strong>Solution:</strong> Check your internet connection. DevPulse
            will use cached data when offline.
          </p>
        </div>

        <div className="callout callout-danger">
          <code className="text-sm">Error: Invalid configuration file</code>
          <p className="text-sm text-muted-foreground mt-2">
            <strong>Solution:</strong> Run <code>devpulse config validate</code> to
            identify the issue, or reset with <code>devpulse config reset</code>.
          </p>
        </div>
      </div>

      <h2 id="debugging">Debugging</h2>

      <p>Enable verbose output to debug issues:</p>

      <CodeBlock
        code={`# Enable debug mode
devpulse --debug stats show

# View detailed logs
devpulse logs show --level DEBUG

# Check system health
devpulse health check --verbose`}
        language="bash"
      />

      {/* Navigation */}
      <div className="flex items-center justify-between mt-12 pt-6 border-t border-border not-prose">
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

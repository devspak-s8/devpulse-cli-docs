import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CodeBlock } from "@/components/CodeBlock";
import { Callout } from "@/components/Callout";
import { cn } from "@/lib/utils";

const endpoints = [
  {
    method: "GET",
    path: "/api/v1/stats",
    description: "Get productivity statistics for a time period",
  },
  {
    method: "GET",
    path: "/api/v1/sessions",
    description: "List all tracking sessions",
  },
  {
    method: "POST",
    path: "/api/v1/sessions",
    description: "Create a new tracking session",
  },
  {
    method: "GET",
    path: "/api/v1/sessions/:id",
    description: "Get a specific session",
  },
  {
    method: "DELETE",
    path: "/api/v1/sessions/:id",
    description: "Delete a tracking session",
  },
];

const codeExamples = {
  curl: `curl -X GET "https://api.devpulse.io/v1/stats" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json"`,
  javascript: `const response = await fetch('https://api.devpulse.io/v1/stats', {
  method: 'GET',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  }
});

const data = await response.json();
console.log(data);`,
  python: `import requests

response = requests.get(
    'https://api.devpulse.io/v1/stats',
    headers={
        'Authorization': 'Bearer YOUR_API_KEY',
        'Content-Type': 'application/json'
    }
)

data = response.json()
print(data)`,
};

const responseExample = `{
  "data": {
    "total_time": 28800,
    "sessions_count": 12,
    "productivity_score": 85,
    "most_productive_hour": 10,
    "top_projects": [
      {"name": "api-server", "time": 10800},
      {"name": "frontend", "time": 7200}
    ]
  },
  "meta": {
    "period": "week",
    "start_date": "2026-01-01",
    "end_date": "2026-01-07"
  }
}`;

type LanguageKey = keyof typeof codeExamples;

export default function ApiReference() {
  const [activeTab, setActiveTab] = useState<LanguageKey>("curl");

  return (
    <div className="prose-docs max-w-3xl">
      <h1>API Reference</h1>

      <p className="text-lg text-muted-foreground">
        DevPulse provides a REST API for programmatic access to your productivity
        data and session management.
      </p>

      <Callout type="info">
        The API is available for users with a DevPulse Cloud account. See the{" "}
        <Link to="/docs/configuration">Configuration guide</Link> to set up your
        API credentials.
      </Callout>

      <h2 id="authentication">Authentication</h2>

      <p>
        All API requests require authentication using a Bearer token. Include your
        API key in the Authorization header:
      </p>

      <CodeBlock
        code='Authorization: Bearer YOUR_API_KEY'
        language="bash"
      />

      <p>Generate an API key from your DevPulse dashboard or via CLI:</p>

      <CodeBlock
        code="devpulse config api-key generate"
        language="bash"
      />

      <h2 id="base-url">Base URL</h2>

      <CodeBlock
        code="https://api.devpulse.io/v1"
        language="plaintext"
      />

      <h2 id="endpoints">Endpoints</h2>

      <div className="not-prose">
        <div className="rounded-lg border border-border overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-muted/50">
                <th className="text-left p-3 font-medium text-sm">Method</th>
                <th className="text-left p-3 font-medium text-sm">Endpoint</th>
                <th className="text-left p-3 font-medium text-sm">Description</th>
              </tr>
            </thead>
            <tbody>
              {endpoints.map((endpoint, index) => (
                <tr key={index} className="border-t border-border">
                  <td className="p-3">
                    <span
                      className={cn(
                        "inline-flex px-2 py-0.5 rounded text-xs font-mono font-medium",
                        endpoint.method === "GET" &&
                          "bg-tip/10 text-tip",
                        endpoint.method === "POST" &&
                          "bg-info/10 text-info",
                        endpoint.method === "DELETE" &&
                          "bg-danger/10 text-danger"
                      )}
                    >
                      {endpoint.method}
                    </span>
                  </td>
                  <td className="p-3 font-mono text-sm">{endpoint.path}</td>
                  <td className="p-3 text-sm text-muted-foreground">
                    {endpoint.description}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <h2 id="example-request">Example Request</h2>

      <p>Get your productivity stats for the current week:</p>

      {/* Language tabs */}
      <div className="not-prose mb-4">
        <div className="flex gap-1 border-b border-border">
          {(Object.keys(codeExamples) as LanguageKey[]).map((lang) => (
            <button
              key={lang}
              onClick={() => setActiveTab(lang)}
              className={cn(
                "px-4 py-2 text-sm font-medium border-b-2 -mb-px transition-colors",
                activeTab === lang
                  ? "border-primary text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              )}
            >
              {lang === "curl"
                ? "cURL"
                : lang.charAt(0).toUpperCase() + lang.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <CodeBlock
        code={codeExamples[activeTab]}
        language={activeTab === "curl" ? "bash" : activeTab}
      />

      <h2 id="example-response">Example Response</h2>

      <CodeBlock
        code={responseExample}
        language="json"
        showLineNumbers
      />

      <h2 id="parameters">Query Parameters</h2>

      <table>
        <thead>
          <tr>
            <th>Parameter</th>
            <th>Type</th>
            <th>Default</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>period</code></td>
            <td>string</td>
            <td><code>week</code></td>
            <td>Time period: day, week, month, year</td>
          </tr>
          <tr>
            <td><code>start_date</code></td>
            <td>string</td>
            <td>—</td>
            <td>Start date in YYYY-MM-DD format</td>
          </tr>
          <tr>
            <td><code>end_date</code></td>
            <td>string</td>
            <td>—</td>
            <td>End date in YYYY-MM-DD format</td>
          </tr>
          <tr>
            <td><code>project</code></td>
            <td>string</td>
            <td>—</td>
            <td>Filter by project name</td>
          </tr>
        </tbody>
      </table>

      <h2 id="rate-limits">Rate Limits</h2>

      <p>
        The API is rate limited to 100 requests per minute. When you exceed the
        limit, the API returns a <code>429 Too Many Requests</code> response.
      </p>

      <Callout type="warning">
        See the <Link to="/docs/error-handling">Error Handling</Link> page for
        best practices on handling rate limits gracefully.
      </Callout>

      {/* Navigation */}
      <div className="flex items-center justify-between mt-12 pt-6 border-t border-border not-prose">
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

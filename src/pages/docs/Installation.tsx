import { Link } from "react-router-dom";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CodeBlock } from "@/components/CodeBlock";
import { Callout } from "@/components/Callout";

export default function Installation() {
  return (
    <div className="prose-docs max-w-3xl">
      <div className="animate-fade-in">
        <h1>Installation & Setup</h1>

        <p className="text-lg text-muted-foreground">
          Install DevPulse using pip. DevPulse requires Python 3.9+ (3.9–3.13 supported)
          and works on Windows, macOS, and Linux.
        </p>
      </div>

      <div className="animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
        <h2 id="requirements">Requirements</h2>

        <ul>
          <li>Python 3.9 or higher (3.9–3.13 supported)</li>
          <li>pip (Python package manager)</li>
          <li>Git (for GitHub integration)</li>
          <li>OS: Windows, macOS, Linux</li>
        </ul>
      </div>

      <div className="animate-fade-in-up" style={{ animationDelay: "0.15s" }}>
        <h2 id="virtual-env">Create a Virtual Environment</h2>

        <p>It's recommended to use a virtual environment:</p>

        <h3>Windows (PowerShell)</h3>
        <CodeBlock
          code={`python -m venv .venv
.\\.venv\\Scripts\\Activate.ps1`}
          language="powershell"
        />

        <h3>macOS/Linux (bash/zsh)</h3>
        <CodeBlock
          code={`python3 -m venv .venv
source .venv/bin/activate`}
          language="bash"
        />
      </div>

      <div className="animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
        <h2 id="basic-install">Install DevPulse</h2>

        <p>Install from PyPI:</p>

        <CodeBlock
          code="pip install devpulse-cli"
          language="bash"
        />

        <p>Or install from source (this repository):</p>

        <CodeBlock
          code={`pip install -U pip
pip install -e .`}
          language="bash"
        />
      </div>

      <div className="animate-fade-in-up" style={{ animationDelay: "0.25s" }}>
        <h2 id="verify">Run the CLI</h2>

        <p>Verify that DevPulse is installed correctly:</p>

        <CodeBlock
          code={`devpulse --help
# Shows all available commands`}
          language="bash"
        />
      </div>

      <Callout type="info">
        If the <code>devpulse</code> command is not found, ensure your Python
        scripts directory is in your PATH.
      </Callout>

      <div className="animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
        <h2 id="github-token">Optional: GitHub Token</h2>

        <p>
          A personal access token increases your GitHub rate limit from 60 req/hour
          (unauthenticated) to 5,000 req/hour (authenticated). Set this in your shell
          before running DevPulse:
        </p>

        <h3>Windows (PowerShell)</h3>
        <CodeBlock
          code={`$env:GITHUB_TOKEN = "<your-token>"`}
          language="powershell"
        />

        <h3>macOS/Linux</h3>
        <CodeBlock
          code={`export GITHUB_TOKEN="<your-token>"`}
          language="bash"
        />

        <Callout type="tip" title="Token Security">
          Use a fine-scoped PAT (Personal Access Token). Store it in your process environment
          or a secret manager. Do not commit it to source control.
        </Callout>
      </div>

      <div className="animate-fade-in-up" style={{ animationDelay: "0.35s" }}>
        <h2 id="api-server">API Server (Optional)</h2>

        <p>DevPulse ships a FastAPI app. To run it locally:</p>

        <CodeBlock
          code={`uvicorn devpulse.api:app --host 0.0.0.0 --port 8000 --reload`}
          language="bash"
        />

        <p>Test the API:</p>

        <CodeBlock
          code={`curl "http://localhost:8000/github-stats?repo=owner/name"`}
          language="bash"
        />
      </div>

      <div className="animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
        <h2 id="upgrade">Upgrading</h2>

        <p>Upgrade to the latest version:</p>

        <CodeBlock
          code="pip install --upgrade devpulse-cli"
          language="bash"
        />
      </div>

      <div className="animate-fade-in-up" style={{ animationDelay: "0.45s" }}>
        <h2 id="uninstall">Uninstalling</h2>

        <CodeBlock
          code="pip uninstall devpulse-cli"
          language="bash"
        />

        <Callout type="warning">
          Uninstalling will not remove your local data or cache. To completely remove all
          data, delete the <code>~/.devpulse</code> directory.
        </Callout>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between mt-12 pt-6 border-t border-border not-prose animate-fade-in">
        <Button variant="outline" asChild>
          <Link to="/docs">
            <ArrowLeft className="h-4 w-4" />
            Introduction
          </Link>
        </Button>
        <Button asChild>
          <Link to="/docs/quick-start">
            Quick Start
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  );
}

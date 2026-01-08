import { Link } from "react-router-dom";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CodeBlock } from "@/components/CodeBlock";
import { Callout } from "@/components/Callout";

export default function Installation() {
  return (
    <div className="prose-docs max-w-3xl">
      <h1>Installation</h1>

      <p className="text-lg text-muted-foreground">
        Install DevPulse using pip, the Python package manager. DevPulse requires
        Python 3.8 or higher.
      </p>

      <h2 id="requirements">Requirements</h2>

      <ul>
        <li>Python 3.8 or higher</li>
        <li>pip (Python package manager)</li>
        <li>Git (for GitHub integration)</li>
      </ul>

      <h2 id="basic-install">Basic Installation</h2>

      <p>Install DevPulse from PyPI:</p>

      <CodeBlock
        code="pip install devpulse-cli"
        language="bash"
      />

      <h2 id="with-extras">Installation with Extras</h2>

      <p>
        DevPulse offers optional extras for additional functionality:
      </p>

      <CodeBlock
        code={`# Install with AI features
pip install devpulse-cli[ai]

# Install with cloud sync
pip install devpulse-cli[cloud]

# Install with all extras
pip install devpulse-cli[all]`}
        language="bash"
      />

      <h3>Available Extras</h3>

      <table>
        <thead>
          <tr>
            <th>Extra</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>ai</code></td>
            <td>AI-powered insights and recommendations</td>
          </tr>
          <tr>
            <td><code>cloud</code></td>
            <td>Cloud synchronization support</td>
          </tr>
          <tr>
            <td><code>secrets</code></td>
            <td>Secret scanning capabilities</td>
          </tr>
          <tr>
            <td><code>all</code></td>
            <td>All extras combined</td>
          </tr>
        </tbody>
      </table>

      <h2 id="development-install">Development Installation</h2>

      <p>For contributing or local development:</p>

      <CodeBlock
        code={`# Clone the repository
git clone https://github.com/devpulse/cli.git
cd cli

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\\Scripts\\activate

# Install in development mode
pip install -e ".[dev]"`}
        language="bash"
        filename="terminal"
      />

      <h2 id="verify">Verify Installation</h2>

      <p>Verify that DevPulse is installed correctly:</p>

      <CodeBlock
        code={`devpulse --version
# DevPulse CLI v2.0.0

devpulse --help
# Shows available commands`}
        language="bash"
      />

      <Callout type="info">
        If the <code>devpulse</code> command is not found, ensure your Python
        scripts directory is in your PATH.
      </Callout>

      <h2 id="upgrade">Upgrading</h2>

      <p>Upgrade to the latest version:</p>

      <CodeBlock
        code="pip install --upgrade devpulse-cli"
        language="bash"
      />

      <h2 id="uninstall">Uninstalling</h2>

      <CodeBlock
        code="pip uninstall devpulse-cli"
        language="bash"
      />

      <Callout type="warning">
        Uninstalling will not remove your local data. To completely remove all
        data, delete the <code>~/.devpulse</code> directory.
      </Callout>

      {/* Navigation */}
      <div className="flex items-center justify-between mt-12 pt-6 border-t border-border not-prose">
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

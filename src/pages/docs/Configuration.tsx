import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CodeBlock } from "@/components/CodeBlock";
import { Callout } from "@/components/Callout";

export default function Configuration() {
  return (
    <div className="prose-docs max-w-3xl">
      <h1>Configuration</h1>

      <p className="text-lg text-muted-foreground">
        Customize DevPulse to match your workflow. Configuration is stored in
        <code>~/.devpulse/config.toml</code>.
      </p>

      <h2 id="config-file">Configuration File</h2>

      <CodeBlock
        code={`# ~/.devpulse/config.toml

[general]
default_project = "personal"
timezone = "America/New_York"
theme = "dark"

[tracking]
auto_stop = true
auto_stop_idle_minutes = 30
reminder_interval = 25

[github]
token = "ghp_..."
default_org = "my-company"

[sync]
enabled = true
interval_minutes = 15

[cache]
enabled = true
ttl_seconds = 300

[ai]
enabled = true
model = "gpt-4"`}
        language="toml"
        filename="~/.devpulse/config.toml"
        showLineNumbers
      />

      <h2 id="cli-config">Managing Configuration via CLI</h2>

      <CodeBlock
        code={`# View current configuration
devpulse config show

# Get a specific value
devpulse config get tracking.auto_stop

# Set a value
devpulse config set tracking.reminder_interval 30

# Reset to defaults
devpulse config reset

# Validate configuration
devpulse config validate`}
        language="bash"
      />

      <h2 id="environment-variables">Environment Variables</h2>

      <p>Override configuration using environment variables:</p>

      <table>
        <thead>
          <tr>
            <th>Variable</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>DEVPULSE_CONFIG</code></td>
            <td>Path to config file</td>
          </tr>
          <tr>
            <td><code>DEVPULSE_GITHUB_TOKEN</code></td>
            <td>GitHub personal access token</td>
          </tr>
          <tr>
            <td><code>DEVPULSE_API_KEY</code></td>
            <td>DevPulse Cloud API key</td>
          </tr>
          <tr>
            <td><code>DEVPULSE_DEBUG</code></td>
            <td>Enable debug logging (true/false)</td>
          </tr>
        </tbody>
      </table>

      <h2 id="github-setup">GitHub Integration</h2>

      <p>Connect your GitHub account for enhanced analytics:</p>

      <CodeBlock
        code={`# Authenticate with GitHub
devpulse config github login

# Or set token manually
devpulse config set github.token ghp_your_token_here

# Verify connection
devpulse config github status`}
        language="bash"
      />

      <Callout type="info">
        The GitHub token requires <code>read:user</code> and <code>repo</code> scopes
        for full functionality.
      </Callout>

      <h2 id="cloud-sync">Cloud Sync Setup</h2>

      <CodeBlock
        code={`# Enable cloud sync
devpulse sync login

# Check sync status
devpulse sync status

# Force sync
devpulse sync push
devpulse sync pull`}
        language="bash"
      />

      <h2 id="configuration-options">All Configuration Options</h2>

      <table>
        <thead>
          <tr>
            <th>Key</th>
            <th>Type</th>
            <th>Default</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>general.theme</code></td>
            <td>string</td>
            <td>system</td>
            <td>UI theme (light, dark, system)</td>
          </tr>
          <tr>
            <td><code>tracking.auto_stop</code></td>
            <td>bool</td>
            <td>true</td>
            <td>Auto-stop on idle</td>
          </tr>
          <tr>
            <td><code>tracking.auto_stop_idle_minutes</code></td>
            <td>int</td>
            <td>30</td>
            <td>Idle threshold in minutes</td>
          </tr>
          <tr>
            <td><code>cache.enabled</code></td>
            <td>bool</td>
            <td>true</td>
            <td>Enable local caching</td>
          </tr>
          <tr>
            <td><code>cache.ttl_seconds</code></td>
            <td>int</td>
            <td>300</td>
            <td>Cache time-to-live</td>
          </tr>
          <tr>
            <td><code>sync.enabled</code></td>
            <td>bool</td>
            <td>false</td>
            <td>Enable cloud sync</td>
          </tr>
          <tr>
            <td><code>ai.enabled</code></td>
            <td>bool</td>
            <td>true</td>
            <td>Enable AI features</td>
          </tr>
        </tbody>
      </table>

      {/* Navigation */}
      <div className="flex items-center justify-between mt-12 pt-6 border-t border-border not-prose">
        <Button variant="outline" asChild>
          <Link to="/docs/error-handling">
            <ArrowLeft className="h-4 w-4" />
            Error Handling
          </Link>
        </Button>
      </div>
    </div>
  );
}

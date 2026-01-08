import { Link } from "react-router-dom";
import {
  Github,
  BarChart3,
  Clock,
  Terminal,
  Database,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FeatureCard } from "@/components/FeatureCard";
import { CodeBlock } from "@/components/CodeBlock";

const features = [
  {
    icon: BarChart3,
    title: "GitHub Analytics",
    description:
      "Comprehensive insights into commits, PRs, issues, and contribution patterns across your repositories.",
  },
  {
    icon: Clock,
    title: "Rate-Limit Aware",
    description:
      "Smart request handling that respects GitHub API limits and provides graceful fallbacks.",
  },
  {
    icon: Terminal,
    title: "CLI + API",
    description:
      "Full-featured CLI for quick access, plus a programmatic API for integration into your workflows.",
  },
  {
    icon: Database,
    title: "Cache Fallback",
    description:
      "Intelligent caching ensures you always have access to your data, even when offline.",
  },
];

const installCode = `# Install via pip
pip install devpulse-cli

# Verify installation
devpulse --version

# Get started
devpulse track start "my-project"`;

export default function Landing() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header variant="landing" />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Grid background */}
        <div className="absolute inset-0 grid-pattern fade-mask opacity-50" />
        
        <div className="container relative py-24 md:py-32 lg:py-40">
          <div className="max-w-3xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6 animate-fade-in">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              v2.0 now available
            </div>

            {/* Headline */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 animate-fade-in-up">
              Developer productivity &{" "}
              <span className="gradient-text">GitHub analytics</span> CLI
            </h1>

            {/* Subheadline */}
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
              Track your coding time, analyze GitHub activity, and optimize your
              workflow. API-first, built for developers who live in the terminal.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
              <Button variant="hero" size="xl" asChild>
                <Link to="/docs">
                  Get Started
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button variant="heroOutline" size="xl" asChild>
                <a
                  href="https://github.com/devpulse/cli"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="h-5 w-5" />
                  View on GitHub
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 md:py-28 bg-muted/30">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Built for developers
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything you need to track, analyze, and improve your development
              workflow.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature) => (
              <FeatureCard key={feature.title} {...feature} />
            ))}
          </div>
        </div>
      </section>

      {/* Install Section */}
      <section className="py-20 md:py-28">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Up and running in seconds
              </h2>
              <p className="text-lg text-muted-foreground">
                Install DevPulse with a single command and start tracking immediately.
              </p>
            </div>

            <CodeBlock
              code={installCode}
              language="bash"
              filename="terminal"
            />

            <div className="mt-8 text-center">
              <Button variant="outline" asChild>
                <Link to="/docs/installation">
                  View full installation guide
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-28 bg-muted/30">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to optimize your workflow?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Join thousands of developers using DevPulse to understand and improve
              their productivity.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button variant="hero" size="xl" asChild>
                <Link to="/docs">
                  Read the docs
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button variant="heroOutline" size="xl" asChild>
                <a
                  href="https://github.com/devpulse/cli"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Star on GitHub
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

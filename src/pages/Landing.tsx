import { Link } from "react-router-dom";
import {
  Github,
  BarChart3,
  Clock,
  Terminal,
  Database,
  ArrowRight,
  Star,
  GitFork,
  Heart,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FeatureCard } from "@/components/FeatureCard";
import { ScrollToTop } from "@/components/ScrollToTop";
import { TerminalDemo } from "@/components/TerminalDemo";

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

export default function Landing() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header variant="landing" />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Grid background */}
        <div className="absolute inset-0 grid-pattern fade-mask opacity-50" />
        
        <div className="container relative py-20 md:py-28 lg:py-36">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left side - Text content */}
            <div className="max-w-xl">
              {/* Open Source Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6 animate-fade-in">
                <Heart className="h-3.5 w-3.5 fill-current" />
                <span>Open-Source Software</span>
                <span className="text-primary/60">•</span>
                <span>v0.1.3</span>
              </div>

              {/* Headline */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 animate-fade-in-up">
                Developer productivity &{" "}
                <span className="gradient-text">GitHub analytics</span> CLI
              </h1>

              {/* Subheadline */}
              <p className="text-lg md:text-xl text-muted-foreground mb-8 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
                Track your coding time, analyze GitHub activity, and optimize your
                workflow. API-first, built for developers who live in the terminal.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-start gap-4 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
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

              {/* Stats */}
              <div className="flex items-center gap-6 mt-8 pt-8 border-t border-border animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Star className="h-4 w-4 text-yellow-500" />
                  <span className="font-medium text-foreground">2.4k</span>
                  <span>stars</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <GitFork className="h-4 w-4 text-primary" />
                  <span className="font-medium text-foreground">340</span>
                  <span>forks</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Terminal className="h-4 w-4 text-green-500" />
                  <span className="font-medium text-foreground">MIT</span>
                  <span>license</span>
                </div>
              </div>
            </div>

            {/* Right side - Terminal Demo */}
            <div className="hidden lg:block animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
              <TerminalDemo />
            </div>
          </div>
        </div>
      </section>

      {/* Mobile Terminal Demo */}
      <section className="lg:hidden py-8 px-4">
        <TerminalDemo />
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

            <div className="code-block">
              <div className="code-block-header">
                <span className="text-xs text-muted-foreground font-mono">terminal</span>
              </div>
              <pre className="p-4 font-mono text-sm overflow-x-auto">
                <code>
                  <span className="text-muted-foreground"># Install via pip</span>{"\n"}
                  <span className="text-primary">pip install</span> devpulse-cli{"\n\n"}
                  <span className="text-muted-foreground"># Verify installation</span>{"\n"}
                  <span className="text-primary">devpulse</span> --version{"\n\n"}
                  <span className="text-muted-foreground"># Get started</span>{"\n"}
                  <span className="text-primary">devpulse</span> track start <span className="text-green-500">"my-project"</span>
                </code>
              </pre>
            </div>

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
      <ScrollToTop />
    </div>
  );
}

import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
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
  Zap,
  Shield,
  Users,
  Code2,
  Cpu,
  Globe,
  CheckCircle2,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FeatureCard } from "@/components/FeatureCard";
import { ScrollToTop } from "@/components/ScrollToTop";
import { TerminalDemo } from "@/components/TerminalDemo";
import { StarfieldAnimation } from "@/components/StarfieldAnimation";
import { ScrollReveal } from "@/components/ScrollReveal";
import { useAnalytics, useTrackEvent } from "@/hooks/useAnalytics";
import { OnboardingOverlay } from "@/components/onboarding/OnboardingOverlay";
import { useOnboarding } from "@/hooks/useOnboarding";

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

const useCases = [
  {
    title: "Individual Developers",
    description: "Track personal productivity, set goals, and visualize your coding patterns over time.",
    icon: Code2,
  },
  {
    title: "Engineering Teams",
    description: "Monitor team velocity, identify bottlenecks, and improve collaboration workflows.",
    icon: Users,
  },
  {
    title: "Open Source Maintainers",
    description: "Understand contributor activity, manage releases, and grow your community.",
    icon: Globe,
  },
];

const integrations = [
  { name: "GitHub", icon: Github },
  { name: "GitLab", icon: Code2 },
  { name: "Bitbucket", icon: Database },
  { name: "Jira", icon: Shield },
  { name: "Slack", icon: Zap },
  { name: "VS Code", icon: Terminal },
];

const benefits = [
  "Zero configuration required",
  "Works with any Git repository",
  "Privacy-first architecture",
  "Offline-first with smart sync",
  "Extensible plugin system",
  "Beautiful CLI with colors",
];

export default function Landing() {
  const { stats: analyticsStats, loading } = useAnalytics();
  const trackEvent = useTrackEvent();
  const { step, startOnboarding, signInWithGitHub, importRepos } = useOnboarding();
  const [onboardingOpen, setOnboardingOpen] = useState(false);
  const [animatedStats, setAnimatedStats] = useState({
    visitors: 0,
    sessions: 0,
    pageViews: 0,
  });

  // Animate stats from 0 to final value
  useEffect(() => {
    if (!analyticsStats || loading) return;

    let animationFrames = 0;
    const animationDuration = 2000; // 2 seconds
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / animationDuration, 1);

      setAnimatedStats({
        visitors: Math.floor(analyticsStats.visitors * progress),
        sessions: Math.floor(analyticsStats.sessions * progress),
        pageViews: Math.floor(analyticsStats.pageViews * progress),
      });

      if (progress < 1) {
        animationFrames = requestAnimationFrame(animate);
      }
    };

    animationFrames = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrames);
  }, [analyticsStats, loading]);

  const statsToDisplay = [
    { value: animatedStats.visitors, label: "Active Visitors", icon: Users },
    { value: animatedStats.sessions, label: "Sessions", icon: Cpu },
    { value: analyticsStats?.bounceRate.toFixed(1) || "0", label: "Bounce Rate %", icon: Zap },
    { value: animatedStats.pageViews, label: "Page Views", icon: Code2 },
  ];

  const handleStartOnboarding = () => {
    setOnboardingOpen(true);
    startOnboarding();
  };

  const handleSignIn = () => {
    setOnboardingOpen(true);
    signInWithGitHub();
  };

  const handleImport = (repos: string[]) => {
    importRepos(repos);
    setOnboardingOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header variant="landing" onGitHubClick={handleStartOnboarding} />
      {onboardingOpen && (
        <OnboardingOverlay
          step={step}
          onStart={handleStartOnboarding}
          onSignIn={handleSignIn}
          onImport={handleImport}
        />
      )}

      {/* Hero Section - keeps initial animations */}
      <section className="relative overflow-hidden min-h-[90vh] flex items-center">
        <div className="absolute inset-0">
          <StarfieldAnimation />
        </div>
        
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
        
        <div className="container relative py-20 md:py-28 lg:py-36">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="max-w-xl">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6 animate-slide-in-left">
                <Heart className="h-3.5 w-3.5 fill-current" />
                <span>Open-Source Software</span>
                <span className="text-primary/60">•</span>
                <span>v0.2.1</span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 animate-slide-in-left" style={{ animationDelay: "0.1s" }}>
                Developer productivity &{" "}
                <span className="gradient-text">GitHub analytics</span> CLI
              </h1>

              <p className="text-lg md:text-xl text-muted-foreground mb-8 animate-slide-in-left" style={{ animationDelay: "0.2s" }}>
                Track your coding time, analyze GitHub activity, and optimize your
                workflow. API-first, built for developers who live in the terminal.
              </p>

              <div className="flex flex-col sm:flex-row items-start gap-4 animate-slide-in-left" style={{ animationDelay: "0.3s" }}>
                <Button 
                  variant="hero" 
                  size="xl" 
                  asChild
                  onClick={() => trackEvent('cta_get_started', { location: 'hero' })}
                >
                  <Link to="/docs">
                    Get Started
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button 
                  variant="heroOutline" 
                  size="xl" 
                  asChild
                  onClick={() => trackEvent('view_github', { location: 'hero' })}
                >
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

              <div className="flex items-center gap-6 mt-8 pt-8 border-t border-border animate-slide-in-left" style={{ animationDelay: "0.4s" }}>
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

            <div className="hidden lg:block animate-slide-in-right" style={{ animationDelay: "0.3s" }}>
              <TerminalDemo />
            </div>
          </div>
        </div>
      </section>

      {/* Mobile Terminal Demo */}
      <section className="lg:hidden py-8 px-4">
        <TerminalDemo />
      </section>

      {/* Stats Section - scroll triggered with real analytics data */}
      <section className="py-16 border-y border-border bg-muted/20">
        <div className="container">
          <ScrollReveal direction="up" className="text-center mb-8">
            <h3 className="text-sm font-semibold text-primary">Real-Time Analytics</h3>
            <p className="text-muted-foreground text-sm mt-1">Powered by Google Analytics</p>
          </ScrollReveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {statsToDisplay.map((stat, index) => (
              <ScrollReveal key={stat.label} direction="up" delay={index * 100}>
                <div className="text-center">
                  <stat.icon className="h-6 w-6 text-primary mx-auto mb-2" />
                  <div className="text-3xl md:text-4xl font-bold text-foreground mb-1">
                    {typeof stat.value === 'string' ? stat.value : (stat.value > 100 ? `${(stat.value / 1000).toFixed(1)}K` : stat.value)}
                  </div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section - animated marquee */}
      <section className="py-20 md:py-28">
        <div className="container">
          <ScrollReveal direction="up" className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Built for developers
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything you need to track, analyze, and improve your development
              workflow.
            </p>
          </ScrollReveal>

          <div className="space-y-4">
            <div
              className="relative overflow-hidden
              [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]
              [-webkit-mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]"
            >
              <div className="flex gap-6 w-max animate-marquee">
                {[...features, ...features].map((feature, index) => (
                  <div
                    key={`${feature.title}-${index}`}
                    className="flex items-start gap-4 px-6 py-4 rounded-xl w-80
                    bg-card border border-border
                    hover:border-primary/50 hover:bg-primary/5
                    transition-all flex-shrink-0"
                  >
                    <div className="flex-shrink-0 h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-foreground mb-1 whitespace-nowrap">
                        {feature.title}
                      </h3>
                      <p className="text-muted-foreground text-sm line-clamp-2">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases Section - scroll triggered */}
      <section className="py-20 md:py-28 bg-muted/30">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <ScrollReveal direction="left">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Built for every workflow
                </h2>
                <p className="text-lg text-muted-foreground mb-8">
                  Whether you're a solo developer or part of a large team, DevPulse
                  adapts to your needs.
                </p>
              </ScrollReveal>

              <div className="space-y-6">
                {useCases.map((useCase, index) => (
                  <ScrollReveal key={useCase.title} direction="left" delay={200 + index * 150}>
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                        <useCase.icon className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">
                          {useCase.title}
                        </h3>
                        <p className="text-muted-foreground text-sm">
                          {useCase.description}
                        </p>
                      </div>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>

            <ScrollReveal direction="right" delay={200}>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/5 rounded-2xl blur-3xl" />
                <div className="relative bg-card border border-border rounded-2xl p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <TrendingUp className="h-8 w-8 text-primary" />
                    <div>
                      <div className="font-semibold">Productivity Insights</div>
                      <div className="text-sm text-muted-foreground">Real-time analytics</div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Weekly commits</span>
                      <span className="font-medium text-foreground">+23%</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full w-3/4 bg-primary rounded-full" />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Code reviews</span>
                      <span className="font-medium text-foreground">+45%</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full w-[85%] bg-primary rounded-full" />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Issues resolved</span>
                      <span className="font-medium text-foreground">+67%</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full w-[90%] bg-primary rounded-full" />
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Benefits Section - scroll triggered */}
      <section className="py-20 md:py-28">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="grid grid-cols-2 gap-4">
                {benefits.map((benefit, index) => (
                  <ScrollReveal
                    key={benefit}
                    direction={index % 2 === 0 ? "left" : "right"}
                    delay={200 + index * 80}
                  >
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
                      <span className="text-sm text-foreground">{benefit}</span>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>

            <ScrollReveal direction="right" className="order-1 lg:order-2">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Why developers choose DevPulse
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                We built DevPulse with the same principles we follow in our own
                development workflow: simplicity, speed, and reliability.
              </p>
              <Button variant="outline" asChild>
                <Link to="/docs/quick-start">
                  Learn more
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Integrations Section - scroll triggered */}
      <section className="py-20 md:py-28 bg-muted/30">
        <div className="container">
          <ScrollReveal direction="up" className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Works with your stack
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Seamless integrations with the tools you already use.
            </p>
          </ScrollReveal>

          <div className="flex flex-wrap justify-center gap-6">
            {integrations.map((integration, index) => (
              <ScrollReveal
                key={integration.name}
                direction="scale"
                delay={100 + index * 80}
              >
                <div className="flex items-center gap-3 px-6 py-4 bg-card border border-border rounded-xl">
                  <integration.icon className="h-6 w-6 text-primary" />
                  <span className="font-medium text-foreground">{integration.name}</span>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Install Section - scroll triggered */}
      <section className="py-20 md:py-28">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <ScrollReveal direction="up" className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Up and running in seconds
              </h2>
              <p className="text-lg text-muted-foreground">
                Install DevPulse with a single command and start tracking immediately.
              </p>
            </ScrollReveal>

            <ScrollReveal direction="scale" delay={200}>
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
            </ScrollReveal>

            <ScrollReveal direction="up" delay={400} className="mt-8 text-center">
              <Button variant="outline" asChild>
                <Link to="/docs/installation">
                  View full installation guide
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* CTA Section - scroll triggered */}
      <section className="py-20 md:py-28 bg-muted/30 relative overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <StarfieldAnimation />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-muted/80 to-transparent" />
        
        <div className="container relative">
          <div className="max-w-2xl mx-auto text-center">
            <ScrollReveal direction="up">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to optimize your workflow?
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Join thousands of developers already using DevPulse to track their
                productivity and improve their coding habits.
              </p>
            </ScrollReveal>
            
            <ScrollReveal direction="up" delay={200}>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button 
                  variant="hero" 
                  size="xl" 
                  asChild
                  onClick={() => trackEvent('cta_get_started_bottom', { location: 'bottom' })}
                >
                  <Link to="/docs">
                    Get Started Free
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button 
                  variant="heroOutline" 
                  size="xl" 
                  asChild
                  onClick={() => trackEvent('star_github', { location: 'bottom' })}
                >
                  <a
                    href="https://github.com/devpulse/cli"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github className="h-5 w-5" />
                    Star on GitHub
                  </a>
                </Button>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <Footer />
      <ScrollToTop />
    </div>
  );
}

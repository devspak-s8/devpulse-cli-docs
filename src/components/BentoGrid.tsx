"use client"

import type React from "react"

import { BentoCard } from "./bento-card"
import {
  Lightning,
  Globe,
  ShieldCheck,
  Cpu,
  ChartLineUp,
  GitBranch,
  ArrowsOutCardinal,
} from "@phosphor-icons/react/dist/ssr"

function AnimatedCard({
  children,
  delay = 0,
  direction = "up",
  className = "",
}: {
  children: React.ReactNode
  delay?: number
  direction?: "up" | "left" | "right"
  className?: string
}) {
  return (
    <div className={className}>
      {children}
    </div>
  )
}

export function BentoGrid() {
  return (
    <section id="product" className="py-24">
      <div className="mx-auto max-w-[1400px] px-2.5 sm:px-6 lg:px-12">
        <AnimatedCard delay={0} direction="up">
          <div className="mb-16 max-w-2xl">
            <span className="text-sm font-medium text-[var(--color-keppel-400)] uppercase tracking-wider">
              Capabilities
            </span>
            <h2 className="mt-3 text-3xl font-bold text-[var(--color-baltic-sea-100)] md:text-4xl">
              Observability that understands your APIs
            </h2>
            <p className="mt-4 text-lg text-[var(--color-baltic-sea-400)]">
              Everything you need to monitor, analyze, and understand your services — from local development to global production.
            </p>
          </div>
        </AnimatedCard>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-12 md:auto-rows-[180px]">
          <AnimatedCard delay={100} direction="left" className="min-h-[280px] md:min-h-0 md:col-span-4 md:row-span-2">
            <BentoCard className="flex flex-col h-full">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--color-keppel-900)]">
                <Lightning weight="duotone" className="h-6 w-6 text-[var(--color-keppel-400)]" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-[var(--color-baltic-sea-100)]">Real-time health checks</h3>
              <p className="mt-2 text-sm text-[var(--color-baltic-sea-400)] flex-1">
                Instant API health validation with latency tracking, error detection, and automatic alerts — all from a single command.
              </p>
              <div className="mt-auto pt-6 flex items-end gap-1">
                {[47, 52, 43, 48, 51, 45, 49, 44, 50, 46].map((val, i) => (
                  <div key={i} className="flex-1 rounded-t bg-[var(--color-keppel-700)]" style={{ height: `${val}px` }} />
                ))}
              </div>
            </BentoCard>
          </AnimatedCard>

          <AnimatedCard delay={200} direction="up" className="min-h-[160px] md:min-h-0 md:col-span-5">
            <BentoCard className="flex flex-col h-full">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--color-baltic-sea-800)]">
                <Globe weight="duotone" className="h-5 w-5 text-[var(--color-keppel-400)]" />
              </div>
              <h3 className="mt-3 text-base font-semibold text-[var(--color-baltic-sea-100)]">Global service health map</h3>
              <p className="mt-1 text-sm text-[var(--color-baltic-sea-400)]">
                See how your API performs across regions with live latency, error rates, and availability insights.
              </p>
            </BentoCard>
          </AnimatedCard>

          <AnimatedCard delay={300} direction="right" className="hidden md:block min-h-[160px] md:min-h-0 md:col-span-3">
            <BentoCard className="flex flex-col items-center justify-center text-center h-full">
              <div className="text-4xl font-bold text-[var(--color-keppel-400)]">99.9%</div>
              <div className="mt-1 text-sm text-[var(--color-baltic-sea-500)]">visibility uptime</div>
              <p className="mt-3 text-xs text-[var(--color-baltic-sea-400)]">Continuous monitoring ensures you never miss downtime, degradation, or regional failures.</p>
            </BentoCard>
          </AnimatedCard>

          <AnimatedCard delay={400} direction="left" className="min-h-[160px] md:min-h-0 md:col-span-3">
            <BentoCard className="flex flex-col h-full">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--color-baltic-sea-800)]">
                <ShieldCheck weight="duotone" className="h-5 w-5 text-[var(--color-keppel-400)]" />
              </div>
              <h3 className="mt-3 text-base font-semibold text-[var(--color-baltic-sea-100)]">Privacy-first monitoring</h3>
              <p className="mt-1 text-sm text-[var(--color-baltic-sea-400)]">No code injection. No traffic replay. DevPulse monitors your services without accessing your data or source code.</p>
            </BentoCard>
          </AnimatedCard>

          <AnimatedCard delay={500} direction="up" className="min-h-[160px] md:min-h-0 md:col-span-5">
            <BentoCard className="flex flex-col h-full">
              <div className="flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--color-baltic-sea-800)]">
                  <Cpu weight="duotone" className="h-5 w-5 text-[var(--color-keppel-400)]" />
                </div>
                <span className="text-xs font-medium text-[var(--color-keppel-400)] uppercase tracking-wider px-2 py-0.5 rounded-full bg-[var(--color-keppel-950)] border border-[var(--color-keppel-800)]">
                  SMART
                </span>
              </div>
              <h3 className="mt-3 text-base font-semibold text-[var(--color-baltic-sea-100)]">Intelligent performance analysis</h3>
              <p className="mt-1 text-sm text-[var(--color-baltic-sea-400)]">
                Automatically detect slow endpoints, latency spikes, and abnormal response patterns before users notice.
              </p>
            </BentoCard>
          </AnimatedCard>

          <AnimatedCard delay={600} direction="up" className="min-h-[160px] md:min-h-0 md:col-span-4">
            <BentoCard className="flex flex-col h-full">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--color-baltic-sea-800)]">
                <ChartLineUp weight="duotone" className="h-5 w-5 text-[var(--color-keppel-400)]" />
              </div>
              <h3 className="mt-3 text-base font-semibold text-[var(--color-baltic-sea-100)]">Live metrics & logs</h3>
              <p className="mt-1 text-sm text-[var(--color-baltic-sea-400)]">Track request volume, response times, success rates, and alerts in real time — CLI and dashboard synced.</p>
            </BentoCard>
          </AnimatedCard>

          <AnimatedCard delay={700} direction="up" className="min-h-[160px] md:min-h-0 md:col-span-4">
            <BentoCard className="flex flex-col h-full">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--color-baltic-sea-800)]">
                <GitBranch weight="duotone" className="h-5 w-5 text-[var(--color-keppel-400)]" />
              </div>
              <h3 className="mt-3 text-base font-semibold text-[var(--color-baltic-sea-100)]">GitHub-native workflow</h3>
              <p className="mt-1 text-sm text-[var(--color-baltic-sea-400)]">Sign in with GitHub, import projects, and monitor APIs tied to your repositories — no manual setup.</p>
            </BentoCard>
          </AnimatedCard>

          <AnimatedCard delay={800} direction="up" className="min-h-[160px] md:min-h-0 md:col-span-4">
            <BentoCard className="flex flex-col h-full">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--color-baltic-sea-800)]">
                <ArrowsOutCardinal weight="duotone" className="h-5 w-5 text-[var(--color-keppel-400)]" />
              </div>
              <h3 className="mt-3 text-base font-semibold text-[var(--color-baltic-sea-100)]">Multi-service monitoring</h3>
              <p className="mt-1 text-sm text-[var(--color-baltic-sea-400)]">
                Monitor multiple APIs, endpoints, or microservices from a single project — scale insights, not complexity.
              </p>
            </BentoCard>
          </AnimatedCard>
        </div>
      </div>
    </section>
  )
}

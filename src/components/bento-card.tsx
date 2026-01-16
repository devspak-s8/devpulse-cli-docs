import type React from "react"
import { cn } from "@/lib/utils"

interface BentoCardProps {
  children: React.ReactNode
  className?: string
}

export function BentoCard({ children, className }: BentoCardProps) {
  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-[var(--color-neutral-700)] bg-[var(--color-neutral-900)] p-6",
        "transition-all duration-300 hover:border-[var(--color-neutral-600)] hover:bg-[var(--color-neutral-900)]/80",
        className,
      )}
      style={{
        boxShadow: "var(--bento-shadow)",
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100"
        style={{
          background:
            "linear-gradient(135deg, transparent 0%, transparent 30%, rgba(230, 232, 235, 0.03) 45%, rgba(230, 232, 235, 0.05) 50%, rgba(230, 232, 235, 0.03) 55%, transparent 70%, transparent 100%)",
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  )
}

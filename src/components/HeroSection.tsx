"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Terminal, Code, Play } from "@phosphor-icons/react"
import { useEffect, useState, useRef } from "react"

const CLI_SEQUENCE = {
  command: "devpulse monitor https://devup-backend.onrender.com",
  steps: [
    { text: "Registering target service...", delay: 500 },
    { text: "Running health checks (/health)...", delay: 700 },
    { text: "Collecting performance metrics (10 requests)...", delay: 1000 },
    { text: "Analyzing latency & error rates...", delay: 800 },
    { text: "Generating global service health map...", delay: 1000 },
  ],
  status: {
    endpoint: "devup-backend.onrender.com",
    coldStart: "monitoring live",
  },
}

const AGENT_SEQUENCE = {
  lines: [
    { text: "DevPulse CLI v1.0", delay: 80 },
    { text: "", delay: 200 },
    { text: "Target: https://devup-backend.onrender.com", delay: 80 },
    { text: "Health endpoint: /health", delay: 80 },
    { text: "Regions: NA, EU, AS, SA, AF, OC", delay: 80 },
    { text: "", delay: 200 },
    { text: "▶ Starting distributed health scan", delay: 100 },
  ],
  outputs: [
    { text: "Health check passed (200 OK)", delay: 300 },
    { text: "Avg latency: 2.0s", delay: 300 },
    { text: "Success rate: 100%", delay: 300 },
    { text: "No downtime detected", delay: 400 },
    { text: "6/6 regions healthy", delay: 500 },
    { text: "✓ Global health map generated", delay: 0 },
  ],
}

const GRID_ACTIVATION_MAP: Record<number, number[]> = {
  0: [5, 23, 47, 68, 92, 115, 138, 167, 189, 215],
  1: [12, 31, 56, 78, 103, 127, 152, 178, 201, 223, 8, 45, 89, 134, 176],
  2: [3, 19, 42, 65, 88, 112, 139, 163, 186, 209, 234, 17, 54, 97, 143, 188, 211, 237],
}

let animationStarted = false

export function HeroSection() {
  const [typedCommand, setTypedCommand] = useState("")
  const [visibleSteps, setVisibleSteps] = useState<number[]>([])
  const [showStatus, setShowStatus] = useState(false)
  const [cursorVisible, setCursorVisible] = useState(true)
  const [activeCells, setActiveCells] = useState<Set<number>>(new Set())

  const [showAgentTerminal, setShowAgentTerminal] = useState(false)
  const [agentLines, setAgentLines] = useState<string[]>([])
  const [agentOutputs, setAgentOutputs] = useState<string[]>([])
  const [isAgentRunning, setIsAgentRunning] = useState(false)
  const [lineConnectorProgress, setLineConnectorProgress] = useState(0)

  const timeoutsRef = useRef<NodeJS.Timeout[]>([])
  const intervalsRef = useRef<NodeJS.Timeout[]>([])

  useEffect(() => {
    if (animationStarted) return
    animationStarted = true

    const addTimeout = (fn: () => void, delay: number) => {
      const id = setTimeout(fn, delay)
      timeoutsRef.current.push(id)
      return id
    }

    const addInterval = (fn: () => void, delay: number) => {
      const id = setInterval(fn, delay)
      intervalsRef.current.push(id)
      return id
    }

    const cursorInterval = addInterval(() => {
      setCursorVisible((v) => !v)
    }, 530)

    let charIndex = 0
    const typeCommand = () => {
      if (charIndex <= CLI_SEQUENCE.command.length) {
        setTypedCommand(CLI_SEQUENCE.command.slice(0, charIndex))
        charIndex++
        addTimeout(typeCommand, 50 + Math.random() * 30)
      } else {
        addTimeout(() => showSteps(0), 400)
      }
    }

    const activateCellsForStep = (stepIndex: number) => {
      const cells = GRID_ACTIVATION_MAP[stepIndex] || []
      cells.forEach((cellIndex, i) => {
        addTimeout(() => {
          setActiveCells((prev) => new Set([...prev, cellIndex]))
        }, i * 60)
      })
    }

    const showSteps = (stepIndex: number) => {
      if (stepIndex < CLI_SEQUENCE.steps.length) {
        setVisibleSteps((prev) => [...prev, stepIndex])
        activateCellsForStep(stepIndex)
        addTimeout(() => showSteps(stepIndex + 1), CLI_SEQUENCE.steps[stepIndex].delay)
      } else {
        addTimeout(() => {
          setShowStatus(true)
          clearInterval(cursorInterval)
          setCursorVisible(false)
          addTimeout(startAgentTerminal, 800)
        }, 500)
      }
    }

    const startAgentTerminal = () => {
      let progress = 0
      const lineInterval = addInterval(() => {
        progress += 5
        setLineConnectorProgress(progress)
        if (progress >= 100) {
          clearInterval(lineInterval)
          setShowAgentTerminal(true)
          addTimeout(typeAgentCode, 300)
        }
      }, 20)
    }

    const typeAgentCode = () => {
      let lineIndex = 0
      const lines = [...AGENT_SEQUENCE.lines]

      const typeLine = () => {
        if (lineIndex < lines.length) {
          const currentLine = lines[lineIndex]
          const currentDelay = currentLine.delay
          setAgentLines((prev) => [...prev, currentLine.text])
          lineIndex++
          addTimeout(typeLine, currentDelay)
        } else {
          addTimeout(runAgentOutputs, 400)
        }
      }
      typeLine()
    }

    const runAgentOutputs = () => {
      setIsAgentRunning(true)
      let outputIndex = 0
      const outputs = [...AGENT_SEQUENCE.outputs]

      const showOutput = () => {
        if (outputIndex < outputs.length) {
          const currentOutput = outputs[outputIndex]
          const currentDelay = currentOutput.delay
          setAgentOutputs((prev) => [...prev, currentOutput.text])
          outputIndex++
          if (outputIndex < outputs.length) {
            addTimeout(showOutput, currentDelay)
          } else {
            addTimeout(() => setIsAgentRunning(false), 300)
          }
        }
      }
      showOutput()
    }

    addTimeout(typeCommand, 800)

    return () => {
      timeoutsRef.current.forEach(clearTimeout)
      intervalsRef.current.forEach(clearInterval)
    }
  }, [])

  return (
    <section className="relative min-h-screen pb-12 overflow-hidden">
      <div className="absolute inset-0 -top-20 -left-20 -right-20 overflow-hidden">
        <div className="absolute inset-0 grid grid-cols-10 sm:grid-cols-15 lg:grid-cols-20 gap-3 sm:gap-4 lg:gap-5 p-4 opacity-30">
          {[...Array(240)].map((_, i) => (
            <div
              key={i}
              className={`aspect-square rounded-sm transition-all duration-700 ${
                activeCells.has(i)
                  ? "bg-[var(--color-neutral-500)] shadow-[0_0_30px_rgba(230,232,235,0.3)]"
                  : "border border-[var(--color-neutral-700)] bg-transparent"
              }`}
              style={{
                opacity: activeCells.has(i) ? 0.6 : 0.2,
              }}
            />
          ))}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background" />
      </div>

      <div className="relative mx-auto max-w-[1400px] px-2.5 sm:px-6 lg:px-12">
        <div className="flex flex-col lg:items-center lg:justify-center gap-12 lg:gap-20">
          {/* Left column - text content */}
          <div className="lg:max-w-2xl lg:min-h-screen flex flex-col justify-center pt-24 lg:pt-20 text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-[var(--color-neutral-700)] bg-[var(--color-neutral-950)] px-3 py-1 text-xs text-[var(--color-neutral-400)] mb-8 mx-auto">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-neutral-300)]" />
              v2.0 now available
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[var(--color-neutral-100)] leading-[1.1]">
              Real-time API monitoring,
              <br />
              right from your
              <br />
              <span className="text-[var(--color-neutral-400)]">CLI</span>
            </h1>

            <p className="mt-6 text-lg text-[var(--color-neutral-400)] max-w-2xl leading-relaxed mx-auto">
              DevPulse monitors your APIs in real time — tracking health, latency, errors, and global availability across regions. No SDKs. No rebuilds. Just one command.
            </p>

            <div className="mt-10 flex justify-center w-full">
              <Button
                size="lg"
                className="bg-[var(--color-neutral-100)] hover:bg-[var(--color-neutral-50)] text-[var(--color-neutral-950)] font-semibold px-6 w-full max-w-md"
              >
                Start monitoring
                <ArrowRight className="ml-2 h-4 w-4" weight="bold" />
              </Button>
            </div>
          </div>

          {/* Right column - terminals */}
          <div className="w-full lg:max-w-4xl lg:min-h-screen flex flex-col items-center justify-center lg:pt-20 gap-8">
            {/* Terminal 1 - Monitor CLI */}
            <div className="w-full rounded-2xl border-2 border-[var(--color-neutral-700)] bg-gradient-to-br from-[var(--color-neutral-950)] to-[var(--color-neutral-900)] overflow-hidden shadow-2xl">
              <div className="flex items-center justify-between px-5 py-4 border-b-2 border-[var(--color-neutral-700)] bg-[var(--color-neutral-900)]">
                <div className="flex items-center gap-3">
                  <div className="flex gap-1.5">
                    <div className="h-2.5 w-2.5 rounded-full bg-[var(--color-neutral-600)]" />
                    <div className="h-2.5 w-2.5 rounded-full bg-[var(--color-neutral-600)]" />
                    <div className="h-2.5 w-2.5 rounded-full bg-[var(--color-neutral-600)]" />
                  </div>
                  <span className="text-xs font-semibold text-[var(--color-neutral-400)] uppercase tracking-wider">devpulse monitor</span>
                </div>
                <span className="text-[10px] font-medium px-2 py-1 rounded bg-[var(--color-neutral-800)] text-[var(--color-neutral-500)] border border-[var(--color-neutral-700)]">live</span>
              </div>

              <div className="p-6 font-mono text-sm bg-[var(--color-neutral-950)] relative">
                <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, currentColor 2px, currentColor 4px)'}}></div>
                <div className="relative">
                  <div className="flex items-center gap-2 text-[var(--color-neutral-200)]">
                    <span className="text-[var(--color-neutral-600)]">❯</span>
                    <span className="text-[var(--color-neutral-600)]">~</span>
                    <span className="text-[var(--color-neutral-300)]">
                      {typedCommand}
                      {cursorVisible && (
                        <span className="inline-block w-2 h-4 bg-[var(--color-neutral-300)] ml-0.5 animate-pulse" />
                      )}
                    </span>
                  </div>

                <div className="mt-5 space-y-2.5">
                  {visibleSteps.map((stepIndex) => (
                    <div
                      key={stepIndex}
                      className="flex items-center gap-3 text-[var(--color-neutral-400)] animate-in fade-in slide-in-from-left-2 duration-300"
                    >
                      <div className="flex-shrink-0">
                        {stepIndex < visibleSteps.length - 1 || showStatus ? (
                          <span className="text-[var(--color-neutral-300)] font-semibold">✓</span>
                        ) : (
                          <span className="inline-block h-3 w-3 border-2 border-[var(--color-neutral-400)] border-t-transparent rounded-full animate-spin" />
                        )}
                      </div>
                      <span className="text-[var(--color-neutral-350)]">{CLI_SEQUENCE.steps[stepIndex].text}</span>
                    </div>
                  ))}
                </div>

                {showStatus && (
                  <div className="mt-5 p-4 rounded-lg border border-[var(--color-neutral-600)] bg-[var(--color-neutral-900)] animate-in fade-in zoom-in-95 duration-500">
                    <div className="flex items-center gap-2 text-[var(--color-neutral-300)] text-xs uppercase tracking-wider mb-3">
                      <Play weight="fill" className="h-3 w-3" />
                      <span>Monitoring Live</span>
                    </div>
                    <div className="space-y-1.5 text-xs">
                      <div className="flex justify-between">
                        <span className="text-[var(--color-neutral-500)]">endpoint</span>
                        <span className="text-[var(--color-neutral-200)]">{CLI_SEQUENCE.status.endpoint}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[var(--color-neutral-500)]">status</span>
                        <span className="text-[var(--color-neutral-300)]">{CLI_SEQUENCE.status.coldStart}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Connector line */}
            {lineConnectorProgress > 0 && (
              <div className="relative w-px h-16 flex items-center justify-center">
                <div
                  className="absolute top-0 w-px bg-gradient-to-b from-[var(--color-neutral-400)] to-[var(--color-neutral-500)] transition-all duration-100"
                  style={{
                    height: `${lineConnectorProgress}%`,
                    boxShadow: "0 0 20px rgba(230, 232, 235, 0.4), 0 0 40px rgba(230, 232, 235, 0.2)",
                  }}
                />
                {lineConnectorProgress >= 100 && (
                  <div className="absolute -bottom-1 h-3 w-3 rounded-full bg-[var(--color-neutral-300)] animate-pulse shadow-[0_0_15px_rgba(230, 232, 235, 0.4)]" />
                )}
              </div>
            )}

            {/* Terminal 2 - CLI Output */}
            {showAgentTerminal && (
              <div
                className="w-full rounded-2xl border-2 border-[var(--color-neutral-600)] bg-gradient-to-br from-neutral-900 to-neutral-950 overflow-hidden animate-in fade-in zoom-in-95 duration-500"
                style={{
                  boxShadow: "0 0 60px -10px rgba(230, 232, 235, 0.15)",
                }}
              >
                <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--color-neutral-700)] bg-neutral-900/50">
                  <div className="flex gap-1.5">
                    <div className="h-3 w-3 rounded-full bg-[var(--color-neutral-600)]" />
                    <div className="h-3 w-3 rounded-full bg-[var(--color-neutral-600)]" />
                    <div className="h-3 w-3 rounded-full bg-[var(--color-neutral-500)]" />
                  </div>
                  <div className="flex-1 text-center">
                    <span className="text-xs font-semibold tracking-wider text-neutral-300 uppercase flex items-center justify-center gap-2">
                      <Code weight="bold" className="h-4 w-4" />
                      CLI Output
                    </span>
                  </div>
                  <div className="text-xs font-medium px-2 py-1 bg-neutral-800 border border-neutral-700 text-neutral-400 rounded">
                    v1.0
                  </div>
                </div>

                <div className="p-5 font-mono text-sm">
                  <div className="space-y-1">
                    {agentLines.map((line, i) => (
                      <div key={i} className="animate-in fade-in slide-in-from-left-1 duration-150 text-neutral-300 leading-relaxed">
                        {line === "" ? (
                          <div className="h-5" />
                        ) : line.startsWith("import") ? (
                          <span>
                            <span className="text-neutral-500">import</span>
                            <span className="text-neutral-400">
                              {" "}
                              {"{"} Agent {"}"}{" "}
                            </span>
                            <span className="text-neutral-500">from</span>
                            <span className="text-neutral-300"> '@anchor/sdk'</span>
                          </span>
                        ) : line.startsWith("const") ? (
                          <span>
                            <span className="text-neutral-500">const</span>
                            <span className="text-neutral-400"> agent = </span>
                            <span className="text-neutral-500">new</span>
                            <span className="text-neutral-300"> Agent</span>
                            <span className="text-neutral-400">({"{"}</span>
                          </span>
                        ) : line.startsWith("await") ? (
                          <span>
                            <span className="text-neutral-500">await</span>
                            <span className="text-neutral-400"> agent.</span>
                            <span className="text-neutral-300">run</span>
                            <span className="text-neutral-400">(</span>
                            <span className="text-neutral-300">&#39;Analyze the codebase&#39;</span>
                            <span className="text-neutral-400">)</span>
                          </span>
                        ) : line.includes(":") ? (
                          <span className="text-neutral-400">
                            {"  "}
                            {line.split(":")[0].trim()}
                            <span className="text-neutral-500;">:</span>
                            <span className="text-neutral-300">{line.split(":")[1]}</span>
                          </span>
                        ) : (
                          <span className="text-neutral-300">{line}</span>
                        )}
                      </div>
                    ))}
                  </div>

                  {agentOutputs.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-neutral-700">
                      <div className="flex items-center gap-2 text-xs text-neutral-500 mb-3 font-semibold uppercase tracking-wider">
                        <Terminal weight="bold" className="h-4 w-4" />
                        <span>Results</span>
                        {isAgentRunning && (
                          <span className="flex gap-0.5 ml-2">
                            <span
                              className="h-1.5 w-1.5 rounded-full bg-neutral-400 animate-bounce"
                              style={{ animationDelay: "0ms" }}
                            />
                            <span
                              className="h-1.5 w-1.5 rounded-full bg-neutral-400 animate-bounce"
                              style={{ animationDelay: "150ms" }}
                            />
                            <span
                              className="h-1.5 w-1.5 rounded-full bg-neutral-400 animate-bounce"
                              style={{ animationDelay: "300ms" }}
                            />
                          </span>
                        )}
                      </div>
                      <div className="space-y-1.5">
                        {agentOutputs.map((output, i) => (
                          <div
                            key={i}
                            className={`text-xs animate-in fade-in slide-in-from-left-1 duration-200 font-medium ${
                              output.startsWith("✓")
                                ? "text-neutral-300"
                                : "text-neutral-400"
                            }`}
                          >
                            <span className="text-neutral-500 mr-2">→</span>
                            {output}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface TerminalLine {
  type: "command" | "output" | "comment";
  text: string;
  delay?: number;
}

const terminalLines: TerminalLine[] = [
  { type: "comment", text: "# Get GitHub repository stats" },
  { type: "command", text: "$ devpulse github stats --repo facebook/react" },
  { type: "output", text: "" },
  { type: "output", text: "┌─────────────────────────────────────────────────────┐" },
  { type: "output", text: "│  Repository: facebook/react                         │" },
  { type: "output", text: "├─────────────────────────────────────────────────────┤" },
  { type: "output", text: "│  ⭐ Stars        234,521    │  🍴 Forks     48,234  │" },
  { type: "output", text: "│  👁  Watchers     6,789    │  🔧 Issues     1,245  │" },
  { type: "output", text: "├─────────────────────────────────────────────────────┤" },
  { type: "output", text: "│  Languages:                                         │" },
  { type: "output", text: "│  ████████████████████░░░░  JavaScript  78.4%        │" },
  { type: "output", text: "│  ████░░░░░░░░░░░░░░░░░░░░  TypeScript  15.2%        │" },
  { type: "output", text: "│  █░░░░░░░░░░░░░░░░░░░░░░░  Other        6.4%        │" },
  { type: "output", text: "├─────────────────────────────────────────────────────┤" },
  { type: "output", text: "│  📊 Health Score: 94/100   │  ✅ Status: Active    │" },
  { type: "output", text: "└─────────────────────────────────────────────────────┘" },
  { type: "output", text: "" },
  { type: "comment", text: "# Check user activity" },
  { type: "command", text: "$ devpulse github activity torvalds --json" },
  { type: "output", text: '{ "commits_7d": 42, "commits_30d": 156, "active": true }' },
];

export function TerminalDemo() {
  const [visibleLines, setVisibleLines] = useState<number>(0);
  const [isTyping, setIsTyping] = useState(false);
  const [currentText, setCurrentText] = useState("");

  useEffect(() => {
    if (visibleLines >= terminalLines.length) {
      // Reset and loop
      const timer = setTimeout(() => {
        setVisibleLines(0);
        setCurrentText("");
      }, 4000);
      return () => clearTimeout(timer);
    }

    const currentLine = terminalLines[visibleLines];
    
    if (currentLine.type === "command") {
      // Simulate typing for commands
      setIsTyping(true);
      let charIndex = 0;
      const text = currentLine.text;
      
      const typingInterval = setInterval(() => {
        if (charIndex < text.length) {
          setCurrentText(text.substring(0, charIndex + 1));
          charIndex++;
        } else {
          clearInterval(typingInterval);
          setIsTyping(false);
          setTimeout(() => {
            setCurrentText("");
            setVisibleLines((prev) => prev + 1);
          }, 300);
        }
      }, 30);

      return () => clearInterval(typingInterval);
    } else {
      // Instant output
      const timer = setTimeout(() => {
        setVisibleLines((prev) => prev + 1);
      }, currentLine.type === "output" && currentLine.text ? 80 : 150);

      return () => clearTimeout(timer);
    }
  }, [visibleLines]);

  return (
    <div className="relative rounded-xl overflow-hidden shadow-2xl border border-border">
      {/* Terminal header */}
      <div className="flex items-center gap-2 px-4 py-3 bg-muted/80 border-b border-border">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/80" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <div className="w-3 h-3 rounded-full bg-green-500/80" />
        </div>
        <span className="text-xs text-muted-foreground font-mono ml-2">
          devpulse — zsh — 80×24
        </span>
      </div>

      {/* Terminal content */}
      <div className="bg-[hsl(222,22%,6%)] p-4 font-mono text-sm min-h-[400px] max-h-[400px] overflow-hidden">
        {terminalLines.slice(0, visibleLines).map((line, index) => (
          <div
            key={index}
            className={cn(
              "whitespace-pre",
              line.type === "comment" && "text-muted-foreground",
              line.type === "command" && "text-primary",
              line.type === "output" && "text-foreground/90"
            )}
          >
            {line.text}
          </div>
        ))}
        
        {/* Currently typing line */}
        {isTyping && (
          <div className="text-primary whitespace-pre">
            {currentText}
            <span className="animate-pulse">▊</span>
          </div>
        )}

        {/* Cursor when not typing */}
        {!isTyping && visibleLines < terminalLines.length && (
          <div className="text-primary">
            <span className="animate-pulse">▊</span>
          </div>
        )}
      </div>
    </div>
  );
}

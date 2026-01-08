import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";

interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
  showLineNumbers?: boolean;
  className?: string;
}

export function CodeBlock({
  code,
  language = "bash",
  filename,
  showLineNumbers = false,
  className,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const lines = code.trim().split("\n");

  return (
    <div className={cn("code-block group", className)}>
      {filename && (
        <div className="code-block-header">
          <span className="text-xs text-muted-foreground font-mono">
            {filename}
          </span>
          <button
            onClick={copyToClipboard}
            className="text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Copy code"
          >
            {copied ? (
              <Check className="h-4 w-4 text-tip" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </button>
        </div>
      )}
      <div className="relative">
        <pre className="overflow-x-auto">
          <code className={`language-${language}`}>
            {showLineNumbers ? (
              <div className="table">
                {lines.map((line, i) => (
                  <div key={i} className="table-row">
                    <span className="table-cell pr-4 text-right text-muted-foreground/50 select-none w-8">
                      {i + 1}
                    </span>
                    <span className="table-cell">{line}</span>
                  </div>
                ))}
              </div>
            ) : (
              code.trim()
            )}
          </code>
        </pre>
        {!filename && (
          <button
            onClick={copyToClipboard}
            className="absolute top-2 right-2 p-2 rounded-md bg-muted/80 text-muted-foreground hover:text-foreground hover:bg-muted transition-all opacity-0 group-hover:opacity-100"
            aria-label="Copy code"
          >
            {copied ? (
              <Check className="h-4 w-4 text-tip" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </button>
        )}
      </div>
    </div>
  );
}

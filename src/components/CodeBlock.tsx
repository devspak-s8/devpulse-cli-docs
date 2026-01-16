import { useState, useEffect, useRef } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import Prism from "prismjs";
import "prismjs/components/prism-bash";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-python";
import "prismjs/components/prism-json";
import "prismjs/components/prism-go";
import "prismjs/components/prism-rust";
import "prismjs/components/prism-java";

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
  const codeRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (codeRef.current) {
      Prism.highlightElement(codeRef.current);
    }
  }, [code, language]);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    toast.success("Copied to clipboard!", {
      description: filename || `${language} code snippet`,
      duration: 2000,
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const lines = code.trim().split("\n");

  return (
    <div className={cn("code-block group border-2 border-neutral-700 rounded-xl overflow-hidden bg-neutral-950/50 shadow-lg", className)}>
      {filename && (
        <div className="code-block-header bg-neutral-900 border-b-2 border-neutral-700">
          <span className="text-xs text-neutral-400 font-mono flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red-500/80" />
            <span className="w-2 h-2 rounded-full bg-yellow-500/80" />
            <span className="w-2 h-2 rounded-full bg-green-500/80" />
            <span className="ml-2">{filename}</span>
          </span>
          <button
            onClick={copyToClipboard}
            className={cn(
              "flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-md transition-all font-medium",
              copied 
                ? "text-green-400 bg-green-500/10 border border-green-500/20" 
                : "text-neutral-300 hover:text-neutral-100 hover:bg-neutral-800 border border-neutral-700"
            )}
            aria-label="Copy code"
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
      )}
      {!filename && (
        <button
          onClick={copyToClipboard}
          className={cn(
            "absolute top-3 right-3 z-10 flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-md transition-all font-medium opacity-0 group-hover:opacity-100",
            copied 
              ? "text-green-400 bg-green-500/10 border border-green-500/20" 
              : "text-neutral-300 hover:text-neutral-100 bg-neutral-800 border border-neutral-700"
          )}
          aria-label="Copy code"
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5" />
              <span>Copied!</span>
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5" />
              <span>Copy</span>
            </>
          )}
        </button>
      )}
      <div className="relative">
        <pre className="overflow-x-auto !bg-neutral-950 p-4">
          {showLineNumbers ? (
            <code ref={codeRef} className={`language-${language}`}>
              <div className="table">
                {lines.map((line, i) => (
                  <div key={i} className="table-row">
                    <span className="table-cell pr-4 text-right text-muted-foreground/50 select-none w-8 border-r border-border/50 mr-4">
                      {i + 1}
                    </span>
                    <span className="table-cell pl-4">{line}</span>
                  </div>
                ))}
              </div>
            </code>
          ) : (
            <code ref={codeRef} className={`language-${language}`}>
              {code.trim()}
            </code>
          )}
        </pre>
        {!filename && (
          <button
            onClick={copyToClipboard}
            className={cn(
              "absolute top-2 right-2 flex items-center gap-1.5 text-xs px-2 py-1.5 rounded-md transition-all",
              copied
                ? "bg-green-500/20 text-green-500"
                : "bg-muted/80 text-muted-foreground hover:text-foreground hover:bg-muted opacity-0 group-hover:opacity-100"
            )}
            aria-label="Copy code"
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5" />
                <span>Copy</span>
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
}

import { AlertCircle, Info, Lightbulb, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface CalloutProps {
  type?: "info" | "warning" | "tip" | "danger";
  title?: string;
  children: ReactNode;
  className?: string;
}

const icons = {
  info: Info,
  warning: AlertTriangle,
  tip: Lightbulb,
  danger: AlertCircle,
};

const titles = {
  info: "Note",
  warning: "Warning",
  tip: "Tip",
  danger: "Caution",
};

export function Callout({
  type = "info",
  title,
  children,
  className,
}: CalloutProps) {
  const Icon = icons[type];
  const displayTitle = title || titles[type];

  return (
    <div
      className={cn(
        "callout",
        {
          "callout-info": type === "info",
          "callout-warning": type === "warning",
          "callout-tip": type === "tip",
          "callout-danger": type === "danger",
        },
        className
      )}
    >
      <div className="flex items-start gap-3">
        <Icon
          className={cn("h-5 w-5 mt-0.5 shrink-0", {
            "text-info": type === "info",
            "text-warning": type === "warning",
            "text-tip": type === "tip",
            "text-danger": type === "danger",
          })}
        />
        <div className="flex-1 min-w-0">
          <p
            className={cn("font-medium mb-1", {
              "text-info": type === "info",
              "text-warning": type === "warning",
              "text-tip": type === "tip",
              "text-danger": type === "danger",
            })}
          >
            {displayTitle}
          </p>
          <div className="text-sm text-foreground/80">{children}</div>
        </div>
      </div>
    </div>
  );
}

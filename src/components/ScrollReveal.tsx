import { ReactNode } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { cn } from "@/lib/utils";

type AnimationDirection = "up" | "down" | "left" | "right" | "scale" | "fade";

interface ScrollRevealProps {
  children: ReactNode;
  direction?: AnimationDirection;
  delay?: number;
  duration?: number;
  className?: string;
  threshold?: number;
}

const animations: Record<AnimationDirection, { initial: string; animate: string }> = {
  up: {
    initial: "opacity-0 translate-y-12",
    animate: "opacity-100 translate-y-0",
  },
  down: {
    initial: "opacity-0 -translate-y-12",
    animate: "opacity-100 translate-y-0",
  },
  left: {
    initial: "opacity-0 translate-x-12",
    animate: "opacity-100 translate-x-0",
  },
  right: {
    initial: "opacity-0 -translate-x-12",
    animate: "opacity-100 translate-x-0",
  },
  scale: {
    initial: "opacity-0 scale-90",
    animate: "opacity-100 scale-100",
  },
  fade: {
    initial: "opacity-0",
    animate: "opacity-100",
  },
};

export function ScrollReveal({
  children,
  direction = "up",
  delay = 0,
  duration = 600,
  className,
  threshold = 0.1,
}: ScrollRevealProps) {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>({ threshold });
  const animation = animations[direction];

  return (
    <div
      ref={ref}
      className={cn(
        "transition-all ease-out",
        isVisible ? animation.animate : animation.initial,
        className
      )}
      style={{
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

// Staggered children wrapper
interface ScrollRevealGroupProps {
  children: ReactNode[];
  direction?: AnimationDirection;
  staggerDelay?: number;
  duration?: number;
  className?: string;
  childClassName?: string;
  threshold?: number;
}

export function ScrollRevealGroup({
  children,
  direction = "up",
  staggerDelay = 100,
  duration = 600,
  className,
  childClassName,
  threshold = 0.1,
}: ScrollRevealGroupProps) {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>({ threshold });
  const animation = animations[direction];

  return (
    <div ref={ref} className={className}>
      {children.map((child, index) => (
        <div
          key={index}
          className={cn(
            "transition-all ease-out",
            isVisible ? animation.animate : animation.initial,
            childClassName
          )}
          style={{
            transitionDuration: `${duration}ms`,
            transitionDelay: `${index * staggerDelay}ms`,
          }}
        >
          {child}
        </div>
      ))}
    </div>
  );
}

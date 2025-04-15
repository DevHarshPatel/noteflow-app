import * as React from "react"
import { cn } from "@/lib/utils"

interface GlowProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "above" | "below"
}

export function Glow({ variant = "above", className, ...props }: GlowProps) {
  return (
    <div
      className={cn(
        "absolute inset-0 z-0",
        variant === "above" ? "top-0" : "bottom-0",
        className
      )}
      {...props}
    >
      <div
        className={cn(
          "absolute h-[500px] w-[500px] rounded-full",
          variant === "above"
            ? "top-[-250px] left-1/2 -translate-x-1/2 bg-blue-500/20 blur-[100px]"
            : "bottom-[-250px] left-1/2 -translate-x-1/2 bg-blue-500/20 blur-[100px]"
        )}
      />
    </div>
  )
} 
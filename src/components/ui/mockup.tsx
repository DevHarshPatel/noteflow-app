import * as React from "react"
import { cn } from "@/lib/utils"

interface MockupProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export function Mockup({ children, className, ...props }: MockupProps) {
  return (
    <div
      className={cn(
        "relative rounded-xl border bg-background p-2 shadow-sm",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
} 
import * as React from "react"

import { cn } from "@/lib/utils"

interface ProfileProps extends React.HTMLAttributes<HTMLDivElement> {}

export function ProfileShell({
  children,
  className,
  ...props
}: ProfileProps) {
  return (
    <div className={cn("grid items-start gap-8", className)} {...props}>
      {children}
    </div>
  )
}
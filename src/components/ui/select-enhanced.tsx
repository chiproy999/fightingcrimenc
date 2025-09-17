import * as React from "react"
import { cn } from "@/lib/utils"

export interface SelectEnhancedProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  id?: string;
  name?: string;
  children?: React.ReactNode;
}

const SelectEnhanced = React.forwardRef<HTMLSelectElement, SelectEnhancedProps>(
  ({ className, id, name, children, ...props }, ref) => {
    const generatedId = React.useId();
    const selectId = id || generatedId;
    const selectName = name || selectId;
    
    return (
      <select
        id={selectId}
        name={selectName}
        className={cn(
          "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
      </select>
    )
  }
)
SelectEnhanced.displayName = "SelectEnhanced"

export { SelectEnhanced }
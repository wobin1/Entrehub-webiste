"use client"

import * as React from "react"
import { Check, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

// Need a simple Badge component since it's likely missing
const Badge = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
      "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
      className
    )}
    {...props}
  />
)

interface MultiSelectProps {
  options: { label: string; value: string }[]
  value: string[]
  onValueChange: (value: string[]) => void
  placeholder?: string
  className?: string
}

export function MultiSelect({
  options,
  value,
  onValueChange,
  className,
}: MultiSelectProps) {
  const toggleOption = (optionValue: string) => {
    const newValue = value.includes(optionValue)
      ? value.filter((v) => v !== optionValue)
      : [...value, optionValue]
    onValueChange(newValue)
  }

  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex flex-wrap gap-2">
        {value.map((v) => {
          const option = options.find((opt) => opt.value === v)
          if (!option) return null
          return (
            <Badge key={v} className="pl-3 pr-1 py-1">
              {option.label}
              <button
                type="button"
                className="ml-2 rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                onClick={() => toggleOption(v)}
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )
        })}
      </div>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        {options.map((option) => (
          <Button
            key={option.value}
            type="button"
            variant={value.includes(option.value) ? "default" : "outline"}
            size="sm"
            className="justify-start px-3 text-left font-normal"
            onClick={() => toggleOption(option.value)}
          >
            <Check
              className={cn(
                "mr-2 h-4 w-4",
                value.includes(option.value) ? "opacity-100" : "opacity-0"
              )}
            />
            {option.label}
          </Button>
        ))}
      </div>
    </div>
  )
}

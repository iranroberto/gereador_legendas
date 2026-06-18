"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface AnimatedSwitchProps {
  checked: boolean
  onChange: (checked: boolean) => void
  label: string
  description?: string
  icon?: React.ReactNode
}

export function AnimatedSwitch({
  checked,
  onChange,
  label,
  description,
  icon,
}: AnimatedSwitchProps) {
  return (
    <motion.div
      className={cn(
        "flex items-center justify-between p-4 rounded-xl border transition-all duration-300 cursor-pointer",
        checked
          ? "border-primary/50 bg-primary/5"
          : "border-border bg-card hover:border-border/80"
      )}
      onClick={() => onChange(!checked)}
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
    >
      <div className="flex items-center gap-3">
        {icon && (
          <div
            className={cn(
              "w-8 h-8 rounded-lg flex items-center justify-center transition-colors",
              checked ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"
            )}
          >
            {icon}
          </div>
        )}
        <div>
          <p className="font-medium text-foreground">{label}</p>
          {description && (
            <p className="text-sm text-muted-foreground">{description}</p>
          )}
        </div>
      </div>

      <div
        className={cn(
          "w-12 h-7 rounded-full p-1 transition-colors duration-300",
          checked ? "bg-primary" : "bg-muted"
        )}
      >
        <motion.div
          className="w-5 h-5 rounded-full bg-white shadow-lg"
          animate={{ x: checked ? 20 : 0 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        />
      </div>
    </motion.div>
  )
}

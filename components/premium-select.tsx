"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { ChevronDown } from "lucide-react"

interface Option {
  value: string
  label: string
  icon?: React.ReactNode
}

interface PremiumSelectProps {
  value: string
  onChange: (value: string) => void
  options: Option[]
  label?: string
  placeholder?: string
}

export function PremiumSelect({
  value,
  onChange,
  options,
  label,
  placeholder = "Selecione uma opção",
}: PremiumSelectProps) {
  const selectedOption = options.find((opt) => opt.value === value)

  return (
    <div className="space-y-2">
      {label && (
        <label className="text-sm font-medium text-foreground">{label}</label>
      )}
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={cn(
            "w-full appearance-none bg-card border border-border rounded-xl px-4 py-3",
            "text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary",
            "transition-all duration-300 cursor-pointer",
            "hover:border-border/80"
          )}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
      </div>
    </div>
  )
}

interface ColorSelectorProps {
  value: string
  onChange: (value: string) => void
  label?: string
}

const colors = [
  { value: "blue", color: "#3B82F6", label: "Azul" },
  { value: "green", color: "#22C55E", label: "Verde" },
  { value: "red", color: "#EF4444", label: "Vermelho" },
  { value: "purple", color: "#A855F7", label: "Roxo" },
  { value: "orange", color: "#F97316", label: "Laranja" },
]

export function ColorSelector({ value, onChange, label }: ColorSelectorProps) {
  return (
    <div className="space-y-2">
      {label && (
        <label className="text-sm font-medium text-foreground">{label}</label>
      )}
      <div className="flex gap-3">
        {colors.map((item) => (
          <motion.button
            key={item.value}
            type="button"
            onClick={() => onChange(item.value)}
            className={cn(
              "w-10 h-10 rounded-xl transition-all duration-300 relative",
              value === item.value && "ring-2 ring-offset-2 ring-offset-background ring-white"
            )}
            style={{ backgroundColor: item.color }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            title={item.label}
          >
            {value === item.value && (
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
              >
                <svg
                  className="w-5 h-5 text-white drop-shadow-lg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </motion.div>
            )}
          </motion.button>
        ))}
      </div>
    </div>
  )
}

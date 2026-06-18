"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface GlowButtonProps {
  children: React.ReactNode
  onClick?: () => void
  disabled?: boolean
  loading?: boolean
  variant?: "primary" | "secondary" | "outline"
  size?: "sm" | "md" | "lg"
  className?: string
  type?: "button" | "submit"
}

export function GlowButton({
  children,
  onClick,
  disabled = false,
  loading = false,
  variant = "primary",
  size = "md",
  className,
  type = "button",
}: GlowButtonProps) {
  const baseStyles =
    "relative font-semibold rounded-xl transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"

  const variants = {
    primary:
      "bg-primary text-primary-foreground hover:brightness-110 glow-button",
    secondary:
      "bg-secondary text-secondary-foreground hover:bg-secondary/80 border border-border",
    outline:
      "bg-transparent border border-primary text-primary hover:bg-primary/10",
  }

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
    >
      {loading ? (
        <motion.div
          className="w-5 h-5 border-2 border-current border-t-transparent rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
      ) : null}
      {children}
    </motion.button>
  )
}

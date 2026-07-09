"use client"

import { motion } from "framer-motion"
import { BarChart3, Megaphone, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  GeneratedContent,
  platforms,
  Platform,
} from "@/lib/caption-utils"

interface CaptionPreviewProps {
  content?: string
  generated?: GeneratedContent
  loading?: boolean
  platform?: Platform
}

export function CaptionPreview({
  content,
  generated,
  loading = false,
  platform = "whatsapp",
}: CaptionPreviewProps) {
  const platformLabel = platforms.find((item) => item.value === platform)?.label || "Preview"
  const caption = generated?.caption || content || ""
  const hasHashtags = Boolean(
    generated && Object.values(generated.hashtags).flat().length > 0
  )

  if (loading) {
    return (
      <div className="glass rounded-2xl p-5 space-y-4">
        {[72, 92, 64, 84, 58, 78].map((width, index) => (
          <motion.div
            key={index}
            className="h-3 rounded-full bg-white/10"
            style={{ width: `${width}%` }}
            animate={{ opacity: [0.35, 0.75, 0.35] }}
            transition={{ duration: 1.4, repeat: Infinity, delay: index * 0.08 }}
          />
        ))}
      </div>
    )
  }

  if (!caption) {
    return (
      <div className="glass rounded-2xl min-h-[420px] border border-white/10 p-8 flex items-center justify-center text-center">
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-400/10 text-cyan-200">
            <Sparkles className="h-7 w-7" />
          </div>
          <p className="font-semibold text-white">Preview em tempo real</p>
          <p className="mt-2 max-w-xs text-sm text-slate-400">
            Preencha o produto e ajuste os controles para ver legenda, CTA,
            hashtags e score da IA.
          </p>
        </motion.div>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4"
    >
      <div className="glass rounded-2xl border border-white/10 p-5">
        <div className="mb-4 flex items-center justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-cyan-200">
              {platformLabel}
            </p>
            <h3 className="mt-1 text-lg font-semibold text-white">Legenda</h3>
          </div>
          {generated && (
            <div className="rounded-xl border border-emerald-300/20 bg-emerald-300/10 px-3 py-2 text-right">
              <p className="text-xs text-emerald-100">IA Score</p>
              <p className="text-xl font-bold text-emerald-200">
                {generated.score.total}
              </p>
            </div>
          )}
        </div>
        <pre className="max-h-[430px] overflow-auto whitespace-pre-wrap font-sans text-sm leading-7 text-slate-100">
          {caption}
        </pre>
      </div>

      {generated && (
        <div className="grid gap-4 md:grid-cols-2">
          {generated.cta && (
            <InfoBlock
              icon={<Megaphone className="h-4 w-4" />}
              label="CTA"
              value={generated.cta}
            />
          )}
          <InfoBlock
            icon={<BarChart3 className="h-4 w-4" />}
            label="Score"
            value={`Clareza ${generated.score.clareza} | Conversao ${generated.score.conversao}`}
          />
          {hasHashtags && (
            <div className="md:col-span-2">
              <InfoBlock
                value={Object.values(generated.hashtags).flat().join(" ")}
                multiline
              />
            </div>
          )}
        </div>
      )}
    </motion.div>
  )
}

function InfoBlock({
  icon,
  label,
  value,
  multiline = false,
}: {
  icon?: React.ReactNode
  label?: string
  value: string
  multiline?: boolean
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
      {(icon || label) && (
        <div className="mb-2 flex items-center gap-2 text-cyan-200">
          {icon}
          {label && (
            <span className="text-xs font-semibold uppercase tracking-[0.18em]">
              {label}
            </span>
          )}
        </div>
      )}
      <p
        className={cn(
          "text-sm leading-6 text-slate-200",
          multiline && "whitespace-pre-wrap"
        )}
      >
        {value}
      </p>
    </div>
  )
}

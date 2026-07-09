"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import {
  Check,
  Copy,
  Crown,
  Hash,
  History,
  LayoutDashboard,
  Link2,
  MessageCircle,
  PanelLeft,
  Save,
  Search,
  Send,
  Sparkles,
  Trash2,
  Users,
  Wand2,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { CaptionPreview } from "./caption-preview"
import { GlowButton } from "./glow-button"
import { HistoryPanel } from "./history-panel"
import { ParticleBackground } from "./particle-background"
import {
  CaptionOptions,
  defaultOptions,
  generateContent,
  GeneratedContent,
  getSettings,
  hashtagModes,
  hashtagQuantities,
  parseProductDescription,
  platforms,
  Platform,
  saveSettings,
  saveTemplate,
  saveToHistory,
  SavedCaption,
  SavedTemplate,
} from "@/lib/caption-utils"

const sampleInput = `Mini projetor portatil Full HD
Imagem ate 120 polegadas
Conexao HDMI, USB e Wi-Fi
Ideal para filmes, aulas e apresentacoes
De R$ 399,90
R$ 289,90
35% OFF
https://mercadolivre.com.br/projetor-demo
https://chat.whatsapp.com/grupo-demo`

const displayControls: Array<{
  key: keyof Pick<
    CaptionOptions,
    | "showAffiliateLink"
    | "showWhatsAppGroup"
    | "showMercadoLivreSearchLink"
    | "showHashtags"
    | "showBenefits"
  >
  label: string
  icon: React.ReactNode
}> = [
  { key: "showAffiliateLink", label: "Mostrar link afiliado", icon: <Link2 className="h-4 w-4" /> },
  { key: "showWhatsAppGroup", label: "Mostrar grupo Zap", icon: <Users className="h-4 w-4" /> },
  { key: "showMercadoLivreSearchLink", label: "Mostrar busca Mercado Livre", icon: <Search className="h-4 w-4" /> },
  { key: "showHashtags", label: "Mostrar hashtags", icon: <Hash className="h-4 w-4" /> },
  { key: "showBenefits", label: "Mostrar benefícios", icon: <Check className="h-4 w-4" /> },
]

export function CaptionGenerator() {
  const [rawInput, setRawInput] = useState(sampleInput)
  const [options, setOptions] = useState<CaptionOptions>(defaultOptions)
  const [generated, setGenerated] = useState<GeneratedContent | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [copied, setCopied] = useState(false)
  const [showHistory, setShowHistory] = useState(false)
  const [showTemplateModal, setShowTemplateModal] = useState(false)
  const [templateName, setTemplateName] = useState("")
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)

  useEffect(() => {
    const settings = getSettings()
    if (settings) setOptions(settings)
  }, [])

  useEffect(() => {
    saveSettings(options)
  }, [options])

  const product = useMemo(() => parseProductDescription(rawInput), [rawInput])
  const livePreview = useMemo(
    () => generateContent(product, options),
    [product, options]
  )
  const currentOutput = generated || livePreview

  const updateDisplayOption = (
    key: (typeof displayControls)[number]["key"],
    value: boolean
  ) => {
    setOptions((prev) => ({ ...prev, [key]: value }))
    setGenerated(null)
  }

  const updateHashtagOptions = (nextOptions: Partial<CaptionOptions>) => {
    setOptions((prev) => ({
      ...prev,
      showHashtags: true,
      ...nextOptions,
    }))
    setGenerated(null)
  }

  const updateLinkOption = (
    key: "customAffiliateLink" | "customGroupLink" | "mercadoLivreSearchText",
    value: string
  ) => {
    setOptions((prev) => ({
      ...prev,
      [key]: value,
      ...(value.trim()
        ? key === "customAffiliateLink"
          ? { showAffiliateLink: true }
          : key === "customGroupLink"
            ? { showWhatsAppGroup: true }
            : { showMercadoLivreSearchLink: true }
        : {}),
    }))
    setGenerated(null)
  }

  const handleGenerate = useCallback(async () => {
    if (!rawInput.trim()) return
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 500))
    const output = generateContent(parseProductDescription(rawInput), options)
    setGenerated(output)
    saveToHistory({
      id: Date.now().toString(),
      rawInput,
      generatedCaption: output.caption,
      generatedContent: output,
      options,
      platform: options.platform,
      score: output.score.total,
      createdAt: new Date().toISOString(),
      isFavorite: false,
    })
    setIsLoading(false)
  }, [rawInput, options])

  const handleCopy = useCallback(async () => {
    if (!currentOutput.caption) return
    await navigator.clipboard.writeText(currentOutput.caption)
    setCopied(true)
    setTimeout(() => setCopied(false), 1800)
  }, [currentOutput.caption])

  const handleClear = () => {
    setRawInput("")
    setGenerated(null)
  }

  const handleSaveTemplate = () => {
    if (!templateName.trim()) return
    saveTemplate({
      id: Date.now().toString(),
      name: templateName.trim(),
      category: "Personalizado",
      rawInput,
      options,
      createdAt: new Date().toISOString(),
    })
    setTemplateName("")
    setShowTemplateModal(false)
  }

  const handleSelectCaption = (caption: SavedCaption) => {
    setRawInput(caption.rawInput)
    setOptions({ ...defaultOptions, ...caption.options })
    setGenerated(caption.generatedContent || generateContent(parseProductDescription(caption.rawInput), caption.options))
    setShowHistory(false)
  }

  const handleSelectTemplate = (template: SavedTemplate) => {
    setOptions({ ...defaultOptions, ...template.options })
    if (template.rawInput) setRawInput(template.rawInput)
    setGenerated(null)
    setShowHistory(false)
  }

  const scoreItems = [
    ["Clareza", currentOutput.score.clareza],
    ["CTA", currentOutput.score.cta],
    ["Emojis", currentOutput.score.emojis],
    ["Conversao", currentOutput.score.conversao],
    ["Hashtags", currentOutput.score.hashtags],
    ["Urgencia", currentOutput.score.urgencia],
  ] as const

  return (
    <div className="min-h-screen overflow-hidden bg-[#06080d] text-white">
      <ParticleBackground />
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(34,211,238,0.18),transparent_28%),radial-gradient(circle_at_82%_8%,rgba(244,114,182,0.14),transparent_30%),linear-gradient(180deg,rgba(255,255,255,0.04),transparent_45%)]" />

      <div className="relative z-10 flex min-h-screen">
        <Sidebar
          open={mobileSidebarOpen}
          onClose={() => setMobileSidebarOpen(false)}
          onOpenHistory={() => setShowHistory(true)}
        />

        <main className="min-w-0 flex-1">
          <header className="sticky top-0 z-20 border-b border-white/10 bg-[#06080d]/78 backdrop-blur-2xl">
            <div className="flex items-center justify-between gap-3 px-4 py-4 lg:px-8">
              <div className="flex min-w-0 items-center gap-3">
                <button
                  className="rounded-xl border border-white/10 bg-white/5 p-2 text-slate-200 lg:hidden"
                  onClick={() => setMobileSidebarOpen(true)}
                >
                  <PanelLeft className="h-5 w-5" />
                </button>
                <div className="min-w-0">
                  <p className="text-xs uppercase tracking-[0.24em] text-cyan-200">
                    SaaS de copy para social commerce
                  </p>
                  <h1 className="truncate text-xl font-bold md:text-2xl">
                    LegendasPro AI
                  </h1>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowHistory(true)}
                  className="rounded-xl border border-white/10 bg-white/5 p-3 text-slate-200 transition hover:bg-white/10"
                  title="Historico"
                >
                  <History className="h-5 w-5" />
                </button>
                <GlowButton onClick={handleGenerate} loading={isLoading} className="hidden md:flex">
                  <Wand2 className="h-4 w-4" />
                  Gerar Legenda
                </GlowButton>
              </div>
            </div>
          </header>

          <div className="grid gap-6 px-4 py-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(380px,0.95fr)] lg:px-8">
            <section id="generator-section" className="space-y-6">
              <HeroPanel score={currentOutput.score.total} platform={options.platform} />

              <GlassPanel title="Briefing do produto" icon={<MessageCircle className="h-4 w-4" />}>
                <textarea
                  value={rawInput}
                  onChange={(event) => {
                    setRawInput(event.target.value)
                    setGenerated(null)
                  }}
                  placeholder="Cole nome, beneficios, preco, desconto, link afiliado e link do grupo..."
                  className="min-h-[220px] w-full resize-none rounded-2xl border border-white/10 bg-black/20 p-4 text-sm leading-6 text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-cyan-300/50 focus:ring-4 focus:ring-cyan-300/10"
                />
                <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-slate-400">
                  <span className="rounded-full border border-white/10 px-3 py-1">
                    Produto: {product.name}
                  </span>
                  {product.price && (
                    <span className="rounded-full border border-white/10 px-3 py-1">
                      Preco detectado: {product.price}
                    </span>
                  )}
                  {product.link && (
                    <span className="rounded-full border border-white/10 px-3 py-1">
                      Link detectado
                    </span>
                  )}
                </div>
              </GlassPanel>

              <GlassPanel title="Links manuais" icon={<Link2 className="h-4 w-4" />}>
                <div className="grid gap-3 md:grid-cols-3">
                  <label className="block">
                    <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                      Link afiliado
                    </span>
                    <input
                      value={options.customAffiliateLink}
                      onChange={(event) =>
                        updateLinkOption("customAffiliateLink", event.target.value)
                      }
                      placeholder="Cole o link afiliado aqui"
                      className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-cyan-300/50 focus:ring-4 focus:ring-cyan-300/10"
                    />
                  </label>

                  <label className="block">
                    <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                      Busca Mercado Livre
                    </span>
                    <input
                      value={options.mercadoLivreSearchText}
                      onChange={(event) =>
                        updateLinkOption("mercadoLivreSearchText", event.target.value)
                      }
                      placeholder="Ex: W4GBYU-1F43"
                      className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-cyan-300/50 focus:ring-4 focus:ring-cyan-300/10"
                    />
                  </label>

                  <label className="block">
                    <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                      Link do grupo Zap
                    </span>
                    <input
                      value={options.customGroupLink}
                      onChange={(event) =>
                        updateLinkOption("customGroupLink", event.target.value)
                      }
                      placeholder="Cole o link do grupo aqui"
                      className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-cyan-300/50 focus:ring-4 focus:ring-cyan-300/10"
                    />
                  </label>
                </div>
              </GlassPanel>

              <GlassPanel title="Controle de Exibição" icon={<Sparkles className="h-4 w-4" />}>
                <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                  {displayControls.map((control) => (
                    <DisplayToggle
                      key={control.key}
                      checked={Boolean(options[control.key])}
                      label={control.label}
                      icon={control.icon}
                      onChange={(checked) =>
                        updateDisplayOption(control.key, checked)
                      }
                    />
                  ))}
                </div>
              </GlassPanel>

              <GlassPanel title="Gerador de Hashtags" icon={<Hash className="h-4 w-4" />}>
                <div className="space-y-4">
                  <div>
                    <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                      Opções
                    </p>
                    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                      {hashtagModes.map((mode) => (
                        <button
                          key={mode.value}
                          type="button"
                          onClick={() =>
                            updateHashtagOptions({ hashtagMode: mode.value })
                          }
                          className={cn(
                            "rounded-2xl border px-4 py-3 text-sm font-semibold transition",
                            options.hashtagMode === mode.value && options.showHashtags
                              ? "border-cyan-300/40 bg-cyan-300/12 text-cyan-100"
                              : "border-white/10 bg-black/10 text-slate-400 hover:bg-white/[0.04] hover:text-white"
                          )}
                        >
                          {mode.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                      Quantidade
                    </p>
                    <div className="grid grid-cols-3 gap-3">
                      {hashtagQuantities.map((quantity) => (
                        <button
                          key={quantity}
                          type="button"
                          onClick={() =>
                            updateHashtagOptions({ hashtagQuantity: quantity })
                          }
                          className={cn(
                            "rounded-2xl border px-4 py-3 text-sm font-semibold transition",
                            options.hashtagQuantity === quantity && options.showHashtags
                              ? "border-fuchsia-300/40 bg-fuchsia-300/12 text-fuchsia-100"
                              : "border-white/10 bg-black/10 text-slate-400 hover:bg-white/[0.04] hover:text-white"
                          )}
                        >
                          {quantity} hashtags
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </GlassPanel>
            </section>

            <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
              <CaptionPreview
                generated={currentOutput}
                loading={isLoading}
                platform={options.platform}
              />

              <GlassPanel title="IA Score" icon={<Crown className="h-4 w-4" />}>
                <div className="space-y-3">
                  {scoreItems.map(([label, value]) => (
                    <div key={label}>
                      <div className="mb-1 flex items-center justify-between text-xs">
                        <span className="text-slate-300">{label}</span>
                        <span className="font-semibold text-white">{value}</span>
                      </div>
                      <div className="h-2 overflow-hidden rounded-full bg-white/10">
                        <motion.div
                          className="h-full rounded-full bg-gradient-to-r from-cyan-300 via-emerald-300 to-fuchsia-300"
                          initial={{ width: 0 }}
                          animate={{ width: `${value}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </GlassPanel>

              <div className="grid grid-cols-2 gap-3">
                <GlowButton onClick={handleCopy} variant="secondary">
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  {copied ? "Copiado" : "Copiar"}
                </GlowButton>
                <GlowButton onClick={handleClear} variant="outline">
                  <Trash2 className="h-4 w-4" />
                  Limpar
                </GlowButton>
                <GlowButton onClick={() => setShowTemplateModal(true)} variant="outline" className="col-span-2">
                  <Save className="h-4 w-4" />
                  Salvar configuracao como template
                </GlowButton>
              </div>
            </aside>
          </div>

          <div className="fixed bottom-0 left-0 right-0 z-30 border-t border-white/10 bg-[#06080d]/90 p-3 backdrop-blur-2xl md:hidden">
            <GlowButton onClick={handleGenerate} loading={isLoading} className="w-full">
              <Send className="h-4 w-4" />
              Gerar Legenda
            </GlowButton>
          </div>
        </main>
      </div>

      <HistoryPanel
        isOpen={showHistory}
        onClose={() => setShowHistory(false)}
        onSelectCaption={handleSelectCaption}
        onSelectTemplate={handleSelectTemplate}
      />

      <AnimatePresence>
        {showTemplateModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm"
              onClick={() => setShowTemplateModal(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: 16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.98 }}
              className="glass fixed left-1/2 top-1/2 z-50 w-[calc(100%-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-2xl p-6"
            >
              <h3 className="text-lg font-semibold">Salvar template</h3>
              <p className="mt-1 text-sm text-slate-400">
                Guarde esta combinacao de rede, objetivo, estilo e controles.
              </p>
              <input
                value={templateName}
                onChange={(event) => setTemplateName(event.target.value)}
                placeholder="Nome do template"
                className="mt-5 w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 outline-none placeholder:text-slate-500 focus:border-cyan-300/50"
                autoFocus
              />
              <div className="mt-5 grid grid-cols-2 gap-3">
                <GlowButton variant="secondary" onClick={() => setShowTemplateModal(false)}>
                  Cancelar
                </GlowButton>
                <GlowButton onClick={handleSaveTemplate} disabled={!templateName.trim()}>
                  Salvar
                </GlowButton>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

function Sidebar({
  open,
  onClose,
  onOpenHistory,
}: {
  open: boolean
  onClose: () => void
  onOpenHistory: () => void
}) {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    })
    onClose()
  }

  const body = (
    <div className="flex h-full flex-col border-r border-white/10 bg-white/[0.035] p-4 backdrop-blur-2xl">
      <div className="mb-8 flex items-center gap-3 px-2">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-300 to-fuchsia-300 text-slate-950 shadow-[0_0_36px_rgba(34,211,238,0.25)]">
          <Sparkles className="h-5 w-5" />
        </div>
        <div>
          <p className="font-bold">LegendasPro AI</p>
          <p className="text-xs text-slate-400">Workspace</p>
        </div>
      </div>

      <nav className="space-y-2">
        <SidebarItem
          active
          icon={<LayoutDashboard className="h-4 w-4" />}
          label="Gerador"
          onClick={() => scrollToSection("generator-section")}
        />
        <SidebarItem
          icon={<History className="h-4 w-4" />}
          label="Historico"
          onClick={() => {
            onOpenHistory()
            onClose()
          }}
        />
      </nav>
      <div className="mt-auto rounded-2xl border border-cyan-300/20 bg-cyan-300/10 p-4">
        <p className="text-sm font-semibold text-cyan-100">Pro engine</p>
        <p className="mt-1 text-xs leading-5 text-slate-400">
          Presets por rede, score inteligente e regras de saida sempre aplicadas.
        </p>
      </div>
    </div>
  )

  return (
    <>
      <aside className="hidden w-72 shrink-0 lg:block">{body}</aside>
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/70 lg:hidden"
              onClick={onClose}
            />
            <motion.aside
              initial={{ x: -320 }}
              animate={{ x: 0 }}
              exit={{ x: -320 }}
              className="fixed inset-y-0 left-0 z-50 w-72 lg:hidden"
            >
              {body}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

function SidebarItem({
  icon,
  label,
  onClick,
  active = false,
}: {
  icon: React.ReactNode
  label: string
  onClick: () => void
  active?: boolean
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-left text-sm transition",
        active ? "bg-white/10 text-white" : "text-slate-400 hover:bg-white/5 hover:text-white"
      )}
    >
      {icon}
      {label}
    </button>
  )
}

function HeroPanel({ score, platform }: { score: number; platform: Platform }) {
  const label = platforms.find((item) => item.value === platform)?.label
  return (
    <div className="glass overflow-hidden rounded-3xl p-6 md:p-7">
      <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <div className="max-w-2xl">
          <p className="text-xs uppercase tracking-[0.25em] text-cyan-200">
            {label} ready
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
            Legendas, CTAs e hashtags com estrategia por rede.
          </h2>
          <p className="mt-3 text-sm leading-6 text-slate-400 md:text-base">
            Controle cada elemento da saida e gere copys para WhatsApp,
            Telegram, Instagram, Reels, TikTok, Pinterest e Facebook.
          </p>
        </div>
        <div className="rounded-3xl border border-white/10 bg-black/20 p-5 text-center">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
            IA Score
          </p>
          <p className="mt-1 text-5xl font-bold text-white">{score}</p>
          <p className="text-xs text-emerald-200">otimizacao ativa</p>
        </div>
      </div>
    </div>
  )
}

function GlassPanel({
  title,
  icon,
  children,
}: {
  title: string
  icon: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <section className="glass rounded-3xl p-5">
      <div className="mb-4 flex items-center gap-2 text-slate-100">
        <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/8 text-cyan-200">
          {icon}
        </span>
        <h2 className="font-semibold">{title}</h2>
      </div>
      {children}
    </section>
  )
}

function DisplayToggle({
  checked,
  label,
  icon,
  onChange,
}: {
  checked: boolean
  label: string
  icon: React.ReactNode
  onChange: (checked: boolean) => void
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={cn(
        "flex items-center justify-between gap-3 rounded-2xl border p-4 text-left transition",
        checked
          ? "border-cyan-300/35 bg-cyan-300/10 text-white"
          : "border-white/10 bg-black/10 text-slate-400 hover:bg-white/[0.04] hover:text-white"
      )}
    >
      <span className="flex min-w-0 items-center gap-3">
        <span
          className={cn(
            "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl",
            checked ? "bg-cyan-300/20 text-cyan-100" : "bg-white/8 text-slate-400"
          )}
        >
          {icon}
        </span>
        <span className="text-sm font-semibold">{label}</span>
      </span>
      <span
        className={cn(
          "relative h-6 w-11 shrink-0 rounded-full p-1 transition",
          checked ? "bg-cyan-300" : "bg-white/15"
        )}
      >
        <motion.span
          className="block h-4 w-4 rounded-full bg-white shadow-lg"
          animate={{ x: checked ? 20 : 0 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        />
      </span>
    </button>
  )
}

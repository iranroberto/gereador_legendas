"use client"

import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import {
  ChevronRight,
  Clock,
  Copy,
  FileText,
  Heart,
  Star,
  Trash2,
  X,
} from "lucide-react"
import { cn } from "@/lib/utils"
import {
  clearHistory,
  deleteTemplate,
  getHistory,
  getTemplates,
  SavedCaption,
  SavedTemplate,
  toggleFavorite,
} from "@/lib/caption-utils"

interface HistoryPanelProps {
  isOpen: boolean
  onClose: () => void
  onSelectCaption: (caption: SavedCaption) => void
  onSelectTemplate: (template: SavedTemplate) => void
}

export function HistoryPanel({
  isOpen,
  onClose,
  onSelectCaption,
  onSelectTemplate,
}: HistoryPanelProps) {
  const [activeTab, setActiveTab] = useState<"history" | "favorites" | "templates">("history")
  const [history, setHistory] = useState<SavedCaption[]>([])
  const [templates, setTemplates] = useState<SavedTemplate[]>([])

  useEffect(() => {
    if (!isOpen) return
    setHistory(getHistory())
    setTemplates(getTemplates())
  }, [isOpen])

  const favorites = history.filter((item) => item.isFavorite)
  const tabs = [
    { id: "history" as const, label: "Historico", icon: Clock, count: history.length },
    { id: "favorites" as const, label: "Favoritos", icon: Heart, count: favorites.length },
    { id: "templates" as const, label: "Templates", icon: FileText, count: templates.length },
  ]

  const refreshHistory = () => setHistory(getHistory())
  const refreshTemplates = () => setTemplates(getTemplates())

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 26, stiffness: 220 }}
            className="fixed bottom-0 right-0 top-0 z-50 flex w-full max-w-lg flex-col border-l border-white/10 bg-[#070a10]/95 text-white shadow-2xl backdrop-blur-2xl"
          >
            <div className="flex items-center justify-between border-b border-white/10 p-5">
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-cyan-200">
                  LegendasPro AI
                </p>
                <h2 className="mt-1 text-lg font-semibold">Historico e biblioteca</h2>
              </div>
              <button
                onClick={onClose}
                className="rounded-xl border border-white/10 bg-white/5 p-2 text-slate-300 transition hover:bg-white/10"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="grid grid-cols-3 gap-2 border-b border-white/10 p-3">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "rounded-2xl px-3 py-2 text-sm transition",
                    activeTab === tab.id
                      ? "bg-cyan-300/15 text-cyan-100 ring-1 ring-cyan-300/25"
                      : "text-slate-400 hover:bg-white/5 hover:text-white"
                  )}
                >
                  <span className="flex items-center justify-center gap-2">
                    <tab.icon className="h-4 w-4" />
                    {tab.label}
                  </span>
                  <span className="mt-1 block text-xs text-slate-500">{tab.count}</span>
                </button>
              ))}
            </div>

            <div className="flex-1 space-y-3 overflow-y-auto p-4">
              {activeTab === "history" && (
                <>
                  {history.length > 0 && (
                    <button
                      onClick={() => {
                        clearHistory()
                        refreshHistory()
                      }}
                      className="ml-auto flex items-center gap-1 text-xs text-rose-300 hover:text-rose-200"
                    >
                      <Trash2 className="h-3 w-3" />
                      Limpar historico
                    </button>
                  )}
                  {history.length === 0 ? (
                    <EmptyState title="Nada gerado ainda" description="As legendas aprovadas aparecem aqui." />
                  ) : (
                    history.map((item) => (
                      <CaptionItem
                        key={item.id}
                        item={item}
                        onSelect={() => onSelectCaption(item)}
                        onCopy={() => navigator.clipboard.writeText(item.generatedCaption)}
                        onFavorite={() => {
                          toggleFavorite(item.id)
                          refreshHistory()
                        }}
                      />
                    ))
                  )}
                </>
              )}

              {activeTab === "favorites" && (
                favorites.length === 0 ? (
                  <EmptyState title="Sem favoritos" description="Marque as melhores legendas para recuperar rapido." />
                ) : (
                  favorites.map((item) => (
                    <CaptionItem
                      key={item.id}
                      item={item}
                      onSelect={() => onSelectCaption(item)}
                      onCopy={() => navigator.clipboard.writeText(item.generatedCaption)}
                      onFavorite={() => {
                        toggleFavorite(item.id)
                        refreshHistory()
                      }}
                    />
                  ))
                )
              )}

              {activeTab === "templates" && (
                templates.length === 0 ? (
                  <EmptyState title="Sem templates" description="Salve configuracoes para reutilizar depois." />
                ) : (
                  templates.map((template) => (
                    <TemplateItem
                      key={template.id}
                      template={template}
                      onSelect={() => onSelectTemplate(template)}
                      onDelete={() => {
                        deleteTemplate(template.id)
                        refreshTemplates()
                      }}
                    />
                  ))
                )
              )}
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}

function EmptyState({ title, description }: { title: string; description: string }) {
  return (
    <div className="rounded-3xl border border-dashed border-white/10 p-8 text-center">
      <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5 text-cyan-200">
        <FileText className="h-6 w-6" />
      </div>
      <p className="font-semibold">{title}</p>
      <p className="mt-1 text-sm text-slate-400">{description}</p>
    </div>
  )
}

function CaptionItem({
  item,
  onSelect,
  onCopy,
  onFavorite,
}: {
  item: SavedCaption
  onSelect: () => void
  onCopy: () => void
  onFavorite: () => void
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-3xl border border-white/10 bg-white/[0.04] p-4"
    >
      <button onClick={onSelect} className="w-full text-left">
        <div className="mb-2 flex items-center gap-2 text-xs text-slate-400">
          <span>{item.platform}</span>
          <span>Score {item.score || item.generatedContent?.score.total || 0}</span>
          <span>{new Date(item.createdAt).toLocaleDateString("pt-BR")}</span>
        </div>
        <p className="line-clamp-3 text-sm leading-6 text-slate-100">
          {item.generatedCaption}
        </p>
      </button>
      <div className="mt-3 flex items-center justify-end gap-2">
        <IconButton onClick={onFavorite} active={item.isFavorite}>
          <Star className="h-4 w-4" fill={item.isFavorite ? "currentColor" : "none"} />
        </IconButton>
        <IconButton onClick={onCopy}>
          <Copy className="h-4 w-4" />
        </IconButton>
        <IconButton onClick={onSelect}>
          <ChevronRight className="h-4 w-4" />
        </IconButton>
      </div>
    </motion.div>
  )
}

function TemplateItem({
  template,
  onSelect,
  onDelete,
}: {
  template: SavedTemplate
  onSelect: () => void
  onDelete: () => void
}) {
  const isLibrary = template.id.startsWith("library-")
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-4">
      <button onClick={onSelect} className="w-full text-left">
        <p className="font-semibold">{template.name}</p>
        <p className="mt-1 text-xs text-slate-400">
          {template.category || "Personalizado"} | {template.options.platform}
        </p>
      </button>
      <div className="mt-3 flex justify-end gap-2">
        {!isLibrary && (
          <IconButton onClick={onDelete}>
            <Trash2 className="h-4 w-4" />
          </IconButton>
        )}
        <IconButton onClick={onSelect}>
          <ChevronRight className="h-4 w-4" />
        </IconButton>
      </div>
    </div>
  )
}

function IconButton({
  children,
  onClick,
  active = false,
}: {
  children: React.ReactNode
  onClick: () => void
  active?: boolean
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "rounded-xl border border-white/10 p-2 transition hover:bg-white/10",
        active ? "bg-amber-300/15 text-amber-200" : "bg-white/5 text-slate-300"
      )}
    >
      {children}
    </button>
  )
}

export type Platform =
  | "whatsapp"
  | "telegram"
  | "instagram_post"
  | "instagram_reels"
  | "tiktok"
  | "youtube_shorts"
  | "pinterest"
  | "facebook"

export type Objective =
  | "conversao"
  | "viralizacao"
  | "engajamento"
  | "trafego"
  | "crescimento_grupo"
  | "autoridade"

export type CaptionStyle =
  | "persuasivo"
  | "premium"
  | "profissional"
  | "emocional"
  | "storytelling"
  | "urgencia"
  | "minimalista"

export type HashtagMode = "virais" | "global" | "trending" | "ecommerce" | "premium" | "nicho" | "produto" | "local"

export interface ProductInfo {
  name: string
  price: string
  originalPrice: string
  discount: string
  link: string
  groupLink: string
  features: string[]
  benefits: string[]
}

export interface CaptionOptions {
  platform: Platform
  objective: Objective
  style: CaptionStyle
  showPrice: boolean
  showOldPrice: boolean
  showDiscount: boolean
  showAffiliateLink: boolean
  showWhatsAppGroup: boolean
  showMercadoLivreSearchLink: boolean
  showBenefits: boolean
  showHashtags: boolean
  includeEmojis: boolean
  hashtagMode: HashtagMode
  hashtagQuantity: 5 | 10 | 15
  customAffiliateLink: string
  customGroupLink: string
  mercadoLivreSearchText: string
}

export interface HashtagGroups {
  virais: string[]
  global: string[]
  trending: string[]
  ecommerce: string[]
  premium: string[]
  nicho: string[]
  produto: string[]
  local: string[]
}

export interface AiScore {
  total: number
  clareza: number
  cta: number
  emojis: number
  conversao: number
  hashtags: number
  urgencia: number
}

export interface GeneratedContent {
  caption: string
  cta: string
  hashtags: HashtagGroups
  score: AiScore
}

export interface SavedCaption {
  id: string
  rawInput: string
  generatedCaption: string
  generatedContent?: GeneratedContent
  options: CaptionOptions
  platform: Platform
  score: number
  createdAt: Date | string
  isFavorite: boolean
}

export interface SavedTemplate {
  id: string
  name: string
  category?: string
  rawInput?: string
  options: CaptionOptions
  createdAt: Date | string
}

export const platforms: Array<{ value: Platform; label: string; short: string }> = [
  { value: "whatsapp", label: "WhatsApp", short: "WA" },
  { value: "telegram", label: "Telegram", short: "TG" },
  { value: "instagram_post", label: "Instagram Post", short: "IG" },
  { value: "instagram_reels", label: "Instagram Reels", short: "Reels" },
  { value: "tiktok", label: "TikTok", short: "TT" },
  { value: "youtube_shorts", label: "YouTube Shorts", short: "Shorts" },
  { value: "pinterest", label: "Pinterest", short: "Pin" },
  { value: "facebook", label: "Facebook", short: "FB" },
]

export const objectives: Array<{ value: Objective; label: string }> = [
  { value: "conversao", label: "Conversao" },
  { value: "viralizacao", label: "Viralizacao" },
  { value: "engajamento", label: "Engajamento" },
  { value: "trafego", label: "Trafego" },
  { value: "crescimento_grupo", label: "Crescimento de Grupo" },
  { value: "autoridade", label: "Autoridade" },
]

export const styles: Array<{ value: CaptionStyle; label: string }> = [
  { value: "persuasivo", label: "Persuasivo" },
  { value: "premium", label: "Premium" },
  { value: "profissional", label: "Profissional" },
  { value: "emocional", label: "Emocional" },
  { value: "storytelling", label: "Storytelling" },
  { value: "urgencia", label: "Urgencia" },
  { value: "minimalista", label: "Minimalista" },
]

export const hashtagModes: Array<{ value: HashtagMode; label: string }> = [
  { value: "virais", label: "Virais" },
  { value: "global", label: "Globais" },
  { value: "trending", label: "Trending" },
  { value: "ecommerce", label: "E-commerce" },
  { value: "premium", label: "Premium" },
  { value: "nicho", label: "Nicho" },
  { value: "produto", label: "Produto" },
  { value: "local", label: "Local" },
]

export const hashtagQuantities: CaptionOptions["hashtagQuantity"][] = [5, 10, 15]

export const defaultOptions: CaptionOptions = {
  platform: "whatsapp",
  objective: "conversao",
  style: "persuasivo",
  showPrice: true,
  showOldPrice: true,
  showDiscount: true,
  showAffiliateLink: true,
  showWhatsAppGroup: true,
  showMercadoLivreSearchLink: false,
  showBenefits: true,
  showHashtags: true,
  includeEmojis: true,
  hashtagMode: "virais",
  hashtagQuantity: 10,
  customAffiliateLink: "",
  customGroupLink: "",
  mercadoLivreSearchText: "",
}

const platformPresets: Record<Platform, Partial<CaptionOptions>> = {
  whatsapp: {
    showPrice: true,
    showOldPrice: true,
    showDiscount: true,
    showAffiliateLink: true,
    showWhatsAppGroup: true,
    showBenefits: true,
    objective: "conversao",
  },
  telegram: {
    showPrice: true,
    showOldPrice: true,
    showDiscount: true,
    showAffiliateLink: true,
    showWhatsAppGroup: true,
    showBenefits: true,
    objective: "conversao",
  },
  instagram_post: {
    showPrice: true,
    showOldPrice: true,
    showDiscount: true,
    showAffiliateLink: true,
    showWhatsAppGroup: false,
    showBenefits: true,
    objective: "engajamento",
  },
  instagram_reels: {
    showPrice: false,
    showOldPrice: false,
    showDiscount: false,
    showAffiliateLink: false,
    showWhatsAppGroup: false,
    showBenefits: true,
    objective: "viralizacao",
  },
  tiktok: {
    showPrice: false,
    showOldPrice: false,
    showDiscount: false,
    showAffiliateLink: false,
    showWhatsAppGroup: false,
    showBenefits: true,
    objective: "viralizacao",
  },
  youtube_shorts: {
    showPrice: false,
    showOldPrice: false,
    showDiscount: false,
    showAffiliateLink: false,
    showWhatsAppGroup: false,
    showBenefits: true,
    objective: "viralizacao",
  },
  pinterest: {
    showPrice: false,
    showOldPrice: false,
    showDiscount: false,
    showAffiliateLink: false,
    showWhatsAppGroup: false,
    showBenefits: true,
    objective: "trafego",
  },
  facebook: {
    showPrice: true,
    showOldPrice: true,
    showDiscount: true,
    showAffiliateLink: true,
    showWhatsAppGroup: false,
    showBenefits: true,
    objective: "engajamento",
  },
}

export const templateLibrary: SavedTemplate[] = [
  makeTemplate("Mercado Livre", "Marketplace", {
    platform: "whatsapp",
    style: "urgencia",
    objective: "conversao",
  }),
  makeTemplate("Shopee", "Marketplace", {
    platform: "tiktok",
    style: "emocional",
    objective: "viralizacao",
    showPrice: false,
    showAffiliateLink: false,
  }),
  makeTemplate("Amazon", "Marketplace", {
    platform: "facebook",
    style: "profissional",
    objective: "autoridade",
  }),
  makeTemplate("Tecnologia", "Nicho", {
    platform: "instagram_reels",
    style: "storytelling",
    objective: "engajamento",
    hashtagMode: "nicho",
  }),
  makeTemplate("Beleza", "Nicho", {
    platform: "instagram_post",
    style: "premium",
    objective: "engajamento",
    hashtagMode: "produto",
  }),
  makeTemplate("Moda", "Nicho", {
    platform: "pinterest",
    style: "minimalista",
    objective: "trafego",
    hashtagMode: "local",
    showPrice: false,
  }),
  makeTemplate("Delivery", "Local", {
    platform: "whatsapp",
    style: "persuasivo",
    objective: "conversao",
    hashtagMode: "local",
  }),
]

function makeTemplate(
  name: string,
  category: string,
  overrides: Partial<CaptionOptions>
): SavedTemplate {
  return {
    id: `library-${name.toLowerCase().replace(/\s+/g, "-")}`,
    name,
    category,
    options: { ...defaultOptions, ...overrides },
    createdAt: new Date(0).toISOString(),
  }
}

export function applyPlatformPreset(
  options: CaptionOptions,
  platform: Platform
): CaptionOptions {
  return {
    ...options,
    ...platformPresets[platform],
    platform,
  }
}

export function parseProductDescription(rawText: string): ProductInfo {
  const lines = rawText
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line && !shouldIgnoreMarketplaceLine(line))

  let name = ""
  let discount = ""
  let link = ""
  let groupLink = ""
  let price = ""
  let originalPrice = ""
  const prices: string[] = []
  const features: string[] = []
  const explicitBenefits: string[] = []

  for (const line of lines) {
    const field = parseBriefingField(line)
    const normalizedKey = field ? normalizeText(field.key) : ""
    const value = field ? cleanLine(field.value) : ""
    const lineForParsing = value || line
    const priceMatches = lineForParsing.match(/R\$\s*[\d.,]+|\b\d{2,5},\d{2}\b/g)
    const linkMatch = lineForParsing.match(
      /(https?:\/\/[^\s]+|(?:www\.)?[a-z0-9-]+\.[a-z]{2,}(?:\.[a-z]{2,})?\/[^\s]+|(?:meli|amzn|shopee|wa)\.[^\s]+)/i
    )

    if (field && /^(produto|nome|titulo|item)$/.test(normalizedKey)) {
      name = value
      continue
    }

    if (linkMatch || (field && /link|url/.test(normalizedKey))) {
      const found = linkMatch?.[0] || value
      if (isGroupLinkLine(line, found) || /grupo|whats|zap|canal/.test(normalizedKey)) {
        groupLink = found
      } else {
        link = found
      }
      continue
    }

    if (priceMatches) {
      const parsedPrices = priceMatches.map(ensureCurrency)
      if (/antigo|antes|preco de|valor de|^de$/.test(normalizedKey) || /^de\s+/i.test(line)) {
        originalPrice = parsedPrices[0]
      } else if (/atual|promocional|oferta|preco|valor|por/.test(normalizedKey) || /^por\s+/i.test(line)) {
        price = parsedPrices[parsedPrices.length - 1]
      } else {
        prices.push(...parsedPrices)
      }
      continue
    }

    const discountMatch = lineForParsing.match(/\d{1,2}%\s*OFF/i)
    if (discountMatch && (/off|desconto|promo/i.test(lineForParsing) || /desconto|oferta/.test(normalizedKey))) {
      discount = discountMatch[0].toUpperCase()
      continue
    }

    if (field && /beneficio|beneficios|vantagem|vantagens|promessa|resolve|dor/.test(normalizedKey)) {
      explicitBenefits.push(...splitList(value).map(toBenefitText))
      continue
    }

    if (field && /especificacao|especificacoes|destaque|destaques|material|acabamento|indicado|uso|serve|compatibilidade|garantia|tamanho|medida|capacidade|voltagem|potencia/.test(normalizedKey)) {
      features.push(...splitList(value).map((item) => `${field.key}: ${item}`))
      continue
    }

    if (!name && line.length > 3 && !/^(sku|cod|ref)/i.test(line)) {
      name = line.replace(/^[-*•]\s*/, "")
      continue
    }

    features.push(cleanLine(line))
  }

  if (!price) price = prices.length > 1 ? prices[1] : prices[0] || ""
  if (!originalPrice) originalPrice = prices.length > 1 ? prices[0] : ""

  const generatedBenefits = buildCommercialBenefits(name, features)

  return {
    name: name || "Produto em destaque",
    price,
    originalPrice,
    discount,
    link,
    groupLink,
    features: unique(features).slice(0, 8),
    benefits: unique([...explicitBenefits, ...generatedBenefits]).slice(0, 5),
  }
}

export function generateContent(
  product: ProductInfo,
  options: CaptionOptions
): GeneratedContent {
  const hashtags = options.showHashtags
    ? generateHashtagGroups(product, options)
    : emptyHashtagGroups()
  const cta = buildDisplayCta(product, options)
  const caption = formatAffiliateProductSummary(product, options, hashtags, cta)
  const score = calculateAiScore(caption, cta, hashtags, options)

  return {
    caption,
    cta,
    hashtags,
    score,
  }
}

function generateMarketingContent(
  product: ProductInfo,
  options: CaptionOptions
): GeneratedContent {
  const captionLines: string[] = []
  const emoji = options.includeEmojis
  const network = getNetworkStrategy(options.platform)
  const hook = getHook(product, options)

  captionLines.push(hook)
  captionLines.push("")
  captionLines.push(formatProductLine(product.name, options))

  if (network === "conversion") {
    addConversionDetails(captionLines, product, options)
  } else {
    addEngagementDetails(captionLines, product, options)
  }

  if (options.showBenefits && product.benefits.length > 0) {
    captionLines.push("")
    captionLines.push(emoji ? "Beneficios que vendem:" : "Beneficios:")
    product.benefits.slice(0, 3).forEach((benefit) => {
      captionLines.push(`${emoji ? "• " : "- "}${benefit}`)
    })
  }

  if (product.features.length > 0) {
    captionLines.push("")
    captionLines.push(emoji ? "Destaques rapidos:" : "Destaques:")
    product.features.slice(0, 4).forEach((feature) => {
      captionLines.push(`${emoji ? "✓ " : "- "}${feature}`)
    })
  }

  const cta = buildCta(product, options)
  if (cta) {
    captionLines.push("")
    captionLines.push(cta)
  }

  const affiliateLink = options.customAffiliateLink || product.link
  if (options.showAffiliateLink && affiliateLink) {
    captionLines.push(affiliateLink)
  }

  const groupLink = options.customGroupLink || product.groupLink
  if (options.showWhatsAppGroup && groupLink) {
    captionLines.push("")
    captionLines.push(emoji ? "Entre no grupo VIP de ofertas:" : "Entre no grupo de ofertas:")
    captionLines.push(groupLink)
  }

  const hashtags = generateHashtagGroups(product, options)
  if (options.showHashtags) {
    captionLines.push("")
    captionLines.push(formatHashtags(hashtags))
  }

  const caption = sanitizeByRules(captionLines.join("\n").trim(), options)

  return {
    caption,
    cta,
    hashtags,
    score: calculateAiScore(caption, cta, hashtags, options),
  }
}

export function generateCaption(product: ProductInfo, options: CaptionOptions): string {
  return generateContent(product, options).caption
}

function addConversionDetails(
  lines: string[],
  product: ProductInfo,
  options: CaptionOptions
) {
  const emoji = options.includeEmojis
  if (options.showOldPrice && product.originalPrice) {
    lines.push(emoji ? `De ${product.originalPrice}` : `De ${product.originalPrice}`)
  }
  if (options.showPrice && product.price) {
    lines.push(emoji ? `Por ${product.price}` : `Por ${product.price}`)
  }
  if (options.showDiscount && product.discount) {
    lines.push(emoji ? `${product.discount} de desconto hoje` : `${product.discount} de desconto hoje`)
  }
  if (options.style === "urgencia" || options.objective === "conversao") {
    lines.push(emoji ? "Estoque e preco podem mudar a qualquer momento." : "Estoque e preco podem mudar a qualquer momento.")
  }
}

function addEngagementDetails(
  lines: string[],
  product: ProductInfo,
  options: CaptionOptions
) {
  const emoji = options.includeEmojis
  const curiosity = {
    instagram_reels: "Isso parece simples, mas muda totalmente o jeito de usar no dia a dia.",
    tiktok: "O tipo de achado que voce ve uma vez e ja entende por que viraliza.",
    pinterest: "Uma ideia pratica para salvar, testar e voltar quando precisar.",
  }
  lines.push(curiosity[options.platform as keyof typeof curiosity] || "Um achado pratico para quem gosta de comprar melhor.")
  if (options.showPrice && product.price) {
    lines.push(emoji ? `Achado por ${product.price}` : `Achado por ${product.price}`)
  }
}

function getHook(product: ProductInfo, options: CaptionOptions): string {
  const e = options.includeEmojis
  const hooks: Record<CaptionStyle, string> = {
    persuasivo: e ? "Oferta inteligente para comprar sem enrolacao" : "Oferta inteligente para comprar sem enrolacao",
    premium: e ? "Selecao premium para quem escolhe melhor" : "Selecao premium para quem escolhe melhor",
    profissional: "Descricao clara, direta e pronta para vender",
    emocional: "Esse e aquele achado que resolve um detalhe real da rotina",
    storytelling: `Imagine usar ${product.name} e simplificar uma tarefa que sempre toma tempo.`,
    urgencia: e ? "Oferta ativa agora, enquanto ainda esta disponivel" : "Oferta ativa agora, enquanto ainda esta disponivel",
    minimalista: "Achado recomendado",
  }

  if (["instagram_reels", "tiktok", "pinterest"].includes(options.platform)) {
    return options.style === "minimalista"
      ? "Salve esse achado"
      : "Voce compraria isso depois de ver funcionando?"
  }

  return hooks[options.style]
}

function formatProductLine(name: string, options: CaptionOptions): string {
  if (options.style === "minimalista") return name
  return options.includeEmojis ? `Produto: ${name}` : `Produto: ${name}`
}

function buildCta(product: ProductInfo, options: CaptionOptions): string {
  const hasLink = options.showAffiliateLink && (options.customAffiliateLink || product.link)
  const byObjective: Record<Objective, string> = {
    conversao: hasLink ? "Clique no link e garanta o seu agora." : "Chame para garantir o seu.",
    viralizacao: "Comente se voce usaria isso no dia a dia.",
    engajamento: "Salve para comparar depois e envie para quem precisa.",
    trafego: hasLink ? "Abra o link para ver detalhes e disponibilidade." : "Veja os detalhes antes de acabar.",
    crescimento_grupo: "Entre no grupo para receber os proximos achados.",
    autoridade: "Compare os beneficios e escolha com mais seguranca.",
  }

  if (["instagram_reels", "tiktok", "pinterest"].includes(options.platform)) {
    return byObjective[options.objective] || "Salve para ver depois."
  }

  return byObjective[options.objective]
}

function generateHashtagGroups(
  product: ProductInfo,
  options: CaptionOptions
): HashtagGroups {
  const productWords = product.name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .split(/\s+/)
    .filter((word) => word.length > 3)
    .slice(0, 8)
    .map((word) => `#${word.replace(/[^a-z0-9]/g, "")}`)
    .filter((tag) => tag.length > 1)

  const base: HashtagGroups = {
    virais: [
      "#achadinhos",
      "#ofertasdodia",
      "#promocao",
      "#viral",
      "#imperdivel",
      "#ofertarelampago",
      "#precobaixo",
      "#comprasinteligentes",
      "#economia",
      "#trend",
      "#queridinho",
      "#topachados",
      "#dicadodia",
      "#valeapena",
      "#promoimperdivel",
    ],
    global: unique([
      ...productWords,
      "#viral",
      "#trending",
      "#fyp",
      "#foryou",
      "#musthave",
      "#bestfinds",
      "#amazonfinds",
      "#tiktokmademebuyit",
      "#dealsoftheday",
      "#onlineshopping",
      "#shopping",
      "#wishlist",
      "#giftideas",
      "#lifehacks",
      "#newarrivals",
      "#toprated",
      "#smartshopping",
      "#viralproducts",
    ]),
    trending: unique([
      ...productWords,
      "#fyp",
      "#foryoupage",
      "#trendingnow",
      "#trendalert",
      "#viralproducts",
      "#musthaveitems",
      "#tiktokfinds",
      "#reelsviral",
      "#explorepage",
      "#shorts",
      "#unboxing",
      "#productreview",
      "#wowfinds",
      "#cantmiss",
      "#obsessed",
      "#needthis",
      "#worthit",
    ]),
    ecommerce: unique([
      ...productWords,
      "#deals",
      "#discount",
      "#sale",
      "#bestseller",
      "#shopnow",
      "#onlineshop",
      "#coupon",
      "#clearance",
      "#shoppingdeals",
      "#productreview",
      "#buyerfinds",
      "#dailydeals",
      "#hotdeals",
      "#savemoney",
      "#budgetfinds",
      "#smartbuy",
      "#mustbuy",
    ]),
    premium: unique([
      ...productWords,
      "#premiumfinds",
      "#luxuryfinds",
      "#aesthetic",
      "#minimalstyle",
      "#homeinspo",
      "#qualityproducts",
      "#curatedfinds",
      "#giftguide",
      "#modernliving",
      "#styleinspo",
      "#essentials",
      "#dailyessentials",
      "#upgrade",
      "#designlovers",
      "#beautifulfinds",
    ]),
    nicho: [
      "#comprasonline",
      "#produtosuteis",
      "#casainteligente",
      "#dicasdecompra",
      "#review",
      "#utilidades",
      "#organizacao",
      "#tecnologia",
      "#beleza",
      "#moda",
      "#decoracao",
      "#cozinha",
      "#rotinapratica",
      "#lifestyle",
      "#curadoria",
    ],
    produto: unique([
      ...productWords,
      "#produto",
      "#novidade",
      "#desconto",
      "#oferta",
      "#achado",
      "#promo",
      "#custoBeneficio".toLowerCase(),
      "#comprasegura",
      "#utilidade",
      "#praticidade",
      "#recomendado",
      "#melhorpreco",
      "#produtoemoferta",
      "#dica",
      "#comprasonline",
    ]),
    local: [
      "#brasil",
      "#ofertasbrasil",
      "#comprasbr",
      "#deliverybr",
      "#promocoesbr",
      "#achadinhosbrasil",
      "#saopaulo",
      "#riodejaneiro",
      "#minasgerais",
      "#curitiba",
      "#salvador",
      "#recife",
      "#fortaleza",
      "#brasilia",
      "#ofertaslocais",
    ],
  }

  const chosen = unique(base[options.hashtagMode]).slice(0, options.hashtagQuantity)
  return {
    ...emptyHashtagGroups(),
    [options.hashtagMode]: chosen,
  }
}

function formatHashtags(groups: HashtagGroups): string {
  return Object.values(groups).flat().join(" ")
}

function calculateAiScore(
  caption: string,
  cta: string,
  hashtags: HashtagGroups,
  options: CaptionOptions
): AiScore {
  const hashtagCount = Object.values(hashtags).flat().length
  const hasUrgency = /agora|hoje|acab|limit|dispon/i.test(caption)
  const hasPriceSignal = options.showPrice ? /R\$|preco|por /i.test(caption) : true
  const hashtagScore = options.showHashtags
    ? hashtagCount > 0
      ? 72 + Math.min(hashtagCount, options.hashtagQuantity) * 2
      : 45
    : 80

  const score: AiScore = {
    clareza: clampScore(caption.length > 80 && caption.length < 1200 ? 88 : 68),
    cta: clampScore(cta ? 92 : 45),
    emojis: clampScore(options.includeEmojis ? 86 : 72),
    conversao: clampScore(hasPriceSignal && cta ? 90 : 62),
    hashtags: clampScore(hashtagScore),
    urgencia: clampScore(hasUrgency ? 90 : options.platform === "whatsapp" || options.platform === "telegram" ? 66 : 78),
    total: 0,
  }

  score.total = Math.round(
    (score.clareza + score.cta + score.emojis + score.conversao + score.hashtags + score.urgencia) / 6
  )

  return score
}

function sanitizeByRules(text: string, options: CaptionOptions): string {
  let output = text
  if (!options.showPrice) {
    output = output.replace(/^.*R\$\s*[\d.,]+.*$/gim, "")
  }
  if (!options.showAffiliateLink) {
    output = output.replace(/https?:\/\/[^\s]+/gi, (match) =>
      /chat\.whatsapp|wa\.me|whatsapp/i.test(match) ? match : ""
    )
  }
  if (!options.showWhatsAppGroup) {
    output = output
      .replace(/^.*(?:grupo|zap|whats|whatsapp|canal).*$/gim, "")
      .replace(/https?:\/\/(?:chat\.whatsapp|wa\.me|whatsapp)[^\s]+/gi, "")
  }
  if (!options.showHashtags) {
    output = output
      .split("\n")
      .filter((line) => !line.includes("#") && !/^(Virais|Globais|Trending|E-commerce|Premium|Nicho|Produto|Local):/i.test(line))
      .join("\n")
  }
  if (!options.includeEmojis) {
    output = output.replace(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/gu, "")
  }
  return output.replace(/\n{3,}/g, "\n\n").trim()
}

function getNetworkStrategy(platform: Platform): "conversion" | "engagement" {
  return ["whatsapp", "telegram", "facebook", "instagram_post"].includes(platform)
    ? "conversion"
    : "engagement"
}

function estimateDiscount(price: string, originalPrice: string): string {
  const current = parsePrice(price)
  const old = parsePrice(originalPrice)
  if (!current || !old || current >= old) return ""
  return `${Math.round(((old - current) / old) * 100)}%`
}

function parsePrice(value: string): number {
  return Number(value.replace(/[^\d,]/g, "").replace(",", "."))
}

function cleanLine(line: string): string {
  return line.replace(/^[-*•]\s*/, "").trim()
}

function parseBriefingField(line: string): { key: string; value: string } | null {
  const match = line.match(/^([^:\-]{3,36})\s*:\s*(.+)$/)
  if (!match) return null
  return { key: cleanLine(match[1]), value: cleanLine(match[2]) }
}

function normalizeText(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
}

function splitList(value: string): string[] {
  return value
    .split(/[,;|]\s*|\s+\+\s+/)
    .map(cleanLine)
    .filter((item) => item.length > 2)
}

function ensureCurrency(value: string): string {
  const clean = value.trim()
  return /^R\$/i.test(clean) ? clean.replace(/^r\$/i, "R$") : `R$ ${clean}`
}

function toBenefitText(value: string): string {
  const clean = cleanLine(value).replace(/[.!]+$/, "")
  return clean ? clean.charAt(0).toUpperCase() + clean.slice(1) : clean
}

function shouldIgnoreMarketplaceLine(line: string): boolean {
  const normalized = line
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()

  if (/^\d+(?:[.,]\d+)?$/.test(normalized)) return true
  if (/^avaliacao\b|avaliacoes?|opinioes?|vendidos?/.test(normalized)) return true
  if (/^\d+(?:o|º|ª)?\s+em\s+/.test(normalized)) return true
  if (/mais vendido|oferta imperdivel|adicionar aos favoritos/.test(normalized)) return true
  if (/cashback|ver meios de pagamento|ranking da categoria/.test(normalized)) return true
  if (/assinatura|promocionais do marketplace|informacoes promocionais/.test(normalized)) return true
  if (/^cor\b|^cor do produto\b/.test(normalized)) return true
  if (/^frete\b|^chegara|^devolucao gratis|^compra protegida/.test(normalized)) return true
  return false
}

function isGroupLinkLine(line: string, link: string): boolean {
  return /chat\.whatsapp|wa\.me|whatsapp\.com|whats/i.test(link) ||
    /\b(grupo|zap|whats|whatsapp|canal)\b/i.test(line)
}

function buildCommercialBenefits(productName: string, features: string[]): string[] {
  const benefits: string[] = []
  const source = features.join(" ").toLowerCase()
  const fullText = normalizeText(`${productName} ${source}`)

  for (const feature of features) {
    const normalized = normalizeText(feature)
    const value = feature.includes(":") ? feature.split(":").slice(1).join(":").trim() : feature

    const kitMatch = normalized.match(/(?:kit|conjunto|unidades? por kit).*?(\d+)/)
    if (kitMatch) {
      benefits.push(`Kit com ${kitMatch[1]} pecas para comprar melhor de uma vez`)
      continue
    }

    if (/promessa|resolve|dor/.test(normalized)) {
      benefits.push(toBenefitText(value))
      continue
    }

    if (/indicado|ideal para|uso|serve para/.test(normalized)) {
      benefits.push(`Indicado para ${value.replace(/^para\s+/i, "")}`)
      continue
    }

    if (/garantia/.test(normalized)) {
      benefits.push("Compra com mais seguranca por contar com garantia")
      continue
    }

    if (/bivolt|110v|220v|voltagem/.test(normalized)) {
      benefits.push("Mais praticidade na instalacao por aceitar a voltagem informada")
      continue
    }

    if (/vidro temperado/.test(normalized)) {
      benefits.push("Vidro temperado resistente para uso frequente")
      continue
    }

    if (/inox|aco inox/.test(normalized)) {
      benefits.push("Acabamento resistente e com visual mais premium")
      continue
    }

    if (/silicone|emborrach|antiderrapante/.test(normalized)) {
      benefits.push("Mais firmeza e seguranca durante o uso")
      continue
    }

    if (/usb|recarreg|sem fio|wireless|bluetooth/.test(normalized)) {
      benefits.push("Uso pratico no dia a dia, com menos fios e mais mobilidade")
      continue
    }

    if (/portatil|compact|leve|dobravel/.test(normalized)) {
      benefits.push("Compacto e facil de levar ou guardar")
      continue
    }

    if (/potencia|watts|\bw\b|mah|rpm/.test(normalized)) {
      benefits.push("Desempenho eficiente para entregar resultado com agilidade")
      continue
    }

    if (/velocidade|modo|nivel|ajuste|regulavel/.test(normalized)) {
      benefits.push("Ajustes versateis para adaptar o uso a sua necessidade")
      continue
    }

    if (/facil|limp|lavavel|removivel/.test(normalized)) {
      benefits.push("Limpeza simples para manter o produto sempre pronto")
      continue
    }

    if (/tamanho|medida|capacidade|litro|ml|cm|polegada/.test(normalized)) {
      benefits.push("Tamanho bem definido para escolher com mais seguranca")
      continue
    }
  }

  if (/assadeira|travessa|marinex|vidro/.test(fullText)) {
    benefits.push("Ideal para assados e receitas do dia a dia")
    benefits.push("Facil de limpar e feito para durar mais")
  }

  if (/projetor|full hd|hdmi|wi-fi|wifi/.test(fullText)) {
    benefits.push("Transforma qualquer ambiente em uma experiencia de tela grande")
    benefits.push("Otimo para filmes, aulas e apresentacoes com mais impacto")
  }

  if (/beleza|secador|escova|maquiagem|pele/.test(fullText)) {
    benefits.push("Ajuda a cuidar da rotina de beleza com mais praticidade")
  }

  if (/cozinha|panela|air fryer|liquidificador|cafeteira/.test(fullText)) {
    benefits.push("Facilita o preparo e deixa a rotina da cozinha mais pratica")
  }

  benefits.push("Produto pratico para facilitar a rotina")
  benefits.push("Boa opcao para quem busca utilidade e custo-beneficio")

  return unique(benefits).slice(0, 5)
}

function formatAffiliateProductSummary(
  product: ProductInfo,
  options: CaptionOptions,
  hashtagGroups: HashtagGroups,
  cta: string
): string {
  const lines = ["📦 Produto:", product.name]

  if (options.showOldPrice && product.originalPrice) {
    lines.push("", "💸 Preço antigo:", product.originalPrice)
  }

  if (options.showPrice) {
    lines.push("", "💰 Preço:", product.price || "Preço não identificado")
  }

  if (options.showDiscount && product.discount) {
    lines.push("", "🔥 Desconto:", product.discount)
  }

  const benefits = product.benefits.length
    ? product.benefits
    : buildCommercialBenefits(product.name, product.features)

  if (options.showBenefits) {
    lines.push("", "✅ Melhores beneficios:")
    benefits.slice(0, 4).forEach((benefit) => {
      lines.push(`• ${benefit}`)
    })
  }

  const affiliateLink = options.customAffiliateLink || product.link
  const mercadoLivreSearchText = options.mercadoLivreSearchText.trim()
  if (options.showMercadoLivreSearchLink && mercadoLivreSearchText) {
    lines.push("", "🔍 Cole este texto no buscador do Mercado Livre:", mercadoLivreSearchText)
    if (options.showAffiliateLink && affiliateLink) {
      lines.push("", "🔗 Ou acesse o link:", affiliateLink)
    }
  } else if (options.showAffiliateLink && affiliateLink) {
    lines.push("", "🔗 Link afiliado:", affiliateLink)
  }

  const groupLink = options.customGroupLink || product.groupLink
  if (options.showWhatsAppGroup && groupLink) {
    lines.push("", "👥 Grupo WhatsApp:", groupLink)
  }

  if (options.showHashtags) {
    lines.push(formatHashtags(hashtagGroups))
  }

  return lines.join("\n")
}

function buildDisplayCta(product: ProductInfo, options: CaptionOptions): string {
  if (options.showAffiliateLink && (options.customAffiliateLink || product.link)) {
    return "Acesse o link e confira a disponibilidade."
  }

  if (options.showWhatsAppGroup && (options.customGroupLink || product.groupLink)) {
    return "Entre no grupo para receber mais achados."
  }

  return ""
}

function emptyHashtagGroups(): HashtagGroups {
  return {
    virais: [],
    global: [],
    trending: [],
    ecommerce: [],
    premium: [],
    nicho: [],
    produto: [],
    local: [],
  }
}

function unique(values: string[]): string[] {
  return [...new Set(values.filter(Boolean))]
}

function clampScore(value: number): number {
  if (!Number.isFinite(value)) return 0
  return Math.max(0, Math.min(100, Math.round(value)))
}

const STORAGE_KEYS = {
  history: "legendas_pro_ai_history",
  templates: "legendas_pro_ai_templates",
  settings: "legendas_pro_ai_settings",
}

export function saveToHistory(caption: SavedCaption): void {
  const history = getHistory()
  history.unshift(caption)
  localStorage.setItem(STORAGE_KEYS.history, JSON.stringify(history.slice(0, 60)))
}

export function getHistory(): SavedCaption[] {
  if (typeof window === "undefined") return []
  const data = localStorage.getItem(STORAGE_KEYS.history)
  return data ? JSON.parse(data) : []
}

export function clearHistory(): void {
  localStorage.removeItem(STORAGE_KEYS.history)
}

export function toggleFavorite(id: string): void {
  const history = getHistory().map((item) =>
    item.id === id ? { ...item, isFavorite: !item.isFavorite } : item
  )
  localStorage.setItem(STORAGE_KEYS.history, JSON.stringify(history))
}

export function saveTemplate(template: SavedTemplate): void {
  const templates = getTemplates().filter((item) => item.id !== template.id)
  templates.unshift(template)
  localStorage.setItem(STORAGE_KEYS.templates, JSON.stringify(templates))
}

export function getTemplates(): SavedTemplate[] {
  if (typeof window === "undefined") return templateLibrary
  const data = localStorage.getItem(STORAGE_KEYS.templates)
  const custom = data ? JSON.parse(data) : []
  return [...templateLibrary, ...custom.filter((item: SavedTemplate) => !item.id.startsWith("library-"))]
}

export function deleteTemplate(id: string): void {
  if (id.startsWith("library-")) return
  const templates = getTemplates().filter((template) => template.id !== id)
  localStorage.setItem(
    STORAGE_KEYS.templates,
    JSON.stringify(templates.filter((template) => !template.id.startsWith("library-")))
  )
}

export function saveSettings(options: CaptionOptions): void {
  localStorage.setItem(STORAGE_KEYS.settings, JSON.stringify(options))
}

export function getSettings(): CaptionOptions | null {
  if (typeof window === "undefined") return null
  const data = localStorage.getItem(STORAGE_KEYS.settings)
  return data ? { ...defaultOptions, ...JSON.parse(data) } : null
}

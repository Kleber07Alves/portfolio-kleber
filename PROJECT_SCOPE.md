# PROJECT_SCOPE.md — Portfólio "Super Mario Dark Mode Futurista"

> **Documento de Especificação Técnica e Design**
> Fonte única de verdade (Single Source of Truth) para arquitetura, design system e roadmap.
> Nenhuma linha de código de aplicação deve ser escrita antes deste documento estar validado.

| Meta | Valor |
|------|-------|
| **Projeto** | Portfólio Pessoal — Kleber |
| **Conceito** | Super Mario reinterpretado em Dark Mode Futurista (Neon / Cyber / RPG Stats) |
| **Stack alvo** | HTML5 + CSS3 (Vanilla) + JavaScript (Vanilla, modular ES6) |
| **Última atualização** | 2026-06-19 |
| **Status** | 🟡 Fase de Planejamento |

---

## 0. Visão e Princípios Norteadores

O portfólio traduz a linguagem visual do universo Super Mario para uma estética **dark, neon e futurista**, tratando o desenvolvedor como um **personagem de RPG**: atributos, árvore de habilidades (skill tree) e itens colecionáveis.

**Princípios inegociáveis:**
1. **Performance primeiro** — animações via CSS/`transform`/`opacity` (GPU), nunca via `top/left/width`.
2. **Mobile-first** — toda media query escala *para cima*, nunca para baixo.
3. **Acessibilidade** — contraste mínimo AA, `prefers-reduced-motion` respeitado, navegação por teclado.
4. **Zero dependência pesada** — sem frameworks de UI; ícones via SVG inline ou sprite.
5. **Componentização lógica** — mesmo em Vanilla, cada bloco é isolado e reutilizável.

---

## 1. DESIGN SYSTEM

### 1.1 Paleta de Cores

#### Base (Tons de Preto / Grafite)

| Token | Hex | Uso |
|-------|-----|-----|
| `--color-void` | `#050507` | Fundo absoluto (body / camada mais profunda) |
| `--color-abyss` | `#0A0A0F` | Fundo de seções principais |
| `--color-graphite-900` | `#101018` | Cards e superfícies elevadas (nível 1) |
| `--color-graphite-800` | `#16161F` | Superfícies elevadas (nível 2 / hover) |
| `--color-graphite-700` | `#1F1F2B` | Bordas internas e divisores |
| `--color-graphite-600` | `#2A2A38` | Bordas de destaque / outlines sutis |
| `--color-smoke` | `#6B6B7B` | Texto secundário / legendas |
| `--color-ash` | `#A8A8B8` | Texto de corpo (parágrafos) |
| `--color-paper` | `#EDEDF2` | Texto de títulos / alta ênfase |

#### Neons (Acentos Futuristas)

| Token | Hex | Inspiração Mario | Uso |
|-------|-----|------------------|-----|
| `--neon-red` | `#FF2D55` | Chapéu/roupa do Mario | CTA primário, alertas, energia |
| `--neon-cyan` | `#00E5FF` | Power-up / gelo | Links, foco, highlights interativos |
| `--neon-lime` | `#39FF14` | Cano / 1-UP mushroom | Sucesso, status "online", XP bars |
| `--neon-gold` | `#FFD60A` | Moedas / estrela | Conquistas, ratings, destaques premium |
| `--neon-magenta` | `#D400FF` | Power-up fogo/flor | Skill tree (ramos especiais), gradientes |
| `--neon-blue` | `#2E5BFF` | Overalls do Mario | Acento secundário, profundidade |

#### Gradientes & Efeitos Derivados

```css
--gradient-hero:    linear-gradient(135deg, #FF2D55 0%, #D400FF 50%, #2E5BFF 100%);
--gradient-cyber:   linear-gradient(90deg, #00E5FF 0%, #39FF14 100%);
--gradient-coin:    linear-gradient(180deg, #FFD60A 0%, #FF8A00 100%);
--glow-red:    0 0 8px rgba(255,45,85,.6),  0 0 24px rgba(255,45,85,.35);
--glow-cyan:   0 0 8px rgba(0,229,255,.6),  0 0 24px rgba(0,229,255,.35);
--glow-lime:   0 0 8px rgba(57,255,20,.55), 0 0 24px rgba(57,255,20,.3);
--glow-gold:   0 0 8px rgba(255,214,10,.6), 0 0 24px rgba(255,214,10,.35);
```

> **Regra de contraste:** neon nunca como cor de texto longo. Neon = acento, borda, glow ou ícone. Texto sempre `--color-ash` / `--color-paper`.

### 1.2 Tipografia

| Função | Família | Fallback | Peso(s) | Observação |
|--------|---------|----------|---------|------------|
| **Display / Títulos** | `"Press Start 2P"` ou `"Orbitron"` | `monospace` | 400/700 | Pixel-art futurista para H1/H2 (usar com moderação — legibilidade) |
| **Headings secundários** | `"Orbitron"` | `sans-serif` | 600/800 | Estética cyber para H3/H4 |
| **Corpo / UI** | `"Inter"` ou `"Rajdhani"` | `system-ui, sans-serif` | 400/500/600 | Legibilidade prioritária |
| **Mono / Código & Stats** | `"JetBrains Mono"` | `monospace` | 400/500 | Números de atributos, tags técnicas |

#### Escala Tipográfica (modular, ratio 1.25 — "Major Third")

```css
--fs-xs:   0.64rem;   /* 10.24px — labels, tags */
--fs-sm:   0.8rem;    /* 12.8px  — legendas */
--fs-base: 1rem;      /* 16px    — corpo */
--fs-md:   1.25rem;   /* 20px    — destaque de corpo */
--fs-lg:   1.563rem;  /* 25px    — H4 */
--fs-xl:   1.953rem;  /* 31.25px — H3 */
--fs-2xl:  2.441rem;  /* 39px    — H2 */
--fs-3xl:  3.052rem;  /* 48.8px  — H1 */
--fs-4xl:  3.815rem;  /* 61px    — Hero display */

--lh-tight: 1.1;
--lh-base:  1.6;
--ls-wide:  0.08em;   /* letter-spacing para títulos cyber */
```

### 1.3 Espaçamento, Raios e Grid

```css
/* Escala de espaçamento (base 8px) */
--space-1: 0.25rem;  --space-2: 0.5rem;  --space-3: 0.75rem;
--space-4: 1rem;     --space-6: 1.5rem;  --space-8: 2rem;
--space-12: 3rem;    --space-16: 4rem;   --space-24: 6rem;

/* Raios */
--radius-sm: 4px;  --radius-md: 10px;  --radius-lg: 18px;  --radius-pill: 999px;

/* Z-index layers */
--z-bg: 0; --z-content: 10; --z-overlay: 100; --z-nav: 500; --z-modal: 1000;

/* Container */
--container-max: 1200px;
--container-pad: clamp(1rem, 5vw, 3rem);
```

### 1.4 Microinterações (Regras de Animação)

| Interação | Gatilho | Efeito | Duração / Easing |
|-----------|---------|--------|------------------|
| **Hover de Card** | `:hover` | `translateY(-6px)` + glow neon + borda acende | `220ms cubic-bezier(.2,.8,.2,1)` |
| **Botão CTA** | `:hover/:active` | Scale `1.03`, brilho pulsa, sombra neon expande | `180ms ease-out` |
| **Coleta de moeda (XP)** | scroll-in | Counter anima 0 → valor + flip dourado | `900ms ease-out` |
| **Skill node** | `:hover` | Pulso de glow + linha conectora "energiza" | `300ms ease` |
| **Reveal de seção** | `IntersectionObserver` | Fade + `translateY(24px → 0)` | `500ms`, stagger 80ms |
| **Power-up (badge)** | load | Bounce sutil estilo Mario (`scale` keyframes) | `600ms` 1x |
| **Cursor neon** | `mousemove` | Glow follower (opcional, desktop) | `lerp` suave |
| **Foco teclado** | `:focus-visible` | Outline neon-cyan 2px + offset | instantâneo |

**Diretrizes globais:**
- Toda animação dentro de `@media (prefers-reduced-motion: reduce)` → reduzida a `opacity` simples ou desativada.
- Sempre animar **apenas** `transform` e `opacity`.
- `will-change` aplicado com parcimônia (somente em elementos realmente animados).

---

## 2. ARQUITETURA DE ARQUIVOS

> Estrutura **Vanilla modular** (recomendada para este escopo). Caso futuramente migre para React/Vite, a seção 2.2 traz o mapeamento equivalente.

### 2.1 Estrutura Vanilla (Recomendada)

```
Portifolio_Kleber/
│
├── index.html                  # Entry point único (SPA estática)
├── PROJECT_SCOPE.md            # Este documento
├── README.md                   # Apresentação do repositório
├── .gitignore
│
├── public/                     # Assets servidos diretamente
│   ├── favicon.svg
│   ├── og-image.png            # Open Graph / preview social
│   └── resume.pdf              # Currículo para download
│
├── src/
│   │
│   ├── css/
│   │   ├── 00-reset.css        # Reset / normalize moderno
│   │   ├── 01-tokens.css       # :root variables (cores, tipo, espaçamento)
│   │   ├── 02-base.css         # Estilos de elementos base (body, a, h1..h6)
│   │   ├── 03-layout.css       # Container, grid, helpers de layout
│   │   ├── 04-utilities.css    # Classes utilitárias (.flow, .visually-hidden)
│   │   │
│   │   ├── components/
│   │   │   ├── navbar.css
│   │   │   ├── button.css
│   │   │   ├── card.css
│   │   │   ├── badge.css
│   │   │   ├── stat-bar.css
│   │   │   └── skill-node.css
│   │   │
│   │   ├── sections/
│   │   │   ├── hero.css
│   │   │   ├── attributes.css
│   │   │   ├── skill-tree.css
│   │   │   ├── projects.css
│   │   │   └── contact.css
│   │   │
│   │   └── main.css            # @import orquestrador de todos os arquivos
│   │
│   ├── js/
│   │   ├── main.js             # Bootstrap / inicialização de módulos
│   │   │
│   │   ├── modules/
│   │   │   ├── navbar.js        # Scroll spy, menu mobile
│   │   │   ├── revealOnScroll.js# IntersectionObserver
│   │   │   ├── statCounter.js   # Animação de contadores (XP/moedas)
│   │   │   ├── skillTree.js     # Lógica de hover/conexões da árvore
│   │   │   ├── cursorGlow.js    # Cursor neon follower (desktop)
│   │   │   └── themeMotion.js   # Respeita prefers-reduced-motion
│   │   │
│   │   ├── data/
│   │   │   ├── attributes.js    # Dados dos atributos (stats)
│   │   │   ├── skills.js        # Nós e conexões da skill tree
│   │   │   └── projects.js      # Lista de projetos/cards
│   │   │
│   │   └── utils/
│   │       ├── dom.js           # Helpers (qs, qsa, on)
│   │       └── lerp.js          # Interpolação para animações suaves
│   │
│   └── assets/
│       ├── fonts/               # Fontes auto-hospedadas (woff2)
│       ├── img/                 # Imagens, texturas, screenshots
│       ├── icons/               # SVGs individuais
│       └── sprites/             # Sprite sheet (estilo Mario)
│
└── docs/
    └── changelog.md             # Histórico de evolução por fase
```

### 2.2 Mapeamento equivalente (caso vire React + Vite)

```
src/
├── components/   (Button, Card, Badge, StatBar, SkillNode, Navbar)
├── sections/     (Hero, Attributes, SkillTree, Projects, Contact)
├── hooks/        (useRevealOnScroll, useStatCounter, useReducedMotion)
├── data/         (attributes.ts, skills.ts, projects.ts)
├── styles/       (tokens.css, globals.css + CSS Modules por componente)
├── lib/          (dom, lerp)
├── App.tsx
└── main.tsx
```

> **Regra de organização:** 1 componente = 1 responsabilidade. Nenhum arquivo CSS de componente deve conhecer tokens crus (hex) — apenas variáveis de `01-tokens.css`.

---

## 3. ROADMAP DE DESENVOLVIMENTO (Fases Atômicas)

> Cada fase tem **critério de pronto (Definition of Done)**. Não avance de fase sem atingir o DoD.

### 🏗️ FASE 1 — Setup, Reset & Fundação
**Objetivo:** Esqueleto técnico e fundação de estilos.

- [ ] 1.1 Criar estrutura de pastas (seção 2.1).
- [ ] 1.2 `index.html` semântico com landmarks (`<header> <main> <section> <footer>`) e meta tags (SEO + Open Graph).
- [ ] 1.3 `00-reset.css` (box-sizing, margin reset, media responsiva, `prefers-reduced-motion`).
- [ ] 1.4 `01-tokens.css` com **todas** as variáveis da seção 1 (cores, tipo, espaçamento, z-index).
- [ ] 1.5 `02-base.css` (body com `--color-void`, tipografia base, links, foco).
- [ ] 1.6 `03-layout.css` (`.container`, grid helpers).
- [ ] 1.7 Auto-hospedar fontes em `assets/fonts/` + `@font-face`.
- [ ] 1.8 `main.css` orquestrando imports; `main.js` vazio inicializado.

**DoD:** Página em branco escura carregando, tokens aplicados, fontes renderizando, console limpo, Lighthouse sem erros de estrutura.

---

### 🦸 FASE 2 — Estrutura do Hero
**Objetivo:** Primeira dobra impactante — o "menu inicial do jogo".

- [ ] 2.1 Navbar fixa com logo (avatar pixel/inicial) + links de seção.
- [ ] 2.2 Menu mobile (hambúrguer → overlay) em `navbar.js`.
- [ ] 2.3 Layout do Hero: nome + cargo + "tagline de RPG" + CTA primário/secundário.
- [ ] 2.4 Aplicar `--gradient-hero` em título/destaque + glow.
- [ ] 2.5 Componente `button.css` (CTA primário neon-red, secundário outline-cyan).
- [ ] 2.6 Background do Hero: grid cyber sutil + vinheta (`radial-gradient`).
- [ ] 2.7 Scroll spy básico (navbar destaca seção ativa) em `navbar.js`.

**DoD:** Hero responsivo (320px → 1440px), navbar funcional desktop+mobile, CTAs com hover, sem layout shift.

---

### 📊 FASE 3 — Grid de Atributos (Stats RPG)
**Objetivo:** Seção de habilidades como ficha de personagem.

- [ ] 3.1 `data/attributes.js` (ex.: Frontend, Backend, UI/UX, Lógica — valor 0–100).
- [ ] 3.2 Layout em CSS Grid responsivo (`auto-fit, minmax`).
- [ ] 3.3 Componente `card.css` (graphite-900, borda graphite-700, hover glow).
- [ ] 3.4 Componente `stat-bar.css` (barra de XP com preenchimento neon-lime/cyan).
- [ ] 3.5 Componente `badge.css` (tags de tecnologia estilo power-up).
- [ ] 3.6 Renderização dinâmica dos cards via JS a partir de `attributes.js`.

**DoD:** Grid fluido sem quebras, barras renderizadas corretamente, dados desacoplados da view (só editar `attributes.js` para mudar conteúdo).

---

### 🌳 FASE 4 — Skill Tree (Árvore de Habilidades)
**Objetivo:** Diferencial visual — mapa de progressão estilo RPG.

- [ ] 4.1 `data/skills.js` (nós: id, label, tier, dependências/conexões).
- [ ] 4.2 Estrutura da árvore (CSS Grid/flex por tiers ou SVG para linhas conectoras).
- [ ] 4.3 Componente `skill-node.css` (círculo neon, estados: locked/unlocked/mastered).
- [ ] 4.4 Linhas conectoras (SVG `<path>` ou pseudo-elementos) entre nós.
- [ ] 4.5 `skillTree.js`: hover em um nó "energiza" caminho até a raiz.
- [ ] 4.6 Versão mobile: árvore vira layout vertical empilhado legível.

**DoD:** Árvore legível em desktop e mobile, conexões corretas, hover energiza caminho, estados visuais distintos.

---

### ✨ FASE 5 — Animações, Efeitos & Polimento
**Objetivo:** Vida, movimento e a camada "futurista" final.

- [ ] 5.1 `revealOnScroll.js` (IntersectionObserver + stagger) em todas as seções.
- [ ] 5.2 `statCounter.js` (atributos/moedas animam ao entrar na viewport).
- [ ] 5.3 `cursorGlow.js` (cursor neon follower com `lerp` — apenas desktop/pointer fino).
- [ ] 5.4 Micro-hovers finais (cards, botões, nodes) conforme tabela 1.4.
- [ ] 5.5 `themeMotion.js` garantindo `prefers-reduced-motion` em tudo.
- [ ] 5.6 Seção Projetos + Contato (formulário ou links sociais com glow).
- [ ] 5.7 Otimização: lazy-load de imagens, minificação, compressão de fontes.
- [ ] 5.8 QA final: Lighthouse (Perf/A11y/SEO ≥ 90), teste cross-browser, teclado.

**DoD:** Site completo, performático (≥90 Lighthouse), acessível, sem jank de animação, deploy pronto.

---

## 4. Checklist de Qualidade Transversal (toda fase)

- [ ] Sem cores hexadecimais cruas fora de `01-tokens.css`.
- [ ] HTML semântico e com `alt`/`aria-label` onde necessário.
- [ ] Contraste AA validado em texto.
- [ ] `prefers-reduced-motion` respeitado.
- [ ] Navegável 100% por teclado (`:focus-visible`).
- [ ] Sem erros/warnings no console.
- [ ] Testado em 320px, 768px, 1024px, 1440px.
- [ ] Commits atômicos por sub-tarefa (`feat:`, `style:`, `refactor:`).

---

## 5. Convenções de Código

| Item | Convenção |
|------|-----------|
| **CSS Classes** | BEM-light: `.card`, `.card__title`, `.card--featured` |
| **Variáveis CSS** | `--kebab-case` por categoria (`--color-`, `--space-`, `--fs-`) |
| **JS** | ES6 Modules, `camelCase`, funções puras nos `utils/` |
| **Commits** | Conventional Commits (`feat:`, `fix:`, `style:`, `docs:`) |
| **Branches** | `main` (estável) + `fase/N-nome` por fase |

---

> **Próximo passo após validação deste documento:** iniciar **FASE 1 — Setup, Reset & Fundação**.

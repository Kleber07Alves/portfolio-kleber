/* ============================================================
   DATA / SKILLS.JS
   Nós da Skill Tree (árvore de habilidades).
   Fonte de verdade do mapa de progressão. Editar SOMENTE aqui.

   Schema de cada nó:
   - id:    identificador único (string)
   - label: nome exibido (string)
   - tier:  nível na árvore (0 = raiz, cresce para baixo) (number)
   - deps:  ids dos nós-pai aos quais este se conecta (string[])
   - state: "mastered" | "unlocked" | "locked"
   - icon:  SVG inline (string, herda currentColor)

   Convenção: a ordem dentro de cada tier define a posição da
   esquerda p/ direita, agrupada por ramo para evitar cruzamentos.
   ============================================================ */

const ICONS = {
  cpu: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="8" y="8" width="8" height="8" rx="1"/><path d="M9 3v2M12 3v2M15 3v2M9 19v2M12 19v2M15 19v2M3 9h2M3 12h2M3 15h2M19 9h2M19 12h2M19 15h2"/></svg>`,
  layout: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="4" y="4" width="16" height="16" rx="2"/><path d="M4 9h16M9 9v11"/></svg>`,
  server: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="4" y="4" width="16" height="6" rx="1.5"/><rect x="4" y="14" width="16" height="6" rx="1.5"/><path d="M8 7h.01M8 17h.01"/></svg>`,
  terminal: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M7 9l3 3-3 3M13 15h4"/></svg>`,
  code: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M8 8l-4 4 4 4M16 8l4 4-4 4M14 5l-4 14"/></svg>`,
  palette: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3a9 9 0 1 0 0 18c1 0 1.5-.8 1.5-1.5 0-1 .8-1.5 1.5-1.5h1.5A3.5 3.5 0 0 0 20 12 8 8 0 0 0 12 3z"/><circle cx="7.5" cy="12" r="1"/><circle cx="10" cy="8" r="1"/><circle cx="15" cy="8" r="1"/></svg>`,
  database: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><ellipse cx="12" cy="6" rx="7" ry="3"/><path d="M5 6v6c0 1.7 3.1 3 7 3s7-1.3 7-3V6M5 12v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6"/></svg>`,
  git: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="6" cy="6" r="2.5"/><circle cx="6" cy="18" r="2.5"/><circle cx="18" cy="9" r="2.5"/><path d="M6 8.5v7M8.4 7.6 15 8.7M18 11.5c0 4-4 3.5-6 5.5"/></svg>`,
  atom: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="1.6"/><ellipse cx="12" cy="12" rx="10" ry="4.2"/><ellipse cx="12" cy="12" rx="10" ry="4.2" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="10" ry="4.2" transform="rotate(120 12 12)"/></svg>`,
  api: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M8 4H6a2 2 0 0 0-2 2v3a2 2 0 0 1-2 2 2 2 0 0 1 2 2v3a2 2 0 0 0 2 2h2M16 4h2a2 2 0 0 1 2 2v3a2 2 0 0 0 2 2 2 2 0 0 0-2 2v3a2 2 0 0 1-2 2h-2"/></svg>`,
  brain: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9.5 4a2.5 2.5 0 0 0-2.5 2.5A2.5 2.5 0 0 0 5 9c0 1 .5 1.8 1.2 2.3C5.5 11.8 5 12.7 5 13.7A2.8 2.8 0 0 0 8 16.5V20M14.5 4A2.5 2.5 0 0 1 17 6.5 2.5 2.5 0 0 1 19 9c0 1-.5 1.8-1.2 2.3.7.5 1.2 1.4 1.2 2.4a2.8 2.8 0 0 1-3 2.8V20M12 4.5v15"/></svg>`,
};

export const skills = [
  // ---------- Tier 0: raiz ----------
  { id: "core", label: "Fundamentos", tier: 0, deps: [], state: "mastered", icon: ICONS.cpu },

  // ---------- Tier 1: ramos ----------
  { id: "frontend", label: "Front-End", tier: 1, deps: ["core"], state: "mastered", icon: ICONS.layout },
  { id: "backend",  label: "Back-End",  tier: 1, deps: ["core"], state: "unlocked", icon: ICONS.server },
  { id: "tooling",  label: "Ferramentas", tier: 1, deps: ["core"], state: "mastered", icon: ICONS.terminal },

  // ---------- Tier 2 ----------
  { id: "js",      label: "JavaScript",      tier: 2, deps: ["frontend"], state: "mastered", icon: ICONS.code },
  { id: "styling", label: "HTML & CSS",      tier: 2, deps: ["frontend"], state: "mastered", icon: ICONS.palette },
  { id: "node",    label: "Node.js",         tier: 2, deps: ["backend"],  state: "unlocked", icon: ICONS.server },
  { id: "db",      label: "Bancos de Dados", tier: 2, deps: ["backend"],  state: "unlocked", icon: ICONS.database },
  { id: "git",     label: "Git & GitHub",    tier: 2, deps: ["tooling"],  state: "mastered", icon: ICONS.git },

  // ---------- Tier 3: folhas ----------
  { id: "react", label: "React",     tier: 3, deps: ["js"],   state: "unlocked", icon: ICONS.atom },
  { id: "ai",    label: "IA & LLMs", tier: 3, deps: ["js"],   state: "locked",   icon: ICONS.brain },
  { id: "api",   label: "APIs REST", tier: 3, deps: ["node"], state: "unlocked", icon: ICONS.api },
];

export default skills;

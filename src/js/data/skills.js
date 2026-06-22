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

   Estados refletem a realidade atual:
   - mastered (verde): básico concluído / dominado
   - unlocked (azul):  em evolução / estudando ativamente
   - locked (cinza):   ainda a desbloquear
   ============================================================ */

const ICONS = {
  code: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M8 8l-4 4 4 4M16 8l4 4-4 4M14 5l-4 14"/></svg>`,
  cpu: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="8" y="8" width="8" height="8" rx="1"/><path d="M9 3v2M12 3v2M15 3v2M9 19v2M12 19v2M15 19v2M3 9h2M3 12h2M3 15h2M19 9h2M19 12h2M19 15h2"/></svg>`,
  layout: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="4" y="4" width="16" height="16" rx="2"/><path d="M4 9h16M9 9v11"/></svg>`,
  git: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="6" cy="6" r="2.5"/><circle cx="6" cy="18" r="2.5"/><circle cx="18" cy="9" r="2.5"/><path d="M6 8.5v7M8.4 7.6 15 8.7M18 11.5c0 4-4 3.5-6 5.5"/></svg>`,
  coffee: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 9h12v4a5 5 0 0 1-5 5H10a5 5 0 0 1-5-5z"/><path d="M17 10h2a2 2 0 0 1 0 4h-2"/><path d="M8 3v2M11 3v2M14 3v2"/></svg>`,
  database: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><ellipse cx="12" cy="6" rx="7" ry="3"/><path d="M5 6v6c0 1.7 3.1 3 7 3s7-1.3 7-3V6M5 12v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6"/></svg>`,
  structure: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="6" cy="6" r="2.4"/><circle cx="6" cy="18" r="2.4"/><circle cx="18" cy="12" r="2.4"/><path d="M8 7l8 4M8 17l8-4"/></svg>`,
  terminal: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M7 9l3 3-3 3M13 15h4"/></svg>`,
  cycle: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 12a8 8 0 0 1 13.5-5.8L20 8"/><path d="M20 12a8 8 0 0 1-13.5 5.8L4 16"/><path d="M20 4v4h-4M4 20v-4h4"/></svg>`,
  brain: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9.5 4a2.5 2.5 0 0 0-2.5 2.5A2.5 2.5 0 0 0 5 9c0 1 .5 1.8 1.2 2.3C5.5 11.8 5 12.7 5 13.7A2.8 2.8 0 0 0 8 16.5V20M14.5 4A2.5 2.5 0 0 1 17 6.5 2.5 2.5 0 0 1 19 9c0 1-.5 1.8-1.2 2.3.7.5 1.2 1.4 1.2 2.4a2.8 2.8 0 0 1-3 2.8V20M12 4.5v15"/></svg>`,
  api: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M8 4H6a2 2 0 0 0-2 2v3a2 2 0 0 1-2 2 2 2 0 0 1 2 2v3a2 2 0 0 0 2 2h2M16 4h2a2 2 0 0 1 2 2v3a2 2 0 0 0 2 2 2 2 0 0 0-2 2v3a2 2 0 0 1-2 2h-2"/></svg>`,
  leaf: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 19c-1-8 5-14 14-14 1 9-5 15-14 14z"/><path d="M9 15c2.5-3 5-5 8.5-7"/></svg>`,
  flask: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 3h6M10 3v6l-5 9a2 2 0 0 0 1.8 3h10.4a2 2 0 0 0 1.8-3l-5-9V3"/><path d="M7.5 15h9"/></svg>`,
  shield: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6z"/><rect x="9.5" y="11" width="5" height="4" rx="1"/><path d="M10.5 11v-1.2a1.5 1.5 0 0 1 3 0V11"/></svg>`,
  server: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="4" y="4" width="16" height="6" rx="1.5"/><rect x="4" y="14" width="16" height="6" rx="1.5"/><path d="M8 7h.01M8 17h.01"/></svg>`,
  atom: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="1.6"/><ellipse cx="12" cy="12" rx="10" ry="4.2"/><ellipse cx="12" cy="12" rx="10" ry="4.2" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="10" ry="4.2" transform="rotate(120 12 12)"/></svg>`,
};

export const skills = [
  // ---------- Tier 0: raiz ----------
  { id: "logica", label: "Lógica de Programação", tier: 0, deps: [], state: "mastered", icon: ICONS.code },

  // ---------- Tier 1: fundamentos verdes ----------
  { id: "htmlcss",     label: "HTML & CSS",      tier: 1, deps: ["logica"], state: "mastered", icon: ICONS.layout },
  { id: "fundamentos", label: "Fundamentos de TI", tier: 1, deps: ["logica"], state: "mastered", icon: ICONS.cpu },
  { id: "git",         label: "Git & GitHub",    tier: 1, deps: ["logica"], state: "mastered", icon: ICONS.git },

  // ---------- Tier 2: em evolução (azul) ----------
  { id: "estruturas", label: "Estruturas de Dados", tier: 2, deps: ["logica"],      state: "unlocked", icon: ICONS.structure },
  { id: "java",       label: "Java (Core & OO)",    tier: 2, deps: ["logica"],      state: "unlocked", icon: ICONS.coffee },
  { id: "ia",         label: "IA & LLMs",           tier: 2, deps: ["logica"],      state: "unlocked", icon: ICONS.brain },
  { id: "sql",        label: "SQL (Queries & Modelagem)", tier: 2, deps: ["fundamentos"], state: "unlocked", icon: ICONS.database },
  { id: "linux",      label: "Linux",               tier: 2, deps: ["fundamentos"], state: "unlocked", icon: ICONS.terminal },
  { id: "agile",      label: "Metodologias Ágeis (Scrum)", tier: 2, deps: ["git"],  state: "unlocked", icon: ICONS.cycle },

  // ---------- Tier 3: a desbloquear (cinza) ----------
  { id: "react",    label: "React",             tier: 3, deps: ["htmlcss"], state: "locked", icon: ICONS.atom },
  { id: "node",     label: "Node.js",           tier: 3, deps: ["htmlcss"], state: "locked", icon: ICONS.server },
  { id: "apis",     label: "APIs REST",         tier: 3, deps: ["java"],    state: "locked", icon: ICONS.api },
  { id: "spring",   label: "Spring Boot",       tier: 3, deps: ["java"],    state: "locked", icon: ICONS.leaf },
  { id: "tests",    label: "Testes Unitários",  tier: 3, deps: ["java"],    state: "locked", icon: ICONS.flask },
  { id: "security", label: "Web Security",      tier: 3, deps: ["java"],    state: "locked", icon: ICONS.shield },
];

export default skills;

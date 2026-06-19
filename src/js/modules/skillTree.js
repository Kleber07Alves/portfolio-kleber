/* ============================================================
   MODULES / SKILLTREE.JS
   Renderiza a árvore de habilidades e desenha as conexões SVG
   medindo a posição real de cada nó (robusto a qualquer largura).
   Hover/focus num nó "energiza" o caminho até a raiz.

   View desacoplada dos dados (data/skills.js).
   ============================================================ */

import { skills } from "../data/skills.js";

const SVG_NS = "http://www.w3.org/2000/svg";
const DESKTOP_BREAKPOINT = 768;

const STATE_LABEL = {
  mastered: "dominado",
  unlocked: "em evolução",
  locked: "a desbloquear",
};

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function initSkillTree() {
  const canvas = document.getElementById("skillCanvas");
  if (!canvas) return;

  const map = new Map(skills.map((s) => [s.id, s]));

  // Arestas (filho -> pai), uma por dependência.
  const edges = [];
  for (const node of skills) {
    for (const dep of node.deps) {
      if (map.has(dep)) edges.push({ child: node.id, parent: dep });
    }
  }

  /* ---------- Render ---------- */
  const svg = document.createElementNS(SVG_NS, "svg");
  svg.setAttribute("class", "skill-tree__svg");
  svg.setAttribute("preserveAspectRatio", "none");
  svg.setAttribute("aria-hidden", "true");

  // Um <path> por aresta, indexado para energização.
  const pathByEdge = new Map();
  for (const edge of edges) {
    const path = document.createElementNS(SVG_NS, "path");
    path.setAttribute("class", "skill-tree__link");
    pathByEdge.set(`${edge.child}__${edge.parent}`, path);
    svg.appendChild(path);
  }

  // Tiers e nós.
  const tiers = document.createElement("div");
  tiers.className = "skill-tree__tiers";

  const maxTier = Math.max(...skills.map((s) => s.tier));
  const dotById = new Map();
  const nodeById = new Map();

  for (let t = 0; t <= maxTier; t++) {
    const row = document.createElement("div");
    row.className = "skill-tree__tier";
    row.dataset.tier = String(t);

    for (const node of skills.filter((s) => s.tier === t)) {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = `skill-node skill-node--${node.state}`;
      btn.dataset.id = node.id;
      btn.setAttribute(
        "aria-label",
        `${node.label} — ${STATE_LABEL[node.state] || node.state}`
      );
      btn.innerHTML = `
        <span class="skill-node__dot">${node.icon}</span>
        <span class="skill-node__label">${escapeHtml(node.label)}</span>
      `;
      row.appendChild(btn);
      nodeById.set(node.id, btn);
      dotById.set(node.id, btn.querySelector(".skill-node__dot"));
    }
    tiers.appendChild(row);
  }

  // Limpa o <noscript> e injeta a árvore.
  canvas.textContent = "";
  canvas.appendChild(svg);
  canvas.appendChild(tiers);

  /* ---------- Layout das linhas ---------- */
  function isDesktop() {
    return window.innerWidth >= DESKTOP_BREAKPOINT;
  }

  function layout() {
    if (!isDesktop()) return; // mobile usa o trilho CSS

    const base = canvas.getBoundingClientRect();
    svg.setAttribute("viewBox", `0 0 ${base.width} ${base.height}`);

    const center = (dot, edgeY) => {
      const r = dot.getBoundingClientRect();
      return {
        x: r.left - base.left + r.width / 2,
        y: (edgeY === "top" ? r.top : r.bottom) - base.top,
      };
    };

    for (const edge of edges) {
      const path = pathByEdge.get(`${edge.child}__${edge.parent}`);
      const childDot = dotById.get(edge.child);
      const parentDot = dotById.get(edge.parent);
      if (!path || !childDot || !parentDot) continue;

      const a = center(parentDot, "bottom"); // sai do pai (acima)
      const b = center(childDot, "top"); // chega no filho (abaixo)
      const dy = (b.y - a.y) / 2;

      path.setAttribute(
        "d",
        `M ${a.x} ${a.y} C ${a.x} ${a.y + dy} ${b.x} ${b.y - dy} ${b.x} ${b.y}`
      );
    }
  }

  /* ---------- Energização do caminho até a raiz ---------- */
  function chainToRoot(id, set = new Set()) {
    if (set.has(id)) return set;
    set.add(id);
    const node = map.get(id);
    if (node) node.deps.forEach((dep) => chainToRoot(dep, set));
    return set;
  }

  function energize(id) {
    const active = chainToRoot(id);

    nodeById.forEach((el, nodeId) => {
      el.classList.toggle("is-active", active.has(nodeId));
      el.classList.toggle("is-target", nodeId === id);
    });

    pathByEdge.forEach((path, key) => {
      const [child, parent] = key.split("__");
      path.classList.toggle("is-active", active.has(child) && active.has(parent));
    });

    canvas.classList.add("is-dimmed");
  }

  function reset() {
    nodeById.forEach((el) => el.classList.remove("is-active", "is-target"));
    pathByEdge.forEach((path) => path.classList.remove("is-active"));
    canvas.classList.remove("is-dimmed");
  }

  // Delegação de eventos (mouse + teclado).
  tiers.addEventListener("mouseover", (e) => {
    const node = e.target.closest(".skill-node");
    if (node) energize(node.dataset.id);
  });
  tiers.addEventListener("mouseleave", reset);
  tiers.addEventListener("focusin", (e) => {
    const node = e.target.closest(".skill-node");
    if (node) energize(node.dataset.id);
  });
  tiers.addEventListener("focusout", reset);

  /* ---------- Inicialização e responsividade ---------- */
  // Recalcula após o layout estabilizar.
  requestAnimationFrame(layout);

  let raf = 0;
  const scheduleLayout = () => {
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(layout);
  };

  window.addEventListener("resize", scheduleLayout);
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(layout);
  }
}

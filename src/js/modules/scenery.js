/* ============================================================
   MODULES / SCENERY.JS
   Espalha ícones temáticos (moeda, estrela, bloco) de forma sutil
   nas laterais das seções internas, dando a sensação de navegar
   por "fases" do mesmo jogo. Decorativo: aria-hidden e atrás do
   conteúdo. Reaproveita as keyframes de animação do hero via CSS.
   ============================================================ */

const ICONS = {
  coin: `<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="10" fill="#F4C152" stroke="#E09A2A" stroke-width="1.5"/><ellipse cx="12" cy="12" rx="3.6" ry="5.6" fill="none" stroke="#E09A2A" stroke-width="1.5"/></svg>`,
  star: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2l3 6.3 6.9 1-5 4.8 1.2 6.9L12 17.8 5.9 21l1.2-6.9-5-4.8 6.9-1z" fill="#F4C152" stroke="#E09A2A" stroke-width="1.2" stroke-linejoin="round"/></svg>`,
  block: `<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="2.5" y="2.5" width="19" height="19" rx="4.5" fill="#E9A93C" stroke="#C5862A" stroke-width="1.5"/><text x="12" y="16.5" text-anchor="middle" font-family="Fredoka, sans-serif" font-size="13" font-weight="700" fill="#fff">?</text></svg>`,
};

/* Posições escolhidas nas laterais/cantos, longe do conteúdo central.
   anim: "float" (sobe e desce) ou "twinkle" (pulsa/pisca). */
const LAYOUTS = {
  "skill-tree": [
    { icon: "coin",  top: "20%",    left: "3%",  size: 26, anim: "float",   dur: 4.2, delay: 0 },
    { icon: "star",  top: "56%",    left: "6%",  size: 18, anim: "twinkle", dur: 2.8, delay: 0.5 },
    { icon: "block", top: "30%",    right: "4%", size: 32, anim: "float",   dur: 5,   delay: 0.3 },
    { icon: "star",  bottom: "16%", right: "8%", size: 16, anim: "twinkle", dur: 2.4, delay: 0.9 },
  ],
  projects: [
    { icon: "block", top: "16%",    left: "3%",  size: 28, anim: "float",   dur: 4.6, delay: 0.2 },
    { icon: "star",  top: "60%",    left: "6%",  size: 16, anim: "twinkle", dur: 2.6, delay: 0.6 },
    { icon: "coin",  top: "26%",    right: "3%", size: 24, anim: "float",   dur: 3.9, delay: 0 },
    { icon: "star",  bottom: "18%", right: "7%", size: 18, anim: "twinkle", dur: 3,   delay: 0.4 },
  ],
  journey: [
    { icon: "coin",  top: "18%",    right: "4%", size: 26, anim: "float",   dur: 4.3, delay: 0.1 },
    { icon: "star",  top: "58%",    left: "4%",  size: 18, anim: "twinkle", dur: 2.7, delay: 0.4 },
    { icon: "block", bottom: "14%", left: "6%",  size: 26, anim: "float",   dur: 5,   delay: 0.3 },
  ],
};

export function initScenery() {
  for (const [id, items] of Object.entries(LAYOUTS)) {
    const section = document.getElementById(id);
    if (!section) continue;

    section.classList.add("has-scenery");

    const layer = document.createElement("div");
    layer.className = "scenery";
    layer.setAttribute("aria-hidden", "true");

    for (const it of items) {
      const el = document.createElement("span");
      el.className = `scenery__item scenery__item--${it.anim}`;
      el.innerHTML = ICONS[it.icon] || "";
      el.style.width = `${it.size}px`;
      el.style.height = `${it.size}px`;
      if (it.top != null) el.style.top = it.top;
      if (it.bottom != null) el.style.bottom = it.bottom;
      if (it.left != null) el.style.left = it.left;
      if (it.right != null) el.style.right = it.right;
      el.style.setProperty("--sd", `${it.dur}s`);
      el.style.setProperty("--sdelay", `${it.delay || 0}s`);
      layer.appendChild(el);
    }

    section.prepend(layer);
  }
}

/* ============================================================
   MODULES / STATCOUNTER.JS
   Anima os números (.js-count) de 0 ao alvo e preenche as barras
   de XP (.stat__fill) quando o card entra na viewport. Cada card
   dispara sua própria animação (funciona em desktop e mobile).
   Respeita prefers-reduced-motion (mostra valores finais direto).
   ============================================================ */

import { prefersReducedMotion } from "./themeMotion.js";

const DURATION = 1100; // ms da contagem

/** Easing suave (easeOutCubic). */
function easeOut(t) {
  return 1 - Math.pow(1 - t, 3);
}

/** Anima um número de 0 até o alvo com requestAnimationFrame. */
function countUp(el) {
  const target = Number(el.dataset.countTo) || 0;
  const start = performance.now();

  function step(now) {
    const p = Math.min((now - start) / DURATION, 1);
    el.textContent = String(Math.round(easeOut(p) * target));
    if (p < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

/** Preenche a barra: a transição de width no CSS faz a suavidade. */
function fillBar(bar) {
  bar.style.setProperty("--val", `${Number(bar.dataset.fillTo) || 0}%`);
}

export function initStatCounter() {
  const cards = document.querySelectorAll("#attributesGrid .card");
  if (!cards.length) return;

  const counts = (root) => root.querySelectorAll(".js-count");
  const bars = (root) => root.querySelectorAll(".stat__fill");

  // Movimento reduzido: aplica valores finais sem animação.
  if (prefersReducedMotion()) {
    cards.forEach((card) => {
      counts(card).forEach((el) => (el.textContent = el.dataset.countTo));
      bars(card).forEach(fillBar);
    });
    return;
  }

  // Estado inicial: zera números e barras (antes do primeiro paint).
  cards.forEach((card) => {
    counts(card).forEach((el) => (el.textContent = "0"));
    bars(card).forEach((bar) => bar.style.setProperty("--val", "0%"));
  });

  // Sem IntersectionObserver: anima tudo já.
  if (!("IntersectionObserver" in window)) {
    cards.forEach((card) => {
      counts(card).forEach(countUp);
      bars(card).forEach(fillBar);
    });
    return;
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const card = entry.target;
        counts(card).forEach(countUp);
        bars(card).forEach(fillBar);
        obs.unobserve(card);
      }
    },
    { threshold: 0.35 }
  );

  cards.forEach((card) => observer.observe(card));
}

/* ============================================================
   MODULES / REVEALONSCROLL.JS
   Faz elementos [data-reveal] surgirem (fade + translateY) ao
   entrarem na viewport, com efeito stagger (cascata) entre
   irmãos do mesmo container. Respeita prefers-reduced-motion.
   ============================================================ */

import { prefersReducedMotion } from "./themeMotion.js";

const STAGGER_MS = 90; // atraso entre cards irmãos
const MAX_STEPS = 6; // teto do stagger p/ não atrasar demais

export function initReveal() {
  const targets = document.querySelectorAll("[data-reveal]");
  if (!targets.length) return;

  // Movimento reduzido: revela tudo imediatamente, sem animação.
  if (prefersReducedMotion()) {
    targets.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  // Stagger: índice de cada elemento entre os irmãos [data-reveal].
  const indexInGroup = new Map();
  targets.forEach((el) => {
    const siblings = el.parentElement
      ? [...el.parentElement.children].filter((c) => c.hasAttribute("data-reveal"))
      : [el];
    const i = Math.min(siblings.indexOf(el), MAX_STEPS);
    indexInGroup.set(el, i < 0 ? 0 : i);
  });

  // Sem suporte a IntersectionObserver: degrada revelando tudo.
  if (!("IntersectionObserver" in window)) {
    targets.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const el = entry.target;
        el.style.setProperty(
          "--reveal-delay",
          `${indexInGroup.get(el) * STAGGER_MS}ms`
        );
        el.classList.add("is-visible");
        obs.unobserve(el); // anima só uma vez
      }
    },
    { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
  );

  targets.forEach((el) => observer.observe(el));
}

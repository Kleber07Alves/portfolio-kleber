/* ============================================================
   MODULES / CURSORGLOW.JS
   Luz de fundo sutil (glow follower) que segue o cursor com
   interpolação (lerp) para um toque cyberpunk. Só em desktop
   com ponteiro fino e sem prefers-reduced-motion.
   ============================================================ */

import { prefersReducedMotion } from "./themeMotion.js";

const LERP = 0.12; // 0 = não move, 1 = gruda no cursor
const DESKTOP_BREAKPOINT = 768;

export function initCursorGlow() {
  // Pré-condições: ponteiro fino, tela ampla, movimento permitido.
  const finePointer = window.matchMedia("(pointer: fine)").matches;
  if (prefersReducedMotion() || !finePointer || window.innerWidth < DESKTOP_BREAKPOINT) {
    return;
  }

  const glow = document.createElement("div");
  glow.className = "cursor-glow";
  glow.setAttribute("aria-hidden", "true");
  document.body.appendChild(glow);

  // Começa no centro para evitar salto inicial.
  let targetX = window.innerWidth / 2;
  let targetY = window.innerHeight / 2;
  let x = targetX;
  let y = targetY;
  let visible = false;
  let raf = 0;

  function onMove(e) {
    targetX = e.clientX;
    targetY = e.clientY;
    if (!visible) {
      visible = true;
      glow.classList.add("is-active");
    }
  }

  function loop() {
    x += (targetX - x) * LERP;
    y += (targetY - y) * LERP;
    glow.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
    raf = requestAnimationFrame(loop);
  }

  // Esconde quando o mouse sai da janela.
  function onLeave() {
    visible = false;
    glow.classList.remove("is-active");
  }

  window.addEventListener("mousemove", onMove, { passive: true });
  document.addEventListener("mouseleave", onLeave);
  raf = requestAnimationFrame(loop);

  // Desliga em telas que deixam de ser desktop (limpeza defensiva).
  window.matchMedia(`(min-width: ${DESKTOP_BREAKPOINT}px)`).addEventListener(
    "change",
    (ev) => {
      if (!ev.matches) {
        cancelAnimationFrame(raf);
        glow.remove();
        window.removeEventListener("mousemove", onMove);
        document.removeEventListener("mouseleave", onLeave);
      }
    }
  );
}

/* ============================================================
   MAIN.JS — Bootstrap
   Ponto de entrada da aplicação (ES Module).
   Importa e inicializa os módulos de comportamento. Novos
   módulos (revealOnScroll, statCounter, etc.) entram aqui.
   ============================================================ */

import { initThemeMotion } from "./modules/themeMotion.js";
import { initNavbar } from "./modules/navbar.js";
import { initAttributes } from "./modules/attributes.js";
import { initSkillTree } from "./modules/skillTree.js";
import { initStatCounter } from "./modules/statCounter.js";
import { initReveal } from "./modules/revealOnScroll.js";
import { initCursorGlow } from "./modules/cursorGlow.js";

const App = {
  init() {
    // 1. Preferência de movimento primeiro (os demais módulos a consultam).
    initThemeMotion();

    // 2. Estrutura e conteúdo.
    this.setFooterYear();
    initNavbar();
    initAttributes();
    initSkillTree();

    // 3. Camada de animação e efeitos (depende do conteúdo já renderizado).
    initStatCounter();
    initReveal();
    initCursorGlow();

    console.log("%c⚡ FASE 5 — Animações e efeitos ativos", "color:#39FF14;font-weight:bold;");
  },

  /** Preenche o ano atual no footer. */
  setFooterYear() {
    const yearEl = document.getElementById("year");
    if (yearEl) {
      yearEl.textContent = String(new Date().getFullYear());
    }
  },
};

// Inicializa quando o DOM estiver pronto.
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => App.init());
} else {
  App.init();
}

export default App;

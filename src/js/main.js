/* ============================================================
   MAIN.JS — Bootstrap
   Ponto de entrada da aplicação (ES Module).
   Importa e inicializa os módulos de comportamento.
   ============================================================ */

import { initThemeMotion } from "./modules/themeMotion.js";
import { initNavbar } from "./modules/navbar.js";
import { initSkillTree } from "./modules/skillTree.js";
import { initScenery } from "./modules/scenery.js";
import { initReveal } from "./modules/revealOnScroll.js";

const App = {
  init() {
    // 1. Preferência de movimento primeiro (os demais módulos a consultam).
    initThemeMotion();

    // 2. Estrutura e conteúdo.
    this.setFooterYear();
    initNavbar();
    initSkillTree();
    initScenery();

    // 3. Camada de animação e efeitos (depende do conteúdo já renderizado).
    initReveal();

    console.log("%c🍄 Portfólio carregado", "color:#57A773;font-weight:bold;");
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

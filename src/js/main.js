/* ============================================================
   MAIN.JS — Bootstrap
   Ponto de entrada da aplicação (ES Module).
   Importa e inicializa os módulos de comportamento. Novos
   módulos (revealOnScroll, statCounter, etc.) entram aqui.
   ============================================================ */

import { initNavbar } from "./modules/navbar.js";

const App = {
  init() {
    this.setFooterYear();
    initNavbar();
    console.log("%c⚡ FASE 2 — Hero inicializado", "color:#39FF14;font-weight:bold;");
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

/* ============================================================
   MAIN.JS — Bootstrap
   Ponto de entrada da aplicação (ES Module).
   Na FASE 1 apenas inicializa e valida o pipeline.
   Os módulos (navbar, revealOnScroll, statCounter, etc.) serão
   importados e inicializados aqui a partir da FASE 2.
   ============================================================ */

const App = {
  init() {
    this.setFooterYear();
    console.log("%c⚡ Fundação inicializada — FASE 1 OK", "color:#39FF14;font-weight:bold;");
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

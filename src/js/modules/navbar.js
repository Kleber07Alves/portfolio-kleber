/* ============================================================
   MODULES / NAVBAR.JS
   Controla o menu hamburger (overlay) no mobile:
   - alterna estado aberto/fechado (classe + aria-expanded);
   - fecha ao clicar num link, no ESC ou ao redimensionar p/ desktop;
   - trava o scroll do body enquanto o overlay esta aberto.
   ============================================================ */

const DESKTOP_BREAKPOINT = 768; // deve casar com navbar.css

export function initNavbar() {
  const toggle = document.getElementById("navToggle");
  const menu = document.getElementById("navMenu");

  // Falha silenciosa se a marcacao nao existir.
  if (!toggle || !menu) return;

  const openMenu = () => setMenu(true);
  const closeMenu = () => setMenu(false);

  function setMenu(isOpen) {
    menu.classList.toggle("is-open", isOpen);
    toggle.setAttribute("aria-expanded", String(isOpen));
    toggle.setAttribute("aria-label", isOpen ? "Fechar menu" : "Abrir menu");
    document.body.classList.toggle("nav-open", isOpen);
  }

  function isOpen() {
    return toggle.getAttribute("aria-expanded") === "true";
  }

  // Clique no hamburger alterna o estado.
  toggle.addEventListener("click", () => {
    isOpen() ? closeMenu() : openMenu();
  });

  // Clicar num link fecha o overlay (navegacao por ancora).
  menu.addEventListener("click", (event) => {
    if (event.target.closest(".navbar__link")) closeMenu();
  });

  // ESC fecha o overlay e devolve o foco ao botao.
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && isOpen()) {
      closeMenu();
      toggle.focus();
    }
  });

  // Ao passar para desktop, garante o menu limpo (sem trava de scroll).
  const mql = window.matchMedia(`(min-width: ${DESKTOP_BREAKPOINT}px)`);
  mql.addEventListener("change", (event) => {
    if (event.matches) closeMenu();
  });
}

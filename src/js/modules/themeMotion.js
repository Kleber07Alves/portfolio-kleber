/* ============================================================
   MODULES / THEMEMOTION.JS
   Fonte única para a preferência de movimento do usuário.
   Espelha prefers-reduced-motion num atributo no <html> e expõe
   um helper para os demais módulos decidirem se animam ou não.
   ============================================================ */

const mql = window.matchMedia("(prefers-reduced-motion: reduce)");

/** true quando o usuário pediu para reduzir o movimento. */
export function prefersReducedMotion() {
  return mql.matches;
}

export function initThemeMotion() {
  const apply = () => {
    document.documentElement.dataset.motion = mql.matches ? "reduced" : "full";
  };

  apply();
  // Reage a mudanças em tempo real (ex.: usuário altera no SO).
  mql.addEventListener("change", apply);
}

/* ============================================================
   MODULES / ATTRIBUTES.JS
   Le os dados de data/attributes.js e injeta os cards no grid.
   View 100% desacoplada dos dados. Inclui escape de texto para
   evitar HTML indevido vindo das strings de conteudo.
   ============================================================ */

import { attributes } from "../data/attributes.js";

/** Escapa texto para insercao segura como conteudo HTML. */
function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** Monta o markup de um unico card de atributo. */
function cardTemplate(attr) {
  const accent = attr.accent === "lime" ? "lime" : "cyan";

  const tags = attr.tags
    .map((tag) => `<li class="badge">${escapeHtml(tag)}</li>`)
    .join("");

  const value = Number(attr.value);

  // attr.icon e SVG confiavel definido em data/attributes.js (nao escapar).
  // Numeros usam data-count-to para o statCounter animar de 0 ao alvo.
  return `
    <article class="card card--${accent}" role="listitem" data-reveal>
      <div class="card__head">
        <span class="card__icon" aria-hidden="true">${attr.icon}</span>
        <div class="card__heading">
          <h3 class="card__title">${escapeHtml(attr.title)}</h3>
          <span class="card__level">LV <span class="js-count" data-count-to="${value}">${value}</span></span>
        </div>
      </div>

      <p class="card__desc">${escapeHtml(attr.desc)}</p>

      <div class="stat">
        <div class="stat__meta">
          <span class="stat__label">XP</span>
          <span class="stat__value"><span class="js-count" data-count-to="${value}">${value}</span> / 100</span>
        </div>
        <div class="stat__track">
          <div
            class="stat__fill stat__fill--${accent}"
            style="--val: ${value}%"
            data-fill-to="${value}"
            role="progressbar"
            aria-valuenow="${value}"
            aria-valuemin="0"
            aria-valuemax="100"
            aria-label="Nível de ${escapeHtml(attr.title)}"
          ></div>
        </div>
      </div>

      <ul class="card__tags badges" role="list">${tags}</ul>
    </article>
  `;
}

export function initAttributes() {
  const grid = document.getElementById("attributesGrid");
  if (!grid) return;

  // Renderiza todos os cards de uma vez.
  grid.innerHTML = attributes.map(cardTemplate).join("");
}

/* ============================================================
   DATA / ATTRIBUTES.JS
   Ficha de personagem — os 4 pilares de Kleber.
   Fonte de verdade dos cards de Atributos. Editar SOMENTE aqui
   para alterar conteudo; a view (modules/attributes.js) e
   100% desacoplada destes dados.

   Schema de cada atributo:
   - id:      identificador unico (string, kebab-case)
   - title:   nome do atributo (string)
   - value:   nivel de 0 a 100 (number) -> preenche a stat-bar
   - accent:  "lime" | "cyan" -> cor do preenchimento da barra
   - icon:    SVG inline (string) — herda currentColor
   - desc:    descricao curta (string)
   - tags:    sub-habilidades / power-ups (string[])
   ============================================================ */

/* Icones SVG (stroke = currentColor, 24x24, traco 1.5). */
const ICONS = {
  // Peca de xadrez (cavalo) — estrategia
  strategy: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 21h14M6 21c0-3 1-5 2-6.5C7 14 6 13.5 6 12c0-2 2-3 2-3l-1-2 2-1 1 2c1-1 3-2 5 0 1.5 1.5 2 4 2 7v6"/><circle cx="14.5" cy="8.5" r=".6" fill="currentColor"/></svg>`,
  // Escudo com raio — resiliencia
  shield: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6l7-3z"/><path d="M12 8l-2 4h3l-2 4"/></svg>`,
  // Lampada / cerebro — curiosidade
  curiosity: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 18h6M10 21h4M12 3a6 6 0 0 1 4 10.5c-.6.6-1 1.3-1 2.1V16H9v-.4c0-.8-.4-1.5-1-2.1A6 6 0 0 1 12 3z"/></svg>`,
  // Chip / servidor — sistemas e infra
  systems: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="7" y="7" width="10" height="10" rx="1.5"/><path d="M10 11h4M10 14h4M9 3v2M12 3v2M15 3v2M9 19v2M12 19v2M15 19v2M3 9h2M3 12h2M3 15h2M19 9h2M19 12h2M19 15h2"/></svg>`,
};

export const attributes = [
  {
    id: "logica-estrategica",
    title: "Lógica Estratégica",
    value: 92,
    accent: "cyan",
    icon: ICONS.strategy,
    desc: "Penso cada problema como um tabuleiro: antecipo jogadas, calculo trade-offs e busco a solução mais elegante. Xadrez e matemática treinam meu raciocínio abstrato todos os dias.",
    tags: ["Xadrez", "Matemática", "Algoritmos", "Problem Solving", "Abstração"],
  },
  {
    id: "resiliencia-consistencia",
    title: "Resiliência & Consistência",
    value: 88,
    accent: "lime",
    icon: ICONS.shield,
    desc: "A disciplina dos treinos físicos virou método: aparecer todo dia, manter o ritmo e transformar esforço repetido em progresso. Consistência no código vem da mesma fonte.",
    tags: ["Disciplina", "Rotina", "Foco", "Hábitos", "Long-term"],
  },
  {
    id: "curiosidade-intelectual",
    title: "Curiosidade Intelectual",
    value: 90,
    accent: "cyan",
    icon: ICONS.curiosity,
    desc: "Aprendizado é vício saudável. Acompanho diariamente notícias de tecnologia e IA, mergulho em filosofia e questiono o porquê das coisas antes do como.",
    tags: ["IA & LLMs", "Filosofia", "Tech News", "Auto-didatismo", "Pesquisa"],
  },
  {
    id: "sistemas-infraestrutura",
    title: "Sistemas & Infraestrutura",
    value: 84,
    accent: "lime",
    icon: ICONS.systems,
    desc: "Gosto de lógica pura e do que roda por baixo da interface. Backend, fundamentos de hardware e eletroeletrônica me dão a visão completa — do bit ao sistema.",
    tags: ["Backend", "Hardware", "Eletroeletrônica", "Lógica", "Infra"],
  },
];

export default attributes;

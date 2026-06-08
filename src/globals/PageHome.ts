import type { GlobalConfig } from "payload";

export const PageHome: GlobalConfig = {
  slug: "page-home",
  label: "Página Inicial",
  access: { read: () => true },
  fields: [
    {
      type: "group", name: "hero", label: "Hero",
      fields: [
        { name: "headline", type: "text", label: "Manchete", defaultValue: "Deguste, conheça e sinta os melhores produtos de origem do Brasil." },
        { name: "subtitle", type: "textarea", label: "Subtítulo", defaultValue: "Quatro dias em Gramado celebrando os produtos de origem do Brasil. Visitação e degustação gratuitas. Experiências exclusivas com ingresso." },
        { name: "videoUrl", type: "text", label: "URL do Vídeo (YouTube)", defaultValue: "", admin: { description: "Cole o link do YouTube (watch, youtu.be ou embed). O vídeo abre em um popup ao clicar no play. Deixe vazio para esconder a seção." } },
        { name: "videoPosterUrl", type: "text", label: "URL da Imagem de Capa do Vídeo", admin: { description: "Opcional. Se vazio, usa a thumbnail padrão do YouTube." } },
        { name: "secondaryButtonText", type: "text", label: "Texto Botão Secundário", defaultValue: "Saiba mais" },
        { name: "secondaryButtonLink", type: "text", label: "Link Botão Secundário", defaultValue: "/#experimentar" },
        { type: "group", name: "preEventFreeCta", label: "CTA Pré-evento — Visita Gratuita (Primário)", admin: {
          description: "CTA principal pré-evento que comunica acesso gratuito. Aparece em destaque ao lado do CTA de ingresso.",
        }, fields: [
          { name: "buttonText", type: "text", label: "Texto do Botão", defaultValue: "Visitar gratuitamente" },
          { name: "buttonLink", type: "text", label: "Link do Botão", defaultValue: "/#como-funciona" },
        ]},
        { type: "group", name: "preEventCta", label: "CTA Pré-evento — Ingresso (Secundário)", admin: {
          description: "CTA secundário pré-evento para venda de ingresso. Aparece como contorno ao lado do CTA gratuito.",
        }, fields: [
          { name: "buttonText", type: "text", label: "Texto do Botão", defaultValue: "Garantir ingresso" },
          { name: "buttonLink", type: "text", label: "Link do Botão", defaultValue: "/#modalidades" },
        ]},
        { type: "group", name: "duringEventCta", label: "CTA Durante o Evento", fields: [
          { name: "buttonText", type: "text", label: "Texto do Botão", defaultValue: "Confira a Programação" },
          { name: "buttonLink", type: "text", label: "Link do Botão", defaultValue: "/#programacao" },
        ]},
        { type: "group", name: "postEventCta", label: "CTA Pós-evento", fields: [
          { name: "buttonText", type: "text", label: "Texto do Botão", defaultValue: "Reviva a Experiência" },
          { name: "buttonLink", type: "text", label: "Link do Botão", defaultValue: "/blog" },
        ]},
      ],
    },
    {
      type: "group", name: "comoFunciona", label: "Como Funciona (Acesso Livre vs Ingresso)",
      admin: {
        description: "Bloco entre Hero e Experimentar que explica o que é gratuito e o que precisa de ingresso. Aparece logo no topo da home.",
      },
      fields: [
        { name: "enabled", type: "checkbox", label: "Ativado", defaultValue: true },
        { name: "tag", type: "text", label: "Tag (pill superior)", defaultValue: "Como funciona" },
        { name: "headline", type: "text", label: "Manchete", defaultValue: "Dois jeitos de viver o Connection" },
        { name: "subtitle", type: "textarea", label: "Subtítulo", defaultValue: "Boa parte do evento é gratuita e aberta ao público. Algumas experiências exclusivas exigem ingresso." },
        { name: "freeCard", type: "group", label: "Card 1 — Acesso Livre", fields: [
          { name: "tag", type: "text", label: "Tag", defaultValue: "Gratuito" },
          { name: "headline", type: "text", label: "Manchete", defaultValue: "Acesso livre" },
          { name: "description", type: "textarea", label: "Descrição", defaultValue: "Visite, prove e descubra o universo dos produtos de origem sem pagar nada." },
          { name: "items", type: "array", label: "O que está incluso", fields: [
            { name: "text", type: "text", label: "Item" },
          ]},
          { name: "ctaText", type: "text", label: "Texto do CTA", defaultValue: "Ver programação gratuita" },
          { name: "ctaLink", type: "text", label: "Link do CTA", defaultValue: "/#programacao" },
        ]},
        { name: "ticketedCard", type: "group", label: "Card 2 — Com Ingresso", fields: [
          { name: "tag", type: "text", label: "Tag", defaultValue: "Com ingresso" },
          { name: "headline", type: "text", label: "Manchete", defaultValue: "Experiências exclusivas" },
          { name: "description", type: "textarea", label: "Descrição", defaultValue: "Conteúdo curado, palestras e visitações guiadas para quem quer mergulhar fundo." },
          { name: "items", type: "array", label: "O que está incluso", fields: [
            { name: "text", type: "text", label: "Item" },
          ]},
          { name: "ctaText", type: "text", label: "Texto do CTA", defaultValue: "Ver modalidades" },
          { name: "ctaLink", type: "text", label: "Link do CTA", defaultValue: "/#modalidades" },
        ]},
      ],
    },
    {
      type: "group", name: "seloIG", label: "Selo IG",
      fields: [
        { name: "headline", type: "text", label: "Manchete", defaultValue: "A maior vitrine de produtos de origem do Brasil" },
        { name: "stats", type: "array", label: "Estatísticas", fields: [
        { name: "number", type: "text", label: "Número" },
        { name: "label", type: "text", label: "Rótulo" },
        { name: "suffix", type: "text", label: "Sufixo" },
      ]},
        { name: "showScheduleCategoryFilters", type: "checkbox", label: "Mostrar filtros de categoria na programação da home", defaultValue: false, admin: {
          description: "Se desabilitado, os botões de filtro por categoria (Palestras, Podcasts, etc.) ficam ocultos na seção Conheça da home.",
        }},
      ],
    },
    {
      type: "group", name: "credencialCta", label: "CTA de Credencial",
      fields: [
        { name: "headline", type: "text", label: "Manchete", defaultValue: "Viva o Connection por completo" },
        { name: "description", type: "textarea", label: "Descrição" },
        { name: "benefits", type: "array", label: "Benefícios", fields: [
          { name: "icon", type: "text", label: "Ícone" },
          { name: "title", type: "text", label: "Título" },
          { name: "description", type: "textarea", label: "Descrição" },
        ]},
      ],
    },
    {
      type: "group", name: "oQueEIG", label: "O que é IG",
      fields: [
        { name: "title", type: "text", label: "Título", defaultValue: "O que é Indicação Geográfica?" },
        { name: "body", type: "richText", label: "Corpo" },
        { name: "ctaText", type: "text", label: "Texto do CTA", defaultValue: "Saiba mais" },
        { name: "ctaLink", type: "text", label: "Link do CTA", defaultValue: "/conhecer#ig" },
      ],
    },
    {
      type: "group", name: "ctaFinal", label: "CTA Final",
      fields: [
        { name: "headline", type: "text", label: "Manchete" },
        { name: "subtitle", type: "textarea", label: "Subtítulo" },
        { name: "buttons", type: "array", label: "Botões", fields: [
          { name: "text", type: "text", label: "Texto" },
          { name: "link", type: "text", label: "Link" },
          { name: "variant", type: "select", label: "Variante", options: [{ label: "Primário", value: "primary" }, { label: "Contorno", value: "outline" }] },
        ]},
      ],
    },
    {
      type: "group", name: "modalidades", label: "Modalidades (Cards)",
      fields: [
        { name: "tag", type: "text", label: "Tag (pill superior)", defaultValue: "Modalidades" },
        { name: "cards", type: "array", label: "Cards", admin: { description: "Cards das modalidades de participação. O card com 'Destacado' marcado fica elevado e recebe o badge." }, fields: [
          { name: "tag", type: "text", label: "Tag (Acesso Livre, Experiências Guiadas, etc.)" },
          { name: "price", type: "text", label: "Preço (Gratuito, R$ 400, Sob consulta)" },
          { name: "priceNote", type: "text", label: "Nota do Preço (Sem ingresso, Por pessoa, etc.)" },
          { name: "headline", type: "text", label: "Manchete" },
          { name: "description", type: "textarea", label: "Descrição" },
          { name: "features", type: "array", label: "Itens Inclusos", fields: [{ name: "text", type: "text", label: "Texto" }] },
          { name: "caption", type: "text", label: "Caption (Ideal para...)" },
          { name: "ctaText", type: "text", label: "Texto do CTA" },
          { name: "ctaLink", type: "text", label: "Link do CTA" },
          { name: "accent", type: "select", label: "Cor de destaque", defaultValue: "cream", options: [
            { label: "Cream (claro)", value: "cream" },
            { label: "Gold (dourado)", value: "gold" },
            { label: "Brown (marrom)", value: "brown" },
          ]},
          { name: "highlighted", type: "checkbox", label: "Destacado (card elevado)", defaultValue: false },
          { name: "badge", type: "text", label: "Badge (Indicado, Recomendado)", admin: { description: "Aparece no topo do card destacado." } },
        ]},
      ],
    },
    {
      type: "group", name: "salesPopup", label: "Pop-up de Venda",
      fields: [
        { name: "enabled", type: "checkbox", label: "Ativado", defaultValue: true, admin: { description: "Se desabilitado, o popup nunca aparece." } },
        { name: "tag", type: "text", label: "Tag", defaultValue: "Oferta especial" },
        { name: "headline", type: "text", label: "Manchete", defaultValue: "Garanta sua imersão na origem." },
        { name: "description", type: "textarea", label: "Descrição", defaultValue: "Visitação guiada pelos parques e empresas de Gramado. Vagas limitadas — escolha a sua modalidade antes que esgote." },
        { name: "priceLabel", type: "text", label: "Texto antes do preço", defaultValue: "A partir de R$" },
        { name: "price", type: "text", label: "Preço", defaultValue: "500" },
        { name: "ctaText", type: "text", label: "Texto do CTA", defaultValue: "Adquirir ingresso" },
        { name: "ctaLink", type: "text", label: "Link do CTA", defaultValue: "/#modalidades" },
        { name: "dismissText", type: "text", label: "Texto do botão de dispensar", defaultValue: "Agora não" },
        { name: "scrollThreshold", type: "number", label: "Pixels de scroll para abrir", defaultValue: 150, admin: { description: "Quantos pixels o usuário precisa rolar antes do popup aparecer." } },
        { type: "group", name: "freeAccessNote", label: "Aviso de Acesso Gratuito",
          admin: { description: "Pequena linha mostrada dentro do popup reforçando que parte do evento é gratuita. Reduz a sensação de 'tudo aqui é pago'." },
          fields: [
            { name: "enabled", type: "checkbox", label: "Mostrar aviso", defaultValue: true },
            { name: "text", type: "text", label: "Texto", defaultValue: "Você sabia? Visitação e degustação são gratuitas." },
            { name: "linkText", type: "text", label: "Texto do link", defaultValue: "Ver programação aberta" },
            { name: "linkUrl", type: "text", label: "URL do link", defaultValue: "/#como-funciona" },
          ],
        },
      ],
    },
    {
      type: "group", name: "speakers", label: "Palestrantes (Home)",
      fields: [
        { name: "tag", type: "text", label: "Tag", defaultValue: "Confirmados" },
        { name: "title", type: "text", label: "Título", defaultValue: "Palestrantes" },
      ],
    },
    {
      type: "group", name: "eventGallery", label: "Galeria do Evento",
      fields: [
        { name: "title", type: "text", label: "Título", defaultValue: "Connection em Imagens" },
        { name: "subtitle", type: "textarea", label: "Subtítulo", defaultValue: "Reviva os melhores momentos das edições anteriores" },
        { name: "images", type: "array", label: "Imagens", fields: [
          { name: "image", type: "upload", relationTo: "media", label: "Imagem", required: true },
          { name: "caption", type: "text", label: "Legenda" },
        ]},
      ],
    },
    {
      type: "group", name: "infoPraticas", label: "Informações Práticas",
      fields: [{ name: "items", type: "array", label: "Itens", fields: [
        { name: "icon", type: "text", label: "Ícone" },
        { name: "title", type: "text", label: "Título" },
        { name: "detail", type: "text", label: "Detalhe" },
      ]}],
    },
    {
      type: "group", name: "pressSection", label: "Imprensa (Home)",
      admin: { description: "Seção discreta abaixo da Galeria do Evento. Mostra opções de credenciamento para imprensa, assessores e criadores de conteúdo." },
      fields: [
        { name: "visible", type: "checkbox", label: "Mostrar seção", defaultValue: true },
        { name: "title", type: "text", label: "Título", defaultValue: "Para a imprensa" },
        { name: "description", type: "textarea", label: "Descrição", defaultValue: "Profissionais com credencial têm acesso à área de imprensa do evento." },
        { name: "items", type: "array", label: "Modalidades", maxRows: 5, admin: { description: "Botão por modalidade. Mantenha rótulos curtos." },
          fields: [
            { name: "label", type: "text", required: true, label: "Rótulo do botão" },
            { name: "url", type: "text", required: true, label: "URL externa" },
          ],
          defaultValue: [
            { label: "Imprensa", url: "https://sigevent.pro/ms/visitantes/?id_edicao=2664&linguagem=portugues" },
            { label: "Assessor de Imprensa", url: "https://sigevent.pro/ms/visitantes/?id_edicao=2631&linguagem=portugues" },
            { label: "Criadores de Conteúdo", url: "https://sigevent.pro/ms/visitantes/?id_edicao=2697&linguagem=portugues" },
          ],
        },
      ],
    },
  ],
};

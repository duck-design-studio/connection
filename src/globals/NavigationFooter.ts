import type { GlobalConfig } from "payload";

export const NavigationFooter: GlobalConfig = {
  slug: "navigation-footer",
  label: "Navegação e Rodapé",
  access: { read: () => true },
  fields: [
    { type: "group", name: "navigation", label: "Navegação", fields: [
      { name: "ctaText", type: "text", label: "Texto do Botão CTA", defaultValue: "Garantir Ingresso" },
      { name: "ctaLink", type: "text", label: "Link do Botão CTA", defaultValue: "/ingressos" },
      { name: "menuItems", type: "array", label: "Itens do Menu", fields: [
        { name: "label", type: "text", label: "Rótulo" },
        { name: "href", type: "text", label: "Link" },
        { name: "subItems", type: "array", label: "Sub-itens", fields: [
          { name: "label", type: "text", label: "Rótulo" },
          { name: "href", type: "text", label: "Link" },
        ]},
      ]},
      { name: "hiddenNavItems", type: "array", label: "Itens ocultos do menu", admin: {
        description: "Selecione sub-itens do menu que devem ficar ocultos temporariamente.",
      }, fields: [
        { name: "label", type: "select", label: "Item", options: [
          { label: "Conhecer → Programação", value: "Programação" },
          { label: "Conhecer → Lista de palestrantes", value: "Lista de palestrantes" },
          { label: "Conhecer → Conteúdos e talks", value: "Conteúdos e talks" },
          { label: "Conhecer → Blog", value: "Blog" },
          { label: "Conhecer → Conteúdos sobre IG", value: "Conteúdos sobre IG" },
          { label: "Experiências → Parques parceiros", value: "Parques parceiros" },
          { label: "Experiências → Hotéis Parceiros", value: "Hotéis Parceiros" },
          { label: "Experiências → Circuito de Compras", value: "Circuito de Compras" },
        ]},
      ]},
    ]},
    { type: "group", name: "footer", label: "Rodapé", fields: [
      { name: "tagline", type: "textarea", label: "Slogan", defaultValue: "Experiências que inspiram, conteúdo que transforma. A maior vitrine de produtos com Indicação Geográfica do Brasil." },
      { name: "linkGroups", type: "array", label: "Grupos de Links", fields: [
        { name: "title", type: "text", label: "Título" },
        { name: "links", type: "array", label: "Links", fields: [
          { name: "label", type: "text", label: "Rótulo" },
          { name: "href", type: "text", label: "Link" },
        ]},
      ]},
      { name: "socialLinks", type: "array", label: "Redes Sociais", fields: [
        { name: "platform", type: "select", label: "Plataforma", options: [
          { label: "Instagram", value: "instagram" },
          { label: "LinkedIn", value: "linkedin" },
          { label: "Facebook", value: "facebook" },
          { label: "YouTube", value: "youtube" },
        ]},
        { name: "url", type: "text", label: "URL" },
      ]},
      { name: "legalLinks", type: "array", label: "Links Legais", fields: [
        { name: "label", type: "text", label: "Rótulo" },
        { name: "href", type: "text", label: "Link" },
      ]},
    ]},
  ],
};

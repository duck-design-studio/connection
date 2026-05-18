import type { GlobalConfig } from "payload";

export const PageIngressos: GlobalConfig = {
  slug: "page-ingressos",
  label: "Página Ingressos",
  access: { read: () => true },
  fields: [
    { type: "group", name: "hero", label: "Hero", fields: [
      { name: "title", type: "text", label: "Título", defaultValue: "Ingressos" },
      { name: "subtitle", type: "textarea", label: "Subtítulo" },
    ]},
    { type: "group", name: "groupSales", label: "Vendas para Grupos", fields: [
      { name: "title", type: "text", label: "Título", defaultValue: "Vendas para Grupos" },
      { name: "description", type: "textarea", label: "Descrição" },
      { name: "buttonText", type: "text", label: "Texto do Botão", defaultValue: "Solicitar orçamento para grupos" },
      { name: "buttonLink", type: "text", label: "Link do Botão", admin: { description: "URL completa do destino. Para WhatsApp, use https://wa.me/<numero>" } },
    ]},
    {
      type: "group", name: "cta", label: "CTA (legacy)",
      admin: { description: "Grupo legado mantido para compatibilidade com colunas existentes no banco. O botão da página agora usa Vendas para Grupos → Link do Botão. Pode ser ignorado." },
      fields: [
        { name: "headline", type: "text", label: "Manchete" },
        { name: "description", type: "textarea", label: "Descrição" },
        { name: "buttonText", type: "text", label: "Texto do Botão" },
        { name: "buttonLink", type: "text", label: "Link do Botão" },
      ],
    },
  ],
};

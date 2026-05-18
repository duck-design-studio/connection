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
  ],
};

import type { CollectionConfig } from "payload";

export const ScheduleEvents: CollectionConfig = {
  slug: "schedule-events",
  labels: { singular: "Evento da Programação", plural: "Eventos da Programação" },
  admin: { useAsTitle: "title" },
  access: { read: () => true },
  fields: [
    { name: "title", type: "text", required: true, label: "Título" },
    { name: "date", type: "date", required: true, label: "Data" },
    { name: "startTime", type: "text", required: true, label: "Horário de Início" },
    { name: "endTime", type: "text", label: "Horário de Término" },
    {
      name: "type", type: "select", label: "Tipo",
      options: [
        { label: "Palestra", value: "palestra" },
        { label: "Painel", value: "painel" },
        { label: "Workshop", value: "workshop" },
        { label: "Networking", value: "networking" },
        { label: "Intervalo", value: "break" },
        { label: "Especial", value: "special" },
      ],
    },
    {
      name: "speakers",
      type: "relationship",
      relationTo: "speakers",
      hasMany: true,
      label: "Palestrantes",
      admin: { description: "Quem apresenta (palestras). Pode adicionar mais de um." },
    },
    {
      name: "panelists",
      type: "relationship",
      relationTo: "speakers",
      hasMany: true,
      label: "Painelistas",
      admin: { description: "Participantes do painel. Pode adicionar mais de um." },
    },
    {
      name: "moderators",
      type: "relationship",
      relationTo: "speakers",
      hasMany: true,
      label: "Moderadores",
      admin: { description: "Quem faz a mediação/moderação. Pode adicionar mais de um." },
    },
    { name: "location", type: "text", label: "Local" },
    {
      name: "track", type: "select", label: "Programação",
      defaultValue: "principal",
      options: [
        { label: "Do Evento", value: "principal" },
        { label: "Na Cidade", value: "paralela" },
      ],
    },
    {
      name: "access", type: "select", label: "Acesso",
      admin: {
        description:
          "Se vazio: 'Na Cidade' assume gratuito; 'Do Evento' assume ingresso. Defina manualmente para sobrescrever.",
      },
      options: [
        { label: "Gratuito", value: "free" },
        { label: "Com ingresso", value: "ticketed" },
      ],
    },
    { name: "description", type: "textarea", label: "Descrição" },
    {
      name: "speaker",
      type: "relationship",
      relationTo: "speakers",
      label: "Palestrante (campo antigo)",
      admin: {
        description:
          "Campo único antigo, em migração. Prefira usar os campos Palestrantes/Painelistas/Moderadores acima. Mantido só para não perder eventos já cadastrados.",
      },
    },
  ],
};

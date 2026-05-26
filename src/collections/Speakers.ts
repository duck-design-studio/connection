import type { CollectionConfig } from "payload";

export const Speakers: CollectionConfig = {
  slug: "speakers",
  labels: { singular: "Palestrante", plural: "Palestrantes" },
  admin: { useAsTitle: "name" },
  access: { read: () => true },
  fields: [
    { name: "name", type: "text", required: true, label: "Nome" },
    { name: "role", type: "select", label: "Função", options: [
      { label: "Palestrante", value: "palestrante" },
      { label: "Mediadora", value: "mediadora" },
      { label: "Mediador", value: "mediador" },
    ], defaultValue: "palestrante" },
    { name: "title", type: "text", label: "Cargo/Título" },
    {
      name: "talkTitle",
      type: "text",
      label: "Título da Palestra",
      admin: {
        description:
          "Aparece abaixo do nome ao passar o mouse no card. Se deixar em branco, usamos automaticamente o título da palestra deste palestrante na Programação (evento do tipo 'Palestra').",
      },
    },
    { name: "bio", type: "textarea", label: "Biografia" },
    { name: "photo", type: "upload", relationTo: "media", label: "Foto" },
    { name: "credentials", type: "array", label: "Credenciais", fields: [{ name: "credential", type: "text", label: "Credencial" }] },
    { name: "order", type: "number", defaultValue: 0, label: "Ordem" },
  ],
};

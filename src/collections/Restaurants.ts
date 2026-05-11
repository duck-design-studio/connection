import type { CollectionConfig } from "payload";

export const Restaurants: CollectionConfig = {
  slug: "restaurants",
  labels: { singular: "Restaurante", plural: "Restaurantes (Circuito Gastronômico)" },
  admin: { useAsTitle: "name", description: "Restaurantes participantes do Circuito Gastronômico — TEM IG NO PRATO." },
  access: { read: () => true },
  fields: [
    { name: "name", type: "text", required: true, label: "Nome do Restaurante" },
    { name: "photo", type: "upload", relationTo: "media", label: "Foto do Prato / Restaurante" },
    { name: "dishName", type: "text", label: "Nome do Prato", admin: { description: "Opcional. Ex: 'Risoto de Queijo Serrano IG'" } },
    { name: "description", type: "textarea", label: "Descrição", admin: { description: "Descrição do prato ou do restaurante e sua conexão com a Indicação Geográfica." } },
    { name: "ingredient", type: "text", label: "IG em destaque", admin: { description: "Opcional. Ex: 'Queijo Serrano', 'Vinhos do Vale dos Vinhedos'" } },
    { name: "address", type: "text", label: "Endereço" },
    { name: "phone", type: "text", label: "Telefone" },
    { name: "website", type: "text", label: "Site / Instagram" },
    { name: "order", type: "number", defaultValue: 0, label: "Ordem" },
  ],
};

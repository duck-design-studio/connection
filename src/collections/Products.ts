import type { CollectionConfig } from "payload";

export const Products: CollectionConfig = {
  slug: "products",
  labels: { singular: "Produto", plural: "Produtos" },
  admin: { useAsTitle: "name" },
  access: { read: () => true },
  fields: [
    { name: "name", type: "text", required: true, label: "Nome" },
    { name: "origin", type: "text", label: "Origem" },
    { name: "state", type: "text", label: "Estado" },
    { name: "description", type: "textarea", label: "Descrição" },
    { name: "category", type: "relationship", relationTo: "product-categories", required: true, label: "Categoria" },
    { name: "image", type: "upload", relationTo: "media", label: "Imagem" },
    { name: "order", type: "number", defaultValue: 0, label: "Ordem" },
  ],
};

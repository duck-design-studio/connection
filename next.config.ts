import type { NextConfig } from "next";
import { withPayload } from "@payloadcms/next/withPayload";

const nextConfig: NextConfig = {
  serverExternalPackages: ["payload"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "cdn.prod.website-files.com",
      },
    ],
  },

  async redirects() {
    return [
      // Domínio antigo → novo domínio oficial (preserva o caminho).
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.connectionexperience.com.br" }],
        destination: "https://connectionterroirsdobrasil.com.br/:path*",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "connectionexperience.com.br" }],
        destination: "https://connectionterroirsdobrasil.com.br/:path*",
        permanent: true,
      },
      // Webflow routes → new site routes
      { source: "/conteudo", destination: "/conhecer", permanent: true },
      { source: "/experiencias", destination: "/experimentar", permanent: true },
      { source: "/networking-e-negocios", destination: "/negociar", permanent: true },
      { source: "/transporte-oficial", destination: "/", permanent: true },
      { source: "/expositores", destination: "/experimentar", permanent: true },
      { source: "/cafes", destination: "/experimentar", permanent: true },
      { source: "/arena-gastronomica", destination: "/experimentar", permanent: true },
      { source: "/circuito-gastronomico", destination: "/experimentar", permanent: true },
      { source: "/contato", destination: "/", permanent: true },
      { source: "/e-books-leads", destination: "/blog", permanent: true },
      { source: "/aereos", destination: "/", permanent: true },
      { source: "/atividades-paralelas", destination: "/programacao", permanent: true },
      { source: "/imprensa", destination: "/blog", permanent: true },
    ];
  },
};

export default withPayload(nextConfig);

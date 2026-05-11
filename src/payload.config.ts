import path from "path";
import { fileURLToPath } from "url";
import { buildConfig } from "payload";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import sharp from "sharp";

import { Users } from "./collections/Users";
import { Media } from "./collections/Media";
import { BlogPosts } from "./collections/BlogPosts";
import { Authors } from "./collections/Authors";
import { Speakers } from "./collections/Speakers";
import { ScheduleEvents } from "./collections/ScheduleEvents";
import { Tickets } from "./collections/Tickets";
import { PartnerTiers } from "./collections/PartnerTiers";
import { Partners } from "./collections/Partners";
import { ProductCategories } from "./collections/ProductCategories";
import { Products } from "./collections/Products";
import { Testimonials } from "./collections/Testimonials";
import { FAQ } from "./collections/FAQ";
import { Experiences } from "./collections/Experiences";
import { Hotels } from "./collections/Hotels";
import { Shops } from "./collections/Shops";
import { Restaurants } from "./collections/Restaurants";
import { SiteSettings } from "./globals/SiteSettings";
import { PageHome } from "./globals/PageHome";
import { PageConhecer } from "./globals/PageConhecer";
import { PageExperimentar } from "./globals/PageExperimentar";
import { PageNegociar } from "./globals/PageNegociar";
import { PageIngressos } from "./globals/PageIngressos";
import { PageProgramacao } from "./globals/PageProgramacao";
import { NavigationFooter } from "./globals/NavigationFooter";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: "users",
    importMap: {
      baseDir: path.resolve(dirname),
    },
    livePreview: {
      url: process.env.NEXT_PUBLIC_SERVER_URL || "https://www.connectionexperience.com.br",
      collections: ["blog-posts", "speakers", "schedule-events", "tickets", "partners", "products", "testimonials", "faq", "authors", "experiences", "shops", "restaurants"],
      globals: ["site-settings", "page-home", "page-conhecer", "page-experimentar", "page-negociar", "page-ingressos", "page-programacao", "navigation-footer"],
      breakpoints: [
        { label: "Mobile", name: "mobile", width: 375, height: 667 },
        { label: "Tablet", name: "tablet", width: 768, height: 1024 },
        { label: "Desktop", name: "desktop", width: 1440, height: 900 },
      ],
    },
  },
  collections: [
    Users,
    Media,
    BlogPosts,
    Authors,
    Speakers,
    ScheduleEvents,
    Tickets,
    PartnerTiers,
    Partners,
    ProductCategories,
    Products,
    Testimonials,
    FAQ,
    Experiences,
    Hotels,
    Shops,
    Restaurants,
  ],
  globals: [
    SiteSettings,
    PageHome,
    PageConhecer,
    PageExperimentar,
    PageNegociar,
    PageIngressos,
    PageProgramacao,
    NavigationFooter,
  ],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || "connection-dev-secret-change-in-prod",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: postgresAdapter({
    pool: {
      connectionString:
        process.env.DATABASE_URI ||
        "postgresql://connection:connection@localhost:5432/connection_cms",
    },
    push: true,
  }),
  sharp,
});

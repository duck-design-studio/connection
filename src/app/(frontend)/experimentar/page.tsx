import { Metadata } from 'next';
import Image from 'next/image';
import { getPayload } from 'payload';
import config from '@payload-config';
import { INGRESSOS_ESCONDIDOS } from '@/lib/flags';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Testimonial } from '@/components/ui/Testimonial';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Experimentar | Connection Experience',
  description: 'Viva experiências sensoriais únicas com oficinas práticas, degustações exclusivas e contato direto com produtores de todo o Brasil.',
};

export default async function ExperimentarPage() {
  const payload = await getPayload({ config });

  const { docs: testimonials } = await payload.find({
    collection: 'testimonials',
    where: { axis: { equals: 'experimentar' } },
    limit: 10,
  });

  const { docs: experiences } = await payload.find({
    collection: 'experiences',
    sort: 'order',
    limit: 50,
    depth: 1,
  });

  const { docs: hotels } = await payload.find({
    collection: 'hotels',
    sort: 'order',
    limit: 50,
    depth: 1,
  });

  const { docs: shops } = await payload.find({
    collection: 'shops',
    sort: 'order',
    limit: 50,
    depth: 1,
  });

  const { docs: restaurants } = await payload.find({
    collection: 'restaurants',
    sort: 'order',
    limit: 50,
    depth: 1,
  });

  const pageData = await payload.findGlobal({ slug: 'page-experimentar' });
  const features = (pageData.features as any)?.items || [];

  return (
    <div className="pt-24">
      {/* Hero Section */}
      <section className="py-20 bg-bg-green relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, #C9A962 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }} />
        </div>
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <SectionTitle
            tag={pageData.hero?.subtitle || "EIXO 2"}
            title={pageData.hero?.title || "Experimentar"}
            subtitle={pageData.hero?.description || "Viva experiências sensoriais únicas"}
            align="center"
          />
        </div>
      </section>

      {/* Features Section */}
      {features.length > 0 && (
        <section className="py-20 bg-bg-dark">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid md:grid-cols-2 gap-8">
              {features.map((feature: any, index: number) => (
                <Card key={index} variant="bordered">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-full bg-gold/10 flex items-center justify-center shrink-0">
                      <FeatureIcon name={feature.icon} />
                    </div>
                    <div>
                      <h3 className="font-heading text-2xl text-text-light mb-2">{feature.title}</h3>
                      <p className="text-text-cream">{feature.description}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Testimonials */}
      {testimonials.length > 0 && (
        <section className="py-20 bg-bg-dark">
          <div className="container mx-auto px-4 lg:px-8">
            <SectionTitle
              title={pageData.testimonialsSection?.title || "Experiências reais"}
              align="center"
            />
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {testimonials.map((t) => (
                <Testimonial
                  key={t.id}
                  name={t.name}
                  role={t.role || ''}
                  company={t.company || ''}
                  quote={t.quote}
                  image=""
                  variant="featured"
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Parques e Experiências */}
      {experiences.length > 0 && (
        <section id="parques" className="py-20 bg-bg-dark">
          <div className="container mx-auto px-4 lg:px-8">
            <SectionTitle
              title="Parques, Parceiros e Experiências"
              subtitle="Conheça os espaços e empresas que tornam o Connection Experience uma vivência inesquecível"
              align="center"
            />
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {experiences.map((exp: any) => {
                const logo =
                  typeof exp.logo === 'object' && exp.logo !== null ? exp.logo : null;
                const logoSrc = logo?.url || (logo?.filename
                  ? `/media/${logo.filename}`
                  : '');

                return (
                  <a
                    key={exp.id}
                    href={exp.website || undefined}
                    target={exp.website ? '_blank' : undefined}
                    rel={exp.website ? 'noopener noreferrer' : undefined}
                    className="group flex flex-col rounded-2xl border border-[#FFF5EC]/10 bg-[#1C1F21] overflow-hidden hover:border-[#C9A962]/40 transition-colors"
                  >
                    <div className="relative flex items-center justify-center bg-bg-cream p-6 h-[200px] overflow-hidden">
                      {logoSrc ? (
                        <Image
                          src={logoSrc}
                          alt={exp.name}
                          fill
                          className="object-contain p-4"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                      ) : (
                        <span className="text-[#131415] font-just-sans text-lg font-semibold">
                          {exp.name}
                        </span>
                      )}
                    </div>
                    <div className="p-6 flex-1 flex flex-col">
                      <h3 className="font-heading text-xl text-text-light mb-2">
                        {exp.name}
                      </h3>
                      {exp.description && (
                        <p className="text-text-cream text-sm leading-relaxed">
                          {exp.description}
                        </p>
                      )}
                      {exp.website && (
                        <span className="mt-auto pt-4 text-[#C9A962] text-sm font-medium group-hover:underline">
                          Visitar site &rarr;
                        </span>
                      )}
                    </div>
                  </a>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Hotelaria */}
      {hotels.length > 0 && (
        <section id="hotelaria" className="py-20 bg-bg-darker">
          <div className="container mx-auto px-4 lg:px-8">
            <SectionTitle
              title="Hotelaria"
              subtitle="Opções de hospedagem próximas ao evento para sua comodidade"
              align="center"
            />
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {hotels.map((hotel: any) => {
                const img =
                  typeof hotel.image === 'object' && hotel.image !== null
                    ? hotel.image
                    : null;
                const imgSrc = img?.url || (img?.filename ? `/media/${img.filename}` : null);

                return (
                  <div
                    key={hotel.id}
                    className="group flex flex-col rounded-2xl border border-[#FFF5EC]/10 bg-[#1C1F21] overflow-hidden hover:border-[#C9A962]/40 transition-colors"
                  >
                    {/* Image */}
                    <div className="relative h-[200px] bg-bg-brown">
                      {imgSrc ? (
                        <Image
                          src={imgSrc}
                          alt={img?.alt || hotel.name}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center">
                          <svg className="w-12 h-12 text-gold/20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                          </svg>
                        </div>
                      )}
                    </div>

                    {/* Info */}
                    <div className="p-6 flex-1 flex flex-col">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h3 className="font-heading text-xl text-text-light">{hotel.name}</h3>
                        {hotel.priceRange && (
                          <span className="text-gold text-sm font-medium shrink-0">{hotel.priceRange}</span>
                        )}
                      </div>

                      {hotel.distance && (
                        <p className="text-gold text-sm mb-2 flex items-center gap-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          {hotel.distance}
                        </p>
                      )}

                      {hotel.description && (
                        <p className="text-text-cream text-sm leading-relaxed mb-4">{hotel.description}</p>
                      )}

                      {hotel.address && (
                        <p className="text-text-muted text-xs mb-2">{hotel.address}</p>
                      )}

                      <div className="mt-auto pt-4 flex items-center gap-4">
                        {hotel.website && (
                          <a
                            href={hotel.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#C9A962] text-sm font-medium hover:underline"
                          >
                            Reservar &rarr;
                          </a>
                        )}
                        {hotel.phone && (
                          <a
                            href={`tel:${hotel.phone}`}
                            className="text-text-muted text-sm hover:text-text-light transition-colors"
                          >
                            {hotel.phone}
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Circuito Gastronômico — TEM IG NO PRATO */}
      {restaurants.length > 0 && (
        <section id="circuito-gastronomico" className="py-20 bg-bg-darker">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="inline-block mb-3 px-3 py-1 rounded-full border border-gold/40 text-gold text-xs font-medium tracking-[0.18em] uppercase">
                08 a 22 de Junho
              </span>
              <h2 className="font-heading text-4xl md:text-5xl text-text-light mb-4">
                TEM IG NO PRATO
              </h2>
              <p className="text-text-cream text-base md:text-lg leading-relaxed">
                Durante o evento, restaurantes participantes criam pratos exclusivos que traduzem a origem, a cultura e a identidade de cada território.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {restaurants.map((r: any) => {
                const photo =
                  typeof r.photo === 'object' && r.photo !== null ? r.photo : null;
                const photoSrc = photo?.url || (photo?.filename ? `/media/${photo.filename}` : '');

                return (
                  <a
                    key={r.id}
                    href={r.website || undefined}
                    target={r.website ? '_blank' : undefined}
                    rel={r.website ? 'noopener noreferrer' : undefined}
                    className="group flex flex-col rounded-2xl border border-[#FFF5EC]/10 bg-[#1C1F21] overflow-hidden hover:border-[#C9A962]/40 transition-colors"
                  >
                    <div className="relative h-[240px] bg-bg-brown overflow-hidden">
                      {photoSrc ? (
                        <Image
                          src={photoSrc}
                          alt={photo?.alt || r.dishName || r.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center">
                          <span className="font-just-sans text-lg font-semibold text-gold/30">
                            {r.name}
                          </span>
                        </div>
                      )}
                      {r.ingredient && (
                        <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-bg-darker/85 backdrop-blur-sm px-3 py-1 text-xs font-medium tracking-wider uppercase text-gold border border-gold/30">
                          <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                          {r.ingredient}
                        </span>
                      )}
                    </div>
                    <div className="p-6 flex-1 flex flex-col">
                      <h3 className="font-heading text-xl text-text-light mb-1">
                        {r.name}
                      </h3>
                      {r.dishName && (
                        <p className="text-gold text-sm font-medium mb-3 italic">
                          {r.dishName}
                        </p>
                      )}
                      {r.description && (
                        <p className="text-text-cream text-sm leading-relaxed">
                          {r.description}
                        </p>
                      )}
                      <div className="mt-auto pt-4 flex items-center justify-between gap-3 text-xs">
                        {r.address && (
                          <span className="flex items-center gap-1.5 text-text-muted">
                            <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <span className="truncate">{r.address}</span>
                          </span>
                        )}
                        {r.website && (
                          <span className="text-[#C9A962] font-medium group-hover:underline shrink-0 ml-auto">
                            Saiba mais &rarr;
                          </span>
                        )}
                      </div>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Circuito de Compras */}
      {shops.length > 0 && (
        <section id="compras" className="py-20 bg-bg-dark">
          <div className="container mx-auto px-4 lg:px-8">
            <SectionTitle
              title="Circuito de Compras"
              subtitle="Descubra a produção local e aproveite benefícios exclusivos em lojas selecionadas."
              align="center"
            />
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {shops.map((shop: any) => {
                const logo =
                  typeof shop.logo === 'object' && shop.logo !== null ? shop.logo : null;
                const logoSrc = logo?.url || (logo?.filename ? `/media/${logo.filename}` : '');

                return (
                  <a
                    key={shop.id}
                    href={shop.website || undefined}
                    target={shop.website ? '_blank' : undefined}
                    rel={shop.website ? 'noopener noreferrer' : undefined}
                    className="group flex flex-col rounded-2xl border border-[#FFF5EC]/10 bg-[#1C1F21] overflow-hidden hover:border-[#C9A962]/40 transition-colors"
                  >
                    <div className="relative h-[200px] bg-bg-brown overflow-hidden">
                      {logoSrc ? (
                        <Image
                          src={logoSrc}
                          alt={shop.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center">
                          <span className="font-just-sans text-lg font-semibold text-gold/30">
                            {shop.name}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="p-6 flex-1 flex flex-col">
                      <h3 className="font-heading text-xl text-text-light mb-2">
                        {shop.name}
                      </h3>
                      {shop.category && (
                        <span className="text-gold text-xs font-medium mb-2">{shop.category}</span>
                      )}
                      {shop.description && (
                        <p className="text-text-cream text-sm leading-relaxed">
                          {shop.description}
                        </p>
                      )}
                      {shop.website && (
                        <span className="mt-auto pt-4 text-[#C9A962] text-sm font-medium group-hover:underline">
                          Visitar site &rarr;
                        </span>
                      )}
                    </div>
                  </a>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* CTA — ESCONDIDO (jul/2026) enquanto a venda de ingresso está em espera */}
      {!INGRESSOS_ESCONDIDOS && (
      <section className="py-20 bg-gold">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h2 className="font-heading text-4xl text-bg-darker mb-6">
            {pageData.cta?.headline || "Pronto para viver experiências únicas?"}
          </h2>
          <Button href={pageData.cta?.buttonLink || "/ingressos"} variant="secondary" size="lg" className="bg-bg-darker text-gold">
            {pageData.cta?.buttonText || "Garantir meu ingresso"}
          </Button>
        </div>
      </section>
      )}
    </div>
  );
}

function FeatureIcon({ name }: { name?: string }) {
  const iconClass = "w-7 h-7 text-gold";
  switch (name) {
    case 'chef':
      return <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
    case 'wine':
      return <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 19v-7m0 0c-2.5 0-4.5-2-4.5-4.5 0-1 .167-2 .5-3h8c.333 1 .5 2 .5 3 0 2.5-2 4.5-4.5 4.5zm-3 7h6" /></svg>;
    case 'coffee':
      return <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 14v-2a4 4 0 00-4-4H7a4 4 0 00-4 4v2a4 4 0 004 4h6a4 4 0 004-4zm0 0h2a2 2 0 002-2v-2a2 2 0 00-2-2h-2" /></svg>;
    case 'people':
      return <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;
    default:
      return <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>;
  }
}

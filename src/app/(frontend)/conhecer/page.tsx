import { Metadata } from 'next';
import { getPayload } from 'payload';
import config from '@payload-config';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Testimonial } from '@/components/ui/Testimonial';
import { SpeakersGrid } from '@/components/sections/SpeakersGrid';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Conhecer | Connection Experience',
  description: 'Descubra o universo das Indicações Geográficas brasileiras.',
};

export default async function ConhecerPage() {
  const payload = await getPayload({ config });

  const { docs: speakers } = await payload.find({
    collection: 'speakers',
    sort: 'order',
    limit: 20,
    depth: 1,
  });

  const { docs: testimonials } = await payload.find({
    collection: 'testimonials',
    where: { axis: { equals: 'conhecer' } },
    limit: 10,
    depth: 1,
  });

  const pageData = await payload.findGlobal({ slug: 'page-conhecer' });

  const features = (pageData.features as any)?.items || [];

  return (
    <div className="pt-24">
      {/* Hero Section */}
      <section className="py-20 bg-bg-brown relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <svg className="absolute right-0 top-0 h-full w-1/2" viewBox="0 0 400 800" fill="none">
            <path d="M100 0C200 200 300 400 200 600C100 800 0 800 0 800" stroke="#C9A962" strokeWidth="1" fill="none" />
            <path d="M150 0C250 200 350 400 250 600C150 800 50 800 50 800" stroke="#C9A962" strokeWidth="1" fill="none" />
          </svg>
        </div>
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <SectionTitle
            tag={pageData.hero?.subtitle || "EIXO 1"}
            title={pageData.hero?.title || "Conhecer"}
            subtitle={pageData.hero?.description || "Descubra o universo das Indicações Geográficas brasileiras"}
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

      {/* Speakers Section */}
      {speakers.length > 0 && pageData.speakersSection?.visible !== false && (
        <section className="bg-[#131415] px-4 md:px-5 py-16 md:py-24">
          <div className="mx-auto max-w-[1450px] rounded-[15px] overflow-hidden bg-[#131415] p-8 md:p-12 lg:p-16">
            <SpeakersGrid
              speakers={speakers as any}
              tag="Confirmados"
              title={pageData.speakersSection?.title || 'Palestrantes'}
            />
          </div>
        </section>
      )}

      {/* Testimonials */}
      {testimonials.length > 0 && (
        <section className="py-20 bg-bg-dark">
          <div className="container mx-auto px-4 lg:px-8">
            <SectionTitle
              title={pageData.testimonialsSection?.title || "O que dizem os participantes"}
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

      {/* CTA */}
      <section className="py-20 bg-gold">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h2 className="font-heading text-4xl text-bg-darker mb-6">
            {pageData.cta?.headline || "Pronto para transformar seu conhecimento?"}
          </h2>
          <Button href={pageData.cta?.buttonLink || "/ingressos"} variant="secondary" size="lg" className="bg-bg-darker text-gold">
            {pageData.cta?.buttonText || "Garantir meu ingresso"}
          </Button>
        </div>
      </section>
    </div>
  );
}

function FeatureIcon({ name }: { name?: string }) {
  const iconClass = "w-7 h-7 text-gold";
  switch (name) {
    case 'map':
      return <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" /></svg>;
    case 'microphone':
      return <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" /></svg>;
    case 'podcast':
      return <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15.536a5 5 0 001.414 1.414m2.828-9.9a9 9 0 012.828-2.828" /><circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth={1.5} /></svg>;
    case 'book':
      return <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>;
    default:
      return <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>;
  }
}

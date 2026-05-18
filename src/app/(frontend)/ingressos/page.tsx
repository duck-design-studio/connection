import { Metadata } from 'next';
import { getPayload } from 'payload';
import config from '@payload-config';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Button } from '@/components/ui/Button';
import { FAQAccordion } from '@/components/ui/FAQAccordion';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Ingressos | Connection Experience',
  description: 'Garanta seu ingresso para o Connection Experience 2026.',
};

export default async function IngressosPage() {
  const payload = await getPayload({ config });

  const { docs: tickets } = await payload.find({
    collection: 'tickets',
    sort: 'order',
    limit: 10,
  });

  const { docs: faqItems } = await payload.find({
    collection: 'faq',
    sort: 'order',
    limit: 20,
  });

  const [settings, pageData] = await Promise.all([
    payload.findGlobal({ slug: 'site-settings' }),
    payload.findGlobal({ slug: 'page-ingressos' }),
  ]);
  const whatsapp = settings.contact?.whatsapp || '5554999999999';

  return (
    <div className="pt-24">
      {/* Hero + Tickets */}
      <section className="py-20 bg-bg-dark">
        <div className="container mx-auto px-4 lg:px-8">
          <SectionTitle
            title={pageData.hero?.title || "Ingressos"}
            subtitle={pageData.hero?.subtitle || "Escolha a experiência ideal para você e garanta sua presença no maior evento de Indicações Geográficas do Brasil"}
            align="center"
          />
          {tickets.length > 0 && (
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mt-12">
            {tickets.map((ticket) => (
              <div
                key={ticket.id}
                className={`relative rounded-2xl p-8 transition-all duration-300 ${
                  ticket.highlighted
                    ? 'bg-gold text-bg-darker scale-105 shadow-2xl shadow-gold/20'
                    : 'bg-bg-dark border border-gold/20 hover:border-gold/40'
                }`}
              >
                {ticket.highlighted && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="px-4 py-1 rounded-full bg-bg-darker text-gold text-sm font-medium">
                      Mais Popular
                    </span>
                  </div>
                )}

                <div className="text-center mb-6">
                  <h3 className={`font-heading text-2xl mb-2 ${ticket.highlighted ? 'text-bg-darker' : 'text-text-light'}`}>
                    {ticket.name}
                  </h3>
                  <p className={`text-sm ${ticket.highlighted ? 'text-bg-dark/70' : 'text-text-muted'}`}>
                    {ticket.description}
                  </p>
                </div>

                <div className="text-center mb-6">
                  {ticket.previousPrice && (
                    <span className={`text-lg line-through ${ticket.highlighted ? 'text-bg-dark/50' : 'text-text-muted'}`}>
                      R$ {ticket.previousPrice}
                    </span>
                  )}
                  <div className="flex items-baseline justify-center gap-1">
                    <span className={`text-sm ${ticket.highlighted ? 'text-bg-dark/70' : 'text-text-muted'}`}>R$</span>
                    <span className={`font-heading text-5xl ${ticket.highlighted ? 'text-bg-darker' : 'text-gold'}`}>
                      {ticket.price}
                    </span>
                  </div>
                </div>

                <ul className="space-y-3 mb-8">
                  {(ticket.features as any[])?.map((f: any, index: number) => (
                    <li key={index} className="flex items-start gap-3">
                      <svg
                        className={`w-5 h-5 shrink-0 mt-0.5 ${ticket.highlighted ? 'text-bg-darker' : 'text-gold'}`}
                        fill="none" stroke="currentColor" viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className={`text-sm ${ticket.highlighted ? 'text-bg-dark/80' : 'text-text-cream'}`}>
                        {f.feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <Button
                  href={`https://wa.me/${whatsapp}?text=${encodeURIComponent(`Olá! Tenho interesse no ingresso ${ticket.name}.`)}`}
                  external
                  variant={ticket.highlighted ? 'secondary' : 'primary'}
                  className={`w-full ${ticket.highlighted ? 'bg-bg-darker text-gold hover:bg-bg-dark' : ''}`}
                >
                  Comprar agora
                </Button>
              </div>
            ))}
          </div>
          )}
        </div>
      </section>

      {/* Group Sales */}
      <section className="py-16 bg-bg-brown">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-heading text-3xl text-text-light mb-4">{pageData.groupSales?.title || "Vendas para Grupos"}</h2>
            <p className="text-text-cream mb-8">
              {pageData.groupSales?.description || "Levando sua equipe para o Connection Experience? Oferecemos condições especiais para grupos a partir de 5 pessoas."}
            </p>
            {(pageData.groupSales?.buttonLink || pageData.cta?.buttonLink) && (
              <Button
                href={pageData.groupSales?.buttonLink || pageData.cta?.buttonLink}
                external
                variant="outline"
              >
                {pageData.groupSales?.buttonText || pageData.cta?.buttonText || 'Solicitar orçamento para grupos'}
              </Button>
            )}
          </div>
        </div>
      </section>

      {/* FAQ */}
      {faqItems.length > 0 && (
        <section className="py-16 bg-bg-dark">
          <div className="container mx-auto px-4 lg:px-8">
            <SectionTitle title="Perguntas Frequentes" align="center" />
            <FAQAccordion items={faqItems as any} />
          </div>
        </section>
      )}
    </div>
  );
}

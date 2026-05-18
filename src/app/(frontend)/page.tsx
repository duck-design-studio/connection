import { getPayload } from 'payload';
import config from '@payload-config';
import { Hero } from '@/components/sections/Hero';
import { SeloIG } from '@/components/sections/SeloIG';
import { Experimentar } from '@/components/sections/Experimentar';
import { OQueEIG } from '@/components/sections/OQueEIG';
import { CTA } from '@/components/sections/CTA';
import { InfoPraticas } from '@/components/sections/InfoPraticas';
import { Parceiros } from '@/components/sections/Parceiros';
import { HeroVideo } from '@/components/sections/HeroVideo';
import { ComoFunciona } from '@/components/sections/ComoFunciona';
import { EventGallery } from '@/components/sections/EventGallery';
import { SpeakersGrid } from '@/components/sections/SpeakersGrid';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const payload = await getPayload({ config });

  const [siteSettings, pageHome, partners, scheduleEvents, speakers, pageProgramacao, products, productCategories] = await Promise.all([
    payload.findGlobal({ slug: 'site-settings' }),
    payload.findGlobal({ slug: 'page-home' }),
    payload.find({ collection: 'partners', sort: 'order', limit: 50, depth: 2 }),
    payload.find({ collection: 'schedule-events', sort: 'date', limit: 200, depth: 1 }),
    payload.find({ collection: 'speakers', sort: 'order', limit: 50, depth: 1 }),
    payload.findGlobal({ slug: 'page-programacao' }),
    payload.find({ collection: 'products', sort: 'order', limit: 200, depth: 1 }),
    payload.find({ collection: 'product-categories', sort: 'name', limit: 50 }),
  ]);

  const cmsProducts = products.docs.map((p: any) => ({
    id: p.id,
    name: p.name,
    origin: p.origin || '',
    state: p.state || '',
    description: p.description || '',
    category: typeof p.category === 'object' && p.category !== null ? p.category.name : '',
    image: typeof p.image === 'object' && p.image !== null ? p.image.url : undefined,
  }));
  const cmsCategories = productCategories.docs.map((c: any) => c.name);

  // Attach schedule and event phase to pageHome for SeloIG > ConhecaBlock
  const pageHomeWithSchedule: any = {
    ...pageHome,
    schedulePreview: scheduleEvents.docs,
    eventPhase: siteSettings.event?.phase || 'pre-event',
    scheduleHiddenTypes: (pageProgramacao as any).hiddenTypes || [],
  };

  const speakersTag = pageHomeWithSchedule?.speakers?.tag || 'Confirmados';
  const speakersTitle = pageHomeWithSchedule?.speakers?.title || 'Palestrantes';

  return (
    <>
      <Hero siteSettings={siteSettings} pageHome={pageHomeWithSchedule} />
      <HeroVideo videoUrl={pageHomeWithSchedule?.hero?.videoUrl} posterUrl={pageHomeWithSchedule?.hero?.videoPosterUrl} />
      <ComoFunciona cms={pageHomeWithSchedule?.comoFunciona} />
      <Experimentar products={cmsProducts} categories={cmsCategories} />
      <SeloIG pageHome={pageHomeWithSchedule} />
      {speakers.docs.length > 0 && (
        <section className="bg-[#131415] px-4 md:px-5 py-16 md:py-24">
          <div className="mx-auto max-w-[1450px] rounded-[15px] overflow-hidden bg-[#131415] p-8 md:p-12 lg:p-16">
            <SpeakersGrid speakers={speakers.docs as any} tag={speakersTag} title={speakersTitle} />
          </div>
        </section>
      )}
      <OQueEIG pageHome={pageHomeWithSchedule} />
      <CTA pageHome={pageHomeWithSchedule} />
      {(() => {
        const press = (pageHomeWithSchedule as any)?.pressSection;
        const cmsItems: any[] = Array.isArray(press?.items) ? press.items.filter((i: any) => i?.label && i?.url) : [];
        const defaultItems = [
          { label: 'Imprensa', url: 'https://sigevent.pro/ms/visitantes/?id_edicao=2664&linguagem=portugues' },
          { label: 'Assessor de Imprensa', url: 'https://sigevent.pro/ms/visitantes/?id_edicao=2631&linguagem=portugues' },
          { label: 'Criadores de Conteúdo', url: 'https://sigevent.pro/ms/visitantes/?id_edicao=2697&linguagem=portugues' },
        ];
        const items = cmsItems.length > 0 ? cmsItems : defaultItems;
        if (press?.visible === false) return null;
        return (
          <section className="bg-[#131415] px-6 py-12 md:py-16">
            <div className="mx-auto flex max-w-3xl flex-col items-center gap-5 text-center">
              <h2 className="font-just-sans text-[11px] font-semibold uppercase tracking-[0.24em] text-[#C9A962]">
                {press?.title || 'Para a imprensa'}
              </h2>
              <p className="max-w-xl font-just-sans text-[14px] leading-relaxed text-[#FFF5EC]/55 md:text-[15px]">
                {press?.description || 'Profissionais com credencial têm acesso à área de imprensa do evento.'}
              </p>
              <div className="flex flex-wrap justify-center gap-2.5 pt-1">
                {items.map((item, i) => (
                  <a
                    key={i}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full border border-[#FFF5EC]/20 px-5 py-2.5 font-just-sans text-[13px] text-[#FFF5EC]/80 transition-colors hover:border-[#C9A962]/50 hover:bg-[#C9A962]/10 hover:text-[#FFF5EC]"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </div>
          </section>
        );
      })()}
      <InfoPraticas siteSettings={siteSettings} pageHome={pageHomeWithSchedule} />
      <EventGallery
        title={pageHomeWithSchedule?.eventGallery?.title}
        subtitle={pageHomeWithSchedule?.eventGallery?.subtitle}
        images={(pageHomeWithSchedule?.eventGallery?.images as any[])?.map((item: any) => ({
          image: typeof item.image === 'object' ? item.image : null,
          caption: item.caption,
        })) || []}
      />
      <Parceiros partners={partners.docs} />
    </>
  );
}

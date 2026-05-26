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
import { attachTalkTitles } from '@/lib/speakers';

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

  const speakersWithTalks = await attachTalkTitles(payload, speakers.docs);

  const speakersTag = pageHomeWithSchedule?.speakers?.tag || 'Confirmados';
  const speakersTitle = pageHomeWithSchedule?.speakers?.title || 'Palestrantes';

  return (
    <>
      <Hero siteSettings={siteSettings} pageHome={pageHomeWithSchedule} />
      <HeroVideo videoUrl={pageHomeWithSchedule?.hero?.videoUrl} posterUrl={pageHomeWithSchedule?.hero?.videoPosterUrl} />
      <ComoFunciona cms={pageHomeWithSchedule?.comoFunciona} />
      <Experimentar products={cmsProducts} categories={cmsCategories} />
      <SeloIG pageHome={pageHomeWithSchedule} />
      {speakersWithTalks.length > 0 && (
        <section className="bg-[#131415] px-4 md:px-5 py-16 md:py-24">
          <div className="mx-auto max-w-[1450px] rounded-[15px] overflow-hidden bg-[#131415] p-8 md:p-12 lg:p-16">
            <SpeakersGrid speakers={speakersWithTalks as any} tag={speakersTag} title={speakersTitle} />
          </div>
        </section>
      )}
      <OQueEIG pageHome={pageHomeWithSchedule} />
      <CTA pageHome={pageHomeWithSchedule} />
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

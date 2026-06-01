import { Metadata } from 'next';
import { getPayload } from 'payload';
import config from '@payload-config';
import { SpeakersGrid } from '@/components/sections/SpeakersGrid';
import { attachTalkTitles } from '@/lib/speakers';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Palestrantes | Connection Experience',
  description: 'Conheça os palestrantes confirmados do Connection Experience 2026.',
};

export default async function PalestrantesPage() {
  const payload = await getPayload({ config });

  const { docs: speakersDocs } = await payload.find({
    collection: 'speakers',
    sort: 'order',
    limit: 50,
    depth: 1,
  });
  const speakers = await attachTalkTitles(payload, speakersDocs);

  const pageHome = await payload.findGlobal({ slug: 'page-home' });
  const tag = pageHome?.speakers?.tag || 'Confirmados';
  const title = pageHome?.speakers?.title || 'Palestrantes';

  const palestrantes = speakers.filter((s: any) => s.role !== 'chef');
  const chefs = speakers.filter((s: any) => s.role === 'chef');

  return (
    <div className="pt-32 pb-20 bg-[#131415] min-h-screen">
      <div className="mx-auto max-w-[1221px] px-6 lg:px-[50px] space-y-16 md:space-y-24">
        {palestrantes.length > 0 && (
          <SpeakersGrid speakers={palestrantes as any} tag={tag} title={title} />
        )}
        {chefs.length > 0 && (
          <SpeakersGrid speakers={chefs as any} tag="Confirmados" title="Arena Gastronômica" />
        )}
      </div>
    </div>
  );
}

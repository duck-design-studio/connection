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

  return (
    <div className="pt-32 pb-20 bg-[#131415] min-h-screen">
      <div className="mx-auto max-w-[1221px] px-6 lg:px-[50px]">
        <SpeakersGrid speakers={speakers as any} tag={tag} title={title} />
      </div>
    </div>
  );
}

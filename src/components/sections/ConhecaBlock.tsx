'use client';

import Image from 'next/image';
import { ScheduleView, type ScheduleEvent } from './ScheduleView';

const cards = [
  {
    title: 'Palestras Exclusivas',
    description:
      'Conteúdo transformador com especialistas renomados em turismo, gastronomia e empreendedorismo.',
  },
  {
    title: 'Podcast Connection',
    description:
      'Conteúdo transformador com especialistas renomados em turismo, gastronomia e empreendedorismo.',
  },
  {
    title: 'Blog & Artigos',
    description:
      'Conteúdo transformador com especialistas renomados em turismo, gastronomia e empreendedorismo.',
  },
];

interface ConhecaBlockProps {
  cmsSchedule?: any[];
  eventPhase?: string;
  showCategoryFilters?: boolean;
  hiddenTypes?: string[];
}

export function ConhecaBlock({ cmsSchedule, eventPhase, hiddenTypes = [] }: ConhecaBlockProps) {
  const EVENT_MODE = eventPhase === 'during';

  const scheduleEvents: ScheduleEvent[] = (cmsSchedule && cmsSchedule.length > 0)
    ? cmsSchedule.map((evt: any) => {
        const speakerName = typeof evt.speaker === 'object' && evt.speaker?.name ? evt.speaker.name : '';
        const photo = typeof evt.speaker === 'object' && evt.speaker?.photo
          ? (evt.speaker.photo.url || `/media/${evt.speaker.photo.filename}`)
          : undefined;
        return {
          id: String(evt.id),
          date: evt.date,
          startTime: evt.startTime || '',
          endTime: evt.endTime || undefined,
          title: evt.title || '',
          type: evt.type || 'special',
          track: evt.track || 'principal',
          access: evt.access || null,
          speaker: { name: speakerName },
          speakerImages: photo ? [photo] : undefined,
          location: evt.location || undefined,
          description: evt.description || undefined,
        };
      })
    : [];

  return (
    <div className="mt-[100px] flex flex-col gap-[48px]">
      {/* Header */}
      <div className="flex flex-col gap-[30px]">
        <h2 className="font-heading text-[56px] font-normal leading-[1] text-[#FFF5EC] md:text-[80px] lg:text-[109px]">
          Conheça
        </h2>
        <p className="max-w-[657px] font-just-sans text-lg leading-normal text-[#FFF5EC]/60 lg:text-xl">
          Descubra o universo das Indicações Geográficas brasileiras através de
          conteúdo exclusivo, palestras transformadoras e conhecimento que
          valoriza nossa cultura.
        </p>
      </div>

      {/* Pre-event: cards */}
      {!EVENT_MODE && (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-[45px]">
          {cards.map((card) => (
            <div key={card.title} className="flex flex-col gap-5">
              <div className="relative aspect-[377/498] w-full overflow-hidden rounded-[25px]">
                <Image
                  src="/images/conheca-card-placeholder.jpg"
                  alt={card.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col gap-[10px] text-[#FFF5EC]">
                <h3 className="font-heading text-[24px] font-bold leading-[30px] lg:text-[30px]">
                  {card.title}
                </h3>
                <p className="font-just-sans text-xs opacity-80">
                  {card.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* During event: shared ScheduleView */}
      {EVENT_MODE && (
        <ScheduleView events={scheduleEvents} hiddenTypes={hiddenTypes} />
      )}
    </div>
  );
}

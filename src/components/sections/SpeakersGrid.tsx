import Image from 'next/image';

export interface SpeakerData {
  id: string;
  name: string;
  role?: string | null;
  title?: string | null;
  talkTitle?: string | null;
  bio?: string | null;
  photo?: { url?: string; filename?: string; alt?: string } | string | null;
}

interface SpeakersGridProps {
  speakers: SpeakerData[];
  tag?: string;
  title?: string;
}

export function SpeakersGrid({ speakers, tag = 'Confirmados', title = 'Palestrantes' }: SpeakersGridProps) {
  if (speakers.length === 0) return null;

  return (
    <div>
      <div className="mb-10 text-center">
        <span className="mb-3 inline-block font-just-sans text-sm uppercase tracking-[0.2em] text-[#C9A962]">
          {tag}
        </span>
        <h2 className="font-heading text-[32px] font-normal leading-[1.1] text-[#FFF5EC] md:text-[40px] lg:text-[48px]">
          {title}
        </h2>
      </div>
      <div className="grid grid-cols-2 gap-6 md:gap-8 lg:grid-cols-4">
        {speakers.map((speaker) => {
          const photo =
            typeof speaker.photo === 'object' && speaker.photo !== null
              ? speaker.photo
              : null;
          const photoUrl = photo?.url || (photo?.filename ? `/media/${photo.filename}` : null);
          const initials = speaker.name
            .split(' ')
            .map((w) => w[0])
            .join('')
            .slice(0, 2);

          const hoverText = speaker.bio || speaker.title || '';

          return (
            <div
              key={speaker.id}
              className="group relative aspect-[3/4] w-full overflow-hidden rounded-2xl bg-[#1a1a1a]"
            >
              {photoUrl ? (
                <Image
                  src={photoUrl}
                  alt={photo?.alt || speaker.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              ) : (
                <div className="flex h-full items-center justify-center">
                  <span className="font-heading text-4xl text-[#C9A962]/30">
                    {initials}
                  </span>
                </div>
              )}

              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/80 via-black/30 to-transparent transition-opacity duration-300 group-hover:opacity-0" />

              <div className="absolute inset-x-0 bottom-0 p-4 md:p-5 transition-opacity duration-300 group-hover:opacity-0">
                {speaker.role && (
                  <span className="mb-1.5 inline-block rounded-full bg-[#C9A962]/20 px-2.5 py-0.5 font-just-sans text-[10px] uppercase tracking-wider text-[#C9A962]">
                    {speaker.role}
                  </span>
                )}
                <h3 className="font-heading text-lg leading-tight text-[#FFF5EC] md:text-xl lg:text-2xl">
                  {speaker.name}
                </h3>
                {speaker.talkTitle && (
                  <p className="mt-2 inline-block rounded-lg border border-[#C9A962]/35 bg-[#C9A962]/10 px-2.5 py-1 font-just-sans text-[11px] font-medium leading-snug text-[#C9A962] md:text-xs">
                    {speaker.talkTitle}
                  </p>
                )}
              </div>

              <div className="absolute inset-0 flex flex-col bg-black/75 p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100 md:p-5">
                {speaker.role && (
                  <span className="mb-1.5 inline-block self-start rounded-full bg-[#C9A962]/20 px-2.5 py-0.5 font-just-sans text-[10px] uppercase tracking-wider text-[#C9A962] shrink-0">
                    {speaker.role}
                  </span>
                )}
                <h3 className="mb-1 font-heading text-base leading-tight text-[#FFF5EC] md:text-xl lg:text-2xl shrink-0">
                  {speaker.name}
                </h3>
                {speaker.talkTitle && (
                  <p className="mb-2 hidden self-start rounded-lg border border-[#C9A962]/35 bg-[#C9A962]/10 px-2.5 py-1 font-just-sans text-[11px] font-medium leading-snug text-[#C9A962] shrink-0 md:inline-block md:text-xs">
                    {speaker.talkTitle}
                  </p>
                )}
                {hoverText && (
                  <p className="font-just-sans text-[11px] leading-relaxed text-[#FFF5EC]/85 md:text-sm overflow-y-auto pr-1 [scrollbar-width:thin] [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:bg-[#FFF5EC]/30 [&::-webkit-scrollbar-thumb]:rounded-full">
                    {hoverText}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

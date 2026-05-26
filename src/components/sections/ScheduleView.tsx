'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';

type EventType = 'palestra' | 'painel' | 'workshop' | 'networking' | 'break' | 'special';

const typeLabels: Record<EventType, string> = {
  palestra: 'Palestra',
  painel: 'Painel',
  workshop: 'Workshop',
  networking: 'Networking',
  break: 'Intervalo',
  special: 'Especial',
};

const typeColors: Record<EventType, string> = {
  palestra: '#956A47',
  painel: '#B0824A',
  workshop: '#2D5A3D',
  networking: '#3B4D7A',
  break: '#6B7280',
  special: '#E07B39',
};

const weekdayNames = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'] as const;

export type ScheduleTrack = 'principal' | 'paralela';
export type ScheduleAccess = 'free' | 'ticketed';

export interface ScheduleEvent {
  id?: string;
  date: string;
  startTime: string;
  endTime?: string;
  title: string;
  type?: string;
  track?: ScheduleTrack;
  access?: ScheduleAccess | null;
  speaker?: { name?: string } | string | null;
  speakerImages?: string[];
  location?: string;
  description?: string;
}

interface ScheduleViewProps {
  events: ScheduleEvent[];
  showSearch?: boolean;
  emptyLabel?: string;
  hiddenTypes?: string[];
}

function normalizeType(t?: string): EventType {
  if (!t) return 'special';
  const v = t.toLowerCase();
  if (v in typeLabels) return v as EventType;
  return 'special';
}

type NormalizedEvent = {
  id?: string;
  dayKey: string;
  weekday: string;
  startTime: string;
  endTime?: string;
  title: string;
  type: EventType;
  track: ScheduleTrack;
  access: ScheduleAccess;
  speaker: string;
  speakerImages?: string[];
  location?: string;
  description?: string;
};

function deriveAccess(explicit: ScheduleAccess | null | undefined, track: ScheduleTrack): ScheduleAccess {
  if (explicit === 'free' || explicit === 'ticketed') return explicit;
  return track === 'paralela' ? 'free' : 'ticketed';
}

function EventCard({ item, showTime = true }: { item: NormalizedEvent; showTime?: boolean }) {
  const color = typeColors[item.type];
  return (
    <div
      className="group flex min-h-[120px] items-stretch gap-0 rounded-[16px] bg-[#FFF5EC]/[0.04] transition-colors hover:bg-[#FFF5EC]/[0.07]"
    >
      {showTime && (
        <div className="flex w-[100px] shrink-0 flex-col justify-center px-5 lg:w-[120px]">
          <span className="font-heading text-[26px] leading-[30px] text-[#FFF5EC] lg:text-[30px]">
            {item.startTime}
          </span>
          {item.endTime && (
            <span className="mt-0.5 font-just-sans text-[13px] leading-[20.8px] text-[#FFF5EC]/30">
              até {item.endTime}
            </span>
          )}
        </div>
      )}

      <div className="flex shrink-0 flex-col items-start justify-center py-4">
        <div className="h-full w-[3px] rounded-full" style={{ backgroundColor: color }} />
      </div>

      <div className="flex min-w-0 flex-1 items-center gap-4 px-5">
        <div className="flex min-w-0 flex-1 flex-col gap-1">
          <div className="flex items-center gap-2">
            <span
              className="font-just-sans text-[12px] font-semibold uppercase tracking-[0.6px] leading-[19.2px]"
              style={{ color }}
            >
              {typeLabels[item.type]}
            </span>
            {item.access === 'ticketed' && (
              <span className="inline-flex items-center gap-1 rounded-full bg-[#956A47]/25 px-[8px] py-[2px] font-just-sans text-[10px] font-semibold uppercase tracking-wider text-[#E0B989]">
                <span className="h-1 w-1 rounded-full bg-[#C9A962]" />
                Ingresso
              </span>
            )}
            {item.track === 'paralela' && (
              <span className="rounded-full bg-[#FFF5EC]/10 px-[8px] py-[1px] font-just-sans text-[10px] font-medium text-[#FFF5EC]/50 uppercase tracking-wider">
                Na Cidade
              </span>
            )}
          </div>
          <h4 className="font-just-sans text-[15px] font-semibold leading-[22px] text-[#FFF5EC] lg:text-base">
            {item.title}
          </h4>
          {item.speaker && (
            <p className="font-just-sans text-[13px] leading-[20.8px] text-[#FFF5EC]/40">
              {item.speaker}
            </p>
          )}
          {item.description && (
            <p className="font-just-sans text-[12px] leading-[18px] text-[#FFF5EC]/30 line-clamp-2">
              {item.description}
            </p>
          )}
          {item.location && (
            <span className="mt-[3px] inline-flex items-center gap-1.5 font-just-sans text-[12px] leading-[19.2px] text-[#FFF5EC]/25">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0116 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              {item.location}
            </span>
          )}
        </div>

        {item.speakerImages && item.speakerImages.length > 0 && (
          <div className="flex shrink-0 -space-x-3.5">
            {item.speakerImages.map((img, j) => (
              <div
                key={j}
                className="relative h-[61px] w-[61px] overflow-hidden rounded-full shadow-[0_0_0_3.4px_#281b15]"
              >
                <Image src={img} alt="" fill className="object-cover" />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export function ScheduleView({
  events,
  showSearch = true,
  emptyLabel = 'Nenhuma atividade encontrada para este filtro.',
  hiddenTypes = [],
}: ScheduleViewProps) {
  const normalized = useMemo(
    () =>
      events.map((e) => {
        const d = new Date(e.date);
        const dayKey = String(d.getUTCDate());
        const weekday = weekdayNames[d.getUTCDay()] || dayKey;
        const speakerName =
          typeof e.speaker === 'object' && e.speaker?.name
            ? e.speaker.name
            : typeof e.speaker === 'string'
              ? e.speaker
              : '';
        const track = (e.track || 'principal') as ScheduleTrack;
        return {
          id: e.id,
          dayKey,
          weekday,
          startTime: e.startTime,
          endTime: e.endTime,
          title: e.title,
          type: normalizeType(e.type),
          track,
          access: deriveAccess(e.access, track),
          speaker: speakerName,
          speakerImages: e.speakerImages,
          location: e.location,
          description: e.description,
        };
      }),
    [events]
  );

  const days = useMemo(() => {
    const seen = new Map<string, { key: string; weekday: string }>();
    for (const n of normalized) {
      if (!seen.has(n.dayKey)) seen.set(n.dayKey, { key: n.dayKey, weekday: n.weekday });
    }
    return [...seen.values()].sort((a, b) => Number(a.key) - Number(b.key));
  }, [normalized]);

  const typesPresent = useMemo(() => {
    const set = new Set<EventType>();
    for (const n of normalized) set.add(n.type);
    return (Object.keys(typeLabels) as EventType[]).filter((t) => set.has(t) && !hiddenTypes.includes(t));
  }, [normalized, hiddenTypes]);

  const locations = useMemo(
    () => [...new Set(normalized.map((n) => n.location).filter(Boolean))] as string[],
    [normalized]
  );

  const [activeType, setActiveType] = useState<EventType | null>(null);
  const [activeAccess, setActiveAccess] = useState<ScheduleAccess | null>(null);
  const [activeDay, setActiveDay] = useState<string>(days[0]?.key || '');
  const [activeLocation, setActiveLocation] = useState<string | null>(null);
  const [locationOpen, setLocationOpen] = useState(false);
  const [search, setSearch] = useState('');

  const effectiveDay = days.find((d) => d.key === activeDay)?.key || days[0]?.key || '';

  const accessCounts = useMemo(() => {
    let free = 0;
    let ticketed = 0;
    for (const n of normalized) {
      if (n.access === 'free') free++;
      else ticketed++;
    }
    return { free, ticketed };
  }, [normalized]);

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    return normalized
      .filter((n) => {
        if (n.dayKey !== effectiveDay) return false;
        if (activeType && n.type !== activeType) return false;
        if (activeAccess && n.access !== activeAccess) return false;
        if (activeLocation && n.location !== activeLocation) return false;
        if (
          q &&
          !n.title.toLowerCase().includes(q) &&
          !n.speaker.toLowerCase().includes(q)
        )
          return false;
        return true;
      })
      .sort((a, b) => a.startTime.localeCompare(b.startTime));
  }, [normalized, effectiveDay, activeType, activeAccess, activeLocation, search]);

  const principalEvents = useMemo(() => filtered.filter((n) => n.track === 'principal'), [filtered]);
  const paralelaEvents = useMemo(() => filtered.filter((n) => n.track === 'paralela'), [filtered]);

  if (normalized.length === 0) {
    return <p className="py-16 text-center font-just-sans text-base text-[#FFF5EC]/40">Programação em breve.</p>;
  }

  return (
    <div className="flex flex-col gap-[24px]">
      {/* Access filter (ticketed only) */}
      {accessCounts.ticketed > 0 && (
        <div className="flex flex-wrap items-center gap-[10px]">
          <span className="font-just-sans text-[12px] font-semibold uppercase tracking-[0.12em] text-[#FFF5EC]/40">
            Acesso
          </span>
          <button
            onClick={() => setActiveAccess(null)}
            className={`rounded-full border border-[#FFF5EC]/20 px-[20px] py-[8px] font-just-sans text-[13px] text-[#FFF5EC] transition-colors ${
              activeAccess === null ? 'bg-[#FFF5EC]/10' : 'bg-transparent hover:bg-[#FFF5EC]/5'
            }`}
          >
            Todos
          </button>
          <button
            onClick={() => setActiveAccess(activeAccess === 'ticketed' ? null : 'ticketed')}
            className={`inline-flex items-center gap-2 rounded-full border px-[20px] py-[8px] font-just-sans text-[13px] transition-colors ${
              activeAccess === 'ticketed'
                ? 'border-[#C9A962]/60 bg-[#956A47]/30 text-[#E0B989]'
                : 'border-[#956A47]/30 bg-transparent text-[#E0B989] hover:bg-[#956A47]/15'
            }`}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#C9A962]" />
            Com ingresso
            <span className="text-[#E0B989]/60">({accessCounts.ticketed})</span>
          </button>
        </div>
      )}

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-[10px]">
        <button
          onClick={() => setActiveType(null)}
          className={`rounded-full border border-[#FFF5EC]/20 px-[25px] py-[10px] font-just-sans text-sm text-[#FFF5EC] transition-colors ${
            activeType === null ? 'bg-[#946947]' : 'bg-transparent hover:bg-[#FFF5EC]/5'
          }`}
        >
          Todos
        </button>
        {typesPresent.map((t) => (
          <button
            key={t}
            onClick={() => setActiveType(activeType === t ? null : t)}
            className={`rounded-full border border-[#FFF5EC]/20 px-[25px] py-[10px] font-just-sans text-sm text-[#FFF5EC] transition-colors ${
              activeType === t ? 'bg-[#946947]' : 'bg-transparent hover:bg-[#FFF5EC]/5'
            }`}
          >
            {typeLabels[t]}
          </button>
        ))}

        {locations.length > 0 && (
          <>
            <div className="mx-2 h-5 w-px bg-[#FFF5EC]/10" />
            <div className="relative">
              <button
                onClick={() => setLocationOpen(!locationOpen)}
                className={`flex items-center gap-2 rounded-full border border-[#FFF5EC]/20 px-[25px] py-[10px] font-just-sans text-sm text-[#FFF5EC] transition-colors ${
                  activeLocation !== null ? 'bg-[#946947]' : 'bg-transparent hover:bg-[#FFF5EC]/5'
                }`}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 opacity-60">
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0116 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                {activeLocation ?? 'Todos os palcos'}
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`shrink-0 opacity-50 transition-transform ${locationOpen ? 'rotate-180' : ''}`}>
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </button>
              {locationOpen && (
                <div className="absolute left-0 top-full z-20 mt-2 min-w-[200px] rounded-[12px] border border-[#FFF5EC]/10 bg-[#1C1F21] p-1.5 shadow-xl">
                  <button
                    onClick={() => { setActiveLocation(null); setLocationOpen(false); }}
                    className={`flex w-full items-center gap-2 rounded-lg px-4 py-2.5 text-left font-just-sans text-sm transition-colors ${
                      activeLocation === null ? 'bg-[#956A47]/15 text-[#FFF5EC]' : 'text-[#FFF5EC]/60 hover:bg-[#FFF5EC]/5 hover:text-[#FFF5EC]'
                    }`}
                  >
                    Todos os palcos
                  </button>
                  {locations.map((loc) => (
                    <button
                      key={loc}
                      onClick={() => { setActiveLocation(loc); setLocationOpen(false); }}
                      className={`flex w-full items-center gap-2 rounded-lg px-4 py-2.5 text-left font-just-sans text-sm transition-colors ${
                        activeLocation === loc ? 'bg-[#956A47]/15 text-[#FFF5EC]' : 'text-[#FFF5EC]/60 hover:bg-[#FFF5EC]/5 hover:text-[#FFF5EC]'
                      }`}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 opacity-50">
                        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0116 0z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                      {loc}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </>
        )}

        {showSearch && (
          <div className="relative ml-auto">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute left-3 top-1/2 -translate-y-1/2 text-[#FFF5EC]/30">
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar palestrante ou tema..."
              className="w-full rounded-full border border-[#FFF5EC]/10 bg-[#31241e] pb-[13px] pl-[37px] pr-[17px] pt-[12.5px] font-just-sans text-[13px] text-[#FFF5EC] placeholder-[#FFF5EC]/25 outline-none transition-colors focus:border-[#956A47]/50 sm:w-[260px]"
            />
          </div>
        )}
      </div>

      {/* Day selector */}
      {days.length > 1 && (
        <div className="flex w-full items-end gap-[12px] sm:gap-[40px]">
          {days.map((day) => (
            <button
              key={day.key}
              onClick={() => setActiveDay(day.key)}
              className={`flex flex-1 flex-col items-center gap-[6px] rounded-[14px] py-3 font-just-sans transition-all ${
                effectiveDay === day.key
                  ? 'bg-[#956A47] text-[#FFF5EC]'
                  : 'border border-[#31241e] text-[#956A47] hover:bg-[#956A47]/10'
              }`}
            >
              <span className="text-[13px] tracking-[0.325px]">{day.weekday}</span>
              <span className="text-[22px] font-semibold leading-[22px]">{day.key}</span>
            </button>
          ))}
        </div>
      )}

      {/* Schedule lists */}
      {filtered.length === 0 && (
        <p className="py-16 text-center font-just-sans text-base text-[#FFF5EC]/40">
          {emptyLabel}
        </p>
      )}

      {/* Principal — programação do evento */}
      {principalEvents.length > 0 && (
        <div className="flex flex-col gap-[12px]">
          {paralelaEvents.length > 0 && (
            <div className="flex items-center gap-3 mb-2">
              <div className="h-px flex-1 bg-[#FFF5EC]/10" />
              <span className="font-just-sans text-[13px] font-semibold uppercase tracking-wider text-[#FFF5EC]/50">
                Programação do Evento
              </span>
              <div className="h-px flex-1 bg-[#FFF5EC]/10" />
            </div>
          )}
          {principalEvents.map((item, i) => (
            <EventCard key={item.id || `p-${item.startTime}-${i}`} item={item} />
          ))}
        </div>
      )}

      {/* Paralela — programação aberta na cidade */}
      {paralelaEvents.length > 0 && (
        <div className="flex flex-col gap-[12px] mt-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="h-px flex-1 bg-[#FFF5EC]/10" />
            <span className="font-just-sans text-[13px] font-semibold uppercase tracking-wider text-[#FFF5EC]/50">
              Programação Aberta na Cidade
            </span>
            <div className="h-px flex-1 bg-[#FFF5EC]/10" />
          </div>
          {paralelaEvents.map((item, i) => (
            <EventCard key={item.id || `a-${item.startTime}-${i}`} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}

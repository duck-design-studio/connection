'use client';

import Link from 'next/link';
import { useGSAPScroll } from '@/hooks/useGSAP';

interface CardItem { text?: string }
interface CardData {
  tag?: string;
  headline?: string;
  description?: string;
  items?: CardItem[];
  ctaText?: string;
  ctaLink?: string;
}

interface ComoFuncionaProps {
  cms?: {
    enabled?: boolean;
    tag?: string;
    headline?: string;
    subtitle?: string;
    freeCard?: CardData;
    ticketedCard?: CardData;
  };
}

const defaultFreeItems = [
  'Vitrine de produtos com Selo IG',
  'Degustação aberta ao público',
  'Roça aberta e visitação livre',
  'Programação cultural na cidade',
];

const defaultTicketedItems = [
  'Palestras com especialistas convidados',
  'Workshops e arenas temáticas',
  'Visitação guiada pelos parques',
  'Áreas exclusivas e networking',
];

export function ComoFunciona({ cms }: ComoFuncionaProps) {
  if (cms?.enabled === false) return null;

  const tag = cms?.tag || 'Como funciona';
  const headline = cms?.headline || 'Dois jeitos de viver o Connection';
  const subtitle =
    cms?.subtitle ||
    'Boa parte do evento é gratuita e aberta ao público. Algumas experiências exclusivas exigem ingresso.';

  const free = cms?.freeCard;
  const ticketed = cms?.ticketedCard;

  const freeItems = free?.items?.length
    ? free.items.map((i) => i.text).filter(Boolean) as string[]
    : defaultFreeItems;
  const ticketedItems = ticketed?.items?.length
    ? ticketed.items.map((i) => i.text).filter(Boolean) as string[]
    : defaultTicketedItems;

  const headerRef = useGSAPScroll<HTMLDivElement>({ animation: 'fadeUp', distance: 40, duration: 0.8 });
  const freeRef = useGSAPScroll<HTMLDivElement>({ animation: 'fadeUp', distance: 30, duration: 0.7, delay: 0.1 });
  const ticketedRef = useGSAPScroll<HTMLDivElement>({ animation: 'fadeUp', distance: 30, duration: 0.7, delay: 0.2 });

  return (
    <section id="como-funciona" className="bg-[#131415] px-6 py-16 md:px-[50px] md:py-24">
      <div className="mx-auto flex max-w-[1340px] flex-col gap-12 lg:gap-16">
        {/* Header */}
        <div ref={headerRef} className="flex flex-col items-center gap-5 text-center opacity-0">
          <span className="font-just-sans text-xs font-bold uppercase tracking-[0.2em] text-[#956A47]">
            {tag}
          </span>
          <h2 className="max-w-[820px] font-heading text-4xl font-normal leading-[1.05] text-[#FFF5EC] md:text-5xl lg:text-[64px]">
            {headline}
          </h2>
          <p className="max-w-[640px] font-just-sans text-base text-[#FFF5EC]/60 md:text-lg">
            {subtitle}
          </p>
        </div>

        {/* Cards */}
        <div className="grid gap-5 lg:grid-cols-2 lg:gap-6">
          {/* Free card */}
          <div
            ref={freeRef}
            className="relative flex flex-col gap-7 overflow-hidden rounded-[20px] border border-[#5C7350]/40 bg-gradient-to-br from-[#2D3A2A] to-[#1F2A1D] p-8 opacity-0 md:p-10"
          >
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#7BA86A]/20 px-3 py-1 font-just-sans text-[11px] font-semibold uppercase tracking-[0.12em] text-[#A9D194]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#7BA86A]" />
                {free?.tag || 'Gratuito'}
              </span>
            </div>

            <div className="flex flex-col gap-3">
              <h3 className="font-heading text-3xl leading-tight text-[#FFF5EC] md:text-4xl">
                {free?.headline || 'Acesso livre'}
              </h3>
              <p className="font-just-sans text-base text-[#FFF5EC]/70">
                {free?.description ||
                  'Visite, prove e descubra o universo dos produtos de origem sem pagar nada.'}
              </p>
            </div>

            <ul className="flex flex-col gap-3">
              {freeItems.map((item, i) => (
                <li key={i} className="flex items-start gap-3 font-just-sans text-[15px] text-[#FFF5EC]/85">
                  <svg className="mt-1 h-4 w-4 shrink-0 text-[#A9D194]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <Link
              href={free?.ctaLink || '/#programacao'}
              className="mt-auto inline-flex w-fit items-center gap-2 rounded-full bg-[#FFF5EC] px-6 py-3 font-just-sans text-sm font-semibold text-[#1F2A1D] transition-colors hover:bg-[#FFF5EC]/90"
            >
              {free?.ctaText || 'Ver programação gratuita'}
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          {/* Ticketed card */}
          <div
            ref={ticketedRef}
            className="relative flex flex-col gap-7 overflow-hidden rounded-[20px] border border-[#956A47]/40 bg-gradient-to-br from-[#3a2a1d] to-[#281b15] p-8 opacity-0 md:p-10"
          >
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#956A47]/25 px-3 py-1 font-just-sans text-[11px] font-semibold uppercase tracking-[0.12em] text-[#E0B989]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#C9A962]" />
                {ticketed?.tag || 'Com ingresso'}
              </span>
            </div>

            <div className="flex flex-col gap-3">
              <h3 className="font-heading text-3xl leading-tight text-[#FFF5EC] md:text-4xl">
                {ticketed?.headline || 'Experiências exclusivas'}
              </h3>
              <p className="font-just-sans text-base text-[#FFF5EC]/70">
                {ticketed?.description ||
                  'Conteúdo curado, palestras e visitações guiadas para quem quer mergulhar fundo.'}
              </p>
            </div>

            <ul className="flex flex-col gap-3">
              {ticketedItems.map((item, i) => (
                <li key={i} className="flex items-start gap-3 font-just-sans text-[15px] text-[#FFF5EC]/85">
                  <svg className="mt-1 h-4 w-4 shrink-0 text-[#C9A962]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <Link
              href={ticketed?.ctaLink || '/#modalidades'}
              className="mt-auto inline-flex w-fit items-center gap-2 rounded-full border border-[#FFF5EC]/30 bg-transparent px-6 py-3 font-just-sans text-sm font-semibold text-[#FFF5EC] transition-colors hover:bg-[#FFF5EC]/10"
            >
              {ticketed?.ctaText || 'Ver modalidades'}
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

'use client';

import { useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { EventPhaseWrapper, PhaseConditional } from '@/components/shared/EventPhaseWrapper';
import { INGRESSOS_ESCONDIDOS } from '@/lib/flags';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAPParallax } from '@/hooks/useGSAP';

gsap.registerPlugin(ScrollTrigger);

interface HeroProps {
  siteSettings?: any;
  pageHome?: any;
}

export function Hero({ siteSettings, pageHome }: HeroProps) {
  const hero = pageHome?.hero;
  const event = siteSettings?.event;
  const cmsPhase = event?.phase;
  const eventPhase = cmsPhase === 'during' ? 'during-event' as const : cmsPhase === 'post-event' ? 'post-event' as const : 'pre-event' as const;
  const startDay = event?.startDate ? new Date(event.startDate).getUTCDate() : 10;
  const endDay = event?.endDate ? new Date(event.endDate).getUTCDate() : 13;
  const monthYear = event?.startDate
    ? new Date(event.startDate).toLocaleDateString('pt-BR', { month: 'long', year: 'numeric', timeZone: 'UTC' })
    : 'Junho 2026';
  const location = event?.location || 'Gramado, Rio Grande do Sul';

  // Hero content from CMS
  const headline = hero?.headline || 'Deguste, conheça e sinta os melhores produtos de origem do Brasil.';
  const subtitle = hero?.subtitle || 'Quatro dias em Gramado celebrando os produtos de origem do Brasil. Visitação e degustação gratuitas. Experiências exclusivas com ingresso.';
  const videoUrl = hero?.videoUrl || '/videos/hero.mp4';
  const secondaryText = hero?.secondaryButtonText || 'Saiba mais';
  const secondaryLink = hero?.secondaryButtonLink || '/#experimentar';
  const preEventFreeText = hero?.preEventFreeCta?.buttonText || 'Visitar gratuitamente';
  const preEventFreeLink = hero?.preEventFreeCta?.buttonLink || '/#como-funciona';
  const preEventText = hero?.preEventCta?.buttonText || 'Garantir ingresso';
  const preEventLink = hero?.preEventCta?.buttonLink || '/#modalidades';
  const duringText = hero?.duringEventCta?.buttonText || 'Confira a Programação';
  const duringLink = hero?.duringEventCta?.buttonLink || '/#programacao';
  const postText = hero?.postEventCta?.buttonText || 'Reviva a Experiência';
  const postLink = hero?.postEventCta?.buttonLink || '/blog';
  // Site em espera (jul/2026): esconde qualquer botão do Hero cujo destino seja
  // compra de ingresso (link externo de venda, /ingressos ou âncora de modalidades).
  // Detecta pelo href pra funcionar em qualquer fase do evento. Religa com INGRESSOS_ESCONDIDOS.
  const isTicketLink = (href?: string) =>
    INGRESSOS_ESCONDIDOS && /sigevent|\/ingressos|#modalidades/i.test(href || '');
  const sectionRef = useRef<HTMLDivElement>(null);
  const decorativeRef = useGSAPParallax<HTMLDivElement>(80);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo('.hero-headline', { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.9 })
        .fromTo('.hero-subtitle', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.7 }, '-=0.5')
        .fromTo('.hero-ctas', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.7 }, '-=0.4')
        .fromTo('.hero-date-card', { opacity: 0, x: 30 }, { opacity: 1, x: 0, duration: 0.6 }, '-=0.5');

      // (video parallax moved to HeroVideo component)
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative bg-[#131415]">
      {/* Green background block — extends behind hero image */}
      <div className="absolute left-1/2 -translate-x-1/2 top-[138px] w-[calc(100%-40px)] max-w-[1449px] h-[800px] md:h-[1100px] lg:h-[1431px] bg-[#4D564D] rounded-[15px]" />

      {/* Decorative organic SVG vector */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-[5]" aria-hidden="true">
        <div
          ref={decorativeRef}
          className="absolute flex items-center justify-center"
          style={{
            left: '-1505px',
            top: 'calc(50% + 1198px)',
            width: '4422px',
            height: '4005px',
            transform: 'translateY(-50%)',
          }}
        >
          <div className="rotate-[75deg]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/hero-lines.svg"
              alt=""
              width={3146}
              height={3735}
              className="max-w-none"
            />
          </div>
        </div>
      </div>

      {/* Main hero content area */}
      <div className="relative z-10 mx-auto max-w-[1330px] px-4 md:px-8 pt-[196px] pb-8">
        <div className="flex flex-col justify-between min-h-[407px]">
          {/* Headline */}
          <div className="hero-headline opacity-0">
            <h1 className="font-heading font-normal text-[#FFF5EC] text-4xl sm:text-5xl md:text-6xl lg:text-[78.85px] leading-[1.02] lg:max-w-[calc(100%-220px)]">
              {headline}
            </h1>
          </div>

          {/* Subtitle */}
          <p className="hero-subtitle opacity-0 font-just-sans font-normal text-lg md:text-xl lg:text-[24px] text-[#FFF5EC]/60 max-w-[604px] mt-6 md:mt-8">
            {subtitle}
          </p>

          {/* CTAs + Navigation tabs row */}
          <div className="hero-ctas opacity-0 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mt-8 md:mt-10 w-full">
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-[10px] w-full lg:w-[604px]">
              <PhaseConditional
                phase={eventPhase}
                preEvent={
                  <>
                    {/* Botões de compra de ingresso ficam ocultos enquanto INGRESSOS_ESCONDIDOS (detecção por link) */}
                    {!isTicketLink(preEventFreeLink) && (
                      <Link
                        href={preEventFreeLink}
                        className="inline-flex items-center justify-center flex-1 sm:flex-none sm:min-w-[220px] py-[15px] px-[24px] bg-[#FFF5EC] rounded-full font-just-sans font-semibold text-[16px] text-[#3D2E1E] text-center whitespace-nowrap hover:bg-[#FFF5EC]/90 transition-colors"
                      >
                        {preEventFreeText}
                      </Link>
                    )}
                    {!isTicketLink(preEventLink) && (
                      <Link
                        href={preEventLink}
                        className="inline-flex items-center justify-center flex-1 sm:flex-none sm:min-w-[200px] py-[15px] px-[24px] border border-[#FFF5EC] rounded-full font-just-sans font-semibold text-[16px] text-[#FFF5EC] text-center whitespace-nowrap hover:bg-[#FFF5EC]/10 transition-colors"
                      >
                        {preEventText}
                      </Link>
                    )}
                  </>
                }
                duringEvent={
                  <>
                    {!isTicketLink(duringLink) && (
                      <Link
                        href={duringLink}
                        className="inline-flex items-center justify-center flex-1 sm:flex-none sm:min-w-[200px] py-[15px] px-[24px] bg-[#FFF5EC] rounded-full font-just-sans font-semibold text-[16px] text-[#3D2E1E] text-center whitespace-nowrap hover:bg-[#FFF5EC]/90 transition-colors"
                      >
                        {duringText}
                      </Link>
                    )}
                    {!isTicketLink(secondaryLink) && (
                      <Link
                        href={secondaryLink}
                        className="inline-flex items-center justify-center flex-1 sm:flex-none sm:min-w-[200px] py-[15px] px-[24px] border border-[#FFF5EC] rounded-full font-just-sans font-semibold text-[16px] text-[#FFF5EC] text-center whitespace-nowrap hover:bg-[#FFF5EC]/10 transition-colors"
                      >
                        {secondaryText}
                      </Link>
                    )}
                  </>
                }
                postEvent={
                  <>
                    {!isTicketLink(postLink) && (
                      <Link
                        href={postLink}
                        className="inline-flex items-center justify-center flex-1 sm:flex-none sm:min-w-[200px] py-[15px] px-[24px] bg-[#FFF5EC] rounded-full font-just-sans font-semibold text-[16px] text-[#3D2E1E] text-center whitespace-nowrap hover:bg-[#FFF5EC]/90 transition-colors"
                      >
                        {postText}
                      </Link>
                    )}
                    {!isTicketLink(secondaryLink) && (
                      <Link
                        href={secondaryLink}
                        className="inline-flex items-center justify-center flex-1 sm:flex-none sm:min-w-[200px] py-[15px] px-[24px] border border-[#FFF5EC] rounded-full font-just-sans font-semibold text-[16px] text-[#FFF5EC] text-center whitespace-nowrap hover:bg-[#FFF5EC]/10 transition-colors"
                      >
                        {secondaryText}
                      </Link>
                    )}
                  </>
                }
              />
            </div>

            {/* Navigation tabs */}
            <div className="flex items-start gap-2 sm:gap-[18px] w-full sm:w-auto lg:w-[510px]">
              <a
                href="#produtos"
                className="flex-1 flex items-center justify-center px-[25px] py-[10px] border-b border-[#FFF5EC] font-just-sans font-normal text-[14px] text-[#FFF5EC] text-center hover:bg-[#FFF5EC]/5 transition-colors whitespace-nowrap"
              >
                Produtos
              </a>
              <a
                href="#experimentar"
                className="flex-1 flex items-center justify-center px-[25px] py-[10px] border-b border-[#FFF5EC] font-just-sans font-normal text-[14px] text-[#FFF5EC] text-center hover:bg-[#FFF5EC]/5 transition-colors whitespace-nowrap"
              >
                Experimentar
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Date card (floating top right) */}
      <div className="hero-date-card hidden lg:flex absolute top-[138px] right-[20px] xl:right-[calc(50%-665px)] z-20 flex-col gap-[11px] items-start bg-[#1C1F21] rounded-b-[20px] pt-[16px] pb-[20px] px-[16px] w-[181px] opacity-0">
        <Image
          src="/images/icon-location-figma.svg"
          alt="Localização"
          width={24}
          height={24}
        />
        <p className="font-heading font-bold text-[#FFF5EC] text-center w-full">
          <span className="text-[48px] leading-[24px]">{startDay} </span>
          <span className="text-[24px] leading-[24px]">a</span>
          <span className="text-[48px] leading-[24px]"> {endDay}</span>
        </p>
        <p className="font-heading font-bold text-[20px] leading-[22px] text-[#FFF5EC] text-center w-full">
          de {monthYear}
        </p>
        <p className="font-just-sans font-normal text-[10px] leading-[12px] text-[#FFF5EC]/80 text-center w-full">
          {location}
        </p>
      </div>

    </section>
  );
}

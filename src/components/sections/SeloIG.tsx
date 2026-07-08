'use client';

import { useEffect, useRef, useCallback } from 'react';
import { ConhecaBlock } from './ConhecaBlock';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAPScroll, useGSAPTimeline, useGSAPParallax } from '@/hooks/useGSAP';

gsap.registerPlugin(ScrollTrigger);

const defaultStats = [
  { number: '53', suffix: '+', label: 'Produtos com Selo IG' },
  { number: '9', suffix: '', label: 'Estados Representados' },
  { number: '70', suffix: '+', label: 'Produtores Representados' },
  { number: '4', suffix: '', label: 'Dias de Evento' },
];

interface SeloIGProps {
  pageHome?: any;
}

export function SeloIG({ pageHome }: SeloIGProps) {
  const cmsStats = pageHome?.seloIG?.stats;
  const stats = (cmsStats && cmsStats.length > 0 ? cmsStats : defaultStats).map((s: any) => ({
    number: Number(s.number) || 0,
    suffix: s.suffix || '',
    label: s.label || '',
  }));
  const headlineRef = useGSAPScroll<HTMLHeadingElement>({ animation: 'fadeUp', distance: 50, duration: 0.9 });
  const statsGridRef = useRef<HTMLDivElement>(null);
  const leafRef1 = useGSAPParallax<HTMLImageElement>(40);
  const leafRef2 = useGSAPParallax<HTMLImageElement>(60);
  const conhecaRef = useGSAPScroll<HTMLDivElement>({ animation: 'fadeUp', distance: 40, delay: 0.2 });

  useEffect(() => {
    const el = statsGridRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const statItems = el.querySelectorAll('.stat-item');

      statItems.forEach((item, i) => {
        const numberEl = item.querySelector('.stat-number');
        if (!numberEl) return;

        const target = stats[i];
        const obj = { val: 0 };

        gsap.fromTo(item,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            delay: i * 0.15,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );

        gsap.to(obj, {
          val: target.number,
          duration: 1.5,
          delay: i * 0.15,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
          onUpdate: () => {
            numberEl.textContent = Math.round(obj.val) + target.suffix;
          },
        });
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="sobre"
      className="relative overflow-hidden bg-[#281b15]"
    >
      {/* Decorative vectors — top right */}
      <img
        ref={leafRef1}
        src="/images/svg-decorativos/vector-folha-pequena-2.svg"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute w-[382px] -rotate-90 opacity-80"
        style={{ left: 'calc(75% + 126px)', top: '-116px' }}
      />
      <img
        ref={leafRef2}
        src="/images/svg-decorativos/vector-folha-grande.svg"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute w-[488px] -rotate-90 opacity-80"
        style={{ left: 'calc(75% + 104px)', top: 'calc(16.67% + 132px)' }}
      />

      <div className="relative z-10 mx-auto max-w-[1221px] px-6 py-[150px] lg:px-[50px]">
        {/* ─── 1. Stats + Headline ─── */}
        <div className="flex flex-col gap-12 text-[#FFF5EC] lg:flex-row lg:items-center lg:gap-[116px]">
          <h2 ref={headlineRef} className="font-heading text-[36px] font-normal leading-[1] md:text-[48px] lg:w-[411px] lg:shrink-0 lg:text-[60px] opacity-0">
            {pageHome?.seloIG?.headline || 'A maior vitrine de produtos de origem do Brasil'}
          </h2>
          <div ref={statsGridRef} className="grid grid-cols-2 gap-x-16 gap-y-10 lg:gap-x-[141px] lg:gap-y-[59px]">
            {stats.map((stat: { number: number; suffix: string; label: string }) => (
              <div key={stat.label} className="stat-item flex w-[199px] flex-col gap-[35px] opacity-0">
                <span className="stat-number font-heading text-[60px] leading-[60px] lg:text-[100px] lg:leading-[60px]">
                  0{stat.suffix}
                </span>
                <span className="font-just-sans text-base opacity-80 lg:text-xl">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ─── 2. Conheça ─── */}
        {/* ESCONDIDO (jul/2026): grade de Programação da home. Para reativar, remova o `false &&`. */}
        {false && (
        <div id="programacao" ref={conhecaRef} className="opacity-0">
          <ConhecaBlock cmsSchedule={pageHome?.schedulePreview} eventPhase={pageHome?.eventPhase} hiddenTypes={pageHome?.scheduleHiddenTypes || []} />
        </div>
        )}
      </div>
    </section>
  );
}

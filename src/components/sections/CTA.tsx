'use client';

import { useGSAPScroll, useGSAPParallax } from '@/hooks/useGSAP';
import { ModalidadesGrid } from './Modalidades';

interface CTAProps { pageHome?: any; }
export function CTA({ pageHome }: CTAProps) {
  const cms = pageHome?.ctaFinal;
  const modalidadesCms = pageHome?.modalidades;
  const ctaHeadline = cms?.headline || 'Como você quer viver o Connection?';
  const ctaSubtitle = cms?.subtitle || 'Da Rua Coberta aos parques de Gramado — escolha a sua imersão na origem.';
  const modalidadesTag = modalidadesCms?.tag || 'Modalidades';
  const contentRef = useGSAPScroll<HTMLDivElement>({ animation: 'scaleIn', duration: 1 });
  const headlineRef = useGSAPScroll<HTMLDivElement>({ animation: 'fadeUp', distance: 40, duration: 0.9, delay: 0.1 });
  const subtitleRef = useGSAPScroll<HTMLParagraphElement>({ animation: 'fadeUp', distance: 30, delay: 0.3 });
  const leftSvgRef = useGSAPParallax<HTMLImageElement>(40);
  const rightSvgRef = useGSAPParallax<HTMLImageElement>(30);

  return (
    <section id="modalidades" className="relative overflow-hidden bg-[#281b15] py-32 md:py-40 lg:py-48">
      {/* Decorative organic SVG — bottom left corner */}
      <div
        className="pointer-events-none absolute bottom-0 left-0"
        style={{ transform: 'translateY(50%)' }}
      >
        <img
          ref={leftSvgRef}
          src="/images/cta/organic-lines-left.svg"
          alt=""
          aria-hidden="true"
          className="h-auto max-w-none opacity-60"
          style={{ width: '2602px', height: '2002px' }}
        />
      </div>

      {/* Decorative organic SVG — bottom right corner */}
      <div
        className="pointer-events-none absolute bottom-0 right-0"
        style={{ transform: 'translateY(50%)' }}
      >
        <img
          ref={rightSvgRef}
          src="/images/cta/organic-lines-right.svg"
          alt=""
          aria-hidden="true"
          className="h-auto max-w-none opacity-60"
          style={{ width: '1801px', height: '2424px' }}
        />
      </div>

      <div
        ref={contentRef}
        className="relative z-10 mx-auto flex w-full max-w-[1330px] flex-col items-center gap-[60px] px-6 opacity-0 md:gap-[75px]"
      >
        {/* Tag + Headline */}
        <div ref={headlineRef} className="flex flex-col items-center gap-5 opacity-0">
          <span className="inline-block rounded-full border border-[#C9A962]/30 bg-[#C9A962]/10 px-4 py-1.5 font-just-sans text-sm font-medium uppercase tracking-wider text-[#C9A962]">
            {modalidadesTag}
          </span>
          <h2 className="max-w-[997px] text-center font-heading text-[40px] font-normal leading-[1.02] text-[#FFF5EC] sm:text-[55px] md:text-[65px] lg:text-[78.85px] lg:leading-[80px]">
            {ctaHeadline}
          </h2>
        </div>

        {/* Subtitle */}
        <p ref={subtitleRef} className="max-w-[700px] text-center font-just-sans text-lg text-[#FFF5EC]/90 md:text-[24px] md:leading-normal opacity-0">
          {ctaSubtitle}
        </p>

        {/* Modalidades cards */}
        <ModalidadesGrid cards={modalidadesCms?.cards} />

        {/* Press subsection — discreet block for press credentialing options */}
        {(() => {
          const press = pageHome?.pressSection;
          const cmsItems: any[] = Array.isArray(press?.items) ? press.items.filter((i: any) => i?.label && i?.url) : [];
          const defaultItems = [
            { label: 'Imprensa', url: 'https://sigevent.pro/ms/visitantes/?id_edicao=2664&linguagem=portugues' },
            { label: 'Assessor de Imprensa', url: 'https://sigevent.pro/ms/visitantes/?id_edicao=2631&linguagem=portugues' },
            { label: 'Criadores de Conteúdo', url: 'https://sigevent.pro/ms/visitantes/?id_edicao=2697&linguagem=portugues' },
          ];
          const items = cmsItems.length > 0 ? cmsItems : defaultItems;
          if (press?.visible === false) return null;
          return (
            <div className="mt-8 flex w-full max-w-2xl flex-col items-center gap-4 text-center md:mt-12">
              <h3 className="font-just-sans text-[11px] font-semibold uppercase tracking-[0.24em] text-[#C9A962]">
                {press?.title || 'Para a imprensa'}
              </h3>
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
                    className="rounded-full border border-[#FFF5EC]/20 px-5 py-2.5 font-just-sans text-[13px] text-[#FFF5EC]/80 transition-colors hover:border-[#C9A962]/60 hover:bg-[#C9A962]/10 hover:text-[#FFF5EC]"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </div>
          );
        })()}
      </div>
    </section>
  );
}

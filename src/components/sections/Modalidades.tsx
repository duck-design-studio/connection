'use client';

import Link from 'next/link';
import { useGSAPScroll } from '@/hooks/useGSAP';

type AccentKey = 'cream' | 'gold' | 'brown';

type PressItem = { label: string; url: string };

type Modalidade = {
  tag: string;
  price: string;
  priceNote?: string;
  headline: string;
  description: string;
  features: string[];
  caption: string;
  cta?: { text: string; link: string };
  accent: AccentKey;
  highlighted?: boolean;
  badge?: string;
  pressLinks?: PressItem[];
};

const fallbackModalidades: Modalidade[] = [
  {
    tag: 'Acesso Livre',
    price: 'Gratuito',
    priceNote: 'Sem ingresso',
    headline: 'Aberto ao público.',
    description:
      'A Rua Coberta de Gramado vira a maior vitrine de produtos de origem do Brasil — e qualquer pessoa pode entrar.',
    features: [
      'Acesso à Rua Coberta durante os 4 dias',
      'Degustação de produtos com Selo IG',
      'Contato direto com produtores e marcas',
    ],
    caption: 'Ideal para quem quer conhecer e provar a origem.',
    accent: 'cream',
  },
  {
    tag: 'Experiências Guiadas',
    price: 'R$ 500',
    priceNote: 'Por pessoa',
    headline: 'Imersão pelos parques e empresas de Gramado.',
    description:
      'Visitação guiada por roteiros selecionados — uma vivência completa para quem quer ir além da feira.',
    features: [
      'Visitação guiada a parques selecionados',
      'Roteiro por empresas e produtores da região',
    ],
    caption: 'Ideal para quem quer mergulhar fundo na experiência Gramado.',
    cta: { text: 'Garanta seu ingresso', link: '/ingressos' },
    accent: 'gold',
    highlighted: true,
    badge: 'Indicado',
  },
  {
    tag: 'Grupos',
    price: 'Sob consulta',
    priceNote: 'A partir de 2 pessoas',
    headline: 'Para empresas, agências e grupos.',
    description:
      'Roteiros e condições pensadas para times corporativos, agências de turismo e grupos maiores.',
    features: [
      'Roteiros customizados',
      'Condições especiais por volume',
      'Atendimento dedicado',
    ],
    caption: 'Ideal para alinhar equipes em torno de uma experiência única.',
    cta: { text: 'Fale com a gente', link: '/contato' },
    accent: 'brown',
  },
];

const accentStyles: Record<AccentKey, {
  line: string;
  tag: string;
  price: string;
  check: string;
  cta: string;
}> = {
  cream: {
    line: 'bg-[#FFF5EC]',
    tag: 'text-[#FFF5EC]',
    price: 'text-[#FFF5EC]',
    check: 'text-[#FFF5EC] border-[#FFF5EC]/40 bg-[#FFF5EC]/5',
    cta: 'border border-[#FFF5EC]/30 text-[#FFF5EC] hover:bg-[#FFF5EC]/5',
  },
  gold: {
    line: 'bg-gradient-to-r from-[#C9A962] via-[#E8C97A] to-[#C9A962]',
    tag: 'text-[#C9A962]',
    price: 'text-[#C9A962]',
    check: 'text-[#C9A962] border-[#C9A962]/50 bg-[#C9A962]/10',
    cta: 'bg-[#C9A962] text-[#131415] hover:bg-[#E8C97A]',
  },
  brown: {
    line: 'bg-[#956A47]',
    tag: 'text-[#956A47]',
    price: 'text-[#FFF5EC]',
    check: 'text-[#956A47] border-[#956A47]/50 bg-[#956A47]/10',
    cta: 'border border-[#956A47]/50 text-[#FFF5EC] hover:bg-[#956A47]/10',
  },
};

function isValidAccent(value: unknown): value is AccentKey {
  return value === 'cream' || value === 'gold' || value === 'brown';
}

function mapCmsCards(cmsCards: any[] | undefined): Modalidade[] | null {
  if (!Array.isArray(cmsCards) || cmsCards.length === 0) return null;
  return cmsCards.map((c: any): Modalidade => {
    const features = Array.isArray(c?.features)
      ? c.features.map((f: any) => (typeof f === 'string' ? f : f?.text)).filter(Boolean)
      : [];
    const cta = c?.ctaText && c?.ctaLink
      ? { text: String(c.ctaText), link: String(c.ctaLink) }
      : undefined;
    return {
      tag: String(c?.tag || ''),
      price: String(c?.price || ''),
      priceNote: c?.priceNote || undefined,
      headline: String(c?.headline || ''),
      description: String(c?.description || ''),
      features,
      caption: String(c?.caption || ''),
      cta,
      accent: isValidAccent(c?.accent) ? c.accent : 'cream',
      highlighted: !!c?.highlighted,
      badge: c?.badge || undefined,
    };
  });
}

interface ModalidadesGridProps {
  cards?: any[];
  pressSection?: any;
}

const defaultPressItems: PressItem[] = [
  { label: 'Imprensa', url: 'https://sigevent.pro/ms/visitantes/?id_edicao=2664&linguagem=portugues' },
  { label: 'Assessor de Imprensa', url: 'https://sigevent.pro/ms/visitantes/?id_edicao=2631&linguagem=portugues' },
  { label: 'Criadores de Conteúdo', url: 'https://sigevent.pro/ms/visitantes/?id_edicao=2697&linguagem=portugues' },
];

function buildPressCard(pressSection: any): Modalidade {
  const cmsItems: PressItem[] = Array.isArray(pressSection?.items)
    ? pressSection.items.filter((i: any) => i?.label && i?.url)
    : [];
  const pressLinks = cmsItems.length > 0 ? cmsItems : defaultPressItems;
  return {
    tag: 'Para a Imprensa',
    price: 'Credenciamento',
    priceNote: 'Sujeito a aprovação',
    headline: pressSection?.title || 'Profissionais credenciados.',
    description:
      pressSection?.description ||
      'Imprensa, assessoria e criadores de conteúdo têm acesso à área de imprensa do evento.',
    features: [],
    caption: 'Ideal para cobertura jornalística do evento.',
    accent: 'cream',
    pressLinks,
  };
}

export function ModalidadesGrid({ cards, pressSection }: ModalidadesGridProps = {}) {
  const gridRef = useGSAPScroll<HTMLDivElement>({ animation: 'fadeUp', children: true, stagger: 0.15 });
  const baseModalidades = mapCmsCards(cards) || fallbackModalidades;
  const showPress = pressSection?.visible !== false;
  const modalidades = showPress
    ? [buildPressCard(pressSection), ...baseModalidades.slice(1)]
    : baseModalidades;

  return (
    <div
      ref={gridRef}
      className="grid w-full items-stretch gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8 lg:pt-10"
    >
      {modalidades.map((m) => {
        const styles = accentStyles[m.accent];
        const isHighlighted = m.highlighted;

        return (
          <div key={m.tag} className="flex">
            <div
              className={[
                'relative flex flex-1 flex-col transition-transform duration-300',
                isHighlighted ? 'lg:-translate-y-10 lg:scale-[1.03]' : 'lg:scale-[0.92]',
              ].join(' ')}
            >
              {isHighlighted && m.badge && (
                <div className="absolute -top-3.5 left-1/2 z-10 -translate-x-1/2 rounded-full bg-gradient-to-r from-[#C9A962] to-[#E8C97A] px-5 py-1.5 shadow-lg shadow-[#C9A962]/20">
                  <span className="font-just-sans text-xs font-bold uppercase tracking-wider text-[#131415]">
                    {m.badge}
                  </span>
                </div>
              )}

              <div
                className={[
                  'flex flex-1 flex-col overflow-hidden rounded-[24px] bg-[#1C1F21]',
                  isHighlighted
                    ? 'border border-[#C9A962]/40 shadow-2xl shadow-[#C9A962]/10'
                    : 'border border-[#FFF5EC]/8',
                ].join(' ')}
              >
                <div className={`h-[3px] w-full ${styles.line}`} />

                <div className="flex flex-1 flex-col gap-7 p-7 md:p-8">
                  <div className="flex flex-col gap-2">
                    <span className={`font-just-sans text-xs font-bold uppercase tracking-[0.18em] ${styles.tag}`}>
                      {m.tag}
                    </span>
                    <div className={`flex items-baseline gap-1.5 font-heading ${styles.price}`}>
                      {m.price.startsWith('R$') ? (
                        <>
                          <span className="text-xl md:text-2xl opacity-80">R$</span>
                          <span className="text-4xl md:text-5xl">{m.price.replace('R$', '').trim()}</span>
                        </>
                      ) : (
                        <span className="text-4xl md:text-5xl">{m.price}</span>
                      )}
                    </div>
                    {m.priceNote && (
                      <span className="font-just-sans text-xs text-[#FFF5EC]/50">
                        {m.priceNote}
                      </span>
                    )}
                  </div>

                  <div>
                    <h3 className="font-heading text-2xl text-[#FFF5EC] leading-tight">
                      {m.headline}
                    </h3>
                    <p className="mt-3 font-just-sans text-sm leading-relaxed text-[#FFF5EC]/65">
                      {m.description}
                    </p>
                  </div>

                  {m.pressLinks && m.pressLinks.length > 0 ? (
                    <div className="flex flex-col gap-2.5">
                      {m.pressLinks.map((link, i) => (
                        <a
                          key={`${link.label}-${i}`}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="rounded-full border border-[#FFF5EC]/20 px-6 py-3.5 text-center font-just-sans text-sm text-[#FFF5EC]/85 transition-colors hover:border-[#FFF5EC]/40 hover:bg-[#FFF5EC]/5 hover:text-[#FFF5EC]"
                        >
                          {link.label}
                        </a>
                      ))}
                    </div>
                  ) : m.cta ? (
                    <Link
                      href={m.cta.link}
                      className={`inline-flex items-center justify-center rounded-full px-6 py-3.5 font-just-sans text-sm font-semibold transition-colors ${styles.cta}`}
                    >
                      {m.cta.text}
                    </Link>
                  ) : (
                    <div className="rounded-full border border-dashed border-[#FFF5EC]/15 px-6 py-3.5 text-center font-just-sans text-sm text-[#FFF5EC]/50">
                      Não precisa de ingresso
                    </div>
                  )}

                  {m.features.length > 0 && (
                    <>
                      <div className="h-px bg-[#FFF5EC]/8" />

                      <ul className="flex flex-col gap-3.5">
                        {m.features.map((feature) => (
                          <li key={feature} className="flex items-start gap-3">
                            <span
                              className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${styles.check}`}
                            >
                              <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                              </svg>
                            </span>
                            <span className="font-just-sans text-sm leading-relaxed text-[#FFF5EC]/85">
                              {feature}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </>
                  )}

                  <div className="h-px bg-[#FFF5EC]/8" />

                  <p className="font-just-sans text-sm italic text-[#FFF5EC]/55">
                    {m.caption}
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

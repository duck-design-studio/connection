'use client';

import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { INGRESSOS_ESCONDIDOS } from '@/lib/flags';
import { MobileNav } from './MobileNav';

export interface NavSubItem {
  label: string;
  href: string;
  description: string;
  icon: React.ReactNode;
}

export interface NavFeaturedCard {
  headline: string;
  ctaLabel: string;
  ctaHref: string;
}

export interface NavItem {
  label: string;
  items: NavSubItem[];
  featured: NavFeaturedCard;
  highlights: string[];
  /** Accent color for the featured card background and icon circles */
  accentColor: string;
}

const iconProps = {
  viewBox: '0 0 24 24' as const,
  fill: 'none' as const,
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  className: 'w-full h-full',
};

const navigation: NavItem[] = [
  {
    label: 'Produtos',
    accentColor: '#4D564D',
    featured: {
      headline: 'Descubra o universo dos Terroirs do Brasil',
      // ESCONDIDO (jul/2026): CTA "Ver Programação" repontado p/ Conhecer (programação escondida).
      ctaLabel: 'Ver conteúdos',
      ctaHref: '/conhecer',
    },
    highlights: ['4 dias de evento', 'Painéis e debates ao vivo'],
    items: [
      // ESCONDIDO (jul/2026): item "Programação" removido do menu. Para reativar, descomente este item.
      // {
      //   label: 'Programação',
      //   href: '/#programacao',
      //   description: 'Confira a grade completa do evento',
      //   icon: (
      //     <svg {...iconProps}>
      //       <path d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
      //     </svg>
      //   ),
      // },
      // ESCONDIDO (jul/2026): link "Lista de palestrantes" removido do menu. Para reativar, descomente este item.
      // {
      //   label: 'Lista de palestrantes',
      //   href: '/palestrantes',
      //   description: 'Especialistas que vão inspirar você',
      //   icon: (
      //     <svg {...iconProps}>
      //       <path d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
      //     </svg>
      //   ),
      // },
      {
        label: 'Conteúdos e talks',
        href: '/conhecer#conteudos',
        description: 'Palestras, painéis e debates',
        icon: (
          <svg {...iconProps}>
            <path d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
          </svg>
        ),
      },
      {
        label: 'Blog',
        href: '/blog',
        description: 'Artigos e novidades sobre terroirs',
        icon: (
          <svg {...iconProps}>
            <path d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
          </svg>
        ),
      },
      {
        label: 'Conteúdos sobre IG',
        href: '/conhecer#ig',
        description: 'Entenda as Indicações Geográficas',
        icon: (
          <svg {...iconProps}>
            <path d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-.998l-4.869 2.434a1.125 1.125 0 01-1.006 0L9.503 4.252a1.125 1.125 0 00-1.006 0L3.622 6.69a1.125 1.125 0 00-.622 1.006V19.18c0 .836.88 1.38 1.628.998l4.869-2.434a1.125 1.125 0 011.006 0l3.994 1.997a1.125 1.125 0 001.006 0z" />
          </svg>
        ),
      },
    ],
  },
  {
    label: 'Experiências',
    accentColor: '#956A47',
    featured: {
      headline: 'Viva experiências sensoriais únicas em Gramado',
      ctaLabel: 'Explorar',
      ctaHref: '/experimentar',
    },
    highlights: ['Parques temáticos', 'Gastronomia regional', 'Hospedagem parceira'],
    items: [
      {
        label: 'Parques parceiros',
        href: '/experimentar#parques',
        description: 'Conheça os parques parceiros do evento',
        icon: (
          <svg {...iconProps}>
            <path d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 0h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
          </svg>
        ),
      },
      {
        label: 'Hotéis Parceiros',
        href: '/experimentar#hotelaria',
        description: 'Hospedagem com condições especiais',
        icon: (
          <svg {...iconProps}>
            <path d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205l3 1m1.5.5l-1.5-.5M6.75 7.364V3h-3v18m3-13.636l10.5-3.819" />
          </svg>
        ),
      },
      {
        label: 'Circuito Gastronômico',
        href: '/experimentar#circuito-gastronomico',
        description: 'Pratos exclusivos dos restaurantes',
        icon: (
          <svg {...iconProps}>
            <path d="M6.75 3v18M3 3v6.75A2.25 2.25 0 005.25 12h3a2.25 2.25 0 002.25-2.25V3M17.25 21V3c-1.5 0-2.625 1.5-2.625 3.75v4.125c0 1.5 1.125 2.625 2.625 2.625" />
          </svg>
        ),
      },
      {
        label: 'Circuito de Compras',
        href: '/experimentar#compras',
        description: 'Lojas e produtos regionais',
        icon: (
          <svg {...iconProps}>
            <path d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
          </svg>
        ),
      },
    ],
  },
];

const simpleLinks: { label: string; href: string }[] = [];

interface HeaderProps {
  ctaText?: string;
  ctaLink?: string;
  hiddenNavItems?: string[];
}

export function Header({ ctaText = 'Garantir Ingresso', ctaLink = '/ingressos', hiddenNavItems = [] }: HeaderProps) {
  const filteredNavigation = useMemo(() =>
    navigation.map((section) => ({
      ...section,
      items: section.items.filter((item) => !hiddenNavItems.includes(item.label)),
    })),
    [hiddenNavItems],
  );

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const enterTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const leaveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveDropdown(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleMouseEnter = useCallback((label: string) => {
    if (leaveTimeoutRef.current) {
      clearTimeout(leaveTimeoutRef.current);
      leaveTimeoutRef.current = null;
    }
    enterTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(label);
    }, 100);
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (enterTimeoutRef.current) {
      clearTimeout(enterTimeoutRef.current);
      enterTimeoutRef.current = null;
    }
    leaveTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 200);
  }, []);

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          isScrolled
            ? 'bg-[#131415]/95 backdrop-blur-md pt-4 pb-4'
            : 'bg-transparent pt-[40px] pb-4'
        )}
      >
        <div className="mx-auto max-w-[1292px] px-4 lg:px-0">
          <div className="flex items-center justify-between relative">
            {/* Logo */}
            <Link href="/" className="relative z-10 shrink-0">
              <Image
                src="/images/logotipo-nav.svg"
                alt="Connection - Terroirs do Brasil"
                width={173}
                height={53}
                priority
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-[52px]">
              {filteredNavigation.map((item) => (
                <div
                  key={item.label}
                  className="static"
                  onMouseEnter={() => handleMouseEnter(item.label)}
                  onMouseLeave={handleMouseLeave}
                >
                  <button
                    className="font-just-sans font-normal text-[16px] text-[#FFF5EC] text-center hover:text-[#FFF5EC]/70 transition-colors flex items-center gap-1.5"
                    aria-expanded={activeDropdown === item.label}
                    aria-haspopup="true"
                  >
                    {item.label}
                    <svg
                      className={cn(
                        'w-3.5 h-3.5 transition-transform duration-200',
                        activeDropdown === item.label && 'rotate-180'
                      )}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>

                  {/* Mega Menu Panel */}
                  {activeDropdown === item.label && (
                    <div className="absolute top-full left-0 right-0 pt-4">
                      <div className="bg-[#1C1F21] rounded-[12px] shadow-2xl shadow-black/20 border border-[#FFF5EC]/5 p-6 animate-dropdown-in">
                        <div className="flex gap-6">
                          {/* Featured Card */}
                          <div className="w-[280px] shrink-0 rounded-[24px] p-8 flex flex-col justify-between min-h-[280px]" style={{ backgroundColor: item.accentColor }}>
                            <h3 className="font-boska text-[22px] leading-[1.3] text-[#FFF5EC] italic">
                              {item.featured.headline}
                            </h3>
                            <Link
                              href={item.featured.ctaHref}
                              className="inline-flex items-center justify-center bg-[#1C1F21] text-[#FFF5EC] rounded-full px-6 py-2.5 font-just-sans text-[13px] font-semibold hover:bg-[#1C1F21]/80 transition-colors self-start"
                              onClick={() => setActiveDropdown(null)}
                            >
                              {item.featured.ctaLabel}
                            </Link>
                          </div>

                          {/* Sub-items Grid + Highlights */}
                          <div className="flex-1 flex flex-col">
                            <div className="grid grid-cols-2 gap-x-4 gap-y-1 content-start">
                              {item.items.map((subItem) => (
                                <Link
                                  key={subItem.href}
                                  href={subItem.href}
                                  className="flex items-start gap-3 p-3 rounded-[12px] hover:bg-[#FFF5EC]/5 transition-colors"
                                  onClick={() => setActiveDropdown(null)}
                                >
                                  <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 p-2.5 text-[#FFF5EC]" style={{ backgroundColor: `${item.accentColor}33` }}>
                                    {subItem.icon}
                                  </div>
                                  <div className="min-w-0">
                                    <span className="block font-just-sans text-[14px] font-semibold text-[#FFF5EC]">
                                      {subItem.label}
                                    </span>
                                    <span className="block font-just-sans text-[12px] text-[#9CA3AF]">
                                      {subItem.description}
                                    </span>
                                  </div>
                                </Link>
                              ))}
                            </div>

                            {/* Highlights */}
                            <div className="mt-auto pt-4 flex items-center gap-6">
                              {item.highlights.map((text, i) => (
                                <span
                                  key={i}
                                  className="font-just-sans text-[15px] text-[#FFF5EC]/20 font-medium"
                                >
                                  {text}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
              {simpleLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="font-just-sans font-normal text-[16px] text-[#FFF5EC] text-center hover:text-[#FFF5EC]/70 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* CTA Button — ESCONDIDO (jul/2026) enquanto INGRESSOS_ESCONDIDOS */}
            {!INGRESSOS_ESCONDIDOS && (
              <div className="hidden lg:block">
                <Link
                  href={ctaLink}
                  className="inline-flex items-center justify-center px-[25px] py-[10px] bg-[#FFF5EC] rounded-full font-just-sans font-semibold text-[14px] text-[#4D564D] text-center hover:bg-[#FFF5EC]/90 transition-colors"
                >
                  {ctaText}
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden relative z-10 w-10 h-10 flex items-center justify-center"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Abrir menu"
            >
              <div className="space-y-1.5">
                <span className="block w-6 h-0.5 bg-[#FFF5EC]"></span>
                <span className="block w-6 h-0.5 bg-[#FFF5EC]"></span>
                <span className="block w-4 h-0.5 bg-[#FFF5EC]"></span>
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation */}
      <MobileNav
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        navigation={filteredNavigation}
        ctaText={ctaText}
        ctaLink={ctaLink}
      />
    </>
  );
}

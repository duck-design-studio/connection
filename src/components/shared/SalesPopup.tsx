'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

const STORAGE_KEY = 'connection_sales_popup_dismissed_v1';

interface SalesPopupProps {
  config?: {
    enabled?: boolean;
    tag?: string;
    headline?: string;
    description?: string;
    priceLabel?: string;
    price?: string;
    ctaText?: string;
    ctaLink?: string;
    dismissText?: string;
    scrollThreshold?: number;
    freeAccessNote?: {
      enabled?: boolean;
      text?: string;
      linkText?: string;
      linkUrl?: string;
    };
  };
}

export function SalesPopup({ config }: SalesPopupProps = {}) {
  const enabled = config?.enabled !== false;
  const tag = config?.tag || 'Oferta especial';
  const headline = config?.headline || 'Garanta sua imersão na origem.';
  const description =
    config?.description ||
    'Visitação guiada pelos parques e empresas de Gramado. Vagas limitadas — escolha a sua modalidade antes que esgote.';
  const priceLabel = config?.priceLabel || 'A partir de R$';
  const price = config?.price || '400';
  const ctaText = config?.ctaText || 'Adquirir ingresso';
  const ctaLink = config?.ctaLink || '/#modalidades';
  const dismissText = config?.dismissText || 'Agora não';
  const scrollThreshold =
    typeof config?.scrollThreshold === 'number' && config.scrollThreshold > 0
      ? config.scrollThreshold
      : 150;
  const freeNote = config?.freeAccessNote;
  const freeNoteEnabled = freeNote?.enabled !== false;
  const freeNoteText = freeNote?.text || 'Você sabia? Visitação e degustação são gratuitas.';
  const freeNoteLinkText = freeNote?.linkText || 'Ver programação aberta';
  const freeNoteLinkUrl = freeNote?.linkUrl || '/#como-funciona';

  const [open, setOpen] = useState(false);
  const [armed, setArmed] = useState(false);

  // Check if user already dismissed
  useEffect(() => {
    if (!enabled) return;
    if (typeof window === 'undefined') return;
    try {
      if (localStorage.getItem(STORAGE_KEY) === '1') return;
    } catch {
      // localStorage blocked — still allow popup
    }
    setArmed(true);
  }, [enabled]);

  // Trigger on first scroll past threshold
  useEffect(() => {
    if (!armed) return;
    const onScroll = () => {
      if (window.scrollY > scrollThreshold) {
        setOpen(true);
        window.removeEventListener('scroll', onScroll);
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [armed, scrollThreshold]);

  // Lock scroll + escape close
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') dismiss();
    };
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  const dismiss = () => {
    setOpen(false);
    try {
      localStorage.setItem(STORAGE_KEY, '1');
    } catch {
      // ignore
    }
  };

  if (!enabled || !open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Oferta de ingresso"
      className="fixed inset-0 z-[120] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm md:p-8"
      onClick={(e) => {
        if (e.target === e.currentTarget) dismiss();
      }}
    >
      <div className="relative flex w-full max-w-[560px] flex-col overflow-hidden rounded-[24px] border border-[#C9A962]/30 bg-[#1C1F21] shadow-2xl shadow-[#C9A962]/10">
        <button
          type="button"
          onClick={dismiss}
          aria-label="Fechar"
          className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-[#FFF5EC]/10 text-[#FFF5EC] transition-colors hover:bg-[#FFF5EC]/20"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="h-[3px] w-full bg-gradient-to-r from-[#C9A962] via-[#E8C97A] to-[#C9A962]" />

        <div className="flex flex-col gap-6 p-8 md:p-10">
          <span className="font-just-sans text-xs font-bold uppercase tracking-[0.18em] text-[#C9A962]">
            {tag}
          </span>

          <div className="flex flex-col gap-3">
            <h3 className="font-heading text-3xl text-[#FFF5EC] leading-tight md:text-4xl">
              {headline}
            </h3>
            <p className="font-just-sans text-base leading-relaxed text-[#FFF5EC]/70">
              {description}
            </p>
          </div>

          <div className="flex items-baseline gap-2 font-heading text-[#C9A962]">
            <span className="text-xl opacity-80">{priceLabel}</span>
            <span className="text-5xl">{price}</span>
          </div>

          <div className="flex flex-col gap-3 pt-2 sm:flex-row">
            <Link
              href={ctaLink}
              onClick={dismiss}
              className="inline-flex flex-1 items-center justify-center rounded-full bg-[#C9A962] px-6 py-3.5 font-just-sans text-sm font-semibold text-[#131415] transition-colors hover:bg-[#E8C97A]"
            >
              {ctaText}
            </Link>
            <button
              type="button"
              onClick={dismiss}
              className="inline-flex flex-1 items-center justify-center rounded-full border border-[#FFF5EC]/20 px-6 py-3.5 font-just-sans text-sm font-semibold text-[#FFF5EC]/80 transition-colors hover:bg-[#FFF5EC]/5"
            >
              {dismissText}
            </button>
          </div>

          {freeNoteEnabled && (
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 rounded-[12px] border border-[#7BA86A]/20 bg-[#7BA86A]/[0.06] px-4 py-3 font-just-sans text-[13px] leading-snug text-[#FFF5EC]/70">
              <span className="inline-flex h-1.5 w-1.5 shrink-0 rounded-full bg-[#7BA86A]" aria-hidden="true" />
              <span>{freeNoteText}</span>
              <Link
                href={freeNoteLinkUrl}
                onClick={dismiss}
                className="font-semibold text-[#A9D194] underline-offset-2 hover:underline"
              >
                {freeNoteLinkText} →
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

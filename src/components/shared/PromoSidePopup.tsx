'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';

const STORAGE_KEY = 'connection_promo_side_popup_dismissed_v1';

interface PromoConfig {
  enabled?: boolean;
  tag?: string;
  headline?: string;
  description?: string;
  couponCode?: string;
  endsAt?: string | null;
  ctaText?: string;
  ctaLink?: string;
}

interface Props {
  config?: PromoConfig | null;
}

function formatRemaining(ms: number) {
  if (ms <= 0) return '00:00:00';
  const totalSeconds = Math.floor(ms / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const pad = (n: number) => String(n).padStart(2, '0');
  if (days > 0) return `${days}d ${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

export function PromoSidePopup({ config }: Props) {
  const enabled = config?.enabled === true;
  const tag = config?.tag || 'Promoção';
  const headline = config?.headline || '35% de desconto';
  const description = config?.description || 'Final do 1º lote — últimas horas.';
  const couponCode = config?.couponCode || 'DESC35';
  const ctaText = config?.ctaText || 'Garantir ingresso';
  const ctaLink = config?.ctaLink || '/ingressos';
  const endsAtMs = useMemo(() => {
    if (!config?.endsAt) return null;
    const t = new Date(config.endsAt).getTime();
    return Number.isFinite(t) ? t : null;
  }, [config?.endsAt]);

  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(true);
  const [remaining, setRemaining] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (!enabled) return;
    if (endsAtMs && Date.now() >= endsAtMs) return;
    try {
      if (localStorage.getItem(STORAGE_KEY) === '1') return;
    } catch {
      // localStorage blocked
    }
    setVisible(true);
  }, [enabled, endsAtMs]);

  useEffect(() => {
    if (!visible || !endsAtMs) {
      setRemaining(null);
      return;
    }
    const tick = () => {
      const diff = endsAtMs - Date.now();
      if (diff <= 0) {
        setVisible(false);
        return;
      }
      setRemaining(diff);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [visible, endsAtMs]);

  const dismiss = () => {
    setVisible(false);
    try {
      localStorage.setItem(STORAGE_KEY, '1');
    } catch {
      // ignore
    }
  };

  const copyCoupon = async () => {
    try {
      await navigator.clipboard.writeText(couponCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // ignore — fallback to manual copy
    }
  };

  if (!mounted || !enabled || !visible) return null;

  return (
    <div
      role="complementary"
      aria-label="Oferta promocional"
      className={`fixed bottom-4 right-4 z-[110] flex flex-col transition-all duration-300 sm:bottom-6 sm:right-6 ${
        open ? 'w-[min(340px,calc(100vw-2rem))]' : 'w-auto'
      }`}
    >
      {open ? (
        <div className="relative overflow-hidden rounded-[18px] border border-[#C9A962]/40 bg-gradient-to-br from-[#1C1F21] via-[#221816] to-[#1C1F21] shadow-2xl shadow-black/40">
          <div className="h-[3px] w-full bg-gradient-to-r from-[#C9A962] via-[#E8C97A] to-[#C9A962]" />
          <button
            type="button"
            onClick={dismiss}
            aria-label="Fechar"
            className="absolute right-2 top-2 z-10 flex h-7 w-7 items-center justify-center rounded-full bg-black/40 text-[#FFF5EC]/70 transition-colors hover:bg-black/70 hover:text-[#FFF5EC]"
          >
            <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="flex flex-col gap-3 p-4">
            <div className="flex items-center gap-2">
              <span className="inline-flex h-1.5 w-1.5 rounded-full bg-[#C9A962] animate-pulse" />
              <span className="font-just-sans text-[10px] font-bold uppercase tracking-[0.2em] text-[#C9A962]">
                {tag}
              </span>
            </div>

            <div className="flex flex-col gap-1.5">
              <h3 className="font-heading text-[22px] leading-[1.1] text-[#FFF5EC]">
                {headline}
              </h3>
              <p className="font-just-sans text-[12.5px] leading-snug text-[#FFF5EC]/70">
                {description}
              </p>
            </div>

            {remaining !== null && (
              <div className="flex items-center gap-2 rounded-[10px] border border-[#FFF5EC]/10 bg-black/30 px-3 py-2">
                <svg className="h-3.5 w-3.5 shrink-0 text-[#C9A962]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="9" strokeWidth={1.8} />
                  <path strokeLinecap="round" strokeWidth={1.8} d="M12 7v5l3 2" />
                </svg>
                <span className="font-just-sans text-[10px] uppercase tracking-wider text-[#FFF5EC]/50">
                  Termina em
                </span>
                <span className="ml-auto font-heading text-[15px] font-semibold tabular-nums text-[#FFF5EC]">
                  {formatRemaining(remaining)}
                </span>
              </div>
            )}

            {couponCode && (
              <button
                type="button"
                onClick={copyCoupon}
                aria-label="Copiar cupom"
                className="group flex items-center gap-2 rounded-[10px] border border-dashed border-[#C9A962]/50 bg-[#C9A962]/10 px-3 py-2 text-left transition-colors hover:bg-[#C9A962]/15"
              >
                <svg className="h-3.5 w-3.5 shrink-0 text-[#C9A962]" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                <span className="font-just-sans text-[10px] uppercase tracking-wider text-[#FFF5EC]/50">
                  Cupom
                </span>
                <span className="font-heading text-[15px] font-semibold tracking-wider text-[#FFF5EC]">
                  {couponCode}
                </span>
                <span className="ml-auto font-just-sans text-[10px] uppercase tracking-wider text-[#C9A962] opacity-70 group-hover:opacity-100">
                  {copied ? 'Copiado!' : 'Copiar'}
                </span>
              </button>
            )}

            <Link
              href={ctaLink}
              className="inline-flex items-center justify-center gap-1.5 rounded-full bg-[#C9A962] px-4 py-2.5 font-just-sans text-[13px] font-semibold text-[#131415] transition-colors hover:bg-[#E8C97A]"
            >
              {ctaText}
              <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={2.2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Minimizar"
            className="flex items-center justify-center border-t border-[#FFF5EC]/5 py-1.5 font-just-sans text-[10px] uppercase tracking-wider text-[#FFF5EC]/35 transition-colors hover:bg-black/30 hover:text-[#FFF5EC]/60"
          >
            Minimizar
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Abrir oferta promocional"
          className="group flex items-center gap-2 rounded-full border border-[#C9A962]/50 bg-[#1C1F21] px-4 py-2.5 shadow-xl shadow-black/40 transition-colors hover:bg-[#221816]"
        >
          <span className="inline-flex h-2 w-2 rounded-full bg-[#C9A962] animate-pulse" />
          <span className="font-just-sans text-[12px] font-semibold uppercase tracking-wider text-[#FFF5EC]">
            {headline}
          </span>
          {remaining !== null && (
            <span className="font-heading text-[12px] tabular-nums text-[#C9A962]">
              {formatRemaining(remaining)}
            </span>
          )}
        </button>
      )}
    </div>
  );
}

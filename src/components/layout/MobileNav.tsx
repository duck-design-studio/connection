'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { INGRESSOS_ESCONDIDOS } from '@/lib/flags';
import { Button } from '@/components/ui/Button';
import type { NavItem } from './Header';

const simpleLinks: { label: string; href: string }[] = [];

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  navigation: NavItem[];
  ctaText?: string;
  ctaLink?: string;
}

export function MobileNav({ isOpen, onClose, navigation, ctaText = 'Garantir Ingresso', ctaLink = '/ingressos' }: MobileNavProps) {
  const [expandedItem, setExpandedItem] = useState<string | null>(null);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setExpandedItem(null);
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  const toggleItem = (label: string) => {
    setExpandedItem((prev) => (prev === label ? null : label));
  };

  return (
    <>
      {/* Overlay */}
      <div
        className={cn(
          'fixed inset-0 z-40 bg-bg-darker/80 mobile-menu-overlay transition-opacity duration-300',
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        )}
        onClick={onClose}
      />

      {/* Menu Panel */}
      <div
        className={cn(
          'fixed inset-y-0 right-0 z-50 w-full max-w-sm bg-bg-dark shadow-2xl transform transition-transform duration-300 ease-out',
          isOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gold/10">
            <span className="font-heading text-xl text-text-light">Menu</span>
            <button
              onClick={onClose}
              className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-bg-brown transition-colors"
              aria-label="Fechar menu"
            >
              <svg
                className="w-6 h-6 text-text-light"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 px-6 py-8 overflow-y-auto">
            <ul className="space-y-2">
              {navigation.map((item, index) => {
                const isExpanded = expandedItem === item.label;
                return (
                  <li
                    key={item.label}
                    className="animate-fade-in-up"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <button
                      onClick={() => toggleItem(item.label)}
                      className="flex items-center justify-between w-full py-3 px-4 text-lg text-text-cream hover:text-gold hover:bg-bg-brown/50 rounded-lg transition-all duration-200"
                      aria-expanded={isExpanded}
                    >
                      {item.label}
                      <svg
                        className={cn(
                          'w-4 h-4 transition-transform duration-200',
                          isExpanded && 'rotate-180'
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

                    {/* Sub-items accordion */}
                    <div
                      className={cn(
                        'overflow-hidden transition-all duration-300 ease-in-out',
                        isExpanded ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                      )}
                    >
                      <ul className="pl-2 pt-1 pb-2 space-y-1">
                        {item.items.map((subItem) => (
                          <li key={subItem.href}>
                            <Link
                              href={subItem.href}
                              onClick={onClose}
                              className="flex items-start gap-3 py-2.5 px-3 text-[15px] text-text-cream/80 hover:text-gold hover:bg-bg-brown/30 rounded-lg transition-all duration-200"
                            >
                              <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 p-1.5 text-[#FFF5EC]" style={{ backgroundColor: `${item.accentColor}33` }}>
                                {subItem.icon}
                              </div>
                              <div className="min-w-0">
                                <span className="block text-[15px] font-semibold text-text-cream">
                                  {subItem.label}
                                </span>
                                <span className="block text-[12px] text-[#9CA3AF]">
                                  {subItem.description}
                                </span>
                              </div>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </li>
                );
              })}
              {simpleLinks.map((link, index) => (
                <li
                  key={link.href}
                  className="animate-fade-in-up"
                  style={{ animationDelay: `${(navigation.length + index) * 50}ms` }}
                >
                  <Link
                    href={link.href}
                    onClick={onClose}
                    className="flex items-center w-full py-3 px-4 text-lg text-text-cream hover:text-gold hover:bg-bg-brown/50 rounded-lg transition-all duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Footer */}
          <div className="p-6 border-t border-gold/10 space-y-4">
            {/* Botão de ingresso ESCONDIDO (jul/2026) enquanto INGRESSOS_ESCONDIDOS */}
            {!INGRESSOS_ESCONDIDOS && (
              <Button href={ctaLink} className="w-full" onClick={onClose}>
                {ctaText}
              </Button>
            )}
            <div className="flex items-center justify-center gap-4">
              <a
                href="https://instagram.com/connectionexperience"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-bg-brown hover:bg-gold/20 transition-colors"
              >
                <svg className="w-5 h-5 text-text-light" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a
                href="https://linkedin.com/company/connectionexperience"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-bg-brown hover:bg-gold/20 transition-colors"
              >
                <svg className="w-5 h-5 text-text-light" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
              <a
                href="https://facebook.com/connectionexperience"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-bg-brown hover:bg-gold/20 transition-colors"
              >
                <svg className="w-5 h-5 text-text-light" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385h-3.047v-3.47h3.047v-2.642c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953h-1.514c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385c5.737-.9 10.125-5.864 10.125-11.854z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

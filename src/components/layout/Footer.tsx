import Link from 'next/link';

const footerLinks = {
  evento: [
    { label: 'Sobre', href: '/#sobre' },
    { label: 'Programação', href: '/#programacao' },
    // ESCONDIDO (jul/2026): link de Ingressos removido enquanto a venda está em espera.
    { label: 'Hotelaria', href: '/experimentar#hotelaria' },
  ],
  eixos: [
    { label: 'Produtos', href: '/conhecer' },
    { label: 'Experimentar', href: '/experimentar' },
  ],
  conteudo: [
    { label: 'Blog', href: '/blog' },
  ],
};

const socials = [
  {
    label: 'Instagram',
    href: 'https://instagram.com/connectionexperience',
    icon: '/images/footer/instagram.svg',
  },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/company/connectionexperience',
    icon: '/images/footer/linkedin.svg',
  },
  {
    label: 'Facebook',
    href: 'https://facebook.com/connectionexperience',
    icon: '/images/footer/facebook.svg',
  },
  {
    label: 'YouTube',
    href: 'https://youtube.com/@connectionexperience',
    icon: '/images/footer/youtube.svg',
  },
];

interface FooterProps {
  cmsData?: any;
}

export function Footer({ cmsData }: FooterProps) {
  const cmsFooter = cmsData?.footer;
  const tagline = cmsFooter?.tagline || 'Experiências que inspiram, conteúdo que transforma. A maior vitrine de produtos com Indicação Geográfica do Brasil.';
  const cmsLinkGroups = cmsFooter?.linkGroups;
  const cmsSocials = cmsFooter?.socialLinks;

  const displaySocials = (cmsSocials && cmsSocials.length > 0)
    ? cmsSocials.map((s: any) => ({
        label: s.platform?.charAt(0).toUpperCase() + s.platform?.slice(1),
        href: s.url,
        icon: `/images/footer/${s.platform}.svg`,
      }))
    : socials;
  return (
    <footer className="border-t border-[#C9A962]/10 bg-[#131415]">
      {/* Main Footer */}
      <div className="mx-auto flex max-w-[1216px] flex-col gap-10 px-6 pt-[65px] pb-[40px] md:flex-row md:gap-[48px] lg:px-0">
        {/* Brand Column */}
        <div className="flex flex-col gap-[24px] md:w-[458px] md:shrink-0">
          <div className="flex max-w-[384px] flex-col gap-[20px]">
            {/* Logo */}
            <Link href="/">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/footer/logo.svg"
                alt="Connection - Terroirs do Brasil"
                className="h-[59px] w-auto"
              />
            </Link>
            <p className="font-just-sans text-[14px] leading-normal text-[#FFF5EC]">
              {tagline}
            </p>
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-[12px]">
            {displaySocials.map((social: any) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1a1a1a] transition-colors hover:bg-[#2a2a2a]"
                aria-label={social.label}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={social.icon}
                  alt=""
                  className="h-5 w-5"
                  aria-hidden="true"
                />
              </a>
            ))}
          </div>
        </div>

        {/* Link Columns */}
        <div className="flex flex-1 flex-wrap gap-10 md:gap-[48px]">
          {(cmsLinkGroups && cmsLinkGroups.length > 0)
            ? cmsLinkGroups.map((group: any, i: number) => (
                <FooterColumn key={i} title={group.title} links={group.links || []} />
              ))
            : <>
                <FooterColumn title="Evento" links={footerLinks.evento} />
                <FooterColumn title="Eixos" links={footerLinks.eixos} />
                <FooterColumn title="Conteúdo" links={footerLinks.conteudo} />
              </>
          }
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[#C9A962]/10">
        <div className="mx-auto flex max-w-[1216px] flex-col items-center justify-between gap-4 px-6 py-[24px] md:flex-row lg:px-0">
          <p className="font-just-sans text-[14px] text-[#F5F0E6]/50">
            © {new Date().getFullYear()} Connection Experience. Todos os direitos reservados.
          </p>
          <div className="flex items-center gap-[24px]">
            <Link
              href="/privacidade"
              className="font-just-sans text-[14px] text-[#F5F0E6]/50 transition-colors hover:text-[#F5F0E6]/80"
            >
              Privacidade
            </Link>
            <Link
              href="/termos"
              className="font-just-sans text-[14px] text-[#F5F0E6]/50 transition-colors hover:text-[#F5F0E6]/80"
            >
              Termos de Uso
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div className="flex min-w-[140px] flex-1 flex-col gap-[16px]">
      <h4 className="font-heading text-[18px] font-bold leading-[28px] text-white">
        {title}
      </h4>
      <ul className="flex flex-col gap-[8px]">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="font-just-sans text-[16px] text-[#F5F0E6] transition-colors hover:text-[#C9A962]"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

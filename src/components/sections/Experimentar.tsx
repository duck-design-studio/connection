'use client';

import Image from 'next/image';
import { getExperimentarContent } from '@/lib/content';
import { ParticipantCard } from '@/components/ui/ParticipantCard';
import type { Participant } from '@/components/ui/ParticipantCard';
import { ProductsIG } from '@/components/sections/ProductsIG';
import { useGSAPScroll } from '@/hooks/useGSAP';
import type { Product } from '@/types';

interface ExperimentarProps {
  cmsData?: { title?: string; description?: string; features?: any[]; participants?: any[] };
  products?: Product[];
  categories?: string[];
}

export function Experimentar({ cmsData, products, categories }: ExperimentarProps) {
  const jsonContent = getExperimentarContent();
  const content = cmsData ? { ...jsonContent, ...cmsData } : jsonContent;
  const finalProducts = products !== undefined ? products : content.products;
  const finalCategories = categories !== undefined ? categories : content.categories;
  const titleRef = useGSAPScroll<HTMLDivElement>({ animation: 'fadeUp', distance: 50, duration: 0.9 });
  const cardRef = useGSAPScroll<HTMLDivElement>({ animation: 'scaleIn', duration: 0.9 });
  const productsRef = useGSAPScroll<HTMLDivElement>({ animation: 'fadeUp', distance: 40 });

  return (
    <section id="experimentar" className="bg-[#4D564D] px-6 md:px-[50px] py-16 md:py-[80px]">
      <div className="max-w-[1340px] mx-auto flex flex-col gap-14 lg:gap-[72px]">
        {/* Header + Main Card */}
        <div className="flex flex-col gap-10 lg:gap-[60px] items-center">
          {/* Title */}
          <div ref={titleRef} className="flex flex-col gap-6 md:gap-8 items-center text-center max-w-[680px] opacity-0">
            <h2 className="font-heading text-5xl md:text-7xl lg:text-[109px] text-brand-white leading-[1]">
              {content.title}
            </h2>
            <p className="font-just-sans text-base md:text-xl text-brand-white/80 max-w-[657px]">
              {content.description}
            </p>
          </div>

          {/* Main Card */}
          <div ref={cardRef} className="w-full bg-brand-cow border border-brand-white/30 rounded-[20px] overflow-hidden flex flex-col lg:flex-row lg:h-[740px] opacity-0">
            {/* Left: Features List */}
            <div className="flex-1 p-6 md:p-12 lg:p-20 flex flex-col gap-5 justify-center">
              {content.features.map((feature, index) => (
                <div key={index}>
                  <div className={`flex flex-col gap-[10px] ${index > 0 ? 'opacity-50' : ''}`}>
                    <div className="flex items-center justify-between gap-4">
                      <h3 className="font-heading font-bold text-xl md:text-[30px] md:leading-[30px] text-brand-white">
                        {feature.title}
                      </h3>
                      <div className="shrink-0 w-9 h-9">
                        <FeatureIcon name={feature.icon} active={index === 0} />
                      </div>
                    </div>
                    <p className={`font-just-sans text-base md:text-xl text-brand-white ${index > 0 ? 'opacity-60' : ''}`}>
                      {feature.description}
                    </p>
                  </div>
                  {index < content.features.length - 1 && (
                    <div className="border-t border-brand-white/20 mt-5" />
                  )}
                </div>
              ))}
            </div>

            {/* Right: Image + Participants */}
            <div className="flex-1 flex flex-col min-h-[400px] lg:min-h-0">
              <div className="flex-1 relative min-h-[250px]">
                <Image
                  src="/images/experimentar/coffee-main.jpg"
                  alt="Arena Café - Espaço dedicado aos melhores cafés especiais"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Products with IG Section */}
        {finalProducts.length > 0 && (
          <div ref={productsRef} className="opacity-0">
            <ProductsIG products={finalProducts} categories={finalCategories} />
          </div>
        )}
      </div>
    </section>
  );
}

function FeatureIcon({ name, active }: { name?: string; active?: boolean }) {
  const strokeColor = active ? '#956A47' : '#FFF5EC';

  switch (name) {
    case 'coffee':
      return (
        <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M25.5 21V18C25.5 16.4087 24.8679 14.8826 23.7426 13.7574C22.6174 12.6321 21.0913 12 19.5 12H10.5C8.9087 12 7.38258 12.6321 6.25736 13.7574C5.13214 14.8826 4.5 16.4087 4.5 18V21C4.5 22.5913 5.13214 24.1174 6.25736 25.2426C7.38258 26.3679 8.9087 27 10.5 27H19.5C21.0913 27 22.6174 26.3679 23.7426 25.2426C24.8679 24.1174 25.5 22.5913 25.5 21ZM25.5 21H28.5C29.2956 21 30.0587 20.6839 30.6213 20.1213C31.1839 19.5587 31.5 18.7956 31.5 18V15C31.5 14.2044 31.1839 13.4413 30.6213 12.8787C30.0587 12.3161 29.2956 12 28.5 12H25.5"
            stroke={strokeColor}
            strokeWidth="2.25"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case 'wine':
      return (
        <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M18 28.5V18M18 18C14.25 18 11.25 15 11.25 11.25C11.25 9.75 11.5005 8.25 12 6.75H24C24.4995 8.25 24.75 9.75 24.75 11.25C24.75 15 21.75 18 18 18ZM13.5 28.5H22.5"
            stroke={strokeColor}
            strokeWidth="2.25"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case 'chef':
      return (
        <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M28.5 16.5C28.5 19.2848 27.3938 21.9555 25.4246 23.9246C23.4555 25.8938 20.7848 27 18 27M18 27C15.2152 27 12.5445 25.8938 10.5754 23.9246C8.60625 21.9555 7.5 19.2848 7.5 16.5M18 27V33M18 33H12M18 33H24M18 21C16.8065 21 15.6619 20.5259 14.818 19.682C13.9741 18.8381 13.5 17.6935 13.5 16.5V7.5C13.5 6.30653 13.9741 5.16193 14.818 4.31802C15.6619 3.47411 16.8065 3 18 3C19.1935 3 20.3381 3.47411 21.182 4.31802C22.0259 5.16193 22.5 6.30653 22.5 7.5V16.5C22.5 17.6935 22.0259 18.8381 21.182 19.682C20.3381 20.5259 19.1935 21 18 21Z"
            stroke={strokeColor}
            strokeWidth="2.25"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case 'people':
      return (
        <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M25.5 30H33V27C32.9999 26.0648 32.7085 25.1529 32.1662 24.3909C31.6239 23.629 30.8577 23.055 29.9741 22.7486C29.0905 22.4423 28.1334 22.4188 27.2359 22.6815C26.3383 22.9442 25.545 23.4801 24.966 24.2145M25.5 30H10.5M25.5 30V27C25.5 26.016 25.311 25.0755 24.966 24.2145M24.966 24.2145C24.409 22.8224 23.4476 21.6292 22.206 20.7887C20.9644 19.9482 19.4994 19.4989 18 19.4989C16.5006 19.4989 15.0356 19.9482 13.794 20.7887C12.5524 21.6292 11.591 22.8224 11.034 24.2145M10.5 30H3V27C3.00007 26.0648 3.2915 25.1529 3.83379 24.3909C4.37608 23.629 5.14228 23.055 6.02588 22.7486C6.90947 22.4423 7.86657 22.4188 8.76411 22.6815C9.66165 22.9442 10.455 23.4801 11.034 24.2145M10.5 30V27C10.5 26.016 10.689 25.0755 11.034 24.2145M22.5 10.5C22.5 11.6935 22.0259 12.8381 21.182 13.682C20.3381 14.5259 19.1935 15 18 15C16.8065 15 15.6619 14.5259 14.818 13.682C13.9741 12.8381 13.5 11.6935 13.5 10.5C13.5 9.30653 13.9741 8.16193 14.818 7.31802C15.6619 6.47411 16.8065 6 18 6C19.1935 6 20.3381 6.47411 21.182 7.31802C22.0259 8.16193 22.5 9.30653 22.5 10.5ZM31.5 15C31.5 15.7956 31.1839 16.5587 30.6213 17.1213C30.0587 17.6839 29.2956 18 28.5 18C27.7044 18 26.9413 17.6839 26.3787 17.1213C25.8161 16.5587 25.5 15.7956 25.5 15C25.5 14.2044 25.8161 13.4413 26.3787 12.8787C26.9413 12.3161 27.7044 12 28.5 12C29.2956 12 30.0587 12.3161 30.6213 12.8787C31.1839 13.4413 31.5 14.2044 31.5 15ZM10.5 15C10.5 15.7956 10.1839 16.5587 9.62132 17.1213C9.05871 17.6839 8.29565 18 7.5 18C6.70435 18 5.94129 17.6839 5.37868 17.1213C4.81607 16.5587 4.5 15.7956 4.5 15C4.5 14.2044 4.81607 13.4413 5.37868 12.8787C5.94129 12.3161 6.70435 12 7.5 12C8.29565 12 9.05871 12.3161 9.62132 12.8787C10.1839 13.4413 10.5 14.2044 10.5 15Z"
            stroke={strokeColor}
            strokeWidth="2.25"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    default:
      return null;
  }
}

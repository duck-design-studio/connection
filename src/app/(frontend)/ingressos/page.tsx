import { redirect } from 'next/navigation';
import { INGRESSOS_ESCONDIDOS } from '@/lib/flags';

// SITE EM ESPERA (jul/2026): a página de ingressos está fora do ar enquanto a venda
// está escondida. Redireciona pra home. Para reativar, mude INGRESSOS_ESCONDIDOS
// para false em src/lib/flags.ts e restaure a versão anterior deste arquivo (git),
// que mostrava os ingressos, preços e o botão "Comprar agora".
export const dynamic = 'force-dynamic';

export default function IngressosPage() {
  if (INGRESSOS_ESCONDIDOS) {
    redirect('/');
  }
  return null;
}

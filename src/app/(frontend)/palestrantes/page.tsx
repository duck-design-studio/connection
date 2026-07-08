import { redirect } from 'next/navigation';

// ESCONDIDO (jul/2026): a página de palestrantes saiu do ar. Redireciona pra home
// para não quebrar links antigos. Para reativar, restaure a versão anterior deste
// arquivo (histórico do git), que listava palestrantes e a Arena Gastronômica.
export default function PalestrantesPage() {
  redirect('/');
}

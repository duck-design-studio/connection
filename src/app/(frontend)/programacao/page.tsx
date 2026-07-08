import { redirect } from 'next/navigation';

export default function ProgramacaoPage() {
  // ESCONDIDO (jul/2026): grade de Programação escondida — redireciona pra home.
  redirect('/');
}

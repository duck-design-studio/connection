#!/usr/bin/env node

/**
 * Seeds the new `modalidades` and `salesPopup` groups on the page-home global.
 * Preserves all existing fields — only adds the new ones if they are empty.
 *
 * Usage:
 *   node scripts/seed-modalidades-popup.mjs \
 *     --server https://www.connectionexperience.com.br \
 *     --email admin@connection.com \
 *     --password yourpassword
 *
 * Flags:
 *   --force        Overwrite existing modalidades/salesPopup values (otherwise only fills if empty)
 *   --dry-run      Print the merged payload but don't save
 */

const args = process.argv.slice(2);
function getArg(name, defaultValue) {
  const idx = args.indexOf(`--${name}`);
  return idx !== -1 && args[idx + 1] && !args[idx + 1].startsWith('--')
    ? args[idx + 1]
    : defaultValue;
}
function hasFlag(name) {
  return args.includes(`--${name}`);
}

const SERVER = getArg('server', 'http://localhost:3000');
const EMAIL = getArg('email', 'admin@connection.com');
const PASSWORD = getArg('password', 'admin');
const FORCE = hasFlag('force');
const DRY_RUN = hasFlag('dry-run');

let TOKEN = null;

async function login() {
  console.log(`→ Login em ${SERVER}…`);
  const res = await fetch(`${SERVER}/api/users/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: EMAIL, password: PASSWORD }),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Login falhou (${res.status}): ${text.slice(0, 200)}`);
  }
  const data = await res.json();
  TOKEN = data.token;
  console.log('  ✓ Logado\n');
}

async function getGlobal(slug) {
  const res = await fetch(`${SERVER}/api/globals/${slug}?depth=0`, {
    headers: { Authorization: `JWT ${TOKEN}` },
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`GET ${slug} falhou (${res.status}): ${text.slice(0, 200)}`);
  }
  return res.json();
}

async function updateGlobal(slug, body) {
  const res = await fetch(`${SERVER}/api/globals/${slug}`, {
    method: 'POST',
    headers: {
      Authorization: `JWT ${TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`POST ${slug} falhou (${res.status}): ${text.slice(0, 400)}`);
  }
  return res.json();
}

// --- Default seed values ---

const modalidadesSeed = {
  tag: 'Modalidades',
  cards: [
    {
      tag: 'Acesso Livre',
      price: 'Gratuito',
      priceNote: 'Sem ingresso',
      headline: 'Aberto ao público.',
      description:
        'A Rua Coberta de Gramado vira a maior vitrine de produtos de origem do Brasil — e qualquer pessoa pode entrar.',
      features: [
        { text: 'Acesso à Rua Coberta durante os 4 dias' },
        { text: 'Degustação de produtos com Selo IG' },
        { text: 'Contato direto com produtores e marcas' },
      ],
      caption: 'Ideal para quem quer conhecer e provar a origem.',
      ctaText: '',
      ctaLink: '',
      accent: 'cream',
      highlighted: false,
      badge: '',
    },
    {
      tag: 'Experiências Guiadas',
      price: 'R$ 500',
      priceNote: 'Por pessoa',
      headline: 'Imersão pelos parques e empresas de Gramado.',
      description:
        'Visitação guiada por roteiros selecionados — uma vivência completa para quem quer ir além da feira.',
      features: [
        { text: 'Visitação guiada a parques selecionados' },
        { text: 'Roteiro por empresas e produtores da região' },
      ],
      caption: 'Ideal para quem quer mergulhar fundo na experiência Gramado.',
      ctaText: 'Garanta seu ingresso',
      ctaLink: '/ingressos',
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
        { text: 'Roteiros customizados' },
        { text: 'Condições especiais por volume' },
        { text: 'Atendimento dedicado' },
      ],
      caption: 'Ideal para alinhar equipes em torno de uma experiência única.',
      ctaText: 'Fale com a gente',
      ctaLink: '/contato',
      accent: 'brown',
      highlighted: false,
      badge: '',
    },
  ],
};

const salesPopupSeed = {
  enabled: true,
  tag: 'Oferta especial',
  headline: 'Garanta sua imersão na origem.',
  description:
    'Visitação guiada pelos parques e empresas de Gramado. Vagas limitadas — escolha a sua modalidade antes que esgote.',
  priceLabel: 'A partir de R$',
  price: '500',
  ctaText: 'Adquirir ingresso',
  ctaLink: '/#modalidades',
  dismissText: 'Agora não',
  scrollThreshold: 150,
};

function isEmpty(value) {
  if (value == null) return true;
  if (typeof value === 'object' && !Array.isArray(value) && Object.keys(value).length === 0) return true;
  if (Array.isArray(value) && value.length === 0) return true;
  return false;
}

(async () => {
  try {
    await login();

    console.log('→ Buscando page-home atual…');
    const current = await getGlobal('page-home');
    console.log(`  ✓ Recebido. Campos atuais: ${Object.keys(current).filter((k) => !k.startsWith('_') && k !== 'id' && k !== 'globalType').join(', ')}\n`);

    const merged = { ...current };

    // Modalidades
    if (FORCE || isEmpty(current.modalidades) || isEmpty(current.modalidades?.cards)) {
      console.log(`→ Aplicando seed de "modalidades"${FORCE ? ' (forçado)' : ''}`);
      merged.modalidades = modalidadesSeed;
    } else {
      console.log('→ "modalidades" já preenchido — pulando (use --force pra sobrescrever)');
    }

    // Sales Popup
    if (FORCE || isEmpty(current.salesPopup) || !current.salesPopup?.headline) {
      console.log(`→ Aplicando seed de "salesPopup"${FORCE ? ' (forçado)' : ''}`);
      merged.salesPopup = salesPopupSeed;
    } else {
      console.log('→ "salesPopup" já preenchido — pulando (use --force pra sobrescrever)');
    }

    if (DRY_RUN) {
      console.log('\n[DRY RUN] Payload mesclado (não enviado):');
      console.log(JSON.stringify({ modalidades: merged.modalidades, salesPopup: merged.salesPopup }, null, 2));
      return;
    }

    console.log('\n→ Salvando…');
    await updateGlobal('page-home', merged);
    console.log('  ✓ page-home atualizado com sucesso!\n');
    console.log('Verifique em:', `${SERVER}/admin/globals/page-home`);
  } catch (err) {
    console.error('\n✗ Erro:', err.message);
    process.exit(1);
  }
})();

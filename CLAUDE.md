# connection — projeto Duck Design Estúdio

Projeto de cliente do estúdio Duck. O founder **não é programador** — fale
simples, sem jargão.

## Padrão

- **Next.js + TypeScript + Tailwind** (App Router, `src/`), padrão do estúdio.
- Porta de dev deste projeto: **3210** (use a env `PORT`; a faixa
  3210–reservada é só deste projeto, pra não colidir com outros).
- Repo próprio no GitHub. Deploy quando for a hora (Docker/Coolify).

## Regras do estúdio

Este projeto segue a arquitetura do estúdio — a fonte de verdade é o repo
`duck-studio` (`ARCHITECTURE.md` + `adr/`). Resumo do que importa aqui:

- Trabalho em paralelo neste projeto: `duck fundo connection` cria worktrees
  `connection-1/2/3`. Merge pra `main` por push fast-forward da branch de trabalho.
- Estrutura validada por `duck check` (local) e pelo GitHub Actions
  (`.github/workflows/duck-check.yml`) a cada push.

## Rodar

```sh
npm install
PORT=3210 npm run dev
```

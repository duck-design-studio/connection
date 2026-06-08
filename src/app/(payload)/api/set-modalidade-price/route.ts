import { NextRequest, NextResponse } from "next/server";
import { getPayload } from "payload";
import config from "@payload-config";

// Rota de manutenção temporária: atualiza o preço do card de modalidade
// de "R$ 400" para "R$ 500" no global page-home. Idempotente.
// Protegida por token de uso único; remover após rodar.
const ONE_TIME_TOKEN = "conn-price-2026-x7q9";

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get("token");
  if (token !== ONE_TIME_TOKEN) {
    return NextResponse.json({ status: "forbidden" }, { status: 403 });
  }

  const from = req.nextUrl.searchParams.get("from") || "R$ 400";
  const to = req.nextUrl.searchParams.get("to") || "R$ 500";

  try {
    const payload = await getPayload({ config });
    const pageHome: any = await payload.findGlobal({ slug: "page-home", depth: 0 });

    const cards: any[] = pageHome?.modalidades?.cards || [];
    const changed: string[] = [];
    for (const c of cards) {
      if (c?.price === from) {
        c.price = to;
        changed.push(c.tag);
      }
    }

    if (changed.length === 0) {
      return NextResponse.json({
        status: "noop",
        message: `Nenhum card com preço "${from}".`,
        prices: cards.map((c) => ({ tag: c?.tag, price: c?.price })),
      });
    }

    await payload.updateGlobal({
      slug: "page-home",
      data: { modalidades: pageHome.modalidades },
      depth: 0,
    });

    return NextResponse.json({ status: "ok", changed, from, to });
  } catch (error: any) {
    return NextResponse.json(
      { status: "error", message: error.message },
      { status: 500 }
    );
  }
}

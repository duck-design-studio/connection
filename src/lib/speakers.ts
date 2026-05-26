import type { Payload } from 'payload';

type SpeakerLike = { id: string | number; talkTitle?: string | null; [key: string]: unknown };

/**
 * Garante que cada palestrante tenha um `talkTitle` resolvido.
 *
 * Prioridade:
 *   1. Campo `talkTitle` definido manualmente no palestrante (Payload).
 *   2. Fallback: título da palestra deste palestrante na Programação
 *      (schedule-events do tipo "palestra").
 *
 * Faz no máximo uma query extra, e só quando algum palestrante está sem `talkTitle`.
 */
export async function attachTalkTitles<T extends SpeakerLike>(
  payload: Payload,
  speakers: T[],
): Promise<T[]> {
  const needsFallback = speakers.some((s) => !s.talkTitle);
  if (!needsFallback) return speakers;

  const { docs: events } = await payload.find({
    collection: 'schedule-events',
    where: { type: { in: ['palestra', 'painel'] } },
    sort: 'date',
    limit: 200,
    depth: 0,
  });

  const idOf = (rel: unknown): string | null => {
    if (rel == null) return null;
    if (typeof rel === 'object') return String((rel as { id?: string | number }).id ?? '');
    return String(rel);
  };

  const titleBySpeaker = new Map<string, string>();
  for (const event of events as Array<{
    speaker?: unknown;
    speakers?: unknown;
    panelists?: unknown;
    title?: string | null;
  }>) {
    if (!event.title) continue;
    // palestrantes e painelistas recebem o título; campo antigo como fallback.
    const relatedIds = [
      ...(Array.isArray(event.speakers) ? event.speakers : []),
      ...(Array.isArray(event.panelists) ? event.panelists : []),
    ].map(idOf);
    if (relatedIds.length === 0 && event.speaker != null) relatedIds.push(idOf(event.speaker));

    for (const id of relatedIds) {
      if (!id) continue;
      // primeira palestra/painel encontrado (ordenado por data) vence
      if (!titleBySpeaker.has(id)) titleBySpeaker.set(id, event.title);
    }
  }

  return speakers.map((speaker) => ({
    ...speaker,
    talkTitle: speaker.talkTitle || titleBySpeaker.get(String(speaker.id)) || null,
  }));
}

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
    where: { type: { equals: 'palestra' } },
    sort: 'date',
    limit: 200,
    depth: 0,
  });

  const titleBySpeaker = new Map<string, string>();
  for (const event of events as Array<{ speaker?: unknown; title?: string | null }>) {
    const speakerId =
      typeof event.speaker === 'object' && event.speaker !== null
        ? (event.speaker as { id?: string | number }).id
        : event.speaker;
    if (speakerId == null || !event.title) continue;
    const key = String(speakerId);
    // primeira palestra encontrada (ordenada por data) vence
    if (!titleBySpeaker.has(key)) titleBySpeaker.set(key, event.title);
  }

  return speakers.map((speaker) => ({
    ...speaker,
    talkTitle: speaker.talkTitle || titleBySpeaker.get(String(speaker.id)) || null,
  }));
}

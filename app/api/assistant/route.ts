import OpenAI from 'openai';
import { NextResponse } from 'next/server';

export const runtime = 'nodejs';
export async function POST(req: Request) {
  try {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) return NextResponse.json({ error: 'La clé de l’assistant IA n’est pas configurée.' }, { status: 503 });
    const body = await req.json();
    const age = Math.max(10, Math.min(16, Number(body.age) || 12));
    const messages = Array.isArray(body.messages) ? body.messages.slice(-8) : [];
    const openai = new OpenAI({ apiKey });
    const completion = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
      temperature: 0.6,
      max_tokens: 500,
      messages: [
        { role: 'system', content: `Tu es l’assistant pédagogique de ScienceLab pour un jeune de ${age} ans. Réponds en français clair, chaleureux et concis, avec des explications adaptées à l’âge. Aide l’élève à raisonner avec des questions et des indices avant de donner la réponse. Pour l’expérience en cours (${String(body.experiment || 'laboratoire scientifique').slice(0,120)}, catégorie ${String(body.category || '').slice(0,60)}), explique les concepts scientifiquement correctement. Priorité à la sécurité : ne donne pas de procédure dangereuse, ne recommande pas de mélanger des produits ménagers, de manipuler des produits toxiques, des flammes, du secteur électrique ou des batteries dangereuses. Propose une simulation ou demande l’aide d’un adulte. Ne demande aucune donnée personnelle. Si la question concerne un danger réel, dis d’arrêter et d’avertir immédiatement un adulte.` },
        ...messages.filter((m: any) => ['user','assistant'].includes(m.role) && typeof m.content === 'string').map((m: any) => ({ role: m.role, content: m.content.slice(0,2000) }))
      ]
    });
    return NextResponse.json({ answer: completion.choices[0]?.message?.content || 'Essayons une autre question !' });
  } catch (error) {
    console.error('ScienceLab assistant error', error);
    return NextResponse.json({ error: 'L’assistant est momentanément indisponible.' }, { status: 500 });
  }
}

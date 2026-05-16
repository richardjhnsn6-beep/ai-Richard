import Groq from 'groq-sdk';
import { NextRequest } from 'next/server';

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(req: NextRequest) {
  const { message } = await req.json();
  
  if (!process.env.GROQ_API_KEY) {
    return Response.json({ error: 'GROQ_API_KEY not set' }, { status: 500 });
  }

  const chatCompletion = await groq.chat.completions.create({
    messages: [{ role: 'user', content: message }],
    model: 'llama-3.1-8b-instant',
  });

  return Response.json({ 
    reply: chatCompletion.choices[0]?.message?.content || 'No response' 
  });
}

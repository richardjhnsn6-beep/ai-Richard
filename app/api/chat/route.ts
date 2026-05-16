import Groq from 'groq';
import { NextRequest, NextResponse } from 'next/server';

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    if (!process.env.GROQ_API_KEY) {
      return NextResponse.json(
        { error: 'GROQ_API_KEY not set in environment' },
        { status: 500 }
      );
    }

    const chatCompletion = await groq.chat.completions.create({
      messages: messages,
      model: 'llama-3.1-8b-instant',
      temperature: 0.7,
      max_tokens: 1024,
    });

    return NextResponse.json({
      message: chatCompletion.choices[0]?.message?.content || 'No response'
    });

  } catch (error: any) {
    console.error('Groq API error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to get response from Groq' },
      { status: 500 }
    );
  }
}

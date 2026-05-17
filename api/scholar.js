export default async function handler(req, res) {
  const r = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: { 
      'Authorization': `Bearer ${process.env.GROQ_API_KEY}`, 
      'Content-Type': 'application/json' 
    },
    body: JSON.stringify({ 
      model: 'meta-llama/llama-4-scout-17b-16e-instruct', 
      messages: req.body.messages, 
      temperature: 0.7, 
      max_tokens: 300 
    })
  });
  res.status(200).json(await r.json());
}

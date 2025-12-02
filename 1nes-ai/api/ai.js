export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { prompt, mode } = req.body;

    const systemPrompt =
      mode === "ideas"
        ? "You give practical ideas for making progress."
        : mode === "tasks"
        ? "You break goals into clear steps."
        : "You are a senior developer giving clean code and explanations.";

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: prompt },
        ],
        max_tokens: 300,
      }),
    });

    const data = await response.json();
    const reply = data?.choices?.[0]?.message?.content || "No AI response.";

    return res.status(200).json({ ai: reply });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

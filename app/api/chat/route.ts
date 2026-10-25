import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { message, availableTime, activityLevel, history, context } =
      await request.json();

    if (typeof message !== "string" || !message.trim()) {
      return NextResponse.json(
        { error: "Please enter a message." },
        { status: 400 }
      );
    }

    if (message.trim().length > 2000) {
      return NextResponse.json(
        { error: "Please keep each message under 2,000 characters." },
        { status: 413 }
      );
    }

    const safeAvailableTime =
      typeof availableTime === "number" && Number.isFinite(availableTime)
        ? Math.min(1440, Math.max(1, Math.round(availableTime)))
        : "unspecified";
    const safeActivityLevel =
      activityLevel === "gentle" || activityLevel === "moderate"
        ? activityLevel
        : "unspecified";

    const contextLine =
      typeof context === "string" && context.trim()
        ? `\n\nHere is a snapshot of the user's current habits, goals, today's schedule and recent mood from the app (use it to tailor advice, and reference it naturally when relevant — don't just repeat it back):\n${context.trim().slice(0, 1500)}`
        : "";

    const apiKey = process.env.GROQ_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "GROQ_API_KEY was not found. Check your .env.local file." },
        { status: 500 }
      );
    }

    const recentMessages = Array.isArray(history)
      ? history
          .flatMap((item: unknown) => {
            if (typeof item !== "object" || item === null) return [];

            const candidate = item as { role?: unknown; text?: unknown };

            if (
              (candidate.role !== "user" && candidate.role !== "assistant") ||
              typeof candidate.text !== "string"
            ) {
              return [];
            }

            return [
              {
                role: candidate.role,
                content: candidate.text.slice(0, 2000),
              },
            ];
          })
          .slice(-8)
      : [];

    // Ensure the latest message is included, even if no history was sent.
    if (
      !recentMessages.some(
        (item) => item.role === "user" && item.content === message.trim()
      )
    ) {
      recentMessages.push({ role: "user", content: message.trim().slice(0, 2000) });
    }

    const groqResponse = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "openai/gpt-oss-20b",
          messages: [
            {
              role: "system",
              content: `You are a friendly general-wellness planning assistant. The user has about ${safeAvailableTime} minutes available today and selected a ${safeActivityLevel} activity level.

Use the recent conversation to keep context and avoid asking for information the user has already provided. Help adapt simple daily movement and healthy routine ideas to the user's schedule and preferences. Be concise and supportive. Do not diagnose conditions, prescribe or change medication, give individualized medical treatment, or set calorie targets. For medical conditions or symptoms, encourage the user to speak with a qualified health professional. For emergencies, tell the user to contact local emergency services.${contextLine}`,
            },
            ...recentMessages,
          ],
        }),
      }
    );

    const data = await groqResponse.json();

    if (!groqResponse.ok) {
      console.error("Groq API error:", data);
      return NextResponse.json(
        { error: "The AI request failed. Check the terminal for details." },
        { status: 502 }
      );
    }

    const reply = data.choices?.[0]?.message?.content;

    return NextResponse.json({
      reply: reply || "Sorry, I couldn't create a reply just now.",
    });
  } catch (error) {
    console.error("Chat route error:", error);
    return NextResponse.json(
      { error: "Something went wrong while sending your message." },
      { status: 500 }
    );
  }
}

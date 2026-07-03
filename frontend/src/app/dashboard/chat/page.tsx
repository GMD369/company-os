"use client";

import { useEffect, useRef, useState } from "react";
import { apiFetch } from "@/lib/api";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [question, setQuestion] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    apiFetch("/chat/messages")
      .then(setMessages)
      .catch((err) => setError(err instanceof Error ? err.message : "Failed to load history"));
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!question.trim()) return;

    const questionText = question;
    setQuestion("");
    setSending(true);
    setError(null);

    setMessages((prev) => [
      ...prev,
      { id: `temp-user-${Date.now()}`, role: "user", content: questionText },
    ]);

    try {
      const result = await apiFetch("/chat", {
        method: "POST",
        body: JSON.stringify({ question: questionText }),
      });
      setMessages((prev) => [
        ...prev,
        { id: `temp-assistant-${Date.now()}`, role: "assistant", content: result.answer },
      ]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to send message");
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="mx-auto flex h-[80vh] max-w-2xl flex-col gap-4">
      <h1 className="text-2xl font-semibold">Chat with your documents</h1>
      <div className="flex flex-1 flex-col gap-3 overflow-y-auto rounded border p-4">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`rounded px-3 py-2 text-sm ${
              m.role === "user" ? "self-end bg-black text-white" : "self-start bg-gray-100"
            }`}
          >
            {m.content}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask a question about your documents..."
          className="flex-1 rounded border px-3 py-2"
          disabled={sending}
        />
        <button
          type="submit"
          disabled={sending}
          className="rounded bg-black px-4 py-2 text-white disabled:opacity-50"
        >
          Send
        </button>
      </form>
    </div>
  );
}

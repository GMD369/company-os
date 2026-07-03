"use client";

import { useEffect, useRef, useState } from "react";
import { Send, Sparkles } from "lucide-react";
import { apiFetch } from "@/lib/api";
import { Card } from "@/components/ui/Card";

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
    <div className="mx-auto flex h-[calc(100vh-9rem)] max-w-3xl flex-col gap-4">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">Chat</h1>
        <p className="mt-1 text-sm text-slate-500">
          Ask anything about your uploaded documents.
        </p>
      </div>

      <Card className="flex flex-1 flex-col overflow-hidden">
        <div className="flex-1 space-y-4 overflow-y-auto p-6">
          {messages.length === 0 && (
            <div className="flex h-full flex-col items-center justify-center gap-2 text-center text-slate-400">
              <Sparkles className="h-8 w-8" />
              <p className="text-sm">Ask your first question to get started.</p>
            </div>
          )}
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[75%] rounded-2xl px-4 py-2.5 text-sm ${
                  m.role === "user"
                    ? "bg-brand text-white"
                    : "bg-slate-100 text-slate-800"
                }`}
              >
                {m.content}
              </div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {error && (
          <p className="mx-6 mb-2 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="flex gap-2 border-t border-border p-4">
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Ask a question about your documents..."
            disabled={sending}
            className="flex-1 rounded-lg border border-border px-3.5 py-2.5 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/20"
          />
          <button
            type="submit"
            disabled={sending}
            className="flex items-center gap-1.5 rounded-lg bg-brand px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-brand-dark disabled:opacity-50"
          >
            <Send className="h-4 w-4" />
            Send
          </button>
        </form>
      </Card>
    </div>
  );
}

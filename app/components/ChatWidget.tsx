'use client';

import { useState, useRef, useEffect, KeyboardEvent } from 'react';
import LoadingDots from './LoadingDots';
import 

type Message = {
  role: 'user' | 'ai';
  text: string;
};

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'ai', text: 'Hi — I\'m the Desvelo AI. Ask me anything about our work or services.' },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, open]);

  async function sendMessage() {
    const text = input.trim();
    if (!text || loading) return;

    setMessages((prev) => [...prev, { role: 'user', text }]);
    setInput('');
    setLoading(true);

    try {
      const webhookUrl = process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL;
      if (!webhookUrl) throw new Error('Webhook URL not configured.');

      const res = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text }),
      });

      if (!res.ok) throw new Error(`Server error: ${res.status}`);

      const data = await res.json();
      const reply =
        data?.output ??
        data?.response ??
        data?.text ??
        data?.message ??
        (typeof data === 'string' ? data : 'No response received.');

      setMessages((prev) => [...prev, { role: 'ai', text: reply }]);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Something went wrong.';
      setMessages((prev) => [...prev, { role: 'ai', text: `Error: ${msg}` }]);
    } finally {
      setLoading(false);
    }
  }

  function handleKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  return (
    <>
      {/* Chat Panel */}
      {open && (
        <div
          className="fixed bottom-28 right-7 w-[360px] h-[500px] z-50 bg-black border-2 border-white flex flex-col"
          style={{ boxShadow: '4px 4px 0px #005EFF' }}
        >
          {/* Header */}
          <div className="border-b-2 border-white px-4 py-3 flex justify-between items-center shrink-0">
            <span className="font-mono text-xs uppercase tracking-widest text-white">
              Desvelo AI
            </span>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-highlight" aria-hidden="true" />
              <span className="font-mono text-xs text-white/50 uppercase tracking-widest">Live</span>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-3 flex flex-col gap-3 relative">
            {/* Texture overlay */}
            <div
              aria-hidden="true"
              style={{
                position: 'absolute',
                inset: 0,
                backgroundImage:
                  'url(/Textures/noise-texture-background-with-gradient-colors-digital-grainy-gradient-post-template.jpg)',
                backgroundSize: 'cover',
                mixBlendMode: 'overlay',
                opacity: 0.2,
                pointerEvents: 'none',
              }}
            />

            {messages.map((msg, i) => (
              <div
                key={i}
                className={`max-w-[80%] px-3 py-2 text-sm font-sans border ${
                  msg.role === 'user'
                    ? 'self-end bg-highlight text-white border-highlight'
                    : 'self-start bg-black text-white border-white'
                }`}
              >
                {msg.text}
              </div>
            ))}

            {loading && (
              <div className="self-start border border-white px-3 py-2 bg-black">
                <LoadingDots />
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="border-t-2 border-white px-3 py-3 flex gap-2 shrink-0">
            <textarea
              rows={1}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type a message…"
              className="flex-1 bg-black text-white border-2 border-white focus:border-highlight outline-none px-3 py-2 text-sm font-sans resize-none placeholder:text-white/30"
            />
            <button
              onClick={sendMessage}
              disabled={loading || !input.trim()}
              className="bg-highlight text-white border-2 border-highlight px-4 py-2 text-xs font-mono uppercase tracking-widest hover:bg-white hover:text-black disabled:opacity-30 disabled:cursor-not-allowed transition-colors duration-150 shrink-0"
            >
              Send
            </button>
          </div>
        </div>
      )}

      {/* Toggle Button */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? 'Close chat' : 'Open chat'}
        className="fixed bottom-8 right-8 z-50 w-14 h-14 bg-black border-2 border-highlight flex items-center justify-center hover:bg-highlight transition-colors duration-150"
        style={{ boxShadow: open ? 'none' : '3px 3px 0px #005EFF' }}
      >
        {open ? (
          /* Close × */
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-highlight"
          >
            <line x1="2" y1="2" x2="18" y2="18" stroke="currentColor" strokeWidth="2" />
            <line x1="18" y1="2" x2="2" y2="18" stroke="currentColor" strokeWidth="2" />
          </svg>
        ) : (
          /* Chat bubble icon */
          <svg
            width="22"
            height="22"
            viewBox="0 0 22 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-highlight"
          >
            <path
              d="M2 2h18v14H8l-6 4V2z"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
            />
            <line x1="6" y1="7" x2="16" y2="7" stroke="currentColor" strokeWidth="1.5" />
            <line x1="6" y1="11" x2="13" y2="11" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        )}
      </button>
    </>
  );
}

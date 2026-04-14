'use client';

import { useState } from 'react';

export default function EmailSignup() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;

    setLoading(true);
    setError('');

    try {
      const res = await fetch(process.env.NEXT_PUBLIC_EMAIL_WEBHOOK_URL!, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) throw new Error('Server error');
      setSubmitted(true);
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <p className="font-mono text-sm uppercase tracking-widest text-highlight">
        You&apos;re on the list.
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-2 w-full max-w-lg">
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-0 w-full">
        <input
          type="email"
          required
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="your@email.com"
          disabled={loading}
          className="
            flex-1 bg-black text-white font-mono text-sm
            border-2 border-white px-4 py-3
            placeholder:text-white/40
            focus:outline-none focus:border-highlight
            disabled:opacity-50
            sm:border-r-0
          "
        />
        <button
          type="submit"
          disabled={loading}
          className="
            bg-highlight text-white font-mono text-sm uppercase tracking-widest
            px-6 py-3 border-2 border-highlight
            hover:bg-white hover:text-black hover:border-white
            transition-colors duration-150
            disabled:opacity-50 disabled:cursor-not-allowed
          "
        >
          {loading ? '...' : 'Sign up'}
        </button>
      </form>
      {error && (
        <p className="font-mono text-xs text-alert">{error}</p>
      )}
    </div>
  );
}

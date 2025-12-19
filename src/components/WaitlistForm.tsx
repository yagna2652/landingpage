'use client';

import { FormEvent, useState } from 'react';

interface WaitlistFormProps {
  source: 'hero' | 'cta';
  id: string;
  className?: string;
}

/**
 * Minimal email capture form
 * Submits via standard POST to server normalization layer
 * Server handles email validation, normalization, and Attio webhook forwarding
 */
export function WaitlistForm({ source, id, className }: WaitlistFormProps) {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setStatus('success');
        form.reset();
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="mx-auto max-w-md rounded-lg border-2 border-green-600 bg-green-50 p-6 text-center">
        <svg
          className="mx-auto h-12 w-12 text-green-600"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M5 13l4 4L19 7" />
        </svg>
        <p className="mt-4 text-lg font-medium text-green-900">You're on the list!</p>
        <p className="mt-2 text-sm text-green-700">We'll be in touch soon.</p>
      </div>
    );
  }

  return (
    <form id={id} onSubmit={handleSubmit} className={className}>
      <input
        type="email"
        name="email"
        placeholder="you@example.com"
        required
        disabled={status === 'submitting'}
        className="flex-1 rounded-lg border-2 border-gray-300 bg-white px-4 py-3 text-base focus:border-black focus:outline-none focus:ring-2 focus:ring-black/20 disabled:opacity-50"
      />
      <button
        type="submit"
        disabled={status === 'submitting'}
        className="h-12 whitespace-nowrap rounded-lg bg-black px-6 text-base font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-50"
      >
        {status === 'submitting' ? 'Joining...' : 'Join Waitlist'}
      </button>
      {status === 'error' && (
        <p className="col-span-full text-center text-sm text-red-600">
          Something went wrong. Please try again.
        </p>
      )}
    </form>
  );
}

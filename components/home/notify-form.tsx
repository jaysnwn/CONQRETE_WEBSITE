"use client";

import { FormEvent, useState } from 'react';

export default function NotifyForm() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    fetch(form.action, { method: 'POST', body: data, mode: 'no-cors' }).catch(() => {});
    setSubmitted(true);
  };

  return (
    <section style={{
      backgroundColor: '#111827',
      padding: '64px 24px',
      fontFamily: 'system-ui, sans-serif',
      textAlign: 'center',
    }}>
      <div style={{ maxWidth: '560px', margin: '0 auto' }}>
        <p style={{ fontSize: '13px', fontWeight: 600, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.1em', margin: '0 0 12px 0' }}>
          Stay in the loop
        </p>
        <h2 style={{ fontSize: '32px', fontWeight: 700, color: '#ffffff', margin: '0 0 12px 0', lineHeight: 1.2 }}>
          Get early access to deals,<br />launches & offers.
        </h2>
        <p style={{ fontSize: '15px', color: '#9ca3af', margin: '0 0 32px 0' }}>
          Join 5,000+ tech enthusiasts. No spam, ever.
        </p>

        {submitted ? (
          <div style={{
            backgroundColor: '#14532d',
            border: '1px solid #16a34a',
            color: '#4ade80',
            padding: '16px 24px',
            borderRadius: '8px',
            fontWeight: 600,
            fontSize: '15px',
          }}>
            ✓ You're on the list! We'll be in touch soon.
          </div>
        ) : (
          <form
            method="POST"
            action="https://066f7a35.sibforms.com/serve/MUIFAKrrcbThFWsj4EjZG4XxiQpNSFTEPLWbYTD_-UKw0fo-Tqo78aC_7qW1wBnhHELUhPAn6TV8i_t0QDYz5oXOC5wdevC8JWpQkFxajY8tezk39X0R_kJvPUcQQ0BxJTIhr-RiOJTBirLzVSg384HWdPGDiHZbomvXt-gSsyXUG_w-KEy1iFuKXh0zoCc2KzcZYRI-pyaGYPFJHw=="
            onSubmit={handleSubmit}
            style={{ display: 'flex', gap: '12px', maxWidth: '480px', margin: '0 auto' }}
          >
            <input
              type="hidden"
              name="locale"
              value="en"
            />
            <input
              type="text"
              name="email_address_check"
              defaultValue=""
              style={{ display: 'none' }}
              tabIndex={-1}
              aria-hidden="true"
            />
            <label htmlFor="emailInput" style={{ display: 'none' }}>Email Address</label>
            <input
              id="emailInput"
              type="email"
              name="EMAIL"
              placeholder="your@email.com"
              required
              aria-label="Email address"
              style={{
                flex: 1,
                padding: '14px 18px',
                borderRadius: '8px',
                border: '1px solid #374151',
                backgroundColor: '#1f2937',
                color: '#ffffff',
                fontSize: '15px',
                outline: 'none',
              }}
            />
            <button
              type="submit"
              aria-label="Subscribe to newsletter"
              style={{
                padding: '14px 24px',
                backgroundColor: '#ffffff',
                color: '#111827',
                border: 'none',
                borderRadius: '8px',
                fontWeight: 700,
                fontSize: '15px',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'background 0.2s ease',
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f3f4f6'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#ffffff'}
            >
              Subscribe
            </button>
          </form>
        )}

        <p style={{ fontSize: '12px', color: '#6b7280', marginTop: '16px' }}>
          No spam. Unsubscribe anytime.
        </p>
      </div>
    </section>
  );
}

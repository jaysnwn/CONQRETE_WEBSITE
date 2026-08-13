'use client';

import { useState } from 'react';
import Link from 'next/link';
import { signUp } from '#/features/auth/actions';

export default function SignupPage() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);
    const formData = new FormData(event.currentTarget);
    
    try {
      const result = await signUp(formData);
      if (result?.error) {
        setError(result.error);
        setLoading(false);
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
      setLoading(false);
    }
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#ffffff', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '1.5rem', fontFamily: 'monospace', color: '#000', position: 'relative', overflow: 'hidden' }}>
      
      {/* Global grid applied via globals.css */}
      
      <div style={{ width: '100%', maxWidth: '448px', position: 'relative', zIndex: 10, margin: '3rem 0' }}>
        <div style={{ marginBottom: '2.5rem', textAlign: 'center' }}>
          <h1 style={{ fontSize: '3rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-0.05em', marginBottom: '0.5rem', fontFamily: '"Black Han Sans", sans-serif' }}>Create Account</h1>
          <p style={{ color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '0.875rem', fontWeight: 700 }}>Register for a new account</p>
        </div>

        <form onSubmit={handleSubmit} style={{ backgroundColor: '#ffffff', border: '4px solid #000', padding: '2rem', boxShadow: '12px 12px 0px #000', transition: 'all 0.3s' }}>
          {error && (
            <div style={{ marginBottom: '1.5rem', padding: '1rem', border: '2px solid #ef4444', backgroundColor: '#fef2f2', color: '#b91c1c', fontWeight: 700, fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              {error}
            </div>
          )}

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <div style={{ flex: 1 }}>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }} htmlFor="first_name">First Name</label>
                <input 
                  id="first_name" 
                  name="first_name" 
                  type="text" 
                  required 
                  placeholder="First name"
                  style={{ width: '100%', border: '2px solid #000', padding: '1rem', outline: 'none', fontWeight: 700, transition: 'background-color 0.2s', backgroundColor: 'transparent' }}
                  onFocus={(e) => (e.target as HTMLElement).style.backgroundColor = 'rgba(200, 255, 0, 0.1)'}
                  onBlur={(e) => (e.target as HTMLElement).style.backgroundColor = 'transparent'}
                />
              </div>
              <div style={{ flex: 1 }}>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }} htmlFor="last_name">Last Name</label>
                <input 
                  id="last_name" 
                  name="last_name" 
                  type="text" 
                  required 
                  placeholder="Last name"
                  style={{ width: '100%', border: '2px solid #000', padding: '1rem', outline: 'none', fontWeight: 700, transition: 'background-color 0.2s', backgroundColor: 'transparent' }}
                  onFocus={(e) => (e.target as HTMLElement).style.backgroundColor = 'rgba(200, 255, 0, 0.1)'}
                  onBlur={(e) => (e.target as HTMLElement).style.backgroundColor = 'transparent'}
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }} htmlFor="email">Email Address</label>
              <input 
                id="email" 
                name="email" 
                type="email" 
                required 
                placeholder="your@email.com"
                style={{ width: '100%', border: '2px solid #000', padding: '1rem', outline: 'none', fontWeight: 700, transition: 'background-color 0.2s', backgroundColor: 'transparent' }}
                onFocus={(e) => (e.target as HTMLElement).style.backgroundColor = 'rgba(200, 255, 0, 0.1)'}
                onBlur={(e) => (e.target as HTMLElement).style.backgroundColor = 'transparent'}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }} htmlFor="password">Password</label>
              <input 
                id="password" 
                name="password" 
                type="password" 
                required 
                placeholder="••••••••"
                minLength={6}
                style={{ width: '100%', border: '2px solid #000', padding: '1rem', outline: 'none', fontWeight: 700, transition: 'background-color 0.2s', backgroundColor: 'transparent' }}
                onFocus={(e) => (e.target as HTMLElement).style.backgroundColor = 'rgba(200, 255, 0, 0.1)'}
                onBlur={(e) => (e.target as HTMLElement).style.backgroundColor = 'transparent'}
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            style={{ width: '100%', marginTop: '2rem', backgroundColor: '#000', color: '#fff', border: '2px solid #000', padding: '1rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em', cursor: 'pointer', opacity: loading ? 0.5 : 1, transition: 'all 0.2s' }}
            onMouseOver={(e) => { e.currentTarget.style.backgroundColor = '#c8ff00'; e.currentTarget.style.color = '#000'; }}
            onMouseOut={(e) => { e.currentTarget.style.backgroundColor = '#000'; e.currentTarget.style.color = '#fff'; }}
          >
            {loading ? 'Creating...' : 'Create Account'}
          </button>

          <div style={{ marginTop: '2rem', textAlign: 'center', borderTop: '2px solid #f3f4f6', paddingTop: '1.5rem' }}>
            <p style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#6b7280' }}>
              Already have an account?{' '}
              <Link href="/login" style={{ color: '#000', textDecoration: 'underline', textDecorationThickness: '2px', transition: 'color 0.2s' }} onMouseOver={(e) => (e.target as HTMLElement).style.color = '#c8ff00'} onMouseOut={(e) => (e.target as HTMLElement).style.color = '#000'}>
                Sign In
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

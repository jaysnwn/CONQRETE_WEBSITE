'use client';

import { useState } from 'react';
import { useScanner } from '#/components/ui/use-scanner';
import { submitVerificationCustomer, validateQrToken } from '#/features/verify/actions';
import { Check, X, ArrowRight, Loader2, ScanLine } from 'lucide-react';
import Link from 'next/link';
import styles from './verify.module.css';

type Step = 'form' | 'scan' | 'success' | 'fail';

const STEP_INDEX: Record<Step, number> = { form: 0, scan: 1, success: 2, fail: 2 };

function StepProgress({ step }: { step: Step }) {
  const current = STEP_INDEX[step];
  return (
    <div className={styles.progress} aria-hidden="true">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className={styles.progressSeg}
          data-state={i < current ? 'done' : i === current ? 'active' : 'pending'}
        />
      ))}
    </div>
  );
}

export default function VerifyClient() {
  const [step, setStep] = useState<Step>('form');
  const [mobile, setMobile] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [consent, setConsent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [customerId, setCustomerId] = useState<string | null>(null);
  const [hasScanned, setHasScanned] = useState(false);

  // Scanner Hook Logic
  const { videoRef, canvasRef, error, hasCamera } = useScanner(async (data) => {
    if (!customerId || step !== 'scan' || hasScanned) return;
    setHasScanned(true);
    const result = await validateQrToken(customerId, data);
    if (result.success) {
      setStep('success');
    } else {
      setStep('fail');
    }
  }, step === 'scan' && !hasScanned);

  // Form Submission Logic
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!mobile) return;
    setLoading(true);
    setFormError(null);
    const res = await submitVerificationCustomer({ mobile, name, email, marketing_consent: consent });
    setLoading(false);
    if (res.success && res.customerId) {
      setCustomerId(res.customerId);
      setStep('scan');
    } else {
      setFormError(res.error || 'Something went wrong. Please try again.');
    }
  };

  // ==========================================
  // STATE 1: CUSTOMER FORM
  // ==========================================
  if (step === 'form') {
    return (
      <div className={styles.shell}>
        <StepProgress step={step} />
        <div style={{ textAlign: 'center', marginBottom: '36px' }}>
          <h1
            style={{
              fontFamily: '"Black Han Sans", sans-serif',
              fontSize: 'clamp(34px, 8vw, 48px)',
              letterSpacing: '-0.01em',
              color: 'var(--text)',
              textTransform: 'uppercase',
              lineHeight: 1,
            }}
          >
            Verify your CONQRETE
          </h1>
          <p
            style={{
              fontFamily: '"Share Tech Mono", monospace',
              color: 'var(--muted)',
              fontSize: '13px',
              letterSpacing: '0.08em',
              marginTop: '12px',
            }}
          >
            Make sure you're holding the real thing.
          </p>
        </div>

        <form onSubmit={handleFormSubmit} className={`${styles.card} ${styles.stepEnter}`} style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
          <div className={styles.field}>
            <label htmlFor="mobile" className={`${styles.label} ${styles.labelRequired}`}>
              Mobile number *
            </label>
            <div className={styles.inputWrap}>
              <span className={styles.prefix}>+91</span>
              <input
                id="mobile"
                type="tel"
                inputMode="numeric"
                autoComplete="tel-national"
                required
                maxLength={10}
                value={mobile}
                onChange={(e) => setMobile(e.target.value.replace(/\D/g, '').slice(0, 10))}
                className={`${styles.input} ${styles.inputPad}`}
                placeholder="10-digit mobile number"
              />
            </div>
          </div>

          <div className={styles.field}>
            <label htmlFor="name" className={styles.label}>
              Name <span style={{ opacity: 0.5 }}>(optional)</span>
            </label>
            <input
              id="name"
              type="text"
              autoComplete="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={styles.input}
              placeholder="Your name"
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="email" className={styles.label}>
              Email <span style={{ opacity: 0.5 }}>(optional)</span>
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles.input}
              placeholder="Email address"
            />
          </div>

          <div style={{ marginTop: '4px' }}>
            <p className={styles.consentText} style={{ marginBottom: '16px' }}>
              Your mobile number is used to record your product verification and provide support.
            </p>
            <label className={styles.checkboxRow}>
              <span className={styles.checkboxBox}>
                <input
                  type="checkbox"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  className={styles.checkbox}
                />
                {consent && (
                  <Check
                    style={{ position: 'absolute', color: 'var(--acid)', width: '14px', height: '14px', pointerEvents: 'none' }}
                    strokeWidth={4}
                  />
                )}
              </span>
              <span className={styles.checkLabel}>I'd like to receive CONQRETE product updates and offers.</span>
            </label>
          </div>

          {formError && (
            <p role="alert" style={{ fontFamily: '"Barlow Condensed", sans-serif', fontSize: '15px', color: 'var(--red)' }}>
              {formError}
            </p>
          )}

          <button
            type="submit"
            disabled={loading || mobile.length !== 10}
            className={styles.submitBtn}
            style={{
              background: loading || mobile.length !== 10 ? 'var(--border)' : 'var(--acid)',
              color: loading || mobile.length !== 10 ? 'var(--muted)' : '#000',
            }}
          >
            {loading ? (
              <Loader2 className={styles.spin} size={20} />
            ) : (
              <>
                Continue <ArrowRight size={18} />
              </>
            )}
          </button>
        </form>
      </div>
    );
  }

  // ==========================================
  // STATE 2: CAMERA SCANNER
  // ==========================================
  if (step === 'scan') {
    return (
      <div className={styles.shell}>
        <StepProgress step={step} />
        <div className={`${styles.scanHeading} ${styles.stepEnter}`}>
          <h2
            style={{
              fontFamily: '"Black Han Sans", sans-serif',
              fontSize: 'clamp(30px, 7vw, 40px)',
              color: 'var(--text)',
              textTransform: 'uppercase',
              marginBottom: '10px',
              lineHeight: 1,
            }}
          >
            Scan your card
          </h2>
          <p
            style={{
              fontFamily: '"Share Tech Mono", monospace',
              color: '#4b5563', fontWeight: 'bold',
              fontSize: '13px',
              letterSpacing: '0.08em',
              marginBottom: '28px',
              textAlign: 'center',
            }}
          >
            Place the QR code inside the frame.
          </p>

          {error ? (
            <div className={styles.errorBox} role="alert">
              <p className={styles.errorText}>{error}</p>
              <button
                onClick={() => window.location.reload()}
                className={styles.actionBtn}
                style={{ background: 'var(--text)', color: 'var(--bg)', marginBottom: 0 }}
              >
                Try again
              </button>
              <Link href="/support/contact" className={styles.manualLink}>
                Verify without a camera
              </Link>
            </div>
          ) : (
            <div className={styles.scanFrame}>
              <video ref={videoRef} className={styles.video} muted playsInline />
              <canvas ref={canvasRef} style={{ display: 'none' }} />

              <div className={styles.reticle}>
                <div className={styles.reticleBox}>
                  <div className={`${styles.corner} ${styles.tl}`} />
                  <div className={`${styles.corner} ${styles.tr}`} />
                  <div className={`${styles.corner} ${styles.bl}`} />
                  <div className={`${styles.corner} ${styles.br}`} />
                  {hasCamera && <div className={styles.scanLine} />}
                </div>
              </div>

              {!hasCamera && (
                <div className={styles.cameraLoading}>
                  <Loader2 className={styles.spin} color="var(--acid)" size={32} />
                  <p className={styles.cameraLoadingText}>Accessing camera...</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }

  // ==========================================
  // STATE 3: SUCCESSFUL VERIFICATION
  // ==========================================
  if (step === 'success') {
    return (
      <div className={styles.shell} style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }} role="status">
        <div className={`${styles.resultIcon} ${styles.resultIconSuccess} ${styles.stepEnter}`}>
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
            <path
              className={styles.checkPath}
              d="M4 12.5L9.5 18L20 6"
              stroke="#000"
              strokeWidth={3}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <h2 className={styles.resultTitle}>Verified</h2>
        <h3 className={styles.resultSub} style={{ color: '#4b5563', fontWeight: 'bold' }}>
          You've got the real deal.
        </h3>

        <div className={styles.detailCard}>
          <div className={styles.detailAccent} />
          <p className={styles.detailLabel}>Status</p>
          <p className={styles.detailValue} style={{ marginBottom: '24px' }}>
            <span className={styles.dot} /> Authentic
          </p>
          <p className={styles.detailLabel}>Verification</p>
          <p className={styles.detailValue}>Successful</p>
          <div className={styles.detailFoot}>
            Your CONQRETE warranty card has been successfully verified. Warranty validity is based on the original
            purchase invoice and applicable CONQRETE warranty terms.
          </div>
        </div>

        <div style={{ width: '100%' }}>
          <h4
            style={{
              fontFamily: '"Black Han Sans", sans-serif',
              fontSize: '19px',
              color: 'var(--text)',
              textTransform: 'uppercase',
              marginBottom: '16px',
              letterSpacing: '0.04em',
            }}
          >
            Welcome to CONQRETE.
          </h4>
          <Link href="/products" className={`${styles.actionBtn} ${styles.actionPrimary}`}>
            Shop CONQRETE <ArrowRight size={18} />
          </Link>
          <Link href="/" className={`${styles.actionBtn} ${styles.actionSecondary}`}>
            Explore products
          </Link>
        </div>
      </div>
    );
  }

  // ==========================================
  // STATE 4: FAILED VERIFICATION
  // ==========================================
  if (step === 'fail') {
    return (
      <div className={styles.shell} style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }} role="status">
        <div className={`${styles.resultIcon} ${styles.resultIconFail} ${styles.stepEnter}`}>
          <X color="var(--red)" size={40} strokeWidth={3} />
        </div>

        <h2 className={styles.resultTitle}>Couldn't verify</h2>
        <p
          style={{
            fontFamily: '"Barlow Condensed", sans-serif',
            fontSize: '17px',
            color: 'var(--muted)',
            marginBottom: '36px',
          }}
        >
          We couldn't verify this CONQRETE warranty card.
        </p>

        <div style={{ width: '100%' }}>
          <button
            onClick={() => {
              setStep('scan');
              setHasScanned(false);
            }}
            className={`${styles.actionBtn} ${styles.actionSecondary}`}
          >
            <ScanLine size={18} /> Scan again
          </button>
          <Link href="/support/contact" className={`${styles.actionBtn} ${styles.actionGhost}`}>
            Contact CONQRETE support
          </Link>
        </div>
      </div>
    );
  }

  return null;
}


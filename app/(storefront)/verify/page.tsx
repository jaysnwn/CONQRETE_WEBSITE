import { Metadata } from 'next';
import VerifyClient from './verify-client';
import styles from './verify.module.css';

export const metadata: Metadata = {
  title: 'Verify Your CONQRETE | Warranty Authentication',
  description: 'Make sure you are holding the real thing. Verify your CONQRETE product warranty card to check authenticity.',
};

export default function VerifyPage() {
  return (
    <div className={styles.page}>
      <VerifyClient />
    </div>
  );
}

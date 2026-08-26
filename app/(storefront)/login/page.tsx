import LoginClientPage from './client-page';

export default function LoginPage() {
  const isReviewMode = process.env.RAZORPAY_REVIEW_MODE === 'true';

  return <LoginClientPage isReviewMode={isReviewMode} />;
}

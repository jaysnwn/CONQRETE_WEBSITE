import HeroCarousel from '#/components/home/hero-carousel';
import PressBar from '#/components/home/press-bar';
import CategoryNav from '#/components/home/category-nav';
import UspStrip from '#/components/home/usp-strip';
import FeaturedProducts from '#/components/home/featured-products';
import StatsCounter from '#/components/home/stats-counter';
import BrandStory from '#/components/home/brand-story';
import Certifications from '#/components/home/certifications';
import Testimonials from '#/components/home/testimonials';
import InstagramFeed from '#/components/home/instagram-feed';
import NotifyForm from '#/components/home/notify-form';

export default function Home() {
  return (
    <div style={{ overflowX: 'hidden', minHeight: '100vh', backgroundColor: '#ffffff' }}>

      {/* 1. Hero Carousel — first impression */}
      <HeroCarousel />

      {/* 2. Press Bar — "As Seen In" immediately after hero */}
      <PressBar />

      {/* 3. USP Strip — quick trust signals */}
      <UspStrip />

      {/* 4. Category Quick-Nav — drive discovery */}
      <CategoryNav />

      {/* 5. Featured Products — live from DB */}
      <FeaturedProducts />

      {/* 6. Stats Counter — social proof numbers */}
      <StatsCounter />

      {/* 7. Brand Story — emotional connection */}
      <BrandStory />

      {/* 8. Certifications — safety credibility */}
      <Certifications />

      {/* 9. Customer Testimonials — peer validation */}
      <Testimonials />

      {/* 10. Instagram UGC Feed — real-world proof */}
      <InstagramFeed />

      {/* 11. Newsletter — capture intent */}
      <NotifyForm />

    </div>
  );
}
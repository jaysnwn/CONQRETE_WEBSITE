import HeroCarousel from '#/components/home/hero-carousel';
import PressBar from '#/components/home/press-bar';
import CategoryNav from '#/components/home/category-nav';
import UspStrip from '#/components/home/usp-strip';
import FeaturedProducts from '#/components/home/featured-products';
import StatsCounter from '#/components/home/stats-counter';
import BrandStory from '#/components/home/brand-story';
import RhinoStory from '#/components/home/rhino-story';
import Certifications from '#/components/home/certifications';
import Testimonials from '#/components/home/testimonials';
import InstagramFeed from '#/components/home/instagram-feed';
import NotifyForm from '#/components/home/notify-form';

import { createClient } from '#/utils/supabase/server';

export default async function Home() {
  const supabase = await createClient();

  const { data: slides } = await supabase
    .from('hero_slides')
    .select('image_url, link_url')
    .eq('is_active', true)
    .order('display_order', { ascending: true });

  return (
    <div style={{ overflowX: 'hidden', minHeight: '100vh', backgroundColor: '#ffffff' }}>

      {/* 1. Hero Carousel — first impression */}
      <HeroCarousel slides={slides || []} />

      {/* 2. Press Bar — "As Seen In" immediately after hero */}
      {/* <PressBar /> */}

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

      {/* 9. Rhino Story — Why the Rhino */}
      <RhinoStory />

      {/* 10. Customer Testimonials — peer validation */}
      <Testimonials />

      {/* 11. Instagram UGC Feed — real-world proof */}
      {/* <InstagramFeed /> */}

      {/* 12. Newsletter — capture intent */}
      <NotifyForm />

    </div>
  );
}
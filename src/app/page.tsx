
import { SiteHeader } from '@/components/layout/site-header';
import { HeroSection } from '@/components/landing/hero-section';
import { HowAiWorksSection } from '@/components/landing/how-ai-works-section';
import { TestimonialsSection } from '@/components/landing/testimonials-section';
import { SiteFooter } from '@/components/layout/site-footer';
import { Separator } from '@/components/ui/separator';
import { FeaturedDestinationsDubaiSection } from '@/components/landing/featured-destinations-dubai-section';

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-grow">
        <HeroSection />
        <section className="py-16 lg:py-24 bg-background">
          <div className="container">
            <HowAiWorksSection />
          </div>
        </section>
        <Separator className="my-0" />
        <FeaturedDestinationsDubaiSection />
        <Separator className="my-0" />
        <section className="py-16 lg:py-24 bg-secondary/30">
          <div className="container">
            <TestimonialsSection />
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

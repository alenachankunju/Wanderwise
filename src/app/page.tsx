import { SiteHeader } from '@/components/layout/site-header';
import { HeroSection } from '@/components/landing/hero-section';
import { SiteFooter } from '@/components/layout/site-footer';

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-grow">
        <HeroSection />
        {/* Placeholder for future sections like Features, Testimonials etc. */}
        {/* <section className="py-12 lg:py-24 container">
          <h2 className="font-headline text-3xl text-center mb-8">Why Choose WanderWise?</h2>
          {/* Feature cards could go here */}
        {/* </section> */}
      </main>
      <SiteFooter />
    </div>
  );
}

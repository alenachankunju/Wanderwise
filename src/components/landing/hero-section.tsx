import Image from 'next/image';
import { LandingSearchForm } from '@/components/common/destination-search-form'; // Updated import

export function HeroSection() {
  return (
    <section className="relative flex flex-col items-center justify-center w-full min-h-[calc(100vh-4rem)] text-center px-4 py-16 md:py-24 lg:py-32 overflow-hidden">
      <Image
        src="https://placehold.co/1920x1080.png"
        alt="Scenic travel landscape collage"
        layout="fill"
        objectFit="cover"
        quality={85}
        className="z-0 opacity-30" 
        data-ai-hint="scenic landscape"
        priority
      />
      
      <div className="absolute inset-0 bg-gradient-to-b from-background/10 via-background/50 to-background z-10"></div>

      <div className="relative z-20 flex flex-col items-center space-y-8 max-w-4xl mx-auto">
        <h1 className="font-headline text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-foreground leading-tight">
          Discover Your Next <br className="hidden sm:block" />
          <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Adventure with AI</span>
        </h1>
        <p className="font-body text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-2xl">
          Let WanderWise suggest travel destinations tailored to your mood, interests, and travel goals.
        </p>
        <div className="w-full pt-8 max-w-3xl">
          <LandingSearchForm />
        </div>
        <p className="font-body text-sm text-muted-foreground pt-6">
          Powered by advanced AI to inspire your wanderlust.
        </p>
      </div>
    </section>
  );
}

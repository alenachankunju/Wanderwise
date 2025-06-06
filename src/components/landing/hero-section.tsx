import Image from 'next/image';
import { DestinationSearchForm } from '@/components/common/destination-search-form';

export function HeroSection() {
  return (
    <section className="relative flex flex-col items-center justify-center w-full min-h-[calc(100vh-4rem)] text-center px-4 py-16 md:py-24 lg:py-32 overflow-hidden">
      {/* Background Image */}
      <Image
        src="https://placehold.co/1920x1080.png"
        alt="Breathtaking travel destination"
        layout="fill"
        objectFit="cover"
        quality={80}
        className="z-0 opacity-40"
        data-ai-hint="travel landscape"
        priority
      />
      
      {/* Overlay to improve text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/70 to-background z-10"></div>

      {/* Content */}
      <div className="relative z-20 flex flex-col items-center space-y-8 max-w-3xl">
        <h1 className="font-headline text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground">
          Discover Your Next <span className="text-primary-foreground bg-primary px-2 rounded-md">Adventure</span>
        </h1>
        <p className="font-body text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-xl">
          Let WanderWise AI craft personalized travel suggestions for your dream destinations. Your journey starts here.
        </p>
        <div className="w-full pt-6">
          <DestinationSearchForm />
        </div>
        <p className="font-body text-sm text-muted-foreground pt-4">
          Powered by cutting-edge AI to inspire your wanderlust.
        </p>
      </div>
    </section>
  );
}

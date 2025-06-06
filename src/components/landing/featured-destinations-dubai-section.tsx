
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const dubaiDestinations = [
  {
    name: "Burj Khalifa",
    description: "Experience breathtaking views from the world’s tallest building.",
    image: "https://placehold.co/400x300.png",
    imageHint: "Burj Khalifa skyscraper",
    link: "/search-results/Dubai?interests=architecture,views&budget=high&timeOfYear=any"
  },
  {
    name: "Palm Jumeirah",
    description: "Explore the iconic man-made island shaped like a palm tree.",
    image: "https://placehold.co/400x300.png",
    imageHint: "Palm Jumeirah aerial",
    link: "/search-results/Dubai?interests=beaches,luxury&budget=high&timeOfYear=any"
  },
  {
    name: "Dubai Desert Safari",
    description: "Embark on an thrilling adventure through the Arabian dunes.",
    image: "https://placehold.co/400x300.png",
    imageHint: "desert safari adventure",
    link: "/search-results/Dubai?interests=adventure,desert&budget=medium&timeOfYear=any"
  },
  {
    name: "Dubai Mall & Aquarium",
    description: "Shop at one of the world's largest malls and visit the stunning aquarium.",
    image: "https://placehold.co/400x300.png",
    imageHint: "Dubai Mall interior",
    link: "/search-results/Dubai?interests=shopping,entertainment&budget=medium&timeOfYear=any"
  },
  {
    name: "Al Fahidi Historical District",
    description: "Step back in time and explore Dubai's rich culture and tradition.",
    image: "https://placehold.co/400x300.png",
    imageHint: "Al Fahidi architecture",
    link: "/search-results/Dubai?interests=culture,history&budget=low&timeOfYear=any"
  },
];

export function FeaturedDestinationsDubaiSection() {
  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="container">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl font-headline">
            ✨ Popular in <span className="text-primary">Dubai</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-body">
            Discover some of the most iconic attractions and experiences Dubai has to offer.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-8">
          {dubaiDestinations.map((destination) => (
            <Card key={destination.name} className="shadow-xl hover:shadow-2xl transition-shadow duration-300 rounded-lg border-border/50 overflow-hidden flex flex-col">
              <div className="relative w-full h-56">
                <Image
                  src={destination.image}
                  alt={`Image of ${destination.name}`}
                  layout="fill"
                  objectFit="cover"
                  data-ai-hint={destination.imageHint}
                />
              </div>
              <CardHeader>
                <CardTitle className="text-2xl font-semibold text-foreground font-headline">{destination.name}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-muted-foreground font-body text-sm">{destination.description}</p>
              </CardContent>
              <div className="p-6 pt-0">
                <Link href={destination.link} passHref legacyBehavior>
                  <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground" aria-label={`Explore ${destination.name}`}>
                    Explore More
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

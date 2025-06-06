import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Alex P.",
    avatar: "AP",
    image: "https://placehold.co/100x100.png",
    imageHint: "person portrait",
    quote: "WanderWise planned my entire Kyoto trip! The AI suggestions for hidden temples and local eateries were spot on. It felt like having a personal travel concierge.",
    rating: 5,
  },
  {
    name: "Maria S.",
    avatar: "MS",
    image: "https://placehold.co/100x100.png",
    imageHint: "woman smiling",
    quote: "I was stuck in a travel rut, but WanderWise helped me discover the Dolomites. The activity suggestions were perfect for my adventurous spirit. Highly recommend!",
    rating: 5,
  },
  {
    name: "David K.",
    avatar: "DK",
    image: "https://placehold.co/100x100.png",
    imageHint: "man traveling",
    quote: "Planning family vacations used to be stressful. With WanderWise, I just put in our interests and budget, and it gave us amazing options for our trip to Costa Rica. Kids loved it!",
    rating: 4,
  },
];

export function TestimonialsSection() {
  return (
    <div className="space-y-12">
      <div className="text-center space-y-4">
        <h2 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl font-headline">
          Loved by <span className="text-accent">Travelers</span>
        </h2>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-body">
          Hear what our users have to say about their WanderWise experiences.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((testimonial, index) => (
          <Card key={index} className="shadow-xl hover:shadow-2xl transition-shadow duration-300 rounded-lg flex flex-col border-border/50">
            <CardHeader className="flex-grow">
              <div className="flex items-center space-x-2 mb-2">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                ))}
                {[...Array(5 - testimonial.rating)].map((_, i) => (
                  <Star key={i + testimonial.rating} className="h-5 w-5 text-muted" />
                ))}
              </div>
              <CardContent className="p-0 text-muted-foreground font-body italic">
                &quot;{testimonial.quote}&quot;
              </CardContent>
            </CardHeader>
            <CardFooter className="mt-auto pt-4 border-t">
              <div className="flex items-center space-x-3">
                <Avatar>
                  <AvatarImage src={testimonial.image} alt={testimonial.name} data-ai-hint={testimonial.imageHint} />
                  <AvatarFallback>{testimonial.avatar}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold text-foreground font-headline">{testimonial.name}</p>
                </div>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}

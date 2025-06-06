import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lightbulb, Cpu, Wand2 } from "lucide-react";

export function HowAiWorksSection() {
  return (
    <div className="space-y-12">
      <div className="text-center space-y-4">
        <h2 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl font-headline">
          How <span className="text-primary">WanderWise</span> Works
        </h2>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-body">
          We leverage cutting-edge artificial intelligence to craft personalized travel suggestions just for you.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        <Card className="shadow-xl hover:shadow-2xl transition-shadow duration-300 rounded-lg border-border/50">
          <CardHeader className="items-center text-center">
            <div className="p-4 bg-primary/10 rounded-full inline-block mb-4">
              <Lightbulb className="h-10 w-10 text-primary" />
            </div>
            <CardTitle className="text-2xl font-semibold text-foreground font-headline">
              1. Share Your Vibe
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center text-muted-foreground font-body">
            Tell us what you&apos;re in the mood for – adventure, relaxation, cultural immersion, culinary delights – along with your preferred destination, budget, and time of year.
          </CardContent>
        </Card>
        <Card className="shadow-xl hover:shadow-2xl transition-shadow duration-300 rounded-lg border-border/50">
          <CardHeader className="items-center text-center">
            <div className="p-4 bg-accent/10 rounded-full inline-block mb-4">
              <Cpu className="h-10 w-10 text-accent" />
            </div>
            <CardTitle className="text-2xl font-semibold text-foreground font-headline">
              2. AI Magic Happens
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center text-muted-foreground font-body">
            Our advanced AI, powered by technology similar to GPT, analyzes your preferences against a vast database of travel knowledge.
          </CardContent>
        </Card>
        <Card className="shadow-xl hover:shadow-2xl transition-shadow duration-300 rounded-lg border-border/50">
          <CardHeader className="items-center text-center">
            <div className="p-4 bg-secondary/20 rounded-full inline-block mb-4">
               <Wand2 className="h-10 w-10 text-secondary-foreground" />
            </div>
            <CardTitle className="text-2xl font-semibold text-foreground font-headline">
              3. Get Inspired
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center text-muted-foreground font-body">
            Receive tailored suggestions for activities, accommodations, dining, and hidden gems, turning your travel dreams into reality.
          </CardContent>
        </Card>
      </div>
       <p className="text-center text-sm text-muted-foreground font-body pt-4">
          WanderWise uses generative AI to provide helpful and inspiring travel content. Please double-check critical information.
        </p>
    </div>
  );
}

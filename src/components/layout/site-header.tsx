import { AppLogo } from '@/components/common/app-logo';
import { Button } from '@/components/ui/button';

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center justify-between">
        <AppLogo />
        <nav className="flex items-center space-x-4">
          {/* Future navigation links can go here */}
          {/* <Button variant="ghost">Features</Button>
          <Button variant="ghost">Pricing</Button> */}
          <Button variant="outline" className="text-primary-foreground bg-primary hover:bg-primary/90">
            Sign In
          </Button>
        </nav>
      </div>
    </header>
  );
}

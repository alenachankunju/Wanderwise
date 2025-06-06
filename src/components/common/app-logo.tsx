import Link from 'next/link';
import { Globe } from 'lucide-react';

export function AppLogo() {
  return (
    <Link href="/" className="flex items-center gap-2 group">
      <Globe className="h-7 w-7 text-primary group-hover:text-accent transition-colors duration-300" />
      <span className="font-headline text-2xl font-semibold text-foreground group-hover:text-accent transition-colors duration-300">
        WanderWise
      </span>
    </Link>
  );
}

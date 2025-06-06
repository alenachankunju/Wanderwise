import type {Metadata} from 'next';
import { Inter } from 'next/font/google'; // Import Inter
import './globals.css';
import { Toaster } from "@/components/ui/toaster";

// Configure Inter font
const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter', // CSS variable for Inter
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'WanderWise',
  description: 'AI-powered travel destination suggestions',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable}`}>
      <head>
        {/* Google Fonts preconnect (Inter is now self-hosted via next/font) */}
      </head>
      <body className="font-sans antialiased min-h-screen flex flex-col bg-gradient-to-br from-background via-background to-secondary/10">
        <div className="flex-grow flex flex-col">
          {children}
        </div>
        <Toaster />
      </body>
    </html>
  );
}

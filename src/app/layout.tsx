import type {Metadata} from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { ClerkProvider } from "@clerk/nextjs";

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
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
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning className={`${inter.variable}`}>
        <head>
        </head>
        <body className="font-sans antialiased min-h-screen flex flex-col bg-gradient-to-br from-background via-background to-secondary/10">
          <div className="flex-grow flex flex-col">
            {children}
          </div>
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}

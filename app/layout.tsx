import DeployButton from "@/components/deploy-button";
import { EnvVarWarning } from "@/components/env-var-warning";
import HeaderAuth from "@/components/header-auth";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { hasEnvVars } from "@/utils/supabase/check-env-vars";
import { ThemeProvider } from "next-themes";
import Link from "next/link";
import "./globals.css";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "LockInLearn - AI-Powered Learning Platform",
  description: "Transform passive reading into active learning with AI mentors, focused study sessions, and intelligent document analysis.",
  keywords: "AI learning, study platform, document analysis, focus timer, learning assistant",
  openGraph: {
    title: "LockInLearn - Master Any Subject with AI",
    description: "Transform your learning experience with AI mentors and smart study tools",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-background text-foreground font-sans">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <main className="min-h-screen flex flex-col items-center">
            <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16 backdrop-blur-sm bg-background/80 sticky top-0 z-50">
              <div className="w-full max-w-7xl flex justify-between items-center p-3 px-5">
                <div className="flex items-center gap-6">
                  <Link href="/" className="flex items-center gap-2 font-heading font-bold text-xl">
                    📚 LockInLearn
                  </Link>
                  <div className="hidden md:flex gap-6">
                    <Link href="#features" className="text-muted-foreground hover:text-primary transition-colors">
                      Features
                    </Link>
                    <Link href="#how-it-works" className="text-muted-foreground hover:text-primary transition-colors">
                      How it Works
                    </Link>
                    <Link href="#pricing" className="text-muted-foreground hover:text-primary transition-colors">
                      Pricing
                    </Link>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  {!hasEnvVars ? <EnvVarWarning /> : <HeaderAuth />}
                  <ThemeSwitcher />
                </div>
              </div>
            </nav>

            <div className="flex-1 w-full">
              {children}
            </div>

            <footer className="w-full border-t border-border/50 bg-muted/50">
              <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                  <div>
                    <h3 className="font-heading font-semibold mb-4">Product</h3>
                    <ul className="space-y-2">
                      <li><Link href="#features" className="text-muted-foreground hover:text-primary transition-colors">Features</Link></li>
                      <li><Link href="#pricing" className="text-muted-foreground hover:text-primary transition-colors">Pricing</Link></li>
                      <li><Link href="#testimonials" className="text-muted-foreground hover:text-primary transition-colors">Testimonials</Link></li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold mb-4">Resources</h3>
                    <ul className="space-y-2">
                      <li><Link href="/blog" className="text-muted-foreground hover:text-primary transition-colors">Blog</Link></li>
                      <li><Link href="/guides" className="text-muted-foreground hover:text-primary transition-colors">Study Guides</Link></li>
                      <li><Link href="/support" className="text-muted-foreground hover:text-primary transition-colors">Support</Link></li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold mb-4">Company</h3>
                    <ul className="space-y-2">
                      <li><Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">About</Link></li>
                      <li><Link href="/privacy" className="text-muted-foreground hover:text-primary transition-colors">Privacy</Link></li>
                      <li><Link href="/terms" className="text-muted-foreground hover:text-primary transition-colors">Terms</Link></li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold mb-4">Contact</h3>
                    <ul className="space-y-2">
                      <li><a href="mailto:hello@lockinlearn.com" className="text-muted-foreground hover:text-primary transition-colors">Email Us</a></li>
                      <li><Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">Contact Form</Link></li>
                    </ul>
                  </div>
                </div>
                <div className="mt-8 pt-8 border-t border-border/50 text-center text-sm text-muted-foreground">
                  <p>© 2025 LockInLearn. All rights reserved.</p>
                </div>
              </div>
            </footer>
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}

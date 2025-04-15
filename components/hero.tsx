import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="bg-background py-20">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 items-center gap-12">
        {/* Text Content */}
        <div>
          <h1 className="text-4xl sm:text-5xl font-heading font-bold mb-6 leading-tight">
            Lock In. Learn Deep. <br className="hidden sm:block" />
            <span className="text-primary">With AI That Keeps You Focused.</span>
          </h1>
          <p className="text-muted-foreground text-lg mb-8 max-w-xl">
            Upload books, slides, or notes. Chat with an AI mentor. Stay disciplined with study plans, Pomodoro sessions, and real progress tracking. No more passive learning.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="text-base bg-primary hover:bg-primary/90">
              <Sparkles className="w-5 h-5 mr-2" /> Start Learning Free
            </Button>
            <Button size="lg" variant="ghost" className="text-base text-primary hover:text-primary/90 hover:bg-primary/10">
              Watch Demo
            </Button>
          </div>
        </div>

        {/* Illustration or Mockup */}
        <div className="relative w-full h-[320px] sm:h-[400px] lg:h-[480px]">
          <Image
            src="/hero-image.jpg"
            alt="App interface preview"
            layout="fill"
            objectFit="contain"
            priority
          />
        </div>
      </div>
    </section>
  );
}

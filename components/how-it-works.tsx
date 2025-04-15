import { Button } from "./ui/button";

const steps = [
  {
    number: "01",
    title: "Select your learning material",
    description: "Upload any PDF, document, presentation or Youtube video. Our AI automatically organizes it into digestible chapters."
  },
  {
    number: "02",
    title: "Choose Your AI Mentor",
    description: "Select from our roster of mentor personas, each with unique teaching styles and expertise."
  },
  {
    number: "03",
    title: "Start Learning Sessions",
    description: "Follow structured Pomodoro sessions with AI guidance, progress tracking, and interactive Q&A."
  },
  {
    number: "04",
    title: "Track Your Progress",
    description: "Review your learning analytics, streaks, and comprehension scores in detailed dashboards."
  }
];

export default function HowItWorks() {
  return (
    <div className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-heading font-bold mb-4">How LockInLearn Works</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A simple yet powerful process to revolutionize your learning experience
          </p>
        </div>

        <div className="grid gap-12 relative">
          {/* Vertical line for desktop */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-border" />

          {steps.map((step, i) => (
            <div key={i} className="relative">
              <div className={`md:grid md:grid-cols-2 md:gap-8 items-center ${i % 2 === 0 ? '' : 'md:[&>div:first-child]:order-2'}`}>
                {/* Content */}
                <div className="mb-8 md:mb-0">
                  <div className="text-secondary font-bold text-sm mb-2">{step.number}</div>
                  <h3 className="text-2xl font-heading font-bold mb-4">{step.title}</h3>
                  <p className="text-muted-foreground text-lg">{step.description}</p>
                </div>
                
                {/* Circle and Image placeholder */}
                <div className="relative flex justify-center">
                  <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center">
                    <div className="w-8 h-8 rounded-full bg-accent" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <Button size="lg" className="bg-primary hover:bg-primary/90 text-white font-medium">
            Start Your Learning Journey
          </Button>
        </div>
      </div>
    </div>
  );
}
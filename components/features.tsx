import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, Brain, Timer, BookOpen, BarChart, Lock, MessageCircleQuestion, UserCheck, CalendarDays } from "lucide-react";

const features = [
  {
    icon: <Sparkles className="h-6 w-6 text-primary" />,
    title: "Learn With AI Mentors",
    description: "Choose from inspiring personas like Einstein or Marie Curie to guide your study sessions in their unique style."
  },
  {
    icon: <BookOpen className="h-6 w-6 text-primary" />,
    title: "Document-Based Learning",
    description: "Upload slides, books, or notes. Interact with your material in a smart, focused interface."
  },
  {
    icon: <Brain className="h-6 w-6 text-primary" />,
    title: "Science-Backed Methods",
    description: "Built with principles from Learning How to Learn, recall, and chunking for deeper understanding."
  },
  {
    icon: <Timer className="h-6 w-6 text-secondary" />,
    title: "Pomodoro Focus Sessions",
    description: "Stay disciplined with built-in Pomodoro timers, session tracking, and progress-based rewards."
  },
  {
    icon: <BarChart className="h-6 w-6 text-primary" />,
    title: "Progress & Accountability",
    description: "Track every page you read, time spent, and improvements made. Lock in habits, not just time."
  },
  {
    icon: <Lock className="h-6 w-6 text-primary" />,
    title: "Distraction Lock-In Mode",
    description: "We detect tab switching and early exits to help you stay on track. Your time matters — use it wisely."
  },
  {
    icon: <MessageCircleQuestion className="h-6 w-6 text-primary" />,
    title: "Ask Questions Anytime",
    description: "Talk to the AI about what you're reading — get clarifications, deeper explanations, or simple analogies."
  },
  {
    icon: <UserCheck className="h-6 w-6 text-primary" />,
    title: "Personal Learning Tracker",
    description: "See your study history, time logs, reading pace, and even skipped pages. Self-awareness = self-growth."
  },
  {
    icon: <CalendarDays className="h-6 w-6 text-primary" />,
    title: "Study Plans & Streaks",
    description: "Create your weekly learning schedule and earn streaks and rewards for showing up. Learning is a habit."
  }
];

export default function FeaturesSection() {
  return (
    <section className="py-12 bg-background">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-heading font-bold mb-4">Why LockInLearn Works</h2>
        <p className="text-muted-foreground text-lg mb-10">
          Our features combine AI, cognitive science, and design to help you learn better and stay focused.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <Card key={i} className="border border-border/50 hover:border-primary/50 transition-colors duration-200 h-full">
              <CardContent className="p-6 space-y-4">
                <div className="flex justify-center">{feature.icon}</div>
                <h3 className="text-lg font-heading font-semibold">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

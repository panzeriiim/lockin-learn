import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart, BookOpen, Timer, CalendarDays, Sparkles } from "lucide-react";
import { LessonCard } from "@/components/ui/lesson-card";

// Mock data - In a real app, this would come from your database
const lessonData = [
  {
    title: "C++ Part 1",
    description: "Object-Oriented Programming Basics",
    progress: 65,
    timeSpent: 35,
    totalSections: 5,
    completedSections: 3,
    beginDate: new Date(2025, 3, 10),
    endDate: new Date(2025, 4, 10)
  },
  {
    title: "Python Basics",
    description: "Introduction to Python Programming",
    progress: 25,
    timeSpent: 15,
    totalSections: 4,
    completedSections: 1,
    beginDate: new Date(2025, 3, 15),
    endDate: new Date(2025, 5, 1)
  },
  {
    title: "Web Development",
    description: "HTML & CSS Fundamentals",
    progress: 85,
    timeSpent: 45,
    totalSections: 6,
    completedSections: 5,
    beginDate: new Date(2025, 3, 1),
    endDate: new Date(2025, 3, 30)
  }
];

export default async function DashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  return (
    <div className="flex-1 space-y-8 p-8 pt-6">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Welcome back{user.email ? `, ${user.email.split('@')[0]}` : ''}!</h2>
          <p className="text-muted-foreground">Here's your learning progress and upcoming sessions.</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-accent/30 text-accent-foreground px-3 py-1 rounded-full">
            <span>🔥</span>
            <span className="text-sm font-medium">4-day streak</span>
          </div>
          <div className="flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full">
            <span>💳</span>
            <span className="text-sm font-medium">120 credits</span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <Button className="bg-primary">
          <BookOpen className="h-4 w-4 mr-2" />
          Create Learning Section
        </Button>
        <Button variant="outline">
          <CalendarDays className="h-4 w-4 mr-2" />
          Create Learning Plan
        </Button>
      </div>

      {/* Lesson Overview Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {lessonData.map((lesson, index) => (
          <LessonCard key={index} {...lesson} />
        ))}
      </div>

      {/* Stats & Calendar Section */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Study Stats */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart className="h-5 w-5 text-primary" />
              Study Statistics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-2xl font-bold">3.5h</p>
                <p className="text-xs text-muted-foreground">Total time this week</p>
              </div>
              <div className="space-y-1">
                <p className="text-2xl font-bold">12</p>
                <p className="text-xs text-muted-foreground">Pomodoro sessions</p>
              </div>
              <div className="space-y-1">
                <p className="text-2xl font-bold">85%</p>
                <p className="text-xs text-muted-foreground">Focus score</p>
              </div>
              <div className="space-y-1">
                <p className="text-2xl font-bold">2</p>
                <p className="text-xs text-muted-foreground">Lessons completed</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Calendar View */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CalendarDays className="h-5 w-5 text-primary" />
              Study Calendar
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center text-muted-foreground">
              <p>Calendar view coming soon...</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Mentor Message */}
      <Card className="bg-primary/5 border-none">
        <CardContent className="pt-6">
          <div className="flex items-start gap-4">
            <div className="rounded-full bg-primary/10 p-3">
              <Sparkles className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h4 className="font-semibold mb-1">AI Mentor Message</h4>
              <p className="text-muted-foreground">
                "Great progress on your C++ journey! You're consistently hitting your study goals. 
                Remember: small, regular study sessions are more effective than cramming. Ready for another focused session?"
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
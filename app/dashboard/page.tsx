"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  BarChart,
  BookOpen,
  Timer,
  CalendarDays,
  Sparkles,
  MessageCircleQuestion,
} from "lucide-react";
import { LessonCard } from "@/components/ui/lesson-card";
import { UploadDialog } from "@/components/ui/upload-dialog";

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
    endDate: new Date(2025, 4, 10),
  },
  {
    title: "Python Basics",
    description: "Introduction to Python Programming",
    progress: 25,
    timeSpent: 15,
    totalSections: 4,
    completedSections: 1,
    beginDate: new Date(2025, 3, 15),
    endDate: new Date(2025, 5, 1),
  },
  {
    title: "Web Development",
    description: "HTML & CSS Fundamentals",
    progress: 85,
    timeSpent: 45,
    totalSections: 6,
    completedSections: 5,
    beginDate: new Date(2025, 3, 1),
    endDate: new Date(2025, 3, 30),
  },
];

export default function DashboardPage() {
  const [showUploadDialog, setShowUploadDialog] = useState(false);
  const [user, setUser] = useState<any>(null);
  const supabase = createClient();

  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        redirect("/sign-in");
      }
      setUser(user);
    };

    checkUser();
  }, []);

  const handleUploadSuccess = (lessonId: string) => {
    // TODO: Refresh lessons list
    console.log("Lesson created:", lessonId);
    setShowUploadDialog(false);
  };

  return (
    <div className="flex-1 space-y-8 p-8 pt-6">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">
            Welcome back{user?.email ? `, ${user.email.split("@")[0]}` : ""}!
          </h2>
          <p className="text-muted-foreground">
            Here's your learning progress and upcoming sessions.
          </p>
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
      <div className="flex gap-4 items-center">
        <Button
          className="bg-primary"
          onClick={() => setShowUploadDialog(true)}
        >
          <BookOpen className="h-4 w-4 mr-2" />
          Convert to Interactive Lesson
        </Button>

        <div className="ml-auto flex items-center gap-2 bg-primary/10 text-primary px-3 py-1.5 rounded-full">
          <BookOpen className="h-4 w-4" />
          <span className="text-sm font-medium">3 Active Lessons</span>
        </div>
      </div>

      <UploadDialog
        isOpen={showUploadDialog}
        onClose={() => setShowUploadDialog(false)}
        onSuccess={handleUploadSuccess}
      />

      {/* Lesson Overview Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Current Learning</h3>
          <Button variant="ghost" size="sm">
            View All
          </Button>
        </div>

        {/* Lesson Cards Grid - More responsive */}
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {lessonData.map((lesson, index) => (
            <LessonCard key={index} {...lesson} />
          ))}
        </div>

        {/* Quick Resume Section */}
        <div className="mt-8 p-4 bg-primary/5 rounded-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Quick Resume</h3>
            <Button variant="outline" size="sm" className="gap-2">
              <Timer className="h-4 w-4" />
              Start Session
            </Button>
          </div>
          <p className="text-muted-foreground">
            Continue where you left off in "C++ Part 1" - Section: Classes and
            Objects
          </p>
          <div className="mt-4 flex gap-4">
            <Button variant="outline" className="gap-2">
              <BookOpen className="h-4 w-4" />
              Resume Reading
            </Button>
            <Button variant="outline" className="gap-2">
              <MessageCircleQuestion className="h-4 w-4" />
              Review Notes
            </Button>
          </div>
        </div>
      </div>

      {/* Stats & Calendar Section */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Study Stats */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BarChart className="h-5 w-5 text-primary" />
                Study Statistics
              </div>
              <Button variant="ghost" size="sm">
                This Week ▾
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">Study Time</p>
                  <span className="text-xs text-primary">+12%</span>
                </div>
                <p className="text-2xl font-bold">3.5h</p>
                <div className="h-2 bg-secondary/30 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full"
                    style={{ width: "70%" }}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">Focus Score</p>
                  <span className="text-xs text-primary">+5%</span>
                </div>
                <p className="text-2xl font-bold">85%</p>
                <div className="h-2 bg-secondary/30 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full"
                    style={{ width: "85%" }}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">Pomodoros</p>
                  <span className="text-xs text-primary">+3</span>
                </div>
                <p className="text-2xl font-bold">12</p>
                <div className="h-2 bg-secondary/30 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full"
                    style={{ width: "60%" }}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">Completion</p>
                  <span className="text-xs text-primary">+2</span>
                </div>
                <p className="text-2xl font-bold">2/3</p>
                <div className="h-2 bg-secondary/30 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full"
                    style={{ width: "66%" }}
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Calendar View */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CalendarDays className="h-5 w-5 text-primary" />
                Upcoming Sessions
              </div>
              <Button variant="ghost" size="sm">
                Full Calendar
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-3 bg-accent/10 rounded-lg">
                <div className="flex-shrink-0 text-center">
                  <div className="text-sm font-medium">TODAY</div>
                  <div className="text-2xl font-bold text-primary">03</div>
                  <div className="text-xs text-muted-foreground">MAY</div>
                </div>
                <div className="flex-1">
                  <h4 className="font-medium">C++ OOP Concepts</h4>
                  <p className="text-sm text-muted-foreground">
                    25min focused session
                  </p>
                </div>
                <Button size="sm" className="gap-2">
                  <Timer className="h-4 w-4" />
                  Start
                </Button>
              </div>

              <div className="flex items-center gap-4 p-3 rounded-lg border border-border/50">
                <div className="flex-shrink-0 text-center">
                  <div className="text-sm font-medium">THU</div>
                  <div className="text-2xl font-bold">04</div>
                  <div className="text-xs text-muted-foreground">MAY</div>
                </div>
                <div className="flex-1">
                  <h4 className="font-medium">Python Data Structures</h4>
                  <p className="text-sm text-muted-foreground">
                    45min study session
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  Reschedule
                </Button>
              </div>

              <div className="flex items-center gap-4 p-3 rounded-lg border border-border/50">
                <div className="flex-shrink-0 text-center">
                  <div className="text-sm font-medium">FRI</div>
                  <div className="text-2xl font-bold">05</div>
                  <div className="text-xs text-muted-foreground">MAY</div>
                </div>
                <div className="flex-1">
                  <h4 className="font-medium">Web Dev Practice</h4>
                  <p className="text-sm text-muted-foreground">
                    1h project work
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  Reschedule
                </Button>
              </div>
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
            <div className="flex-1">
              <h4 className="font-semibold mb-1">AI Mentor Message</h4>
              <p className="text-muted-foreground mb-4">
                "Great progress on your C++ journey! You're consistently hitting
                your study goals. Remember: small, regular study sessions are
                more effective than cramming. Ready for another focused
                session?"
              </p>
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" size="sm" className="gap-2">
                  <Timer className="h-4 w-4" />
                  Start 25min Session
                </Button>
                <Button variant="outline" size="sm" className="gap-2">
                  <BookOpen className="h-4 w-4" />
                  Review Last Session
                </Button>
                <Button variant="ghost" size="sm">
                  Customize AI Mentor
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

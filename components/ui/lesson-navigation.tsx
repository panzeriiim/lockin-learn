"use client";

import { Check, BookOpen } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./card";
import { cn } from "@/lib/utils";

interface Section {
  id: string;
  title: string;
  status: "completed" | "in-progress" | "not-started";
  duration: number; // in minutes
}

interface LessonNavigationProps {
  sections: Section[];
  currentSectionId: string;
  onSectionChange: (sectionId: string) => void;
}

export function LessonNavigation({
  sections,
  currentSectionId,
  onSectionChange,
}: LessonNavigationProps) {
  const currentSection = sections.find((s) => s.id === currentSectionId);
  const completedCount = sections.filter(
    (s) => s.status === "completed"
  ).length;

  return (
    <div className="w-full space-y-4">
      <Card className="border-border/50">
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-primary" />
              Lesson Progress
            </div>
            <span className="text-sm text-muted-foreground">
              {completedCount}/{sections.length} completed
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className="pb-3">
          <div className="space-y-1">
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-primary rounded-full transition-all duration-500"
                style={{
                  width: `${(completedCount / sections.length) * 100}%`,
                }}
              />
            </div>
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>Overall Progress</span>
              <span>
                {Math.round((completedCount / sections.length) * 100)}% Complete
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-3">
        <h2 className="text-lg font-semibold mb-4">Course Progress</h2>
        <div className="space-y-2">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => onSectionChange(section.id)}
              className={cn(
                "w-full text-left px-3 py-2.5 rounded-lg transition-all duration-200",
                "hover:bg-accent/50 focus:outline-none focus:ring-2 focus:ring-primary/20",
                "flex items-center gap-3 group",
                currentSectionId === section.id && "bg-accent"
              )}
            >
              <div className="relative w-5 h-5">
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="10"
                    cy="10"
                    r="8"
                    strokeWidth="2"
                    fill="none"
                    className="stroke-muted-foreground/20"
                  />
                  <circle
                    cx="10"
                    cy="10"
                    r="8"
                    strokeWidth="2"
                    fill="none"
                    className={cn(
                      "stroke-primary transition-all duration-200",
                      section.status === "completed" && "stroke-green-500",
                      section.status === "not-started" && "stroke-none"
                    )}
                    strokeDasharray={50}
                    strokeDashoffset={
                      section.status === "completed"
                        ? 0
                        : section.status === "in-progress"
                          ? 25
                          : 50
                    }
                  />
                  {section.status === "completed" && (
                    <Check className="w-3 h-3 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-green-500" />
                  )}
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{section.title}</p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {section.duration} min
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

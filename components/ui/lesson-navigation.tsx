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
        {sections.map((section) => (
          <Card
            key={section.id}
            className={cn(
              "cursor-pointer transition-all duration-200 hover:shadow-md",
              section.id === currentSectionId &&
                "ring-2 ring-primary shadow-sm",
              section.status === "completed" && "bg-primary/5"
            )}
            onClick={() => onSectionChange(section.id)}
          >
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                {section.status === "completed" ? (
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <Check className="h-4 w-4 text-primary" />
                  </div>
                ) : (
                  <div
                    className={cn(
                      "h-8 w-8 rounded-full flex items-center justify-center",
                      section.status === "in-progress"
                        ? "bg-primary/10"
                        : "bg-muted"
                    )}
                  >
                    <div
                      className={cn(
                        "h-3 w-3 rounded-full",
                        section.status === "in-progress"
                          ? "bg-primary"
                          : "bg-muted-foreground/30"
                      )}
                    />
                  </div>
                )}
                <div className="flex-1">
                  <h3
                    className={cn(
                      "font-medium",
                      section.status === "completed" && "text-primary"
                    )}
                  >
                    {section.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {section.duration} min
                  </p>
                </div>
                {section.id === currentSectionId && (
                  <span className="text-xs font-medium text-primary">
                    Current
                  </span>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { Brain, Clock, BookOpen } from "lucide-react";

interface ReadingProgressProps {
  totalPages: number;
  currentPage: number;
  focusMode?: boolean;
}

export function ReadingProgress({
  totalPages,
  currentPage,
  focusMode = false,
}: ReadingProgressProps) {
  const [readingTime, setReadingTime] = useState(0);
  const [focusScore, setFocusScore] = useState(100);
  const [lastActivity, setLastActivity] = useState(Date.now());

  // Update reading time every second when the window is active
  useEffect(() => {
    let interval: NodeJS.Timeout;
    let timeout: NodeJS.Timeout;

    const handleActivity = () => {
      const now = Date.now();
      const timeSinceLastActivity = now - lastActivity;

      // If user was inactive for more than 30 seconds, reduce focus score
      if (timeSinceLastActivity > 30000) {
        setFocusScore((prev) => Math.max(prev - 5, 0));
      }

      setLastActivity(now);
      clearTimeout(timeout);

      // Set timeout to reduce focus score if no activity
      timeout = setTimeout(() => {
        setFocusScore((prev) => Math.max(prev - 2, 0));
      }, 30000);
    };

    if (document.hasFocus()) {
      interval = setInterval(() => {
        setReadingTime((prev) => prev + 1);
      }, 1000);
    }

    window.addEventListener("mousemove", handleActivity);
    window.addEventListener("keydown", handleActivity);
    window.addEventListener("scroll", handleActivity);

    return () => {
      if (interval) clearInterval(interval);
      if (timeout) clearTimeout(timeout);
      window.removeEventListener("mousemove", handleActivity);
      window.removeEventListener("keydown", handleActivity);
      window.removeEventListener("scroll", handleActivity);
    };
  }, [lastActivity]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  return (
    <div
      className={cn(
        "grid grid-cols-3 gap-4 p-4 border-t border-border/50",
        focusMode && "bg-[#1a1a1a] border-[#2a2a2a]"
      )}
    >
      <div className="flex items-center gap-3">
        <div
          className={cn(
            "w-8 h-8 rounded-full flex items-center justify-center",
            focusMode ? "bg-primary/20" : "bg-primary/10"
          )}
        >
          <Clock className="w-4 h-4 text-primary" />
        </div>
        <div>
          <div className="text-sm font-medium">{formatTime(readingTime)}</div>
          <div className="text-xs text-muted-foreground">Reading Time</div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div
          className={cn(
            "w-8 h-8 rounded-full flex items-center justify-center",
            focusMode ? "bg-primary/20" : "bg-primary/10"
          )}
        >
          <BookOpen className="w-4 h-4 text-primary" />
        </div>
        <div>
          <div className="text-sm font-medium">
            {currentPage} / {totalPages}
          </div>
          <div className="text-xs text-muted-foreground">Pages Read</div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div
          className={cn(
            "w-8 h-8 rounded-full flex items-center justify-center",
            focusMode ? "bg-primary/20" : "bg-primary/10"
          )}
        >
          <Brain className="w-4 h-4 text-primary" />
        </div>
        <div>
          <div className="text-sm font-medium">{focusScore}%</div>
          <div className="text-xs text-muted-foreground">Focus Score</div>
        </div>
      </div>

      <div className="col-span-3">
        <div className="space-y-1">
          <div className="text-xs text-muted-foreground">Reading Progress</div>
          <Progress value={(currentPage / totalPages) * 100} />
        </div>
      </div>
    </div>
  );
}

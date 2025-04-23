"use client";

import { cn } from "@/lib/utils";
import { Card, CardContent } from "./card";
import { Bot, User } from "lucide-react";
import { useEffect, useState } from "react";

interface ChatMessageProps {
  content: string;
  role: "assistant" | "user";
  timestamp: Date;
  isConsecutive?: boolean;
}

export function ChatMessage({
  content,
  role,
  timestamp,
  isConsecutive = false,
}: ChatMessageProps) {
  const isAssistant = role === "assistant";
  const [timeString, setTimeString] = useState<string>("");

  // Move time formatting to useEffect to avoid hydration mismatch
  useEffect(() => {
    setTimeString(
      new Date(timestamp).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })
    );
  }, [timestamp]);

  return (
    <div
      className={cn(
        "flex gap-3",
        isAssistant ? "flex-row" : "flex-row-reverse"
      )}
    >
      {!isConsecutive && (
        <div
          className={cn(
            "w-8 h-8 rounded-full flex items-center justify-center shrink-0",
            isAssistant ? "bg-primary/10" : "bg-secondary/10"
          )}
        >
          {isAssistant ? (
            <Bot className="h-4 w-4 text-primary" />
          ) : (
            <User className="h-4 w-4 text-secondary" />
          )}
        </div>
      )}
      <div
        className={cn(
          "flex-1",
          isConsecutive && (isAssistant ? "ml-11" : "mr-11")
        )}
      >
        <Card
          className={cn(
            "inline-block max-w-[85%] shadow-sm",
            isAssistant ? "bg-card" : "bg-primary/5",
            isConsecutive && "mt-1"
          )}
        >
          <CardContent className="p-3 text-sm leading-relaxed">
            {content}
          </CardContent>
        </Card>
        {!isConsecutive && (
          <div className="mt-1 text-xs text-muted-foreground">{timeString}</div>
        )}
      </div>
    </div>
  );
}

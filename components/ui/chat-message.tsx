'use client';

import { cn } from "@/lib/utils";
import { Avatar } from "./avatar";
import { Card, CardContent } from "./card";
import { Bot, User } from "lucide-react";
import { useEffect, useState } from "react";

interface ChatMessageProps {
  content: string;
  role: "assistant" | "user";
  avatar?: string;
  timestamp?: Date;
}

export function ChatMessage({ 
  content, 
  role, 
  avatar, 
  timestamp = new Date() 
}: ChatMessageProps) {
  const isAssistant = role === "assistant";
  const [timeString, setTimeString] = useState<string>("");

  // Move time formatting to useEffect to avoid hydration mismatch
  useEffect(() => {
    setTimeString(new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    }));
  }, [timestamp]);

  return (
    <div className={cn(
      "flex gap-3 mb-4",
      isAssistant ? "flex-row" : "flex-row-reverse"
    )}>
      <div className={cn(
        "w-8 h-8 rounded-full flex items-center justify-center",
        isAssistant ? "bg-primary/10" : "bg-secondary/10"
      )}>
        {isAssistant ? (
          <Bot className="h-4 w-4 text-primary" />
        ) : (
          <User className="h-4 w-4 text-secondary" />
        )}
      </div>
      <div className="flex-1">
        <Card className={cn(
          "inline-block max-w-[85%]",
          isAssistant ? "bg-card" : "bg-primary/5"
        )}>
          <CardContent className="p-3 text-sm">
            {content}
          </CardContent>
        </Card>
        <div className="mt-1 text-xs text-muted-foreground">
          {timeString}
        </div>
      </div>
    </div>
  );
}
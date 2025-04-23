import { useState, useRef, useEffect } from "react";
import { Button } from "./button";
import { ChatMessage } from "./chat-message";
import {
  Loader2,
  SendHorizonal,
  Sparkles,
  BookOpen,
  RotateCcw,
} from "lucide-react";

interface Message {
  id: string;
  content: string;
  role: "assistant" | "user";
  timestamp: Date;
}

interface ChatInterfaceProps {
  sections: Array<{
    id: string;
    title: string;
    status: "completed" | "in-progress" | "not-started";
    duration: number;
  }>;
  currentSectionId: string;
  onSectionChange: (id: string) => void;
}

export function ChatInterface({
  sections,
  currentSectionId,
  onSectionChange,
}: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content:
        "Hi! I'm your AI mentor for this section. I notice you're learning about Object-Oriented Programming in C++. Feel free to ask me any questions as you read through the material.",
      role: "assistant",
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "48px";
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + "px";
    }
  }, [inputMessage]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      role: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newMessage]);
    setInputMessage("");
    setIsTyping(true);

    // Simulate AI response - in a real app, this would be an API call
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content:
          "I'll help you understand that. In Object-Oriented Programming, classes are like blueprints for creating objects. Each object can have its own properties (attributes) and methods (functions). This helps organize code and model real-world concepts more naturally.",
        role: "assistant",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiResponse]);
      setIsTyping(false);
    }, 2000);
  };

  const quickActions = [
    { icon: <BookOpen className="h-4 w-4" />, label: "Explain this page" },
    { icon: <Sparkles className="h-4 w-4" />, label: "Give me an example" },
    { icon: <RotateCcw className="h-4 w-4" />, label: "Summarize key points" },
  ];

  return (
    <div className="flex flex-col h-full">
      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-4 max-w-3xl mx-auto">
          {messages.map((message, index) => (
            <ChatMessage
              key={message.id}
              content={message.content}
              role={message.role}
              timestamp={message.timestamp}
              isConsecutive={
                index > 0 &&
                messages[index - 1].role === message.role &&
                message.timestamp.getTime() -
                  messages[index - 1].timestamp.getTime() <
                  60000
              }
            />
          ))}
          {isTyping && (
            <div className="flex items-center gap-2 text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin" />
              AI is thinking...
            </div>
          )}
          <div ref={chatEndRef} />
        </div>
      </div>

      {/* Quick Actions */}
      <div className="px-4 py-2 border-t border-border/50">
        <div className="flex gap-2 max-w-3xl mx-auto overflow-x-auto pb-2">
          {quickActions.map((action, index) => (
            <Button
              key={index}
              variant="outline"
              className="whitespace-nowrap"
              onClick={() => {
                setInputMessage(action.label);
                if (textareaRef.current) {
                  textareaRef.current.focus();
                }
              }}
            >
              {action.icon}
              <span className="ml-2">{action.label}</span>
            </Button>
          ))}
        </div>
      </div>

      {/* Chat Input */}
      <div className="p-4 border-t border-border/50">
        <div className="relative max-w-3xl mx-auto">
          <textarea
            ref={textareaRef}
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
            rows={1}
            className="w-full rounded-lg border border-border/50 bg-background px-4 py-3 pr-12 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
            placeholder="Ask your AI mentor a question..."
            style={{ minHeight: "48px" }}
          />
          <Button
            size="icon"
            className="absolute right-2 bottom-2"
            onClick={handleSendMessage}
          >
            <SendHorizonal className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

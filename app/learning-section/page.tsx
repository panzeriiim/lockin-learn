"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Timer,
  MessageCircle,
  Maximize2,
  ChevronLeft,
  ChevronRight,
  FileText,
  Focus,
  Keyboard,
  GripVertical,
} from "lucide-react";
import { PomodoroTimer } from "@/components/ui/pomodoro-timer";
import { PDFViewer } from "@/components/ui/pdf-viewer";
import { ChatInterface } from "@/components/ui/chat-interface";
import { LearningStats } from "@/components/ui/learning-stats";
import { LessonNavigation } from "@/components/ui/lesson-navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

// Mock data for sections
const mockSections = [
  {
    id: "1",
    title: "Introduction to OOP",
    status: "completed" as const,
    duration: 15,
  },
  {
    id: "2",
    title: "Classes and Objects",
    status: "in-progress" as const,
    duration: 25,
  },
  {
    id: "3",
    title: "Inheritance",
    status: "not-started" as const,
    duration: 20,
  },
  {
    id: "4",
    title: "Polymorphism",
    status: "not-started" as const,
    duration: 30,
  },
  {
    id: "5",
    title: "Encapsulation",
    status: "not-started" as const,
    duration: 20,
  },
];

const keyboardShortcuts = [
  { key: "⌘ + →", description: "Next page" },
  { key: "⌘ + ←", description: "Previous page" },
  { key: "⌘ + L", description: "Toggle focus mode" },
  { key: "⌘ + K", description: "Show keyboard shortcuts" },
  { key: "⌘ + T", description: "Toggle timer" },
  { key: "⌘ + /", description: "Focus chat" },
];

export default function LearningSection() {
  const [currentSectionId, setCurrentSectionId] = useState("2");
  const [showTimer, setShowTimer] = useState(false);
  const [showKeyboardShortcuts, setShowKeyboardShortcuts] = useState(false);
  const [activeTab, setActiveTab] = useState<"document" | "chat">("document");
  const [isFocusMode, setIsFocusMode] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(true);
  const [chatWidth, setChatWidth] = useState(500);
  const [isResizing, setIsResizing] = useState(false);

  // Mock learning stats
  const learningStats = {
    pagesRead: 15,
    totalPages: 45,
    minutesSpent: 45,
    sectionsCompleted: 2,
    totalSections: 5,
    quizScore: 85,
  };

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey) {
        switch (e.key) {
          case "ArrowRight":
            // Handle next page
            break;
          case "ArrowLeft":
            // Handle previous page
            break;
          case "l":
            e.preventDefault();
            setIsFocusMode(!isFocusMode);
            break;
          case "k":
            e.preventDefault();
            setShowKeyboardShortcuts(true);
            break;
          case "t":
            e.preventDefault();
            setShowTimer(!showTimer);
            break;
          case "/":
            e.preventDefault();
            setActiveTab("chat");
            break;
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isFocusMode, showTimer]);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setIsResizing(true);
  }, []);

  const handleMouseUp = useCallback(() => {
    setIsResizing(false);
  }, []);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isResizing) return;

      const newWidth = window.innerWidth - e.clientX;
      // Set minimum and maximum width constraints
      if (newWidth > 300 && newWidth < window.innerWidth - 400) {
        setChatWidth(newWidth);
      }
    },
    [isResizing]
  );

  useEffect(() => {
    if (isResizing) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isResizing, handleMouseMove, handleMouseUp]);

  return (
    <main
      className={cn(
        "min-h-screen bg-background transition-colors duration-200",
        isFocusMode && "bg-[#1a1a1a]",
        isResizing && "select-none"
      )}
    >
      {/* Top Navigation Bar */}
      <nav
        className={cn(
          "h-14 border-b border-border/50 flex items-center px-4 justify-between bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50",
          isFocusMode &&
            "bg-[#1a1a1a]/95 supports-[backdrop-filter]:bg-[#1a1a1a]/60"
        )}
      >
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <h1 className="font-heading font-semibold line-clamp-1">
            C++ Part 1: Object-Oriented Programming Basics
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsFocusMode(!isFocusMode)}
            className={cn(isFocusMode && "text-primary")}
          >
            <Focus className="h-5 w-5" />
          </Button>
          <Dialog
            open={showKeyboardShortcuts}
            onOpenChange={setShowKeyboardShortcuts}
          >
            <DialogTrigger asChild>
              <Button variant="ghost" size="icon">
                <Keyboard className="h-5 w-5" />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Keyboard Shortcuts</DialogTitle>
              </DialogHeader>
              <div className="grid grid-cols-2 gap-4 py-4">
                {keyboardShortcuts.map((shortcut, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">
                      {shortcut.key}
                    </code>
                    <span className="text-sm text-muted-foreground">
                      {shortcut.description}
                    </span>
                  </div>
                ))}
              </div>
            </DialogContent>
          </Dialog>
          <Button
            variant="ghost"
            size="sm"
            className="gap-2"
            onClick={() => setShowTimer(!showTimer)}
          >
            <Timer className="h-4 w-4" />
            <span className="hidden sm:inline">Start Timer</span>
          </Button>
          <Button variant="ghost" size="icon">
            <Maximize2 className="h-5 w-5" />
          </Button>
        </div>
      </nav>

      {/* Mobile Tab Navigation */}
      <div className="md:hidden border-b border-border/50 bg-card">
        <div className="flex">
          <Button
            variant={activeTab === "document" ? "ghost" : "ghost"}
            className={cn(
              "flex-1 justify-center rounded-none border-b-2",
              activeTab === "document" ? "border-primary" : "border-transparent"
            )}
            onClick={() => setActiveTab("document")}
          >
            <FileText className="h-4 w-4 mr-2" />
            Document
          </Button>
          <Button
            variant={activeTab === "chat" ? "ghost" : "ghost"}
            className={cn(
              "flex-1 justify-center rounded-none border-b-2",
              activeTab === "chat" ? "border-primary" : "border-transparent"
            )}
            onClick={() => setActiveTab("chat")}
          >
            <MessageCircle className="h-4 w-4 mr-2" />
            Chat
          </Button>
        </div>
      </div>

      {/* Timer Overlay */}
      {showTimer && (
        <div className="fixed top-20 right-4 z-50 w-[300px]">
          <PomodoroTimer
            onSessionComplete={() => console.log("Session complete")}
          />
        </div>
      )}

      {/* Main Content Area */}
      <div
        className={cn(
          "flex h-[calc(100vh-3.5rem)] relative",
          isFocusMode && "opacity-90"
        )}
      >
        {/* Left Panel - Lesson Navigation */}
        <div
          className={cn(
            "border-r border-border/50 bg-background/95 transition-all duration-300 h-full absolute z-50",
            isNavOpen ? "w-[300px]" : "w-[50px]",
            isFocusMode && "bg-[#1a1a1a]/95 border-[#2a2a2a]"
          )}
        >
          {/* Adjust padding when collapsed */}
          <div
            className={cn(
              "h-full overflow-y-auto",
              isNavOpen ? "p-4" : "p-1 pt-4"
            )}
          >
            <Button
              variant="ghost"
              // Change size and centering based on isNavOpen
              size={isNavOpen ? "sm" : "icon"}
              className={cn(
                "mb-4 sticky top-0 bg-background/95 z-10",
                isNavOpen ? "w-full justify-between" : "mx-auto flex" // Use mx-auto and flex for centering icon button
              )}
              onClick={() => setIsNavOpen(!isNavOpen)}
            >
              {isNavOpen ? (
                <>
                  Lesson Progress
                  <ChevronLeft className="h-4 w-4" />
                </>
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
            </Button>
            {isNavOpen && (
              <div className="space-y-2">
                <LessonNavigation
                  sections={mockSections}
                  currentSectionId={currentSectionId}
                  onSectionChange={setCurrentSectionId}
                />
              </div>
            )}
          </div>
        </div>

        {/* Main Content Area */}
        <div
          className="flex flex-1 h-full"
          style={{ marginLeft: isNavOpen ? "300px" : "50px" }}
        >
          {/* Center Panel - Document Viewer */}
          <div className="flex-1 h-full relative min-w-0">
            <div className="absolute inset-0">
              <PDFViewer pdfUrl="/sample.pdf" />
            </div>
          </div>

          {/* Resizable Handle */}
          <div
            className={cn(
              "w-1 hover:w-2 cursor-col-resize flex items-center justify-center border-l border-r border-border/50 bg-border/50 hover:bg-primary/50 transition-colors",
              isResizing && "bg-primary/50"
            )}
            onMouseDown={handleMouseDown}
          >
            <GripVertical className="h-4 w-4 text-muted-foreground" />
          </div>

          {/* Right Panel - AI Assistant */}
          <div
            style={{ width: `${chatWidth}px` }}
            className={cn(
              "h-full flex flex-col border-l border-border/50",
              isFocusMode && "bg-[#1a1a1a] border-[#2a2a2a]"
            )}
          >
            <ChatInterface
              sections={mockSections}
              currentSectionId={currentSectionId}
              onSectionChange={setCurrentSectionId}
            />
          </div>
        </div>
      </div>
    </main>
  );
}

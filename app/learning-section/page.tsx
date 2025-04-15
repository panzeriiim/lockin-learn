'use client';

import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Timer, MessageCircle, BookOpen, Maximize2, ChevronLeft, ChevronRight, BarChart, FileText } from "lucide-react";
import { PomodoroTimer } from "@/components/ui/pomodoro-timer";
import { LessonNavigation } from "@/components/ui/lesson-navigation";
import { ChatMessage } from "@/components/ui/chat-message";

// Mock data for sections
const mockSections = [
  { id: '1', title: 'Introduction to OOP', status: 'completed' as const, duration: 15 },
  { id: '2', title: 'Classes and Objects', status: 'in-progress' as const, duration: 25 },
  { id: '3', title: 'Inheritance', status: 'not-started' as const, duration: 20 },
  { id: '4', title: 'Polymorphism', status: 'not-started' as const, duration: 30 },
  { id: '5', title: 'Encapsulation', status: 'not-started' as const, duration: 20 },
];

interface Message {
  content: string;
  role: "assistant" | "user";
  timestamp: Date;
}

export default function LearningSection() {
  const [currentSectionId, setCurrentSectionId] = useState('2');
  const [showTimer, setShowTimer] = useState(false);
  const [activeTab, setActiveTab] = useState<'document' | 'chat'>('document');
  const [messages, setMessages] = useState<Message[]>([
    {
      content: "Hi! I'm your AI mentor for this section. I notice you're learning about Object-Oriented Programming in C++. Feel free to ask me any questions as you read through the material.",
      role: "assistant",
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom when new messages arrive
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const newMessage: Message = {
      content: inputMessage,
      role: "user",
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newMessage]);
    setInputMessage('');

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        content: "I'll help you understand that. In Object-Oriented Programming, classes are like blueprints for creating objects. Each object can have its own properties (attributes) and methods (functions). This helps organize code and model real-world concepts more naturally.",
        role: "assistant",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  return (
    <main className="min-h-screen bg-background">
      {/* Top Navigation Bar */}
      <nav className="h-14 border-b border-border/50 flex items-center px-4 justify-between bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <h1 className="font-heading font-semibold line-clamp-1">C++ Part 1: Object-Oriented Programming Basics</h1>
        </div>
        <div className="flex items-center gap-2">
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
            variant={activeTab === 'document' ? 'ghost' : 'ghost'}
            className={`flex-1 justify-center rounded-none border-b-2 ${
              activeTab === 'document' ? 'border-primary' : 'border-transparent'
            }`}
            onClick={() => setActiveTab('document')}
          >
            <FileText className="h-4 w-4 mr-2" />
            Document
          </Button>
          <Button
            variant={activeTab === 'chat' ? 'ghost' : 'ghost'}
            className={`flex-1 justify-center rounded-none border-b-2 ${
              activeTab === 'chat' ? 'border-primary' : 'border-transparent'
            }`}
            onClick={() => setActiveTab('chat')}
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
            onSessionComplete={() => console.log('Session complete')}
          />
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex h-[calc(100vh-3.5rem)] md:h-[calc(100vh-3.5rem)]">
        {/* Left Panel - Document Viewer */}
        <div className={`${
          activeTab === 'document' ? 'flex' : 'hidden'
        } md:flex flex-1 border-r border-border/50 overflow-hidden flex-col`}>
          <div className="flex-1 overflow-y-auto p-6">
            {/* Placeholder for PDF/Document Viewer */}
            <div className="bg-muted/30 rounded-lg h-full flex items-center justify-center">
              <p className="text-muted-foreground">Document Viewer Coming Soon</p>
            </div>
          </div>
          
          {/* Bottom Progress Bar */}
          <div className="h-12 border-t border-border/50 bg-card flex items-center px-4 justify-between">
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">Page 15 of 45</span>
              <div className="w-48 h-1.5 bg-secondary/30 rounded-full overflow-hidden">
                <div className="w-1/3 h-full bg-primary rounded-full"/>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon">
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Metadata Panel */}
          <div className="h-24 border-t border-border/50 bg-card/50">
            <div className="h-full grid grid-cols-4 divide-x divide-border/50">
              <div className="flex flex-col items-center justify-center p-2">
                <span className="text-2xl font-semibold text-primary">15</span>
                <span className="text-xs text-muted-foreground">Pages Read</span>
              </div>
              <div className="flex flex-col items-center justify-center p-2">
                <span className="text-2xl font-semibold text-primary">45</span>
                <span className="text-xs text-muted-foreground">Minutes Spent</span>
              </div>
              <div className="flex flex-col items-center justify-center p-2">
                <span className="text-2xl font-semibold text-primary">2/5</span>
                <span className="text-xs text-muted-foreground">Sections Done</span>
              </div>
              <div className="flex flex-col items-center justify-center p-2">
                <span className="text-2xl font-semibold text-primary">85%</span>
                <span className="text-xs text-muted-foreground">Quiz Score</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel - AI Assistant */}
        <div className={`${
          activeTab === 'chat' ? 'flex' : 'hidden'
        } md:flex md:w-[400px] flex-1 md:flex-none flex-col`}>
          {/* Section Navigation */}
          <div className="p-4 border-b border-border/50">
            <LessonNavigation
              sections={mockSections}
              currentSectionId={currentSectionId}
              onSectionChange={setCurrentSectionId}
            />
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-4">
            <div className="space-y-4">
              {messages.map((message, index) => (
                <ChatMessage
                  key={index}
                  content={message.content}
                  role={message.role}
                  timestamp={message.timestamp}
                />
              ))}
              <div ref={chatEndRef} />
            </div>
          </div>

          {/* Chat Input */}
          <div className="h-24 border-t border-border/50 p-4">
            <div className="relative">
              <textarea 
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
                className="w-full h-16 rounded-lg border border-border/50 bg-background px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Ask your AI mentor a question..."
              />
              <Button 
                className="absolute right-2 bottom-2"
                size="sm"
                onClick={handleSendMessage}
              >
                Ask
              </Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
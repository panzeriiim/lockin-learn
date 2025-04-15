'use client';

import { ChevronDown, Check, BookOpen } from 'lucide-react';
import { Button } from './button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from './card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './dropdown-menu';

interface Section {
  id: string;
  title: string;
  status: 'completed' | 'in-progress' | 'not-started';
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
  const completedCount = sections.filter((s) => s.status === 'completed').length;

  return (
    <Card className="w-full border-border/50">
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
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="w-full justify-between"
            >
              {currentSection?.title}
              <ChevronDown className="h-4 w-4 opacity-50" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[300px]">
            {sections.map((section) => (
              <DropdownMenuItem
                key={section.id}
                onClick={() => onSectionChange(section.id)}
                className="flex items-center justify-between py-3"
              >
                <div className="flex items-center gap-2">
                  {section.status === 'completed' ? (
                    <Check className="h-4 w-4 text-primary" />
                  ) : (
                    <div className={`h-2 w-2 rounded-full ${
                      section.status === 'in-progress' 
                        ? 'bg-primary' 
                        : 'bg-muted'
                    }`} />
                  )}
                  <span>{section.title}</span>
                </div>
                <span className="text-sm text-muted-foreground">
                  {section.duration} min
                </span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Progress Bar */}
        <div className="mt-4 space-y-1">
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-primary rounded-full transition-all duration-500"
              style={{
                width: `${(completedCount / sections.length) * 100}%`,
              }}
            />
          </div>
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Current Section: {currentSection?.title}</span>
            <span>{Math.round((completedCount / sections.length) * 100)}% Complete</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
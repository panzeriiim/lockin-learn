import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Calendar } from "lucide-react";
import { format } from "date-fns";

interface LessonCardProps {
  title: string;
  description: string;
  progress: number;
  timeSpent: number;
  totalSections: number;
  completedSections: number;
  beginDate: Date;
  endDate: Date;
}

export function LessonCard({
  title,
  description,
  progress,
  timeSpent,
  totalSections,
  completedSections,
  beginDate,
  endDate,
}: LessonCardProps) {
  return (
    <Card className="hover:shadow-lg transition-all">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-primary" />
          {title}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
        <div className="flex items-center gap-1 text-xs text-muted-foreground mt-2">
          <Calendar className="h-3 w-3" />
          <span>{format(beginDate, 'MMM d')} - {format(endDate, 'MMM d, yyyy')}</span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="h-2 bg-secondary/30 rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary rounded-full transition-all duration-300" 
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">{timeSpent} min spent</span>
            <span className="text-primary font-medium">
              {completedSections}/{totalSections} completed
            </span>
          </div>
          <div className="flex gap-2">
            <Button className="flex-1">Resume</Button>
            <Button variant="outline">Study Plan</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
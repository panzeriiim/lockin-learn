interface LearningStatsProps {
  pagesRead: number;
  totalPages: number;
  minutesSpent: number;
  sectionsCompleted: number;
  totalSections: number;
  quizScore: number;
}

export function LearningStats({
  pagesRead,
  totalPages,
  minutesSpent,
  sectionsCompleted,
  totalSections,
  quizScore,
}: LearningStatsProps) {
  return (
    <div className="h-24 border-t border-border/50 bg-card/50">
      <div className="h-full grid grid-cols-4 divide-x divide-border/50">
        <div className="flex flex-col items-center justify-center p-2">
          <span className="text-2xl font-semibold text-primary">
            {pagesRead}
          </span>
          <span className="text-xs text-muted-foreground">Pages Read</span>
        </div>
        <div className="flex flex-col items-center justify-center p-2">
          <span className="text-2xl font-semibold text-primary">
            {minutesSpent}
          </span>
          <span className="text-xs text-muted-foreground">Minutes Spent</span>
        </div>
        <div className="flex flex-col items-center justify-center p-2">
          <span className="text-2xl font-semibold text-primary">
            {sectionsCompleted}/{totalSections}
          </span>
          <span className="text-xs text-muted-foreground">Sections Done</span>
        </div>
        <div className="flex flex-col items-center justify-center p-2">
          <span className="text-2xl font-semibold text-primary">
            {quizScore}%
          </span>
          <span className="text-xs text-muted-foreground">Quiz Score</span>
        </div>
      </div>
    </div>
  );
}

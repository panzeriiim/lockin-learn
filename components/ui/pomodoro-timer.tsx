'use client';

import { useState, useEffect } from 'react';
import { Timer, Play, Pause, RotateCcw } from 'lucide-react';
import { Button } from './button';
import { Card, CardContent } from './card';

interface PomodoroTimerProps {
  onSessionComplete?: () => void;
  defaultDuration?: number; // in minutes
}

export function PomodoroTimer({ 
  onSessionComplete,
  defaultDuration = 25 
}: PomodoroTimerProps) {
  const [timeLeft, setTimeLeft] = useState(defaultDuration * 60);
  const [isActive, setIsActive] = useState(false);
  const [isBreak, setIsBreak] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => time - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      handleSessionComplete();
    }

    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const handleSessionComplete = () => {
    setIsActive(false);
    if (!isBreak) {
      // Switch to break mode
      setIsBreak(true);
      setTimeLeft(5 * 60); // 5 minute break
    } else {
      // Switch back to focus mode
      setIsBreak(false);
      setTimeLeft(defaultDuration * 60);
    }
    onSessionComplete?.();
  };

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setIsBreak(false);
    setTimeLeft(defaultDuration * 60);
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const progress = (timeLeft / (isBreak ? 5 * 60 : defaultDuration * 60)) * 100;

  return (
    <Card className="w-full bg-card border-border/50">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Timer className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium">
              {isBreak ? 'Break Time' : 'Focus Time'}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={toggleTimer}
              className="w-20"
            >
              {isActive ? (
                <>
                  <Pause className="h-4 w-4 mr-2" />
                  Pause
                </>
              ) : (
                <>
                  <Play className="h-4 w-4 mr-2" />
                  Start
                </>
              )}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={resetTimer}
              className="h-8 w-8"
            >
              <RotateCcw className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Progress Ring */}
        <div className="mt-4 flex justify-center">
          <div className="relative w-24 h-24">
            <svg className="w-full h-full" viewBox="0 0 100 100">
              {/* Background circle */}
              <circle
                className="text-muted stroke-current"
                strokeWidth="8"
                fill="transparent"
                r="42"
                cx="50"
                cy="50"
              />
              {/* Progress circle */}
              <circle
                className="text-primary stroke-current transition-all duration-500"
                strokeWidth="8"
                strokeLinecap="round"
                fill="transparent"
                r="42"
                cx="50"
                cy="50"
                style={{
                  strokeDasharray: `${2 * Math.PI * 42}`,
                  strokeDashoffset: `${2 * Math.PI * 42 * (1 - progress / 100)}`,
                  transform: 'rotate(-90deg)',
                  transformOrigin: '50% 50%',
                }}
              />
              {/* Timer text */}
              <text
                x="50"
                y="50"
                className="text-lg font-medium"
                textAnchor="middle"
                dy=".3em"
                fill="currentColor"
              >
                {`${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`}
              </text>
            </svg>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
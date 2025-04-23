import { useState } from "react";
import { cn } from "@/lib/utils";

interface Annotation {
  id: string;
  pageNumber: number;
  content: string;
  color: string;
  position: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
}

interface PDFAnnotationProps {
  pageNumber: number;
  annotations: Annotation[];
  onAddAnnotation: (annotation: Omit<Annotation, "id">) => void;
  onDeleteAnnotation: (id: string) => void;
  scale: number;
}

export function PDFAnnotation({
  pageNumber,
  annotations,
  onAddAnnotation,
  onDeleteAnnotation,
  scale,
}: PDFAnnotationProps) {
  const [isSelecting, setIsSelecting] = useState(false);
  const [selectionStart, setSelectionStart] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const [selectionEnd, setSelectionEnd] = useState<{
    x: number;
    y: number;
  } | null>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setIsSelecting(true);
    setSelectionStart({
      x: (e.clientX - rect.left) / scale,
      y: (e.clientY - rect.top) / scale,
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isSelecting) return;
    const rect = e.currentTarget.getBoundingClientRect();
    setSelectionEnd({
      x: (e.clientX - rect.left) / scale,
      y: (e.clientY - rect.top) / scale,
    });
  };

  const handleMouseUp = () => {
    if (isSelecting && selectionStart && selectionEnd) {
      const width = Math.abs(selectionEnd.x - selectionStart.x);
      const height = Math.abs(selectionEnd.y - selectionStart.y);

      if (width > 10 && height > 10) {
        onAddAnnotation({
          pageNumber,
          content: "",
          color: "#FFE17F",
          position: {
            x: Math.min(selectionStart.x, selectionEnd.x),
            y: Math.min(selectionStart.y, selectionEnd.y),
            width,
            height,
          },
        });
      }
    }
    setIsSelecting(false);
    setSelectionStart(null);
    setSelectionEnd(null);
  };

  return (
    <div
      className="absolute inset-0"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* Existing annotations */}
      {annotations
        .filter((a) => a.pageNumber === pageNumber)
        .map((annotation) => (
          <div
            key={annotation.id}
            className="absolute cursor-pointer group"
            style={{
              left: annotation.position.x * scale,
              top: annotation.position.y * scale,
              width: annotation.position.width * scale,
              height: annotation.position.height * scale,
              backgroundColor: annotation.color + "50",
              transition: "background-color 0.2s ease",
            }}
          >
            <button
              className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-destructive text-destructive-foreground opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={() => onDeleteAnnotation(annotation.id)}
            >
              ✕
            </button>
          </div>
        ))}

      {/* Active selection */}
      {isSelecting && selectionStart && selectionEnd && (
        <div
          className="absolute bg-yellow-300/30 border border-yellow-400/50"
          style={{
            left: Math.min(selectionStart.x, selectionEnd.x) * scale,
            top: Math.min(selectionStart.y, selectionEnd.y) * scale,
            width: Math.abs(selectionEnd.x - selectionStart.x) * scale,
            height: Math.abs(selectionEnd.y - selectionStart.y) * scale,
          }}
        />
      )}
    </div>
  );
}

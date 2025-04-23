import { useState, useRef, useCallback } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { Button } from "./button";
import {
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  Menu,
  Maximize2,
  Minimize2,
  Highlighter,
} from "lucide-react";
import { PDFAnnotation } from "./pdf-annotation";
import { cn } from "@/lib/utils";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

interface PDFViewerProps {
  pdfUrl: string;
  focusMode?: boolean;
}

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

export function PDFViewer({ pdfUrl, focusMode = false }: PDFViewerProps) {
  const [numPages, setNumPages] = useState<number>();
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [scale, setScale] = useState<number>(1);
  const [showThumbnails, setShowThumbnails] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [isAnnotationMode, setIsAnnotationMode] = useState<boolean>(false);
  const [annotations, setAnnotations] = useState<Annotation[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages);
  }

  const goToNextPage = () => {
    if (pageNumber < (numPages || 0)) {
      setPageNumber(pageNumber + 1);
    }
  };

  const goToPreviousPage = () => {
    if (pageNumber > 1) {
      setPageNumber(pageNumber - 1);
    }
  };

  const zoomIn = () => {
    setScale((prevScale) => Math.min(prevScale + 0.1, 2));
  };

  const zoomOut = () => {
    setScale((prevScale) => Math.max(prevScale - 0.1, 0.5));
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const handleAddAnnotation = useCallback(
    (newAnnotation: Omit<Annotation, "id">) => {
      if (!isAnnotationMode) return;

      setAnnotations((prev) => [
        ...prev,
        {
          ...newAnnotation,
          id: crypto.randomUUID(),
        },
      ]);
    },
    [isAnnotationMode]
  );

  const handleDeleteAnnotation = useCallback((id: string) => {
    setAnnotations((prev) => prev.filter((a) => a.id !== id));
  }, []);

  return (
    <div className="flex h-full" ref={containerRef}>
      {/* Thumbnails Sidebar with smooth transition */}
      <div
        className={cn(
          "fixed lg:relative h-full bg-card/95 backdrop-blur-sm border-r border-border/50 transition-all duration-300 ease-in-out z-10",
          showThumbnails ? "w-48 opacity-100" : "w-0 opacity-0 lg:hidden"
        )}
      >
        <Document file={pdfUrl}>
          {Array.from(new Array(numPages), (_, index) => (
            <div
              key={`thumb-${index + 1}`}
              className={cn(
                "cursor-pointer p-2 transition-colors",
                pageNumber === index + 1 ? "bg-primary/10" : "hover:bg-muted"
              )}
              onClick={() => setPageNumber(index + 1)}
            >
              <Page
                pageNumber={index + 1}
                scale={0.2}
                renderTextLayer={false}
                renderAnnotationLayer={false}
              />
            </div>
          ))}
        </Document>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-full">
        {/* Toolbar with improved visual hierarchy */}
        <div className="flex items-center justify-between p-2 sm:p-3 border-b border-border/50 bg-background/95 backdrop-blur-sm sticky top-0 z-20">
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowThumbnails(!showThumbnails)}
              className={cn("relative", showThumbnails && "bg-primary/10")}
              title="Toggle thumbnails"
            >
              <Menu className="h-4 w-4" />
            </Button>

            <div className="flex items-center gap-1 sm:gap-2 ml-2">
              <Button
                variant="outline"
                size="icon"
                onClick={zoomOut}
                disabled={scale <= 0.5}
                title="Zoom out"
              >
                <ZoomOut className="h-4 w-4" />
              </Button>
              <span className="text-sm text-muted-foreground w-14 text-center">
                {Math.round(scale * 100)}%
              </span>
              <Button
                variant="outline"
                size="icon"
                onClick={zoomIn}
                disabled={scale >= 2}
                title="Zoom in"
              >
                <ZoomIn className="h-4 w-4" />
              </Button>
            </div>

            <Button
              variant={isAnnotationMode ? "secondary" : "ghost"}
              size="icon"
              onClick={() => setIsAnnotationMode(!isAnnotationMode)}
              title="Toggle annotation mode"
              className="ml-2"
            >
              <Highlighter className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex items-center gap-1 sm:gap-2">
            <div className="flex items-center bg-muted/30 rounded-lg p-1">
              <Button
                variant="ghost"
                size="icon"
                onClick={goToPreviousPage}
                disabled={pageNumber <= 1}
                title="Previous page"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="text-sm min-w-[80px] text-center font-medium">
                {pageNumber} / {numPages}
              </span>
              <Button
                variant="ghost"
                size="icon"
                onClick={goToNextPage}
                disabled={pageNumber >= (numPages || 0)}
                title="Next page"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={toggleFullscreen}
              title={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
              className="ml-2"
            >
              {isFullscreen ? (
                <Minimize2 className="h-4 w-4" />
              ) : (
                <Maximize2 className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
        {/* PDF Content with responsive padding */}
        <div
          className={cn(
            "flex-1 overflow-y-auto p-2 sm:p-4 md:p-6",
            isFullscreen && "h-screen"
          )}
        >
          <div className="bg-muted/30 rounded-lg h-full flex flex-col items-center justify-center relative min-h-fit overflow-visible">
            <Document file={pdfUrl} onLoadSuccess={onDocumentLoadSuccess}>
              <div className="relative min-h-fit p-2 sm:p-4">
                <Page
                  pageNumber={pageNumber}
                  scale={scale}
                  className="max-w-full shadow-lg h-full"
                />
                <PDFAnnotation
                  pageNumber={pageNumber}
                  annotations={annotations}
                  onAddAnnotation={handleAddAnnotation}
                  onDeleteAnnotation={handleDeleteAnnotation}
                  scale={scale}
                />
              </div>
            </Document>
          </div>
        </div>
        {/* Reading Progress Component, Implement this later */}
        {/* <ReadingProgress
          currentPage={pageNumber}
          totalPages={numPages || 1}
          focusMode={focusMode}
        /> */}
      </div>
    </div>
  );
}

"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "./button";
import { Input } from "./input";
import { Label } from "./label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./dialog";
import { Progress } from "./progress";
import { createClient } from "@/utils/supabase/client";
import {
  BookOpen,
  Upload,
  FileText,
  Check,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { redirect } from "next/navigation";
import { User } from "@supabase/supabase-js";

interface UploadDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (lessonId: string) => void;
}

export function UploadDialog({
  isOpen,
  onClose,
  onSuccess,
}: UploadDialogProps) {
  const [step, setStep] = useState(1);
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const supabase = createClient();

  // Check for authenticated user when component mounts
  useEffect(() => {
    const checkUser = async () => {
      try {
        const {
          data: { user },
          error,
        } = await supabase.auth.getUser();
        if (error || !user) {
          console.error("Authentication error:", error);
          redirect("/sign-in");
          return;
        }
        setUser(user);
      } catch (error) {
        console.error("Auth error:", error);
        redirect("/sign-in");
      } finally {
        setIsLoading(false);
      }
    };

    checkUser();
  }, []);

  // Cleanup when dialog is closed
  useEffect(() => {
    if (!isOpen) {
      resetDialog();
    }
  }, [isOpen]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      // Check file type
      if (
        !selectedFile.type.includes("pdf") &&
        !selectedFile.type.includes("document")
      ) {
        setError("Please upload a PDF or Word document");
        return;
      }
      // Check file size (max 10MB)
      if (selectedFile.size > 10 * 1024 * 1024) {
        setError("File size should be less than 10MB");
        return;
      }
      setFile(selectedFile);
      setError("");
      setStep(2);
    }
  };

  const handleSubmit = async () => {
    if (!file || !title.trim() || !user) return;

    try {
      setUploading(true);
      setStep(3);

      // 1. Upload file to Supabase Storage
      const fileExt = file.name.split(".").pop();
      const fileName = `${user.id}/${Date.now()}.${fileExt}`;

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("learning-materials")
        .upload(fileName, file, {
          cacheControl: "3600",
          upsert: false,
        });

      if (uploadError) throw uploadError;

      // 2. Create database record with explicit user_id
      const { data: lessonData, error: dbError } = await supabase
        .from("lessons")
        .insert([
          {
            title,
            description,
            file_path: uploadData.path,
            status: "processing",
            user_id: user.id, // Explicitly set user_id
          },
        ])
        .select()
        .single();

      if (dbError) {
        // If database insert fails, clean up the uploaded file
        await supabase.storage
          .from("learning-materials")
          .remove([uploadData.path]);

        throw dbError;
      }

      // 3. Show success and return lesson ID
      setStep(4);
      onSuccess(lessonData.id);
    } catch (err: any) {
      console.error("Upload error:", err);
      setError(err.message);
      setStep(2);
    } finally {
      setUploading(false);
    }
  };

  const resetDialog = () => {
    setStep(1);
    setFile(null);
    setTitle("");
    setDescription("");
    setError("");
    setUploadProgress(0);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleClose = () => {
    resetDialog();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {step === 4
              ? "Success!"
              : step === 3
                ? "Processing..."
                : step === 2
                  ? "Lesson Details"
                  : "Upload Learning Material"}
          </DialogTitle>
          <DialogDescription>
            {step === 4
              ? "Your material is being converted into an interactive lesson."
              : step === 3
                ? "Please wait while we process your file..."
                : step === 2
                  ? "Add information about this learning material"
                  : "Upload a PDF or Word document to convert into an interactive lesson"}
          </DialogDescription>
        </DialogHeader>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="mt-2 text-sm text-muted-foreground">
              Checking authentication...
            </p>
          </div>
        ) : (
          <>
            {step === 1 && (
              <div className="space-y-4">
                <div className="flex flex-col items-center justify-center border-2 border-dashed border-border rounded-lg p-8 space-y-4">
                  <div className="p-4 bg-primary/10 rounded-full">
                    <Upload className="h-8 w-8 text-primary" />
                  </div>
                  <div className="text-center space-y-2">
                    <p className="text-sm font-medium">
                      Drag & drop your file here, or
                    </p>
                    <Button
                      variant="outline"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      Browse Files
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    PDF or Word documents up to 10MB
                  </p>
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.doc,.docx"
                  className="hidden"
                  onChange={handleFileSelect}
                />
                {error && (
                  <div className="flex items-center gap-2 text-sm text-destructive">
                    <AlertCircle className="h-4 w-4" />
                    {error}
                  </div>
                )}
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4 py-4">
                <div className="flex items-center gap-3 p-3 bg-accent/10 rounded-lg">
                  <FileText className="h-5 w-5 text-accent-foreground" />
                  <div className="flex-1 text-sm truncate">{file?.name}</div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="title">Lesson Title</Label>
                  <Input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g., Introduction to Machine Learning"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description (Optional)</Label>
                  <Input
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="What will students learn from this material?"
                  />
                </div>

                {error && (
                  <div className="flex items-center gap-2 text-sm text-destructive">
                    <AlertCircle className="h-4 w-4" />
                    {error}
                  </div>
                )}
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4 py-4">
                <Progress value={uploadProgress} />
                <p className="text-sm text-center text-muted-foreground">
                  Uploading and processing your file...
                </p>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-4 py-4">
                <div className="flex flex-col items-center justify-center space-y-4">
                  <div className="p-3 rounded-full bg-primary/10">
                    <Check className="h-8 w-8 text-primary" />
                  </div>
                  <p className="text-sm text-center text-muted-foreground">
                    Your file has been uploaded and is being processed. You'll
                    be notified when it's ready.
                  </p>
                </div>
              </div>
            )}

            <DialogFooter className="gap-2 sm:gap-0">
              {step === 2 && (
                <>
                  <Button
                    variant="ghost"
                    onClick={() => setStep(1)}
                    disabled={uploading}
                  >
                    Back
                  </Button>
                  <Button
                    onClick={handleSubmit}
                    disabled={!title || uploading || !user}
                  >
                    {uploading ? "Uploading..." : "Create Lesson"}
                  </Button>
                </>
              )}

              {step === 4 && <Button onClick={handleClose}>Close</Button>}
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

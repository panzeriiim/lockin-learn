export type Message =
  | { success: string }
  | { error: string }
  | { message: string };

export function FormMessage({ message }: { message: Message }) {
  return (
    <div className="flex flex-col gap-2 w-full max-w-md text-sm">
      {"success" in message && (
        <div className="text-foreground border-l-2 border-secondary bg-secondary/10 px-4 py-2 rounded-r-md transition-all animate-in slide-in-from-left-2">
          {message.success}
        </div>
      )}
      {"error" in message && (
        <div className="text-foreground border-l-2 border-destructive bg-destructive/10 px-4 py-2 rounded-r-md transition-all animate-in slide-in-from-left-2">
          {message.error}
        </div>
      )}
      {"message" in message && (
        <div className="text-muted-foreground border-l-2 border-primary bg-primary/5 px-4 py-2 rounded-r-md transition-all animate-in slide-in-from-left-2">
          {message.message}
        </div>
      )}
    </div>
  );
}

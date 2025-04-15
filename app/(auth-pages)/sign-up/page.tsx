import { signUpAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default async function Signup(props: {
  searchParams: Promise<Message>;
}) {
  const searchParams = await props.searchParams;
  if ("message" in searchParams) {
    return (
      <div className="w-full flex-1 flex items-center justify-center p-4">
        <div className="max-w-sm w-full">
          <FormMessage message={searchParams} />
        </div>
      </div>
    );
  }

  return (
    <>
      <form className="flex-1 flex flex-col w-full max-w-sm mx-auto">
        <h1 className="text-3xl font-heading font-bold mb-2">Create account</h1>
        <p className="text-sm text-muted-foreground mb-8">
          Already have an account?{" "}
          <Link 
            className="text-primary hover:text-primary/90 transition-colors font-medium" 
            href="/sign-in"
          >
            Sign in
          </Link>
        </p>
        <div className="flex flex-col gap-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input 
              name="email" 
              placeholder="you@example.com" 
              required 
              autoComplete="email"
              autoFocus
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              type="password"
              name="password"
              placeholder="Create a password"
              minLength={6}
              required
              autoComplete="new-password"
            />
            <p className="text-xs text-muted-foreground">
              Must be at least 6 characters long
            </p>
          </div>
          <div className="pt-2">
            <SubmitButton 
              className="w-full" 
              formAction={signUpAction} 
              pendingText="Creating account..."
            >
              Create account
            </SubmitButton>
          </div>
          <FormMessage message={searchParams} />
        </div>
      </form>
    </>
  );
}

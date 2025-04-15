import { signInAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default async function SignIn(props: {
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
    <div className="flex-1 flex flex-col w-full max-w-sm mx-auto p-4">
      <div className="flex flex-col space-y-2 text-center mb-8">
        <h1 className="text-2xl font-semibold tracking-tight">Welcome back</h1>
        <p className="text-sm text-muted-foreground">
          Enter your email to sign in to your account
        </p>
      </div>

      <div className="grid gap-4">
        <form className="flex flex-col gap-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              name="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              name="password"
              type="password"
              autoComplete="current-password"
              required
            />
          </div>
          
          <SubmitButton
            className="w-full"
            formAction={signInAction}
            pendingText="Signing in..."
          >
            Sign in
          </SubmitButton>
        </form>

        <div className="flex items-center justify-between text-sm">
          <Link 
            className="text-primary hover:text-primary/90 transition-colors font-medium"
            href="/reset-password"
          >
            Forgot password?
          </Link>
          <Link 
            className="text-primary hover:text-primary/90 transition-colors font-medium"
            href="/sign-up"
          >
            Create account
          </Link>
        </div>
      </div>
      <FormMessage message={searchParams} />
    </div>
  );
}

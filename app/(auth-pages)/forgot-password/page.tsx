import { forgotPasswordAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { SmtpMessage } from "../smtp-message";

export default async function ForgotPassword(props: {
  searchParams: Promise<Message>;
}) {
  const searchParams = await props.searchParams;
  return (
    <>
      <form className="flex-1 flex flex-col w-full max-w-sm mx-auto">
        <h1 className="text-3xl font-heading font-bold mb-2">Reset password</h1>
        <p className="text-sm text-muted-foreground mb-8">
          Remember your password?{" "}
          <Link 
            className="text-primary hover:text-primary/90 transition-colors font-medium" 
            href="/sign-in"
          >
            Sign in
          </Link>
        </p>
        <div className="flex flex-col gap-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email address</Label>
            <Input 
              name="email" 
              placeholder="you@example.com" 
              required 
              autoComplete="email"
              autoFocus
            />
            <p className="text-xs text-muted-foreground">
              We'll send you a link to reset your password
            </p>
          </div>
          <div className="pt-2">
            <SubmitButton 
              className="w-full" 
              formAction={forgotPasswordAction}
              pendingText="Sending reset link..."
            >
              Send reset link
            </SubmitButton>
          </div>
          <FormMessage message={searchParams} />
        </div>
      </form>
      <SmtpMessage />
    </>
  );
}

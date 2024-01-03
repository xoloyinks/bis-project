"use client";
import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { createUser, comparePassword } from "../../auth";
import { useUser } from "@/app/context";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
 const {toast} = useToast();
  const router = useRouter();
  const { auth, db, selectedRole } = useUser();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();

    try {
      
      setIsLoading(true);
      // redirect("/app")
      if (!passwordValue || !confirmPasswordValue) {
        setIsLoading(false)
        return;
      }
  
      const isPasswordEqual = comparePassword(
        passwordValue,
        confirmPasswordValue
      );
  
      if (isPasswordEqual) {
        const user = await createUser(auth, db, emailValue, passwordValue, selectedRole);
        toast({
          // variant: "destructive",
          title: "Successful",
          description: `User has been created...`,
        })        
        if (user){
          router.push("/app/auth/signIn");
        }
        else{
          console.log('user exist or network error')
        }
        setIsLoading(false)
      } else {
        console.log("password not equal");
      }
  
      
    } catch (error) {
      toast({
        variant: "destructive",
        title: "failed",
        description: `an error occured check your internet connection`,
      })
      console.log(error.messaage)
    }

      }

  const [emailValue, setEmailValue] = useState<string>("");
  const [passwordValue, setPasswordValue] = useState<string>("");
  const [confirmPasswordValue, setConfirmPasswordValue] = useState<string>("");
  const [val, setVal] = useState("");

  
  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={onSubmit}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
            required= {true}
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
              value={emailValue}
              onChange={(e) => setEmailValue(e.target.value)}
            />
          </div>
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="password">
              password
            </Label>
            <Input
            required= {true}
              id="email"
              placeholder="password"
              type="password"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
              value={passwordValue}
              onChange={(e) => setPasswordValue(e.target.value)}
            />
          </div>
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="password">
              password
            </Label>
            <Input
            required= {true}
              id="confirmPassword"
              placeholder="confirm password"
              type="password"
              autoCapitalize="none"
              autoComplete="password"
              autoCorrect="off"
              disabled={isLoading}
              value={confirmPasswordValue}
              onChange={(e) => setConfirmPasswordValue(e.target.value)}
            />
          </div>
          <Button disabled={isLoading}>
            {isLoading && (
              <div className="mr-2 h-4 w-4 animate-spin">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                </svg>
              </div>
            )}
            Sign Up
          </Button>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs ">
          <span className="cursor-pointer bg-background px-2 text-muted-foreground">
            forgot password?
          </span>
        </div>
      </div>
    </div>
  );
}

"use client";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { useUser } from "@/app/context";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { UserAuthForm } from "./component/user-auth-form";
import { Button } from "@/components/ui/button";
import { useState } from "react";
// import { useUser } from "@/app/context";

export default function AuthenticationPage() {
  const [adminClick, setAdminClick] = useState<boolean>(false);
  const [userClick, setUserClick] = useState<boolean>(true);
  // const {auth} = useUser();
  const { selectedRole,setSelectedRole } = useUser() as {selectedRole: any, setSelectedRole: any};

  const handleClick = (e: any) => {
   
    if (e.target.innerHTML === "admin") {
      setUserClick(!userClick);
      setAdminClick(!adminClick);
    } else {
      setAdminClick(!adminClick);
      setUserClick(!userClick);
    }
    if(adminClick){
      setSelectedRole("admin")
     }
     if(userClick){
       setSelectedRole("user");
     }
    };
    
  return (
    <>
      <section className="md:hidden">
        <Image
          src="/examples/authentication-light.png"
          width={1280}
          height={843}
          alt="Authentication"
          className="block dark:hidden"
        />
        <Image
          src="/examples/authentication-dark.png"
          width={1280}
          height={843}
          alt="Authentication"
          className="hidden dark:block"
        />
      </section>
      <div className="container relative hidden h-[800px] flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <Link
          href="/auth/signIn"
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "absolute right-4 top-4 md:right-8 md:top-8"
          )}
        >
          Login
        </Link>
        <div className="relative flex-col hidden h-full p-10 text-white bg-muted dark:border-r lg:flex">
          <div className="absolute inset-0 bg-zinc-900" />
          <div className="relative z-20 flex items-center text-lg font-medium">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-6 h-6 mr-2"
            >
              <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
            </svg>
            Myslvent
          </div>
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg">
                &ldquo;This inventory system has  saved me countless hours of work and
                helped me maintain and manage my products efectively.&rdquo;
              </p>
              <footer className="text-sm">Anthony Owolabi</footer>
            </blockquote>
          </div>
        </div>
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Create an account
              </h1>
              <p className="text-sm text-muted-foreground">
                Enter your email below to create your account
              </p>
              <p>create as {selectedRole}</p>
              <div className="flex justify-between">
                <Button
                  onClick={handleClick}
                  variant={adminClick ? "outline" : "default"}
                >
                  admin
                </Button>
                <Button
                  onClick={handleClick}
                  variant={userClick ? "outline" : "default"}
                >
                  user
                </Button>
              </div>
            </div>
            <UserAuthForm />
            <p className="px-8 text-sm text-center text-muted-foreground">
              Developed by Anthony Owolabi.{" "}

              <Link
                href="/terms"
                className="underline underline-offset-4 hover:text-primary"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy"
                className="underline underline-offset-4 hover:text-primary"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

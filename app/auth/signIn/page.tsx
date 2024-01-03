"use client";
import React from "react";
import { useState } from "react";
import { signIn } from "../auth";
import { useUser } from "@/app/context";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import Link from "next/link";

export default function SignIn() {
  const { auth } = useUser();
  const router = useRouter();
  const [emailValue, setEmailValue] = useState<string>("");
  const { toast } = useToast();
  const [passwordValue, setPasswordValue] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // console.log(auth.currentUser)

  const handleSubmit = async (e) => {
    setIsLoading(!isLoading);
    e.preventDefault();
    try {
      const result = await signIn(auth, emailValue, passwordValue);
      if(result){

        toast({
          title: "loading..",
          description: `Loging user in`,
        });
        router.push("/app");
        
      }
      else{
        toast({
          variant: "destructive",
          title: "Failed",
          description: `Invalid Login details`,
        });
        // console.log("invalid login");
      }  
      setIsLoading(false);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed",
        description: `Invalid Login try again`,
      });
      console.log(error.message);
      setIsLoading(false);
    }
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign in to Myslvent
            </h1>
            <form
              onSubmit={handleSubmit}
              className="space-y-4 md:space-y-6"
              action="#"
            >
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={emailValue}
                  onChange={(e) => setEmailValue(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                  required={true}
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  value={passwordValue}
                  onChange={(e) => setPasswordValue(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required={true}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                      required={true}
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      htmlFor="remember"
                      className="text-gray-500 dark:text-gray-300"
                    >
                      Remember me
                    </label>
                  </div>
                </div>
                <a
                  href="#"
                  className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  change password?
                </a>
              </div>
              <Button className="w-full" disabled={isLoading}>
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
                Sign In
              </Button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Don’t have an account yet?{" "}
                <Link
                  href="/app/auth/signUp"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Sign up
                </Link>
              </p>
              <p className="text-sm">developed by Anthony owolabi</p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

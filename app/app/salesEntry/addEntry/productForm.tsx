"use client";
import * as z from "zod";
import { v4 as uuidv4 } from "uuid";
import { useState, useEffect } from "react";
import { ReloadIcon } from "@radix-ui/react-icons";
import { setDoc, doc, Timestamp } from "firebase/firestore";
import { useUser } from "@/app/context";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { TbFileInvoice } from "react-icons/tb";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { IoChevronBack } from "react-icons/io5";
<<<<<<< HEAD:app/app/salesEntry/addEntry/profileForm.tsx
import { ComboboxDemo } from "./dropDown";
=======
// import { Button } from "@/components/ui/button"
>>>>>>> origin/main:app/app/salesEntry/addProduct/productForm.tsx
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "@/components/ui/use-toast";

import { Input } from "@/components/ui/input";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "customername must be at least 2 characters.",
  }),
  product: z.string().min(0, {
    message: "product must be at least 2 characters.",
  }),
  date: z.date({
    required_error: "A date of birth is required.",
  }),

  quantity: z.string().min(1, {
    message: "quantity must be greater than  0.",
  }),

  amount: z.string().min(1, {
    message: "unit price must be greater than 0.",
  }),
});

export function ProductForm() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
    //   username: "",
      product: "",
    //   date: new Date(),
      quantity: "",
      amount: "",
    },
  });


  

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // console.log(values,productValue)
    // Do something with the form values.
    try {
      setIsLoading(true);
      const { username, product, quantity, date, amount } = values;
      // ✅ This will be type-safe and validated.
      const entryID = uuidv4();
      const intQuantity = Number.parseInt(quantity);
      const intAmount = Number.parseInt(amount);
      if(!intAmount || !intQuantity || !productValue){
        setIsLoading(false);
        toast({
          variant: "destructive",
          title: "invalid Input",
          description: `input valid entry detail`,
        })
        return
      }
              await setDoc(doc(db, "Entries", entryID), {
          username,
          product: doc(db, 'Products', productValue),
          quantity: intQuantity,
          amount: intAmount,
          timeStamp: Timestamp.fromDate(date),
          id: entryID,
        });
        toast({
          title: "successful",
          description: `${productValue} has been recorded`,
        })
      // }
      
      setIsLoading(false);
      
    } catch (error) {
      setIsLoading(false);
      toast({
        variant: "destructive",
        title: "failed",
        description: 'network error has occured',
      })
      console.log(error.message);
    }
  }

  return (
    <div className="flex w-screen justify-center">
      <div className="w-4/5 ">
        <Button asChild className=" my-10" variant="outline">
          <Link href="/app/product">
            <IoChevronBack /> Back
          </Link>
        </Button>
        <TbFileInvoice className="text-6xl" />
        <div className="mb-16">
          <h1 className="text-lg mt-6 b-2 m">Add Product</h1>
          <span className="text-sm ">please enter the product details</span>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* customer name field */}
         {/* product field */}
              <FormField
                control={form.control}
                name="product"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                    <ComboboxDemo  value={productValue} setValue={setProductValue}/>
                    </FormControl>
                    {/* <FormDescription>
                      This is your public display name.
                    </FormDescription> */}
                    <FormMessage />
                  </FormItem>
            
                )}
              />
           
            <div className="flex justify-between">
              {/* quantity field */}
              <FormField
                control={form.control}
                name="quantity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Quantity</FormLabel>
                    <FormControl>
                      <Input placeholder="digits" {...field} />
                    </FormControl>
                    {/* <FormDescription>
                      This is your public display name.
                    </FormDescription> */}
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* amount field */}
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Unit Amount</FormLabel>
                    <FormControl>
                      <Input placeholder="Naira(N)" {...field} />
                    </FormControl>
                    {/* <FormDescription>
                      This is your public display name.
                    </FormDescription> */}
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-row-reverse  ">
              <Button
                type="submit"
                className="bg-blue-600 ml-4"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                    Please wait
                  </>
                ) : (
                  "submit"
                )}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsLoading(false)}
              >
                cancel
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}

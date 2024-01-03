"use client";
import { v4 as uuidv4 } from "uuid";
import { doc,setDoc,getDoc } from "firebase/firestore";
import { TbFileInvoice } from "react-icons/tb";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { ReloadIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { useState } from "react";
import { useUser } from "@/app/context";
import { IoChevronBack } from "react-icons/io5";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast"

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover";
// import { toast } from "@/components/ui/use-toast";


const formSchema = z.object({
  // username: z.string().min(2, {
  //   message: "Username must be at least 2 characters.",
  // }),
  product: z.string().max(15, {
    message: "product must be less than 10 characters.",
  }),
  // date: z.date({
  //   required_error: "A date of birth is required.",
  // }),

  quantity: z.string().min(0, {
    message: "quantity must be greater than  0.",
  }),

  amount: z.string().min(0, {
    message: "unit price must be greater than 0.",
  }),
});

export function ProductForm() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState<boolean>(false);
const {db}= useUser();

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
try {
  setIsLoading(true);
  // console.log(values,'a')
    const {  product, quantity, amount } = values;
      const productID = uuidv4();
      const docRef = doc(db, "Products",product.toLocaleLowerCase() );
      const docSnap = await getDoc(docRef);
      const intQuantity = Number.parseInt(quantity);
      const intAmount = Number.parseInt(amount);
      if(!intAmount || !intQuantity){
        setIsLoading(false);
        toast({
          variant: "destructive",
          title: "invalid Input",
          description: `input a valid number`,
        })
        return
      }

      if(docSnap.exists()){
        toast({
          variant: "destructive",
          title: "Aborted!!",
          description: `${product} already exist in inventory`,
        })
      }
      else{
        await setDoc(docRef, {
          product,
          quantity: intQuantity,
          amount: intAmount,
          id: productID,
        });
        toast({
          title: "successful!!",
          description: `${product} has been added to inventory`,
        })
      }
      setIsLoading(false);

    
} catch (error) {
  setIsLoading(false);
  toast({
    variant: "destructive",
    title: "something went wrong",
    description: `check your internet connection`,
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
                    <FormLabel>Product</FormLabel>
                    <FormControl>
                      <Input placeholder="Furniture.." {...field} />
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
                      <Input placeholder="" {...field} />
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
                      <Input placeholder="" {...field} />
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

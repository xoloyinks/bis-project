"use client";
import Link from "next/link";
import React from "react";
import { doc, addDoc, getDoc,collection } from "firebase/firestore";
import { useState } from "react";
import { ReloadIcon } from "@radix-ui/react-icons";
import { RxCaretLeft } from "react-icons/rx";
import { LuStore } from "react-icons/lu";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { useUser } from "@/app/context";
import withAuth from "@/app/auth/withAuth";
import { ComboboxDemo } from "./dropDown";
import { serverTimestamp } from "firebase/firestore";

 function AddEntry() {
  const { toast } = useToast();
  const { db } = useUser() as {db: any};

  const [customerName, setCustomerName] = useState<string>();
  const [customerNumber, setCustomerNumber] = useState<string>("");
  const [unitPrice, setUnitPrice] = useState<string>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [comboBoxValue,setComboBoxValue]  = useState<string>("");


  const handleSubmit = async (e: any) => {
    e.preventDefault();
    
    if(!comboBoxValue){
      toast({
        variant: "destructive",
        title: "Aborted!!",
        description: `IMEI was not selected`,
      });
      return
    }

    try {
      setIsLoading(true);
      const docRef = collection(db, "Entries");
      const  productRef = doc(db,"Phones", `${comboBoxValue}`)
      
        await addDoc(docRef, {
          // phoneName,
          // brand: brand.toLowerCase(),
          IMEI: productRef,
          customerName,
          customerNumber,
          timeStamp:serverTimestamp(),
           unitPrice
        });
        toast({
          title: "successful!!",
          description: `${customerName} has successfully Purchased a product`,
        });
      
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      toast({
        variant: "destructive",
        title: "something went wrong",
        description: `check your internet connection`,
      });
    }
  };

  return (
    <>
      <section>
        <div className="bg-main py-[44px] px-[84px] text-[17px] ">
          <span className="text-fade">Overview /</span>
          <span className="text-white"> Sales / Sales Entry</span>
        </div>

        <div className="w-[70%] py-[30px] mx-auto flex flex-col gap-20">
          <Link href="/app/salesEntry" className="flex items-center gap-1 text-xl">
            <span className="text-4xl">
              <RxCaretLeft />
            </span>
            <span>Back</span>
          </Link>

          <div className="flex flex-col gap-10">
            <div className="flex flex-col gap-5">
              <span className="w-[65px] h-[65px] rounded-xl border-2 border-gray-200 flex items-center justify-center text-3xl">
                <LuStore />
              </span>
              <h1 className="text-2xl tracking-wider">
                <b>Sales Entry</b>
              </h1>
              <h3 className="text-xl -translate-y-4 opacity-50">
                Please enter the product details
              </h3>
            </div>

            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-8 text-lg"
            >
              <div className="flex flex-col gap-2">
                <label htmlFor="name">Customer Name</label>
               {/* \ <Input
                    type="number"
                    required={true}
                    value={IMEI}
                    onChange={(e) => setIMEI(e.target.value)}
                  />
                 */}
                  <Input
                  required={true}
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                />
                  </div>
              <div className="flex justify-between">
                <span className="w-[48%] flex flex-col gap-2">
                  <label htmlFor="brand">Customer Number</label>
                  <Input
                    required={true}
                    value={customerNumber}
                    onChange={(e) => setCustomerNumber(e.target.value)}
                  />
                </span>
                <span className="w-[48%] flex flex-col gap-2">
                  <label htmlFor="imei">IMEI Number</label>
                  <ComboboxDemo value={comboBoxValue} setValue={setComboBoxValue}/>
                </span>
              </div>
             
              <div>
                <span className="flex flex-col gap-2">
                  <label htmlFor="price">Unit Price</label>
                  <Input
                    type="number"
                    required={true}
                    value={unitPrice}
                    onChange={(e) => setUnitPrice(e.target?.value)}
                  />
                </span>
              </div>
              <div className="flex justify-end gap-5">
                <button
                  type="button"
                  className="border border-gray-400 px-[64px] flex items-center justify-center py-4 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="border border-gray-400 px-[64px] flex items-center justify-center py-4 font-semibold bg-basic text-white"
                >
                  {isLoading ? (
                    <>
                      <ReloadIcon className="w-4 h-4 mr-2 animate-spin" />
                      loading..
                    </>
                  ) : (
                    "confirm"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

export default withAuth(AddEntry);
"use client";
import Link from "next/link";
import React from "react";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { useState } from "react";
import { ReloadIcon } from "@radix-ui/react-icons";
import { RxCaretLeft } from "react-icons/rx";
import { LuStore } from "react-icons/lu";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { useUser } from "@/app/context";

 export default function AddProduct() {
  const { toast } = useToast();
  const { db } = useUser();

  const [phoneName, setPhoneName] = useState<string>();
  const [brand, setBrand] = useState<string>("");
  const [IMEI, setIMEI] = useState<string>();
  const [RAMSize, setRAMSize] = useState<string>();
  const [diskSize, setDiskSize] = useState<string>();
  const [unitPrice, setUnitPrice] = useState<string>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log(phoneName);

    try {
      setIsLoading(true);
      const docRef = doc(db, "Phones", `${IMEI}`);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        toast({
          variant: "destructive",
          title: "Aborted!!",
          description: `${IMEI} already exist in inventory`,
        });
      } else {
        await setDoc(docRef, {
          phoneName,
          brand: brand.toLowerCase(),
          IMEI,
          RAMSize,
          diskSize,
          unitPrice
        });
        toast({
          title: "successful!!",
          description: `${phoneName} has been added to inventory`,
        });
      }
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
          <span className="text-white"> Product / Add Product</span>
        </div>

        <div className="w-[70%] py-[30px] mx-auto flex flex-col gap-20">
          <Link href="/app/product" className="flex items-center gap-1 text-xl">
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
                <b>Add Product</b>
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
                <label htmlFor="name">Phone Name</label>
                <Input
                  required={true}
                  value={phoneName}
                  onChange={(e) => setPhoneName(e.target.value)}
                />
              </div>
              <div className="flex justify-between">
                <span className="w-[48%] flex flex-col gap-2">
                  <label htmlFor="brand">Brand</label>
                  <Input
                    required={true}
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                  />
                </span>
                <span className="w-[48%] flex flex-col gap-2">
                  <label htmlFor="imei">IMEI Number</label>
                  <Input
                    type="number"
                    required={true}
                    value={IMEI}
                    onChange={(e) => setIMEI(e.target.value)}
                  />
                </span>
              </div>
              <div className="flex justify-between">
                <span className="w-[48%] flex flex-col gap-2">
                  <label htmlFor="ram">RAM size(Gb)</label>
                  <Input
                    type="number"
                    required={true}
                    value={RAMSize}
                    onChange={(e) => setRAMSize(e.target.value)}
                  />
                </span>
                <span className="w-[48%] flex flex-col gap-2">
                  <label htmlFor="ram">Disk size(Gb)</label>
                  <Input
                    type="number"
                    required={true}
                    value={diskSize}
                    onChange={(e) => setDiskSize(e.target.value)}
                  />
                </span>
              </div>
              <div>
                <span className="flex flex-col gap-2">
                  <label htmlFor="price">Unit Price</label>
                  <Input
                    type="number"
                    required={true}
                    value={unitPrice}
                    onChange={(e) => setUnitPrice(e.target.value)}
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

// export default withAuth(withAdmin(AddProduct));
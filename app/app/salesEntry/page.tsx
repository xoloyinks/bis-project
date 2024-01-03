"use client";
import Link from "next/link";
import React from "react";
import { useState, useEffect } from "react";
import { getDocs, collection, getDoc } from "firebase/firestore";
import { FaCross, FaFilter, FaPlus, FaSearch } from "react-icons/fa";
import { IoFilterSharp } from "react-icons/io5";
import { HiOutlineDocument } from "react-icons/hi";
import { useUser } from "@/app/context";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import withAuth from "@/app/auth/withAuth";

interface Phone {
  customerName: string;
  customerNumber: string;
  phoneName: string;
  timeStamp: any;
  IMEI: string;
  unitPrice: number;
}

const dummyData: Phone[] = [
  {
    customerName: "jon doe",
    customerNumber: "080235652",
    timeStamp: new Date(),
    IMEI: "89502934980923",
    phoneName: "IPhone xr",
    unitPrice: 179000,
  },
];
function Sales() {
  const [searchInput, setSearchInput] = useState("");
  const [products, setProducts] = useState<Phone[]>(dummyData);
  const { db } : any = useUser();

  const phoneDetails = async (imei: any) => {
    try {
      const docSnap = await getDoc(imei);
      const { phoneName, IMEI } = docSnap.data() as { phoneName: string; IMEI: string };
      const data = {
        phoneName,
        IMEINumber: IMEI,
      };

      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = (event : any) => {
    const searchTerm = event.target.value;
    setSearchInput(searchTerm);

    // Filter the array based on the search term
    const filteredProducts = products.filter((item) =>
      item.phoneName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Set the filtered array to state
    setProducts(filteredProducts);
  };

  useEffect(() => {
    (async () => {
      try {
        let fetchedProducts: Phone[] = [];
        const entriesRef = collection(db, "Entries");
        const querySnapshot = await getDocs(entriesRef);

        // Use Promise.all to wait for all async calls to complete
        await Promise.all(
          querySnapshot.docs.map(async (doc) => {
            const { customerName, customerNumber, timeStamp, IMEI, unitPrice } =
              doc.data();

            // Use await to wait for the phoneDetails function
            const { phoneName, IMEINumber } = await phoneDetails(IMEI) as { phoneName: string; IMEINumber: string };

            const entry = {
              customerName,
              customerNumber,
              IMEI: IMEINumber,
              phoneName,
              timeStamp: timeStamp.toDate(),
              unitPrice,
            };

            fetchedProducts.push(entry);
          })
        ); 
 
        setProducts(fetchedProducts);
        // console.log(products)
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <section className="bg-[#F7F7F7]">
        <div className='text-[17px] px-[84px] bg-main py-[44px] text-white flex flex-col gap-16'>
            <div>
                <span className='text-fade'>Overview /</span>
                <span className='text-white'> Sales</span>
            </div>
            <div className='flex items-center justify-between'>
                <div className='flex items-center gap-5'>
                  <span>
                      <Link href="/app/salesEntry/addEntry" className='flex items-center gap-2'>
                          <span><FaPlus /></span>
                          <span>Sales Entry</span>
                      </Link>
                  </span>

                  <button><IoFilterSharp /></button>
                </div>

                <div className='flex items-center gap-5 '>
                  <span>
                    <button className='flex items-center gap-3 px-5 py-3 border-2 border-fade text-fade text-[15px] rounded-md'>Export Data <HiOutlineDocument className="text-xl" /> </button>
                  </span>

                  <form className='px-5 py-3 border-2 rounded-md border-fade text-[15px]'>
                      <span>
                        <input type="text" placeholder='Search' className="bg-transparent outline-none placeholder:text-fade"  />
                      </span>
                      <span>
                        <button className='text-fade'><FaSearch /></button>
                      </span>
                     
                  </form>
                </div>
            </div>
        </div>
      <div className="px-[84px] py-[30px]">
        <div className="w-[90%] mx-auto">
          <Table className="">
            <TableCaption>A list of Products in Stock.</TableCaption>
            <TableHeader>
              <TableRow className="">
                <TableHead className="w-[100px]"></TableHead>
                <TableHead>customer Name</TableHead>
                <TableHead>customer Number</TableHead>
                <TableHead>Phone Name</TableHead>
                <TableHead>IMEI Number</TableHead>
                <TableHead className="">Price</TableHead>
                <TableHead className="">Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((row, key) => {
                return (
                  <>
                    <TableRow key={key} className="bg-white rounded-tl-md">
                      <TableCell className="font-medium rounded-l-xl">
                        {key + 1}
                      </TableCell>
                      <TableCell>{row.customerName}</TableCell>
                      <TableCell>{row.customerNumber}</TableCell>
                      <TableCell>{row.phoneName}</TableCell>
                      <TableCell>{row.IMEI}</TableCell>
                      <TableCell>{`N${row.unitPrice}`}</TableCell>
                      <TableCell>{`${new Intl.DateTimeFormat("en-US", {
                        dateStyle: "full",
                      }).format(row.timeStamp)}`}</TableCell>
                    </TableRow>
                    <br />
                  </>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </div>
    </section>
  );
}

export default withAuth(Sales);

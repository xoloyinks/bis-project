"use client"
import Link from 'next/link'
import React from 'react'
import { useState, useEffect } from 'react'
import { getDocs,collection } from 'firebase/firestore'
import { FaCross, FaFilter, FaPlus, FaSearch } from 'react-icons/fa'
import { IoFilterSharp } from 'react-icons/io5'
import {HiOutlineDocument} from 'react-icons/hi'
import {BiEdit} from 'react-icons/bi'
import { useUser } from '@/app/context'
import withAuth from '@/app/auth/withAuth'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"


interface Phone{
  phoneName: string,
  brand: string,
  RAMSize: number,
  IMEI: string,
  diskSize: number,
  unitPrice: number
}

const dummyData: Phone [] = [
  {
    phoneName: 'IPhone xr',
    brand: 'IPhone',
    IMEI: "89502934980923",
   RAMSize: 8,
    diskSize: 256, 
    unitPrice: 179000
  },
  {
    phoneName: 'Samsung s10+',
    brand: 'Samsumg',
    IMEI: "54324522345242",
   RAMSize: 8,
    diskSize: 256, 
    unitPrice: 119000
  },
  {
    phoneName: 'Tecno Spark',
    brand: 'Tecno',
    IMEI: "94892348059234",
   RAMSize: 8,
    diskSize: 36, 
    unitPrice: 79000
  },
  
]

 function Products() {
  const [searchInput, setSearchInput] = useState('');
const [products,setProducts] = useState<Phone[]>(dummyData)
const {db} = useUser();

useEffect(()=>{
  (async ()=>{
      try {
  let fetchedProducts: Phone [] = [];
   const  phonesRef = collection(db,"Phones");
  const querySnapshot = await getDocs(phonesRef);
  
  querySnapshot.forEach((doc) => {
  fetchedProducts = [...fetchedProducts,doc.data()]
      // console.log(doc.id, " => ", doc.data());
    });
  //   console.log(fetchedProducts)
  setProducts(fetchedProducts)
  
      } catch (error) {
          console.log(error)
      }
      
  })()
  
  }
  ,[])
  
  const handleSearch = (event) => {
    const searchTerm = event.target.value;
    setSearchInput(searchTerm);

    // Filter the array based on the search term
    const filteredProducts = products.filter(item =>
      item.phoneName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Set the filtered array to state
    setProducts(filteredProducts);
  };


  return (
    <section className='bg-[#F7F7F7]'>
        <div className='text-[17px] px-[84px] bg-main py-[44px] text-white flex flex-col gap-16'>
            <div>
                <span className='text-fade'>Overview /</span>
                <span className='text-white'> Product</span>
            </div>
            <div className='flex items-center justify-between'>
                <div className='flex items-center gap-5'>
                  <span>
                      <Link href="/app/product/addProduct" className='flex items-center gap-2'>
                          <span><FaPlus /></span>
                          <span>Add Product</span>
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
                        <input type="text" placeholder='Search by phone' className="bg-transparent outline-none placeholder:text-fade" 
                         value={searchInput}
                         onChange={handleSearch}/>
                      </span>
                      <span>
                        <button className='text-fade'><FaSearch /></button>
                      </span>
                     
                  </form>
                </div>
            </div>
        </div>

        <div className='px-[84px] py-[30px]'>
            <div className='w-[90%] mx-auto'>
              <Table className=''>
                <TableCaption>A list of Products in Stock.</TableCaption>
                <TableHeader>
                  <TableRow className=''>
                    <TableHead className="w-[100px]"></TableHead>
                    <TableHead >Name</TableHead>
                    <TableHead>Brand</TableHead>
                    <TableHead>IMEI Number</TableHead>
                    <TableHead>RAM size</TableHead>
                    <TableHead>Disk size</TableHead>
                    <TableHead className="">Price</TableHead>
                    <TableHead className="text-right"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {
                    products.map((row, key) => {
                      return(
                        <>
                            <TableRow key={key} className='bg-white rounded-tl-md'>
                              <TableCell className="font-medium rounded-l-xl">{key + 1}</TableCell>
                              <TableCell >{row.phoneName}</TableCell>
                              <TableCell>{row.brand}</TableCell>
                              <TableCell>{row.IMEI}</TableCell>
                              <TableCell>{`${row.RAMSize}GB`}</TableCell>
                              <TableCell>{`${row.diskSize}GB`}</TableCell>
                              <TableCell>{`N${row.unitPrice}`}</TableCell>
                              <TableCell className="text-right rounded-r-xl">
                                  <button className='flex items-center gap-1 text-sm'><BiEdit className="text-xl" /> Edit</button>
                              </TableCell>
                            </TableRow>
                            <br />
                        </>
                      )
                    })
                  }
                  
                </TableBody>
              </Table>
            </div>
        </div>
    </section>

  )
                }

export default withAuth(Products);
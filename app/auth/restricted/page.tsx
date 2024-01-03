"use client"
import dotenv from 'dotenv';
import Image from 'next/image'
// import { useUser } from './context';

console.log("aa")
// dotenv.config();
export default function Restricted() {
//   const {color} = useUser();


  return (
    <>
      <section>
        {/* {color} */}
        <h1>Not an admin page is restricted</h1>
      </section>
    </>
  )
}

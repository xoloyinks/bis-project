'use client'
import Image from "next/image"
import spinner from "./Rolling-0.6s-50px.svg"

export default function Loading() {
    // You can add any UI inside Loading, including a Skeleton.
    return (
      <>
        <div className="flex items-center justify-center w-screen h-screen">
          <Image src={spinner} width={100} height={100} alt="Loading..." />
        </div>
      </>
    )
  }
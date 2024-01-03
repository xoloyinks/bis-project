import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const dataCompleted = [
    {
        productName: "Samsung S10+",
        amt: "N150,000",
        status: "Sold",
        date: "9/11/2023"
    },
    {
        productName: "Samsung S10+",
        amt: "N150,000",
        status: "Sold",
        date: "9/11/2023"
    },
    {
        productName: "Samsung S10+",
        amt: "N150,000",
        status: "Sold",
        date: "9/11/2023"
    },
    {
        productName: "Samsung S10+",
        amt: "N150,000",
        status: "Sold",
        date: "9/11/2023"
    },
    {
        productName: "Samsung S10+",
        amt: "N150,000",
        status: "Sold",
        date: "9/11/2023"
    },
    {
        productName: "Samsung S10+",
        amt: "N150,000",
        status: "Sold",
        date: "9/11/2023"
    },
]

const dataPending = [
    {
        productName: "IPhone xr",
        amt: "N150,000",
        status: "Pending",
        date: "9/11/2023"
    },
    {
        productName: "IPhone xr",
        amt: "N150,000",
        status: "Pending",
        date: "9/11/2023"
    },
    {
        productName: "IPhone xr",
        amt: "N150,000",
        status: "Pending",
        date: "9/11/2023"
    },
    {
        productName: "IPhone xr",
        amt: "N150,000",
        status: "Pending",
        date: "9/11/2023"
    },
    {
        productName: "IPhone xr",
        amt: "N150,000",
        status: "Pending",
        date: "9/11/2023"
    },
    {
        productName: "IPhone xr",
        amt: "N150,000",
        status: "Pending",
        date: "9/11/2023"
    },
]

const dateFailed = [
    {
        productName: "Tecno",
        amt: "N150,000",
        status: "Failed",
        date: "9/11/2023"
    },
    {
        productName: "Tecno",
        amt: "N150,000",
        status: "Failed",
        date: "9/11/2023"
    },
    {
        productName: "Tecno",
        amt: "N150,000",
        status: "Failed",
        date: "9/11/2023"
    },
    {
        productName: "Tecno",
        amt: "N150,000",
        status: "Failed",
        date: "9/11/2023"
    },
    {
        productName: "Tecno",
        amt: "N150,000",
        status: "Failed",
        date: "9/11/2023"
    },
    {
        productName: "Tecno",
        amt: "N150,000",
        status: "Failed",
        date: "9/11/2023"
    },
]
export default function History() {
  return (
    <section className='px-5 py-4'>
        <div className='flex items-center justify-between'>
            <span className='font-semibold'>History</span>
            <span className='text-sm'>
                <select name="" id="">
                    <option value="week">This week</option>
                    <option value="month">This Month</option>
                    <option value="year">This Year</option>
                </select>
            </span>
        </div>
        <div className='py-5 text-center'>
            <Tabs defaultValue="completed" className="mx-auto">
              <TabsList>
                <TabsTrigger value="completed">Completed</TabsTrigger>
                <TabsTrigger value="pending">Pending</TabsTrigger>
                <TabsTrigger value="failed">Failed</TabsTrigger>
               </TabsList>
               <TabsContent value="completed">
                    {dataCompleted.map((datum, key) => {
                        return(
                            <div key={key} className='py-3 text-md' >
                                <div className='flex items-center justify-between text-[0.9rem] font-semibold py-2'>
                                    <span>
                                        {datum.productName}
                                    </span>
                                    <span>
                                        {datum.amt}
                                    </span>
                                </div>
                                <div className='flex items-center justify-between text-sm text-gray-400'>
                                    <span>{datum.status}</span>
                                    <span>{datum.date}</span>
                                </div>
                            </div>
                        )
                    })}
               </TabsContent>

               <TabsContent value="pending">
                    {dataPending.map((datum, key) => {
                        return(
                            <div key={key} className='py-3 text-md'>
                                <div className='flex items-center justify-between text-[0.9rem] font-semibold py-2'>
                                    <span>
                                        {datum.productName}
                                    </span>
                                    <span>
                                        {datum.amt}
                                    </span>
                                </div>
                                <div className='flex items-center justify-between text-sm text-gray-400'>
                                    <span>{datum.status}</span>
                                    <span>{datum.date}</span>
                                </div>
                            </div>
                        )
                    })}
               </TabsContent>

               <TabsContent value="failed">
                    {dateFailed.map((datum, key) => {
                        return(
                            <div key={key} className='py-3 text-md'>
                                <div className='flex items-center justify-between text-[0.9rem] font-semibold py-2'>
                                    <span>
                                        {datum.productName}
                                    </span>
                                    <span>
                                        {datum.amt}
                                    </span>
                                </div>
                                <div className='flex items-center justify-between text-sm text-gray-400'>
                                    <span>{datum.status}</span>
                                    <span>{datum.date}</span>
                                </div>
                            </div>
                        )
                    })}
               </TabsContent>
            </Tabs>
            
        </div>
    </section>
  )
}

'use client'
import { BarChart, Bar, PieChart, Pie, Legend, Cell,Rectangle,  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import React, { useEffect, useState } from 'react'
import { FaUserFriends } from "react-icons/fa";
import {IoCashOutline, IoPhonePortrait} from 'react-icons/io5'
import { GiReceiveMoney } from 'react-icons/gi'
import History from './components/history/page';
import TopSelling from './components/topSelling/page';
import withAuth from '../auth/withAuth';

// import { configDotenv } from 'dotenv';
// configDotenv();



 function Bis() {
const [userName,setUserName] = useState<string>("admin");
  
interface CustomTooltipProps {
  active: any;
  payload: any;
  label: string;
}

type Inventory = {
  icon: any ,
  amount: string,
  tag: string
}


const inventorySummary: Inventory[] = [
  {
    icon: <IoCashOutline />,
    amount: "N560,000.89",
    tag: "Total Sales"
  },
  {
    icon: <IoPhonePortrait />,
    amount: "5,790",
    tag: "Total Products"
  },
  {
    icon: <GiReceiveMoney />,
    amount: "N340,000",
    tag: "Total Profits"
  },
  {
    icon: <FaUserFriends />,
    amount: "180",
    tag: "Visitors"
  }
]

  const date = new Date();
  const currentDate = date.toDateString();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const storedUser = window.sessionStorage.getItem('user');
  if(storedUser){
    const currentUser = JSON.parse(storedUser);
    // console.log(currentUser)
    const {email} = currentUser;
    setUserName(email);
    // if(displayName){

    // }
  }

  }, []);

  if (!isMounted) {
    return null;
  }

  const sales = [
    {name: 'Jan', uv: 0, pv: 2400, amt: 5500},
    {name: 'Feb', uv: 200, pv: 2400, amt: 3999},
    {name: 'Mar', uv: 700, pv: 2400, amt: 1000},
    {name: 'Apr', uv: 390, pv: 2400, amt: 4830},
    {name: 'May', uv: 454, pv: 2400, amt: 2400},
    {name: 'Jun', uv: 644, pv: 2400, amt: 4500},
    {name: 'Jul', uv: 600, pv: 2400, amt: 7300},
    {name: 'Aug', uv: 233, pv: 2400, amt: 2344},
    {name: 'Sep', uv: 455, pv: 2400, amt: 6445},
    {name: 'Oct', uv: 788, pv: 2400, amt: 9090},
    {name: 'Nov', uv: 122, pv: 2400, amt: 6899},
    {name: 'Dec', uv: 200, pv: 2400, amt: 1234},

];

const products = [
  {name: 'IPhone', uv: 500, quantity: 240, amt: 5500},
  {name: 'Samsung', uv: 200, quantity: 500, amt: 3999},
  {name: 'Infinix', uv: 700, quantity: 800, amt: 1000},
  {name: 'Tecno', uv: 390, quantity: 120, amt: 4830},
  {name: 'Nokia', uv: 454, quantity: 600, amt: 2400},
  {name: 'Itel', uv: 644, quantity: 450, amt: 4500},
];

const data = [
  { name: 'IPhone', value: 400 },
  { name: 'Samsung', value: 300 },
  { name: 'Infinix', value: 300 },
  { name: 'Tecno', value: 200 },
  {name: 'Nokia', value:280},
  {name: 'Itel', value:450},
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF83442' , '#ff8099'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }: {cx: number, cy:number, midAngle:number, innerRadius:number, outerRadius:number, percent:number, index:number}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

var tooltip = {
  active: null,
  payload: null,
  label: ''
}

const CustomTooltip:  React.FC<CustomTooltipProps> = ({ active, payload, label}) => {
  if (active && payload && payload.length) {
    tooltip = {
      active: active,
      payload: payload,
      label: label
    }
    return (
      <div className="px-5 py-3 text-white bg-black rounded-lg custom-tooltip">
        <p className="font-semibold label">{`${label}`}</p>
        <p className="text-sm text-center desc">{`${payload[0].value}`}</p>
      </div>
    );
  }

  return null;
}
    const time = new Date();
    const currentTime = time.getHours();

  return (
    <>
      <section className=' text-[17px] bg-[#F7F7F7]'>
          <div className='bg-main h-[424px] text-maintext py-[84px] px-[84px] flex justify-between '>
              <div className='flex flex-col gap-3 '>
                <span>
                  <span className='text-fade'>Overview /</span> Dashboard
                </span>
                <span className='flex items-center text-5xl'>
                    <h1>Hello {userName}</h1>
                </span>
                <span className='text-fade'>
                    Good {currentTime < 12 ? "morning" : currentTime > 12 && currentTime < 17 ? "afternoon" : "evening"}, how is your day going? 
                </span>
              </div>
              <div className='text-fade'>
                {currentDate}
              </div>
          </div>

          <div className='px-[84px]  -translate-y-24 flex justify-between'>
            {
              inventorySummary.map((data, key) => {
                return(
                  <div key={key} className='px-5 py-3 rounded-md w-[314px] h-[197px] bg-white flex flex-col gap-[42px] font-[600] shadow-md'>
                    <div className='bg-blue-200/50 rounded-md w-[42px] h-[42px] flex items-center justify-center text-blue-600'>
                      {data.icon}
                    </div>
                    <div className='flex flex-col gap-3'>
                      <div className='text-3xl sora'>
                        {data.amount}
                      </div>
                      <div>{data.tag}</div>
                    </div>
                  </div>
                )
              })
            }
             
          </div>

          <div className='flex w-full px-[84px] justify-between -my-14'>
            <div className='w-[68%]'>
              <div className='w-full px-5 pt-3 pb-8 bg-white rounded-xl h-fit'>
                <Tabs defaultValue="sales" className="full">
                <TabsList>
                  <TabsTrigger value="sales">Sales</TabsTrigger>
                  <TabsTrigger value="products">Products</TabsTrigger>
                  <TabsTrigger value="profits">Profits</TabsTrigger>
                </TabsList>
                {/* Tab for sales */} 
                <TabsContent value="sales" className=''>
                  <div className='w-full pt-5 mx-3 my-5 text-2xl font-semibold border-t-2 border-gray-200'>Sales</div>
                  <AreaChart
                      width={900}
                      height={300}
                      data={sales}
                      margin={{
                        top: 5,
                        right: 0,
                        left: 0,
                        bottom: 5,
                      }}
                    >
                      <YAxis fontSize={15}  className='font-semibold sora' />
                      <Area type="bump" dataKey="uv" stroke="#8884d8" fill='#E4ecfe'  strokeWidth={5} className=' bg-gradient-to-b from-slate-600 to-white' />
                      <XAxis dataKey="name" fontSize={15} className='font-semibold sora' />
                      <Tooltip content={<CustomTooltip {...tooltip} />}/>
                    </AreaChart>
                </TabsContent>

                {/* Tab for Products */}
                <TabsContent value="products">
                <div className='w-full pt-5 mx-3 my-5 text-2xl font-semibold border-t-2 border-gray-200'>Products</div>
                    <BarChart
                    width={800}
                    height={300}
                    data={products}
                    margin={{
                      top: 45,
                      right: 0,
                      left: 0,
                      bottom: 5,
                    }}
                    barSize={20}
                    >
                      <XAxis dataKey="name" scale="auto" padding={{ left: 10, right: 10 }} fontSize={15} />
                      <YAxis fontSize={15} />
                      <Tooltip content={<CustomTooltip {...tooltip} />}/>
                      <Legend />
                      <Bar dataKey="quantity" fill="#8884d8" background={{ fill: '#eee' }} />
                    </BarChart>
                </TabsContent>

                {/* Tab for Profits */}
                <TabsContent value='profits'>
                <div className='w-full pt-5 mx-3 my-5 text-2xl font-semibold border-t-2 border-gray-200'>Profits</div>
                <PieChart width={900} height={300}>
                    <Pie
                      data={data}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={renderCustomizedLabel}
                      outerRadius={120}
                      fill="#8884d8"
                      dataKey="value"
                      className='text-sm'
                    >
                      {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Legend />
                </PieChart>
                </TabsContent>
              </Tabs>
              </div>
              <div className='w-full px-5 pt-3 pb-8 mt-5 bg-white rounded-xl h-fit'>
                {/* <TopSelling /> */}
              </div>
            </div>

            <div className='w-[30%] bg-white rounded-lg'>
                <History />
            </div>
            
          </div>
         
      </section>
    </>
  )
}

export default withAuth(Bis)
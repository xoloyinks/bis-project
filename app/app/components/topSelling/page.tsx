import React from 'react'

export default function TopSelling() {
  return (
    <>
        <section>
            <div className='flex items-center justify-between'>
              <span className='font-semibold'>Top Selling Products</span>
              <span className='text-sm'>
                <select name="" id="">
                  <option value="week">This Week</option>
                  <option value="month">This Month</option>
                  <option value="year">This Year</option>
                </select>
              </span>
            </div>

            
        </section>
    </>
  )
}

import React from 'react'

type Props = {}

const Dashboard = (props: Props) => {
  return (
    <div className='grid grid-cols-2 space-x-4'>
        <div className='grid grid-rows-2 w-full h-full space-y-4'>
            <div className='border border-gray-400 rounded-md h-full'>
                test
            </div>
            <div className='border border-gray-400 rounded-md h-full'>
                test
            </div>
        </div>
        <div className='w-full h-full border border-gray-400 rounded-md'>
            test
        </div>
    </div>
  )
}

export default Dashboard
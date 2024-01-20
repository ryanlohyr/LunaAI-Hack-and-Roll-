import IndexList from '@/features/tuning/components/IndexList'
import React from 'react'

type Props = {}

const page = (props: Props) => {
  return (
    <div className='flex flex-col min-h-screen justify-start py-8 px-16 mx-auto max-w-7xl'>
        <div className='flex flex-col space-y-4'>
            <h1 className="font-bold text-4xl">Knowledge Base</h1>
            <p className="text-gray-400">To change outdated data in the database stored as embeddings</p>
            <IndexList/>
        </div>
    </div>
  )
}

export default page
"use client";

import IndexList from '@/features/tuning/components/IndexList'
import { getAllIndex } from '@/service/vector'
import React, { useEffect, useState } from 'react'

type Props = {}

const Page = () => {
  const [data, setIndexData] = useState(null);

  useEffect(() => {
    getAllIndex().then((res) => {
      setIndexData(res);
    }, (err) => {
      console.error(err.message)
    })
  },[])


  return (
    <div className='flex flex-col min-h-screen justify-start py-8 px-16 mx-auto max-w-7xl'>
        <div className='flex flex-col space-y-4'>
            <h1 className="font-bold text-4xl">Knowledge Base</h1>
            <p className="text-gray-400">To change outdated data in the database stored as embeddings</p>
            {data && <IndexList data={data}/>}
        </div>
    </div>
  )
}

export default Page
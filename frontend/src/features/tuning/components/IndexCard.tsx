"use client";

import { parseName } from '@/lib/utils';
import { ChevronRight } from 'lucide-react'
import { useRouter } from 'next/navigation';
import React from 'react'

const IndexCard = ({ data }: { data: string }) => {
  const router = useRouter();

  return (
    <button onClick={() => router.replace(`/tuning/${data}`)} className='flex flex-row w-full'>
      <div className='rounded-xl shadow-sm flex flex-row border-2 border-grey-200 py-4 px-8 w-full justify-between group hover:bg-slate-200 cursor-pointer'>
          <div className='flex flex-row space-x-4'>
              <h1 className='text-gray-500'>Index: </h1>
              <p className='font-bold'>{parseName(data)}</p>
          </div>
          <ChevronRight className='self-end text-gray-400 group-hover:translate-x-2 group-hover:transition'/>
      </div>
    </button>
  )
}

export default IndexCard
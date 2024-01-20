import VectorList from '@/features/tuning/components/VectorList'
import React from 'react'

type Props = {}

const props = {
  title: "How to save CPF",

}

const page = () => {
  return (
    <div className='flex flex-col min-h-screen justify-start py-8 px-16 mx-auto max-w-7xl mb-8'>
      <div className='flex flex-col space-y-4'>
        <h1 className="font-bold text-4xl">{props.title}</h1>
        <p className="text-gray-400">The index of the vector database, edit the text boxes below to re-upload embeddings</p>
        <VectorList/>
      </div>
    </div>
  )
}

export default page
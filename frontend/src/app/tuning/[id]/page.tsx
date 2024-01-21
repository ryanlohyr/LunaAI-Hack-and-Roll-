"use client";

import VectorList from '@/features/tuning/components/VectorList'
import { Vector } from '@/features/tuning/types/tuning.type'
import { parseName } from '@/lib/utils'
import { getIndexVectors } from '@/service/vector';
import React, { useEffect, useState } from 'react'

// const data = [
//   {
//       "id": "16",
//       "metadata": {
//           "content": "Many members use CPF to buy a property or service a housing loan. \n Important thing to note: While you may use your OA savings to pay for your property, consider keeping some savings. These savings can help with future mortgage payments in times of emergency. If left unused, these savings can grow at stable interest rates.",
//           "header": "<h2>Using your CPF</h2><h3>Using your OA savings</h3>"
//       }
//   },
//   {
//       "id": "1",
//       "metadata": {
//           "content": "The Central Provident Fund (CPF) is a key pillar of Singaporeâ€™s social security system. CPF helps Singapore Citizens and Permanent Residents set aside funds to build a strong foundation for retirement.",
//           "header": "<h2>How CPF works</h2>"
//       }
//   },
//   {
//       "id": "14",
//       "metadata": {
//           "content": "You have the option of investing in a wide range of investments to grow your retirement nest egg. If youâ€™re not confident of investing on your own, you should leave your savings in your CPF account and earn interest.",
//           "header": "<h2>Growing your CPF</h2><h3>Invest your OA and SA savings</h3>"
//       }
//   },
//   {
//       "id": "6",
//       "metadata": {
//           "content": "Besides employment contributions, CPF accounts will also be opened when the CPF Board receives cash top-ups or government grants. \nFor example, if you make a cash top-up for your child, or when a Singapore Citizen newborn qualifies for a MediSave grant.",
//           "header": "<h2>How CPF works</h2><h3>Your CPF accounts</h3><h3>Other ways CPF accounts might be opened</h3>"
//       }
//   },
// ]

const Page = ({ params }: { params: { id: string }}) => {
  const [data, setVectorData] = useState();

  useEffect(() => {
    getIndexVectors(params.id).then(
      (result) => {
        setVectorData(result);
      }, (err) => {
          console.error(err.message)
      });
  },[params.id])

  return (
    <div className='flex flex-col min-h-screen justify-start py-8 px-16 mx-auto max-w-7xl mb-8'>
      <div className='flex flex-col space-y-4'>
        <h1 className="font-bold text-4xl">{parseName(params.id)}</h1>
        <p className="text-gray-400">The index of the vector database, edit the text boxes below to re-upload embeddings</p>
        {data && <VectorList data={data} name={params.id}/>}
      </div>
    </div>
  )
}

export default Page;
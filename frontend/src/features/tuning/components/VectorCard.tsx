"use client";

import { EditCancelButton } from '@/components/ui/edit-cancel-button'
import { Textarea } from '@/components/ui/textarea'
import React, { useState } from 'react'
import { Vector } from '../types/tuning.type';
import { postVector } from '@/service/vector';
import { parseHTMLString } from '@/lib/utils';

type Props = {
  id:string;
  metadata: {
    content: string;
    header: string;
  }
}

const VectorCard = ({ data, name } : 
  {
    data: Props; 
    name: string;
  }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [vectorData, setVectorData] = useState(data.metadata.content);

  const onSubmit = () => {
    console.log(data.id, vectorData)
    postVector(data.id, vectorData, name, data.metadata.header).then(
      (res) => {
        setIsEdit(false);
      }, (err) => {
        console.error(err.message)
      }
    )
    
  }
  const header = parseHTMLString(data.metadata.header)
  return (
    <div className='rounded-xl shadow-sm flex flex-col border-2 border-grey-200 p-4 space-y-2'>
        <h1 className='font-bold text-lg'>{header}</h1>
        <Textarea disabled={!isEdit} value={vectorData} onChange={(e) => setVectorData(e.target.value)}/>
        <EditCancelButton isEdit={isEdit} handleSubmit={() => onSubmit()} toggleEdit={() => setIsEdit(prev => !prev)}/>
    </div>
  )
}

export default VectorCard
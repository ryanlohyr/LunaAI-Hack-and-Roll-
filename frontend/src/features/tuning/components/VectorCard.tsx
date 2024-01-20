"use client";

import { EditCancelButton } from '@/components/ui/edit-cancel-button'
import { Textarea } from '@/components/ui/textarea'
import React, { useState } from 'react'

type Props = {
    index:string;
}

const VectorCard = ({ data } : {data: Props}) => {
    const [isEdit, setIsEdit] = useState(false);
    const handleSubmit = () => {
        console.log("")
    }
  return (
    <div className='rounded-xl shadow-sm flex flex-col border-2 border-grey-200 p-4 space-y-2'>
        <h1 className='font-bold text-lg'>Title</h1>
        <Textarea disabled={!isEdit} />
        <EditCancelButton isEdit={isEdit} handleSubmit={() => handleSubmit} toggleEdit={() => setIsEdit(prev => !prev)}/>
    </div>
  )
}

export default VectorCard
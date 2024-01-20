"use client";

import React from 'react'
import VectorCard from './VectorCard'

type Props = {}

const data = [
    {
        index: "Steps to save"
    },
    {
        index: "Steps to start"
    },
    {
        index: "Steps to close"
    },
    {
        index: "Steps to delete"
    },
]

const VectorList = (props: Props) => {
  return (
    <div className='space-y-4 w-full'>
        {data.map((o) => (
            <VectorCard data={o} key={o.index}/>
        ))}

    </div>
  )
}

export default VectorList
"use client";

import React from 'react'
import VectorCard from './VectorCard'
import { Vector } from '../types/tuning.type';

type Props = {
    data: Vector[];
    name: string;
}

const VectorList = (props: Props) => {
    const data = props.data;
  return (
    <div className='space-y-4 w-full'>
        {data.map((o) => (
            <VectorCard data={o} key={o.id} name={props.name}/>
        ))}
    </div>
  )
}



export default VectorList
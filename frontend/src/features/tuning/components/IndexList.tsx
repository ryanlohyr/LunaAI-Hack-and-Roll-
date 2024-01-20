import { ChevronRight } from 'lucide-react'
import React from 'react'
import IndexCard from './IndexCard'

type Props = {}

const data = [
    {
        index: "How to save CPF"
    },
    {
        index: "How to start CPF"
    },
    {
        index: "How to close CPF"
    },
    {
        index: "How to do CPF"
    },
]

const IndexList = (props: Props) => {
  return (
    <div className='space-y-4 w-full'>
        {data.map((o) => (
            <IndexCard data={o} key={o.index}/>
        ))} 
    </div>
  )
}

export default IndexList
import { ChevronRight } from 'lucide-react'
import React from 'react'
import IndexCard from './IndexCard'

type Props = {
    data: string[];
}


const IndexList = (props: Props) => {
  return (
    <div className='space-y-4 w-full'>
        {props.data.map((o) => (
            <IndexCard data={o} key={o}/>
        ))} 
    </div>
  )
}

export default IndexList
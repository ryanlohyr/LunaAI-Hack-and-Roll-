import Logs from '@/features/logs/components/Logs'
import { data } from '@/features/logs/types/data'
import React from 'react'

type Props = {}

const page = (props: Props) => {
    const logs = data
  return (
    <div>
        <Logs logs={logs}/>
    </div>
  )
}

export default page
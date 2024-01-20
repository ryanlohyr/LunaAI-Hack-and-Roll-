"use client";

import React, { useContext } from 'react'
import LogsList from './LogsList'
import LogsDisplay from './LogsDisplay'
import { LogsData, data } from '../types/data'
import { LogContext } from '@/lib/context/LogContext';

type Props = {
    logs: LogsData[];
}

const Logs = (props: Props) => {
    const { log } = useContext(LogContext)

  return (
    <div className='flex flex-row'>
        <div className='flex border-r-2 border-gray-200 w-1/3'>
            <LogsList data={props.logs}/>
        </div>
        <div className='w-2/3 h-full'>
            <LogsDisplay log={props.logs.find((item) => item.id === log) || null}/>
        </div>
    </div>
  )
}

export default Logs
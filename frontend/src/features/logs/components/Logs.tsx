"use client";

import React, { useContext } from 'react'
import LogsList from './LogsList'
import LogsDisplay from './LogsDisplay'
import { LogContext } from '@/lib/context/LogContext';
import { LogType } from '../types/logs.type';

type Props = {
    logs: LogType[];
}

const Logs = (props: Props) => {
    // console.log(props.logs)
    const { log } = useContext(LogContext)
    const selectedLog = log ? props.logs?.find((item) => item.id === log) : null;

  return props.logs && (
    <div className='flex flex-row'>
        <div className='flex border-r-2 border-gray-200 w-1/3'>
            <LogsList data={props.logs}/>
        </div>
        <div className='w-2/3 h-full'>
            <LogsDisplay log={selectedLog || null}/>
        </div>
    </div>
  )
}

export default Logs
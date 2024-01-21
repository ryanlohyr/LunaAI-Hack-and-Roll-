"use client";

import Logs from '@/features/logs/components/Logs'
import { getLogs } from '@/service/logs';
import React, { useEffect, useState } from 'react'

const Page = () => {
  const [logs, setLogsState] = useState(null)

  useEffect(() => {
    getLogs().then((res) => {
      setLogsState(res);
    }, (err) => {
      console.error(err.message)
    })
  },[])

  return (
    <div>
      {logs ? (<Logs logs={logs}/>) : (
        <div className='flex items-center justify-center h-40'>
          <h1 className='text-gray-400'>Loading...</h1>
        </div>
      )}
    </div>
  )
}

export default Page
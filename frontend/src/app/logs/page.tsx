"use client";

import Logs from '@/features/logs/components/Logs'
import { data } from '@/features/logs/types/data'
import { getLogs } from '@/service/logs';
import React, { useEffect, useState } from 'react'

const Page = () => {
  const logs = data
  // TODO: change to logs 
  const [logState, setLogsState] = useState(null)

  useEffect(() => {
    getLogs().then((res) => {
      setLogsState(res);
    }, (err) => {
      console.error(err.message)
    })
  },[])

  return (
    <div>
      {logs && <Logs logs={logs}/>}
    </div>
  )
}

export default Page
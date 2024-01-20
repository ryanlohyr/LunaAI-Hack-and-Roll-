import React, { useEffect, useRef, useState } from 'react'
import { LogsData } from '../types/data'
import LogsChatBubble from './LogsChatBubble';
import { ScrollArea } from '@/components/ui/scroll-area';

type Props = {
    log: LogsData | null;
}

const LogsDisplay = ({ log }: Props) => {
    const [summaryHeight, setHeight] = useState<number>(0);
    useEffect(() => {
        const summary = document.getElementById("summary")?.clientHeight;
        if (summary) {
            setHeight(summary);
        };
    }, [log])
    
    if (log === null) {
        return (
            <div className='flex items-center justify-center h-60'>
                <p className='text-lg text-gray-400 self-center'>Select a chat</p>
            </div>
        )
    }
  return log && (
    <div className='flex flex-col relative w-full bg-gray-200'>
        <div className='border-gray-200 border-b-2 p-4 h-fit bg-white absolute z-50 w-full' id="summary">
            <h1 className='font-bold text-xl'><span className='font-normal text-gray-400'>Call: </span>{log.id}</h1>
            <p className='text-gray-300'>Quick Summary</p>
            <ScrollArea className='max-h-52 mb-4 overflow-auto'>
                <div className=''>
                    <p>{log.summary}</p>
                </div>
            </ScrollArea>
            
        </div>
        <div className='flex flex-col w-full h-[calc(100vh-100px)]'>
            <ScrollArea className='overflow-auto max-h-[calc(100vh-88px)]'>
                <div className={`flex flex-col  w-full p-4 space-y-4 py-4 overflow-x-hidden min-h-[420px] grow`}
                    style={{ marginTop: `${summaryHeight}px`}}
                >
                    {log.metadata.map((o, i) => {
                        return (
                            <LogsChatBubble role={o.role} content={o.content} key={i}/>
                        )
                    })}

                </div>
            </ScrollArea>
        </div>
        

    </div>
  )
}

export default LogsDisplay
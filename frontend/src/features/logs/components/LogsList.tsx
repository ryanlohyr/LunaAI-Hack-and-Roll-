import { ScrollArea } from '@/components/ui/scroll-area'
import React, { useContext } from 'react'
import { LogsData } from '../types/data'
import { cn } from '@/lib/utils';
import { LogContext } from '@/lib/context/LogContext';

type Props = {
    data: LogsData[];
}

const LogsList = ({ data }: Props) => {
    const { log, setLog } = useContext(LogContext);
    console.log(log)

  return (
    <div className='w-full h-full'>
        <h1 className='font-bold text-3xl p-4'>Chat Logs</h1>
        <ScrollArea className="h-[660px] overflow-auto">
            <div className="flex flex-col gap-2 p-4 pt-0 w-full">
                {data.map((o) =>{
                    const last = o.metadata.length - 1;
                    const latestMsg = o.metadata[last]

                    return (
                        <button 
                            className={cn(
                                "flex flex-col w-full items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent overflow-hidden",
                                log === o.id && "bg-accent"
                            )}
                            key={o.id} 
                            onClick={() => setLog(o.id)}
                        >
                            <div className='flex flex-col items-start overflow-hidden w-full'>
                                <h1 className='font-bold text-lg line-clamp-1'>{o.id}</h1>
                                <p className='text-gray-400 line-clamp-1'>Last message: {latestMsg.content.substring(0, 200)}</p>
                            </div>
                        </button>
                )})}
            </div>
        </ScrollArea>
    </div>
    
    
  )
}

export default LogsList
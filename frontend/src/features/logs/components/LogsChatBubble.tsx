import { cn } from '@/lib/utils';
import React, { RefObject } from 'react'

type Props = {
    content: string;
    index: number;
}

const LogsChatBubble = (props: Props) => {
    // console.log(props.index % 1 === 0)
    return (
        <div 
            className={cn(
                'self-end bg-white max-w-96 p-3',
                props.index % 2 === 1 ? "self-start bg-lunaPrimary text-white rounded-br-lg" : "self-end bg-white rounded-tl-md border border-gray-300"

            )}
        >
            <p>{props.content}</p>
        </div>
    )
}

export default LogsChatBubble
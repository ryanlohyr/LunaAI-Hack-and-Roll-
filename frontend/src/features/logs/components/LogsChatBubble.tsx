import { cn } from '@/lib/utils';
import React, { RefObject } from 'react'

type Props = {
    role: string;
    content: string;
}

const LogsChatBubble = (props: Props) => {

    return (
        <div 
            className={cn(
                'self-end bg-white max-w-96 p-3',
                props.role === "user" ? "self-start bg-lunaPrimary text-white rounded-br-lg" : "self-end bg-white rounded-tl-md border border-gray-300"

            )}
        >
            <p>{props.content}</p>
        </div>
    )
}

export default LogsChatBubble
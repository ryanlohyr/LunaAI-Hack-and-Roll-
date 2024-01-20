"use client";

import React, { useEffect, useState } from 'react'
import DashboardCard from './DashboardCard'
import { Textarea } from '@/components/ui/textarea';
import { EditCancelButton } from '@/components/ui/edit-cancel-button';
import { Input } from '@/components/ui/input';
import { Vector } from '@/features/tuning/types/tuning.type';
import { postImptInfo, postPresetPrompt } from '@/service/dashboard';
import { ScrollArea } from '@/components/ui/scroll-area';

type Props = {
    presetPrompt: string;
    logsSummary: string;
    pendingActions: number;
    imptInfo: Vector[];
}

const HEADERS = [
    "Healthcare Enquiry SG",
    "Healthcare Enquiry Intl",
    "CPF Others Enquiry SG",
    "CPF Others Enquiry Intl",
]

const Dashboard = (props: Props) => {
    const [imptInfoData, setImptInfoData] = useState(props.imptInfo);
    const [prompt, setPrompt] = useState(props.presetPrompt);
    const [isEditImpt, setIsEditImpt] = useState(false);
    const [isEditPrompt, setIsEditPrompt] = useState(false);

    useEffect(() => {
        if (props.imptInfo) {
            setImptInfoData(props.imptInfo)
        }
        if (props.presetPrompt) {
            setPrompt(props.presetPrompt)
        }
        
    }, [props])

    const hanldeSubmitPrompt = () => {
        console.log(prompt);
        postPresetPrompt(prompt).then(
            (res) => {
                setIsEditPrompt(false)
            }, (err) => {
                console.error(err.message)
            }
        )
    }

    const hanldeSubmitImpt = () => {
        console.log(imptInfoData);
        postImptInfo(imptInfoData).then(
            (res) => {
                setIsEditImpt(false)
            }, (err) => {
                console.error(err.message)
            }
        )
    }

    const handleEditImpt = (index: string, newContent: string) => {
        setImptInfoData((prevData) => {
            return prevData.map((item) => {
              if (item.id === index) {
                // Modify the 'name' field in the object at the specified index
                return { 
                    ...item, 
                    metadata: {
                        ...item.metadata,
                        content: newContent,
                    },
                };
              } else {
                return item;
              }
            });
          });
      };
    // if (!props.logsSummary) {
    //     return (
    //         <div className='flex items-center justify-center h-54'>
    //             <h1 className='text-gray-300'>Loading...</h1>
    //         </div>
    //     )
    // }

  return (
    <div className='grid grid-cols-2 space-x-4'>
        <div className='grid grid-rows-2 space-y-4'>
            <div className='grid grid-cols-2 space-x-4'>
                <DashboardCard 
                    components={
                        <div className='flex flex-col justify-center items-center relative h-full'>
                            <h1 className='font-bold text-lg absolute top-0 left-0'>Pending Actions</h1>
                            <p className='font-bold text-5xl'>{props.pendingActions}</p>
                        </div>
                    }
                />
                <DashboardCard 
                    components={
                        <div>
                            <h1 className='font-bold text-lg'>Logs Summary</h1>
                            <ScrollArea className='h-60'>
                                <p className=''>{props.logsSummary}</p>
                            </ScrollArea>
                            
                        </div>
                    }
                />
            </div>
            
            <DashboardCard 
                components={
                    <div className='flex flex-col space-y-2'>
                        <h1 className='font-bold text-lg'>Important Information</h1>
                        <div className='flex flex-col space-y-2'>
                            {imptInfoData.map((o) => (
                                <div className='flex flex-row justify-between' key={o.metadata.header}>
                                    <h1 className='font-bold text-md'>{HEADERS[Number(o.id)-1]}</h1>
                                    <Input value={o.metadata.content} onChange={(e) => handleEditImpt(o.id, e.target.value)} className='max-w-[200px]' disabled={!isEditImpt}/>
                                </div>
                            ))}
                            <EditCancelButton handleSubmit={() => hanldeSubmitImpt()} isEdit={isEditImpt} toggleEdit={() => setIsEditImpt(prev => !prev)}/>
                        </div>
                    </div>
                }
            />
        </div>
        <DashboardCard 
            components={
                <div className='flex flex-col justify-start space-y-2'>
                    <h1 className='font-bold text-lg'>Preset Prompt</h1>
                    <Textarea value={prompt} className='min-h-[400px]' disabled={!isEditPrompt} onChange={(e)=>setPrompt(e.target.value)}/>
                    <EditCancelButton handleSubmit={() => hanldeSubmitPrompt()} isEdit={isEditPrompt} toggleEdit={() => setIsEditPrompt(prev => !prev)}/>
                </div>
            }
        />
    </div>
  )
}

export default Dashboard
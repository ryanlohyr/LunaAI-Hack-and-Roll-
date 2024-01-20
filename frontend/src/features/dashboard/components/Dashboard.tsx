"use client";

import React, { useEffect, useState } from 'react'
import DashboardCard from './DashboardCard'
import { Textarea } from '@/components/ui/textarea';
import { EditCancelButton } from '@/components/ui/edit-cancel-button';
import { Input } from '@/components/ui/input';
import { Metadata } from '@/features/tuning/types/tuning.type';
import { postImptInfo, postPresetPrompt } from '@/service/dashboard';

type Props = {
    presetPrompt: string;
    logsSummary: string;
    pendingActions: number;
    imptInfo: Metadata[];
}

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

    const handleEditImpt = (index: number, newContent: string) => {
        setImptInfoData((prevData) => {
            return prevData.map((item, i) => {
              if (i === index) {
                // Modify the 'name' field in the object at the specified index
                return { ...item, content: newContent };
              } else {
                return item;
              }
            });
          });
      };

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
                            <p className=''>{props.logsSummary}</p>
                        </div>
                    }
                />
            </div>
            
            <DashboardCard 
                components={
                    <div className='flex flex-col space-y-2'>
                        <h1 className='font-bold text-lg'>Important Information</h1>
                        <div className='flex flex-col space-y-2'>
                            {imptInfoData.map((o, i) => (
                                <div className='flex flex-row justify-between' key={o.header}>
                                    <h1 className='font-bold text-md'>{o.header}</h1>
                                    <Input value={o.content} onChange={(e) => handleEditImpt(i, e.target.value)} className='max-w-[200px]' disabled={!isEditImpt}/>
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
                    <Textarea defaultValue={prompt} className='min-h-[400px]' disabled={!isEditPrompt}/>
                    <EditCancelButton handleSubmit={() => hanldeSubmitPrompt()} isEdit={isEditPrompt} toggleEdit={() => setIsEditPrompt(prev => !prev)}/>
                </div>
            }
        />
    </div>
  )
}

export default Dashboard
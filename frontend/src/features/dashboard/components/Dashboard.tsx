"use client";

import React, { useState } from 'react'
import DashboardCard from './DashboardCard'
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { EditCancelButton } from '@/components/ui/edit-cancel-button';
import { Input } from '@/components/ui/input';

type Props = {}

const pendingActions = 4;

const logsSummary = "test";

const presetPrompt = `Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, 
a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through 
the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of 
"de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..",
 comes from a line in section 1.10.32. The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by 
 Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.
`

const imptInfo = [
    {
        key: "OSHE Number",
        value: "88888888",
    },
    {
        key: "Rape Number",
        value: "88888888",
    },
    {
        key: "Mingyuan Number",
        value: "83152835",
    },
    {
        key: "Admissions Enquiry",
        value: "88888888",
    },
]

const Dashboard = (props: Props) => {
    const [isEditImpt, setIsEditImpt] = useState(false);
    const [isEditPrompt, setIsEditPrompt] = useState(false);

    const hanldeSubmitPrompt = () => {
        console.log("prmot");
    }

    const hanldeSubmitImpt = () => {
        console.log("impt");
    }

  return (
    <div className='grid grid-cols-2 space-x-4'>
        <div className='grid grid-rows-2 space-y-4'>
            <div className='grid grid-cols-2 space-x-4'>
                <DashboardCard 
                    components={
                        <div className='flex flex-col justify-center items-center relative h-full'>
                            <h1 className='font-bold text-lg absolute top-0 left-0'>Pending Actions</h1>
                            <p className='font-bold text-5xl'>{pendingActions}</p>
                        </div>
                    }
                />
                <DashboardCard 
                    components={
                        <div>
                            <h1 className='font-bold text-lg'>Logs Summary</h1>
                            <p className=''>{logsSummary}</p>
                        </div>
                    }
                />
            </div>
            
            <DashboardCard 
                components={
                    <div className='flex flex-col space-y-2'>
                        <h1 className='font-bold text-lg'>Important Information</h1>
                        <div className='flex flex-col space-y-2'>
                            {imptInfo.map((o) => (
                                <div className='flex flex-row justify-between' key={o.key}>
                                    <h1 className='font-bold text-md'>{o.key}</h1>
                                    <Input defaultValue={o.value} className='max-w-[200px]' disabled={!isEditImpt}/>
                                </div>
                            ))}
                            <EditCancelButton handleSubmit={hanldeSubmitImpt} isEdit={isEditImpt} toggleEdit={() => setIsEditImpt(prev => !prev)}/>
                        </div>
                    </div>
                }
            />
        </div>
        <DashboardCard 
            components={
                <div className='flex flex-col justify-start space-y-2'>
                    <h1 className='font-bold text-lg'>Preset Prompt</h1>
                    <Textarea defaultValue={presetPrompt} className='min-h-[400px]' disabled={!isEditPrompt}/>
                    <EditCancelButton handleSubmit={hanldeSubmitPrompt} isEdit={isEditPrompt} toggleEdit={() => setIsEditPrompt(prev => !prev)}/>
                </div>
            }
        />
    </div>
  )
}

export default Dashboard
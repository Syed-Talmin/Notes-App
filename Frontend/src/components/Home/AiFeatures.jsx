import React from 'react'
import FeaturesCard from './FeaturesCard'
import { LuBrain } from "react-icons/lu";
import { TiDocumentText,  TiTags } from "react-icons/ti";

const AiFeatures = () => {

    const features = [
        {
            icon: <LuBrain className="w-7 h-7 text-indigo-400"/>,
            title: "AI Summarize",
            description: "Instantly condense lengthy notes into concise summaries with our advanced AI technology.",
        },
        {
            icon: <TiDocumentText className="w-7 h-7 text-indigo-400" />,
            title: "Auto-Generate Titles",
            description: "Never worry about naming your notes. Our AI creates perfect, contextual titles automatically.",
        },
        {
            icon: <TiTags className="w-7 h-7 text-indigo-400" />,
            title: "Smart Categories",
            description: "AI automatically organizes your notes into intelligent categories for effortless navigation.",
        },
    ]

  return (
    <div className='w-full flex flex-col items-center justify-center py-10 px-5'>

        <div className='w-full flex flex-col gap-2 items-center justify-center py-10'>
        <h1 className='text-3xl font-bold'>Intelligent Features</h1>
        <p className='text-center opacity-60 font-semibold'>Discover how AI transforms your note-taking experience</p>
        </div>

        <div className='flex flex-wrap items-center justify-center gap-4 mt-4'>
            {
                features.map((feature, index) => (
                    <FeaturesCard key={index} icon={feature.icon} title={feature.title} description={feature.description} />
                ))
            }
        </div>
    </div>
  )
}

export default AiFeatures
import React, { FC } from 'react'

interface ProjectProps {
    id: number;
    name: string;
    isInstructor: boolean;
    description: string;
    onClick?: () => void;
}

const Project: FC<ProjectProps> = ({ id, name, isInstructor, onClick, description }) => {
    return (
        <div className="flex flex-col bg-[#141519] p-4 gap-4 rounded-2xl min-w-[350px]">
            <div className="flex">
                <h3 className='text-xl'>{name}</h3>
                <div className="ml-auto">id: {id}</div>
            </div>
            <p className='text-start'>{description}</p>
            {isInstructor 
            ? <div className="bg-[#FFFFFF] text-black p-1 rounded-3xl hover:cursor-pointer" onClick={onClick}>Детальніше</div>
            : <div className="bg-[#FFFFFF] text-black p-1 rounded-3xl hover:cursor-pointer" onClick={onClick}>Подати заявку</div>
            }
            
        </div>
    )
}
export default Project
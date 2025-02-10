import React, { FC } from 'react'

interface ProjectProps {
    id: number;
    name: string;
}

const Project: FC<ProjectProps> = ({ id, name }) => {
    return (
        <div className="flex flex-col bg-[#141519] p-4 gap-4">
            <div className="flex">
                <h3>{name}</h3>
                <div className="ml-auto">id: {id}</div>
            </div>
            <div className="bg-[#FFFFFF] text-black p-1 rounded-3xl hover:cursor-pointer">Детальніше</div>
        </div>
    )
}
export default Project
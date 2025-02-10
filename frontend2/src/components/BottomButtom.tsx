import React, { FC } from 'react'

interface BottomButtonProps {
    title: string;
    onClick: () => void;
}

const BottomButton: FC<BottomButtonProps> = ({ title, onClick }) => {
    return (
        <div className="w-100 p-4 text-black bg-white rounded-lg text-center text-lg font-medium hover:cursor-pointer" onClick={onClick}>
            {title}
        </div>
    )
}
export default BottomButton
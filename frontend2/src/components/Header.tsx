import React, { FC } from 'react'
import studchain_logo from '../assets/studchain-logo.svg'

interface HeaderProps {
    isInstructor: boolean;
}

const Header: FC<HeaderProps> = ({ isInstructor }) => {
    return (
        <div className="text-center text-lg font-medium flex items-center gap-2 content-center">
            <img src={studchain_logo} alt="" className='w-[40px] mr-auto'/>
        <p className="text-center text-xl font-bold">
            {isInstructor ? "Інструктор" : "Студент"}
        </p>
        </div>
    )
}
export default Header
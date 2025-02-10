import React, { FC } from 'react'

interface HeaderProps {
    isInstructor: boolean;
}

const Header: FC<HeaderProps> = ({ isInstructor }) => {
    return (
        <div className="text-center text-lg font-medium">
            <img src={"studchain-logo.svg"} alt="" />
            {isInstructor 
            ? "Інструктор" : "Студент"
        }
        </div>
    )
}
export default Header
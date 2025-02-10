import React, { FC } from 'react'

interface HeaderProps {
    isInstructor: boolean;
}

const Header: FC<HeaderProps> = ({ isInstructor }) => {
    return (
        <div className="text-center text-lg font-medium">
            {isInstructor 
            ? "Інструктор" : "Студент"
        }
        </div>
    )
}
export default Header
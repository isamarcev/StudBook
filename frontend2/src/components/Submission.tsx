import React, { FC } from 'react'

interface SubmissionProps {
    student: number;
    description: string;
    status: string;
}

const Submission: FC<SubmissionProps> = ({ student, description, status }) => {
    return (
        <div className="flex flex-col bg-[#141519] p-5 gap-4 rounded-2xl min-w-[350px] text-start">
            <h5>Student: {student}</h5>
            <h5>Description: {description}</h5>
            {status == "approved" 
            ? <h5 className='text-green-400'>Status: Approved</h5> 
            : status == "rejected" 
            ? <h5 className='text-red-400'>Status: Rejected</h5>
            :   <div className="flex w-100 gap-8 text-center">
                    <div className="bg-[#FFFFFF] text-black p-1 rounded-3xl hover:cursor-pointer w-100">Підтвердити</div>
                    <div className="bg-[#FFFFFF] text-black p-1 rounded-3xl hover:cursor-pointer w-100">Відхилити</div>
                </div>
            }
            
        </div>
    )
}
export default Submission
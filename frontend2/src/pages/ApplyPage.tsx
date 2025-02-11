import { FC, use, useEffect, useState } from 'react'
import { useWallet } from '../hooks/useWallet';
import Project from '../components/Project';
import BottomButton from '../components/BottomButtom';
import Header from '../components/Header';
import Page from '../Page';
import { useNavigate, useParams } from 'react-router-dom';
import Submission from '../components/Submission';
import { checkIfInstructor } from '../controllers/contract';
import { useInstructor } from '../hooks/useInstructor';
import { useForm } from 'react-hook-form';
import { useTransaction } from '../hooks/useTransactionHook';
import LoadingPopup from '../components/LoadingPopup';


const projects = [
    {id: 1, name: "TEST"},
    {id: 2, name: "TEST2"},
    {id: 3, name: "TEST3"},
    {id: 4, name: "TEST4"},
]

const submissions = [
    {student: 1, description: "TEST", status: "approved"},
    {student: 2, description: "TEST2", status: "rejected"},
    {student: 3, description: "TEST3"},
    {student: 4, description: "TEST4"},
]

// const isInstructor = true;

const ApplyPage: FC = () => {
    
    const { walletAddress, connectWallet } = useWallet();
    const { id } = useParams();

    const isInstructor = useInstructor();
    const [submissions, setSubmissions] = useState<any[]>([]);
    const {register, handleSubmit} = useForm();
    const transactions = useTransaction();
    const navigate = useNavigate();


    const project = projects.find(project => project.id === Number(id));

    return (
        <Page>
            <LoadingPopup text={'Підтвердіть транзакцію в гаманці'} isLoading={transactions.loading}></LoadingPopup>
            <div className='flex flex-col gap-4 text-start'>
                <Header isInstructor={isInstructor}/>
                <div className="flex flex-col bg-[#141519] p-4 gap-4 rounded-2xl min-w-[350px]">
                    <h2>ID: <b>{project?.id}</b></h2>
                    <h2>Назва проекту: <b>{project?.name}</b></h2>
                </div>
                <h2 className="text-2xl">Подати заявку:</h2>
                <form action="" className="flex flex-col gap-4 p-2" onSubmit={handleSubmit((data) => {transactions.sendSubmitAchievement(id, data.description).then((tx) => {
                    navigate('/')
                })})}>
                    <div className="flex flex-col gap-4 p-2">
                        <label htmlFor="description">Опис для заяки:</label>
                        <textarea id="description" cols={30} rows={5} className="bg-[#141519] text-white p-2 rounded-lg outline-none" {...register("description")}></textarea>
                    </div>
                    <button type="submit" className="bg-[#FFFFFF] text-black p-1 rounded-3xl hover:cursor-pointer" >Подати заявку</button>
                </form>

            </div>
        </Page>
    )
}

export default ApplyPage
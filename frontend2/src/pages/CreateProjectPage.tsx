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
import { useFieldArray, useForm } from 'react-hook-form';
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

const CreateProjectPage: FC = () => {
    
    const { walletAddress, connectWallet } = useWallet();
    const { id } = useParams();

    const isInstructor = useInstructor();
    const {register, handleSubmit, control} = useForm();
    const transactions = useTransaction();
    const navigate = useNavigate();

    use

    const project = projects.find(project => project.id === Number(id));

    return (
        <Page>
            <LoadingPopup text={'Підтвердіть транзакцію в гаманці'} isLoading={transactions.loading}></LoadingPopup>
            <div className='flex flex-col gap-4 text-start'>
                <Header isInstructor={isInstructor}/>
                <h2 className="text-2xl">Створити проект:</h2>
                <form action="" className="flex flex-col gap-4 p-2" onSubmit={handleSubmit((data) => {
                    const tx = transactions.sendCreateProject(
                        data.name,
                        data.reward,
                        data.studentsAddresses.split('\n'),
                        Math.floor(Date.parse(data.deadline) / 1000),
                        data.verifiersAddresses.split('\n'),
                        data.description,
                    ).then(tx => {
                        console.log('tx', tx)
                        navigate('/')
                        return tx
                    }).catch(err => {
                        console.log('err', err)
                        return null
                    })
                        
                })}>
                    <div className="flex flex-col gap-4 p-2">
                        <label htmlFor="name">Назва проекту *</label>
                        <input type="text" id="name" className="bg-[#141519] text-white p-2 rounded-lg outline-none" {...register("name", {required: true})}/>

                        <label htmlFor="description">Опис для проекта</label>
                        <textarea id="description" cols={30} rows={5} className="bg-[#141519] text-white p-2 rounded-lg outline-none" {...register("description")}></textarea>
                        
                        <label htmlFor="deadline">Дедлайн *</label>
                        <input type="datetime-local" id="deadline" className="bg-[#141519] text-white p-2 rounded-lg outline-none" {...register("deadline", {required: true})}/>

                        <label htmlFor="reward">Винагорода *</label>
                        <input type="number" id="reward" className="bg-[#141519] text-white p-2 rounded-lg outline-none" {...register("reward", {required: true})}/>

                        <label htmlFor="students-addresses">Адреси студейнтів які матимуть доступ до проекта  (не вводьте нічого щоб завдання було доступне всім) <p className='text-gray-500'>Вводьте кожну адресу з нового рядка</p></label>
                        <textarea id="students-addresses" cols={30} rows={5} className="bg-[#141519] text-white p-2 rounded-lg outline-none" {...register("studentsAddresses")} placeholder='0x71C7656EC7ab88b098defB751B7401B5f6d8976F&#10;0x71C7656EC7ab88b098defB751B7401B5f6d8976F&#10;0x71C7656EC7ab88b098defB751B7401B5f6d8976F&#10;0x71C7656EC7ab88b098defB751B7401B5f6d8976F&#10;0x71C7656EC7ab88b098defB751B7401B5f6d8976F&#10;'></textarea>
                        
                        <label htmlFor="verifiers-addresses">Адреси веріфаєрів <p className='text-gray-500'>Вводьте кожну адресу з нового рядка</p></label>
                        <textarea id="verifiers-addresses" cols={30} rows={5} className="bg-[#141519] text-white p-2 rounded-lg outline-none" {...register("verifiersAddresses")} placeholder='0x71C7656EC7ab88b098defB751B7401B5f6d8976F&#10;0x71C7656EC7ab88b098defB751B7401B5f6d8976F&#10;0x71C7656EC7ab88b098defB751B7401B5f6d8976F&#10;0x71C7656EC7ab88b098defB751B7401B5f6d8976F&#10;0x71C7656EC7ab88b098defB751B7401B5f6d8976F&#10;'></textarea>
                        

                    </div>
                    <button type="submit" className="bg-[#FFFFFF] text-black p-1 rounded-3xl hover:cursor-pointer">Подати заявку</button>
                </form>

            </div>
        </Page>
    )
}

export default CreateProjectPage
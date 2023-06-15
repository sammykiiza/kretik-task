import React from 'react'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddItem from '../addItem'
import Items from '../items'
import { useAppSelector } from '../../app/hooks'
import EditItem from '../editItem'

function Home() {
    const openEditForm = useAppSelector((state) => state.editSlice.open)
    const id = useAppSelector((state) => state.editSlice.id)

    return (
        <div className='w-full h-full bg-gray-200'>
            <ToastContainer />
            <div className='flex flex-col lg:flex-row py-3 mx-auto max-w-7xl'>
                <div className='lg:basis-[40%]'>
                    {openEditForm === false ? <AddItem /> : <EditItem key={id} />}
                </div>
                <div className='lg:basis-[60%]'>
                    <Items />
                </div>
            </div>
        </div>
    )
}

export default Home
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
            {/* Toast container where the notification toasts will be shown */}
            <ToastContainer />

            {/* Flex container where the two main components are contained */}
            <div className='flex flex-col lg:flex-row py-3 mx-auto max-w-7xl'>
                <div className='lg:basis-[40%]'>
                    {/* Show either the AddItem component or EditItem component depending on the state boolean for openEditForm from editItemSlice */}
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
import React from 'react'
import AddItem from '../addItem'
import Items from '../items'
import { useAppSelector } from '../../app/hooks'
import EditItem from '../editItem'

function Home() {
    const openEditForm = useAppSelector((state) => state.editSlice.open)
    const id = useAppSelector((state) => state.editSlice.id)

    return (
        <div className='w-full h-full bg-gray-200'>
            <div className='flex py-3 mx-auto max-w-7xl'>
                <div className='basis-[40%]'>
                    {openEditForm === false ? <AddItem /> : <EditItem key={id} />}
                </div>
                <div className='basis-[60%]'>
                    <Items />
                </div>
            </div>
        </div>
    )
}

export default Home
import React from 'react'
import { useDeleteItemMutation, useGetItemsQuery } from '../../services/api'
import { Spinner } from '../common'
import { useAppDispatch } from '../../app/hooks'
import { setEditFormOpenState, setItemId } from '../editItem/editItemSlice'
import { toast } from 'react-toastify'

function Items() {
    const { data, isFetching, isLoading } = useGetItemsQuery()
    const [deleteItemFunction, { isLoading: isLoadingDelete }] = useDeleteItemMutation()

    const dispatch = useAppDispatch()

    /**
     * function that calls the RTK function to delete and Item 
     * @param id Id of the item to be deleted
     * */
    const handleDeleteItem = async (id?: number) => {
        await deleteItemFunction(id).unwrap().then(() => toast('Item deleted successfully'))
    }

    return (
        <div className='grid grid-cols-1 md:grid-cols-2 gap-2 px-3'>
            {(isLoading || isFetching || isLoadingDelete) &&
                <div className='absolute mt-64 ml-80'>
                    <Spinner />
                </div>}
            {data ? data.map((item, i) => (
                <div key={i} className="max-w-sm rounded overflow-hidden shadow-lg bg-white">
                    <div className="px-6 py-4">
                        <div className="font-bold text-xl mb-2">{item.company}</div>
                        <ul>
                            <li>{item.stockPrice}</li>
                            <li>{item.ticker}</li>
                            <li>{item.timeElapsed}</li>
                        </ul>
                    </div>
                    <div className="px-6 pt-4 pb-2">
                        <button
                            className="inline-block bg-blue-700 hover:bg-blue-600 rounded-full px-3 py-1 text-sm font-semibold text-white mr-2 mb-2"
                            key={item.id}
                            onClick={() => {
                                dispatch(setEditFormOpenState({
                                    open: true
                                }))

                                dispatch(setItemId(
                                    item.id
                                ))
                            }}
                        >
                            Edit
                        </button>

                        <button
                            className="inline-block bg-red-600 hover:bg-red-500 rounded-full px-3 py-1 text-sm font-semibold text-white mr-2 mb-2"
                            key={i}
                            onClick={() => {
                                handleDeleteItem(item.id)
                            }}
                        >
                            Delete
                        </button>
                    </div>
                </div>
            )) :
                <div>No Items</div>
            }
        </div>
    )
}

export default Items
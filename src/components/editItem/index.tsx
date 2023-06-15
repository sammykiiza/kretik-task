import React, { useState } from 'react'
import { useEditItemMutation, useGetOneItemQuery } from '../../services/api';
import { Spinner } from '../common';
import { Item } from '../../services/types';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setEditFormOpenState } from './editItemSlice';

function EditItem() {
  const id = useAppSelector((state) => state.editSlice.id)
  const { data: editItem, isFetching, isLoading: isLoadingGettingItem } = useGetOneItemQuery(id)

  const dispatch = useAppDispatch()

  const [company, setCompany] = useState(editItem?.company);
  const [ticker, setTicker] = useState(editItem?.ticker);
  const [stockPrice, setStockPrice] = useState(editItem?.stockPrice);
  const [timeElapsed, setTimeElapsed] = useState(editItem?.timeElapsed);

  const [editItemFunction, { isLoading }] = useEditItemMutation()

  /** Asynchronous Function to actually do the form submission to the server when creating an item */
  const handleEditItem = async () => {

    /** The data to be submitted when creating an item */
    const itemData: Item = {
      id: id,
      company,
      ticker,
      stockPrice,
      timeElapsed
    }

    /**Make call to api with edited item data */
    await editItemFunction(itemData).unwrap()

  }

  return (
    <div>
      {(isLoading || isFetching || isLoadingGettingItem) &&
        <div className='absolute mt-44 ml-52'>
          <Spinner />
        </div>
      }
      <div className="w-full max-w-3xl px-3">
        {editItem && <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <h1 className='text-3xl'>Edit Item</h1>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="company">
              Company Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="company"
              type="text"
              defaultValue={editItem.company}
              placeholder="Company Name"
              onChange={(e) => {
                setCompany(e.target.value)
              }}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="ticker">
              Ticker
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="ticker"
              type="text"
              defaultValue={editItem.ticker}
              placeholder="Ticker"
              onChange={(e) => {
                setTicker(e.target.value)
              }}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="stockPrice">
              Stock Price
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="stockPrice"
              type="text"
              defaultValue={editItem.stockPrice}
              placeholder="Stock Price in USD"
              onChange={(e) => {
                setStockPrice(e.target.value + ' USD')
              }}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="timeElapsed">
              Time Elapsed
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="timeElapsed"
              type="text"
              defaultValue={editItem.timeElapsed}
              placeholder="Time Elapsed in seconds"
              onChange={(e) => {
                setTimeElapsed(e.target.value + ' sec ago')
              }}
            />
          </div>
          <div className="flex items-center space-x-4">
            <button
              className="bg-green-500 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={() => {
                handleEditItem()
              }}
            >
              Edit Item
            </button>

            <button
              className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={() => {
                dispatch(
                  setEditFormOpenState({
                    open: false
                  })
                )
              }}
            >
              Cancel
            </button>
          </div>
        </form>}
      </div>
    </div>
  )
}

export default EditItem
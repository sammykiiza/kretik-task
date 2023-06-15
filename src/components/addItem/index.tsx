import React, { useState } from 'react'
import { useAddItemMutation } from '../../services/api';
import { Spinner } from '../common';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

function AddItem() {
  const { register, reset } = useForm()

  const [company, setCompany] = useState('');
  const [ticker, setTicker] = useState('');
  const [stockPrice, setStockPrice] = useState('');
  const [timeElapsed, setTimeElapsed] = useState('');

  const [addItemFunction, { isLoading }] = useAddItemMutation()

  /** Asynchronous Function to actually do the form submission to the server when creating an item */
  const handleAddItem = async () => {

    /** The data to be submitted when creating an item */
    const itemData: any = {
      company,
      ticker,
      stockPrice,
      timeElapsed
    }

    await addItemFunction(itemData)
      .unwrap()
      .then(() => {
        toast('Item added successfully')
        reset({
          companyField: '',
          tickerField: '',
          stockPriceField: '',
          timeElapsedField: ''
        })
      })

  }

  return (
    <div>
      {isLoading &&
        <div className='absolute mt-44 ml-52'>
          <Spinner />
        </div>
      }
      <div className="w-full max-w-3xl px-3">
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <h1 className='text-3xl'>Add Item</h1>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="company">
              Company Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="company"
              type="text"
              placeholder="Company Name"
              {...register('companyField', {
                onChange: (e) => {
                  setCompany(e.target.value)
                }
              })}
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
              placeholder="Ticker"
              {...register('tickerField', {
                onChange: (e) => {
                  setTicker(e.target.value)
                }
              })}
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
              placeholder="Stock Price in USD"
              {...register('stockPriceField', {
                onChange: (e) => {
                  setStockPrice(e.target.value + ' USD')
                }
              })}
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
              placeholder="Time Elapsed in seconds"
              {...register('timeElapsedField', {
                onChange: (e) => {
                  setTimeElapsed(e.target.value + ' sec ago')
                }
              })}
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-green-500 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={() => {
                handleAddItem()
              }}
            >
              Add Item
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddItem
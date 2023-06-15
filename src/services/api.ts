import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Item } from './types'

export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.REACT_APP_API_URI}/data`
    }),
    tagTypes: ['Items'],
    endpoints: (builder) => ({
        /**Fetch all items stored in the database */
        getItems: builder.query<Item[], void>({
            query: () => ({
                url: '',
                method: 'GET'
            }),
            providesTags: [{ type: 'Items' }]
        }),

        /**Get just one item from the database. You should provide the item's id */
        getOneItem: builder.query<Item, number|undefined>({
            query: (id) => ({
                url: `${id}`,
                method: 'GET'
            })
        }),

        /**Add an item to the database */
        addItem: builder.mutation<any, any>({
            query: (item) => ({
                url: '',
                method: 'POST',
                body: item
            }),
            invalidatesTags: [{ type: 'Items' }]
        }),

        /**Edit an Item in the database */
        editItem: builder.mutation<any, Item>({
            query: (item) => ({
                url: `${item.id}`,
                method: 'PUT',
                body: item
            }),
            invalidatesTags: [{ type: 'Items' }]
        }),

        /**Delete an item from the database. You should provide the item's id */
        deleteItem: builder.mutation<any, number | undefined>({
            query: (id) => ({
                url: `${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: [{ type: 'Items' }]
        })
    }),
})

export const {
    useGetItemsQuery,
    useGetOneItemQuery,
    useAddItemMutation,
    useEditItemMutation,
    useDeleteItemMutation
} = api
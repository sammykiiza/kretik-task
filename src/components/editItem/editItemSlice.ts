import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface EditItemSliceState {
    id?: number,
    open: boolean
}

const initialState: EditItemSliceState = {
    id: 0,
    open: false
}

export const editItemSlice = createSlice({
    name: 'EditItemSlice',
    initialState,
    reducers: {
        setEditFormOpenState: (state, action: PayloadAction<{ open: boolean }>) => {
            state.open = action.payload.open
        },
        setItemId: (state, action: PayloadAction<number | undefined>) => {
            state.id = action.payload
        }
    }
})

export const { setEditFormOpenState, setItemId } = editItemSlice.actions
export default editItemSlice.reducer
import type { PayloadAction } from '@reduxjs/toolkit'
import { createAppSlice } from "../../app/createAppSlice"

interface List {
    text: string,
    done: boolean
}

interface listState {
    list: List[]
}

const initialState = { list: [] } satisfies listState as listState

export const listSlice = createAppSlice({
    name: 'list',
    initialState,
    reducers: {
        init(state, action: PayloadAction<List[]>) {
            state.list = action.payload
        },
        toggleDone(state, action: PayloadAction<{ index: number }>) {
            state.list[action.payload.index].done = !state.list[action.payload.index].done
        },
        addItem(state, action: PayloadAction<List>) {
            state.list.push(action.payload)
        },
        removeItem(state, action: PayloadAction<{index: number}>) {
            state.list = state.list.splice(action.payload.index, 1)
        }
    },
    selectors: {
        selectListItem: (state, index: number) => state.list[index],
        selectList: (state) => state.list,
    },
})

export const { init, toggleDone, addItem, removeItem } = listSlice.actions;
export const { selectListItem, selectList } = listSlice.selectors;

export default listSlice.reducer
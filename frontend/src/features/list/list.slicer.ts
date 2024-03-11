import { createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { createAppSlice } from "../../app/createAppSlice"

interface List {
    author: string
    text: string,
    done: boolean
}

export interface listState {
    list: List[]
}

const initialState = { list: [] } satisfies listState as listState

export const getAllListItems = createAsyncThunk( 'todolist/fetch', async (thunkApi) => {
    const response = await fetch('http://localhost:1337/todo', {
        method: 'GET',
        mode: 'cors'
    })
    return response.json()
})

export const postListItem = createAsyncThunk('todoList/post', async (list: List, thunkApi) => {
    const response = await fetch('http://localhost:1337/todo', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',

        },
        mode: 'cors',
        body: JSON.stringify(list)
    })

    return await response.json();
})

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
    extraReducers: (builder) => {
        builder.addCase(getAllListItems.fulfilled, (state, action) => {
            state.list = action.payload || []
        })
        builder.addCase(postListItem.fulfilled, (state, action) => {
            state.list.push(action.payload)
        })
    }
})

export const { init, toggleDone, addItem, removeItem } = listSlice.actions;
export const { selectListItem, selectList } = listSlice.selectors;

export default listSlice.reducer
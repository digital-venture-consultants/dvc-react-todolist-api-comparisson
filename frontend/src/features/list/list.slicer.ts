import { createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { createAppSlice } from "../../app/createAppSlice"
import { OverridableStringUnion } from "@mui/types";
import { AlertColor, AlertPropsColorOverrides } from "@mui/material/Alert/Alert";

interface List {
    author: string
    text: string,
    done: boolean
}

export interface Message {
    show: boolean,
    type: OverridableStringUnion<AlertColor, AlertPropsColorOverrides> | undefined
    message: string | undefined,
}

export interface listState {
    list: List[]
    apiResponseMessage: Message | null
}

const initialState = { list: [], apiResponseMessage: null } satisfies listState as listState

export const getAllListItems = createAsyncThunk( 'todolist/fetch', async (port: string) => {
    const response = await fetch(`http://localhost:${port}/todo`, {
        method: 'GET',
        mode: 'cors'
    })
    return response.json()
})

export const postListItem = createAsyncThunk('todoList/post', async ({ port, list }: { port: string, list: List }) => {
    const response = await fetch(`http://localhost:${port}/todo`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',

        },
        mode: 'cors',
        body: JSON.stringify(list)
    })

    return await response.json();
})

export const postListItems = createAsyncThunk('todoLists/post', async ({ port, list }: { port: string, list: List }) => {
    const items: Promise<any>[] = []
    for (let i = 0; i < 5000; i++) {
        const f = fetch(`http://localhost:${port}/todo`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            mode: 'cors',
            body: JSON.stringify(list)
        })
        items.push(f)
    }
    console.time('Request')
    const response: any = await Promise.all(items)
    console.timeEnd('Request')
    return {
        payload: response.length
    }
})

export const deleteAllItem = createAsyncThunk( 'todolist/drop', async (port: string) => {
    const response = await fetch(`http://localhost:${port}/todo`, {
        method: 'DELETE',
        mode: 'cors'
    })
    return response.json()
})

export const deleteItem = createAsyncThunk( 'todolist/delete', async ({ port, index }: { port: string, index: number }) => {
    const response = await fetch(`http://localhost:${port}/todo/${index}`, {
        method: 'DELETE',
        mode: 'cors'
    })
    return response.json()
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
        },
        hideApiMessageNotification: (state) => {
            state.apiResponseMessage = { show: false, message: '', type: undefined }
        }
    },
    selectors: {
        selectListItem: (state, index: number) => state.list[index],
        selectList: (state) => state.list,
        selectApiMessage: (state) => state.apiResponseMessage
    },
    extraReducers: (builder) => {
        builder.addCase(getAllListItems.fulfilled, (state, action) => {
            state.list = action.payload || []
        })
        builder.addCase(postListItem.fulfilled, (state, action) => {
            state.list.push(action.payload)
            state.apiResponseMessage = { show: true, message: 'Erfolgreich hinzugefügt', type: 'success' }
        })
        builder.addCase(postListItem.rejected, (state, action) => {
            state.apiResponseMessage = { show: true, type: 'error', message: action?.error?.message?.toString() }
        })
        builder.addCase(postListItems.fulfilled, (state) => {
            state.apiResponseMessage = { show: true, message: 'Erfolgreich hinzugefügt', type: 'success' }
        })
        builder.addCase(postListItems.rejected, (state, action) => {
            state.apiResponseMessage = { show: true, type: 'error', message: action?.error?.message?.toString() }
        })
        builder.addCase(deleteAllItem.fulfilled, (state, action) => {
            state.list = action.payload || []
            state.apiResponseMessage = { show: true, message: 'Erfolgreich Alle Items gelöscht', type: 'success' }
        })
        builder.addCase(deleteAllItem.rejected, (state) => {
            state.apiResponseMessage = { show: true, message: 'Alle Items konnten nicht gelöscht werden', type: 'error' }
        })
        builder.addCase(deleteItem.fulfilled, (state, action) => {
            state.list = action.payload || state.list
            state.apiResponseMessage = { show: true, message: 'Erfolgreich gelöscht', type: 'success' }
        })
        builder.addCase(deleteItem.rejected, (state, action) => {
            state.apiResponseMessage = { show: true, type: 'error', message: action?.error?.message?.toString() }
        })
    }
})

export const { init, toggleDone, addItem, removeItem, hideApiMessageNotification } = listSlice.actions;
export const { selectListItem, selectList, selectApiMessage } = listSlice.selectors;

export default listSlice.reducer
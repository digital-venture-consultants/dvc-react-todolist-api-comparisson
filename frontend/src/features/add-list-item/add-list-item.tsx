import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { postListItem } from "../list/list.slicer";
import { selectPort } from "../../app/store";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";

export const AddListItem =() => {

    const dispatch = useAppDispatch()
    const port = useAppSelector(state => selectPort(state))
    const [todoListItem, setTodoListItem] = useState({ author: '', text: '' })

    const onAddItem = function () {
        dispatch(postListItem({ port, list: { text: todoListItem.text, author: todoListItem.author, done: false }}))
    }

    const handleInputData = (key: string, value: string) => {
        setTodoListItem((prevState) => {
            return {
                ...prevState,
                [key]: value
            }
        })
    }

    const updateText = () => {}

    return (
        <>
            <TextField id="Author-basic" label="Author" variant="standard" value={todoListItem.author} onChange={ event => handleInputData('author', event.target.value)} />
            <TextField  id="Text-basic" label="Text" variant="standard" value={todoListItem.text} onChange={ event => handleInputData( 'text', event.target.value)} />

            <Button variant="contained" color="success" onClick={onAddItem.bind(this)}>Submit</Button>
        </>
    )
}
import { useState } from "react";
import {useAppDispatch} from "../../app/hooks";
import {postListItem} from "../list/list.slicer";

export const AddListItem =() => {
    const dispatch = useAppDispatch()
    const [todoListItem, setTodoListItem] = useState({ author: '', text: '' })

    const onAddItem = function () {
        dispatch(postListItem({ text: todoListItem.text, author: todoListItem.author, done: false }))
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
            <input placeholder="Author" value={todoListItem.author} onChange={ event => handleInputData('author', event.target.value)} />
            <input placeholder="Text" value={todoListItem.text} onChange={ event => handleInputData( 'text', event.target.value)} />
            <button onClick={onAddItem.bind(this)}>Submit</button>
        </>
    )
}
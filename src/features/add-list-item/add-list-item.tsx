import { useAddListItemMutation } from "../list/listAPi.slicer";
import { useState } from "react";

export const AddListItem =() => {
    const [todoListItem, setTodoListItem] = useState({ author: '', text: '' })
    const [addListItem] = useAddListItemMutation()
    const onAddItem = function () {
        addListItem({ text: todoListItem.text, author: todoListItem.author, done: false })
            .then(() => {
                console.log('success')
            })
            .catch((err) => {
                console.log(err)
            })
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
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import {getAllListItems, listState, toggleDone} from "./list.slicer";
import {useEffect} from "react";

export const List = () => {
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(getAllListItems())
    }, []);
    const data: listState = useAppSelector((state) => state.list) as listState
    const toggleItemDone = (index: number) => {
        dispatch(toggleDone({ index }))
    }
    return (
        <>
            <ul>
                {data?.list?.map((listItem, index) => (
                    <li key={index}>
                        {listItem.text}
                        <button onClick={toggleItemDone.bind(this, index)}>{listItem.done?.toString()}</button>
                    </li>
                ))}
            </ul>
        </>
    )
}
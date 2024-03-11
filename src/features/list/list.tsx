import { useAppDispatch } from "../../app/hooks"
import { toggleDone } from "./list.slicer";
import { useGetListQuery } from "./listAPi.slicer";

export const List = () => {
    const dispatch = useAppDispatch()
    const { data = { list: [{ done: false, id: 0, text: 'no list found', author: 'bk' }] }, isError, isLoading, isSuccess } = useGetListQuery(10);
    const toggleItemDone = (index: number) => {
        dispatch(toggleDone({ index }))
    }
    return (
        <>
            <ul>
                {data.list.map((listItem, index) => (
                    <li key={index}>
                        {listItem.text}
                        <button onClick={toggleItemDone.bind(this, index)}>{listItem.done.toString()}</button>
                    </li>
                ))}
            </ul>
        </>
    )
}
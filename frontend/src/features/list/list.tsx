import { useAppDispatch, useAppSelector } from "../../app/hooks"
import {getAllListItems, listState, toggleDone} from "./list.slicer";
import { Fragment, useEffect } from "react";
import {selectPort} from "../../app/store";
import { Divider, ListItem, ListItemText, Typography, List } from "@mui/material";

export const ToDoList = () => {
    const dispatch = useAppDispatch()
    const port = useAppSelector(state => selectPort(state))
    useEffect(() => {
        dispatch(getAllListItems(port))
    }, [port]);
    const data: listState = useAppSelector((state) => state.list) as listState
    const toggleItemDone = (index: number) => {
        dispatch(toggleDone({ index }))
    }

    return (
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            {
                data?.list?.map((listItem, index) =>
                    <ListItem key={index} alignItems="flex-start">
                        <ListItemText
                            primary={listItem.author + index}
                            secondary={
                                <Fragment>
                                    <Typography
                                        sx={{ display: 'inline' }}
                                        component="span"
                                        variant="body2"
                                        color="text.primary"
                                    >
                                    {listItem.author}
                                    </Typography>
                                    {` — ${listItem.text}`}
                                </Fragment>
                            }
                        />
                    </ListItem>
                )
            }
        </List>
    )
}
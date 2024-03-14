import * as React from 'react';
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { postListItem } from "../list/list.slicer";
import { selectPort } from "../../app/store";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    padding: theme.spacing(1),
    textAlign: 'start',
    alignItems: 'center',
    height: 46,
    color: theme.palette.text.secondary,
}));

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
        <Box sx={{ flexGrow: 1, padding: 2 }}>
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                <Grid item xs={4}>
                    <TextField sx={{ width: '100%' }} id="Author-basic" label="Author" variant="standard" value={todoListItem.author} onChange={ event => handleInputData('author', event.target.value)} />
                </Grid>
                <Grid item xs={4}>
                    <TextField sx={{ width: '100%' }} id="Text-basic" label="Text" variant="standard" value={todoListItem.text} onChange={ event => handleInputData( 'text', event.target.value)} />
                </Grid>
                <Grid item xs={4} alignItems="end">
                    <Box sx={{ display: 'flex', height: '100%', alignItems: 'end' }}>
                        <Button variant="contained" color="success" onClick={onAddItem.bind(this)}>Submit</Button>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    )
}
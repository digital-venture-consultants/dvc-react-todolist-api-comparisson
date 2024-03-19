import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { deleteAllItem, deleteItem, getAllListItems, listState } from "./list.slicer";
import { useEffect } from "react";
import {selectPort} from "../../app/store";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import IconButton from "@mui/material/IconButton";
import DeleteIcon from '@mui/icons-material/Delete';

export const ToDoList = () => {
    const dispatch = useAppDispatch()
    const port = useAppSelector(state => selectPort(state))
    useEffect(() => {
        dispatch(getAllListItems(port))
    }, [port]);
    const data: listState = useAppSelector((state) => state.list) as listState

    const reducedData = data?.list.slice(0, 100) || []
    let serverName = ''
    switch (port) {
        case "1337":
            serverName = 'Golang';
            break;
        case "3000":
            serverName = 'NodeJs';
            break;
        case "8080":
            serverName = 'Java Springboot';
            break
    }

    return (
        <Box sx={{ flexGrow: 1, padding: 2 }}>
            <h3>Total Row Count: {data?.list?.length} by: {serverName}</h3>
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                <Grid item xs={8}>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Author</TableCell>
                                    <TableCell>Text</TableCell>
                                    <TableCell align='right'>
                                        Actions
                                        <IconButton aria-label="delete" size="small" onClick={() => dispatch(deleteAllItem(port))}>
                                            <DeleteIcon fontSize="inherit" />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {reducedData.map((listItem, index) => (
                                    <TableRow  key={index}  sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                                        <TableCell component="th" scope="row">{listItem.author}</TableCell>
                                        <TableCell>
                                            {listItem.text}
                                        </TableCell>
                                        <TableCell align='right'>
                                            <IconButton aria-label="delete" size="small" onClick={() => dispatch(deleteItem({
                                                port,
                                                index
                                            }))}>
                                                <DeleteIcon fontSize="inherit" />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
        </Box>
    )
}
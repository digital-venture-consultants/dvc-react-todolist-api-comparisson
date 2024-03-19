import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectPort, setPort } from "../../app/store";
import Toolbar from "@mui/material/Toolbar";

const drawerWidth = 250
function Navigation() {
    const dispatch = useAppDispatch();
    const selectedPort = useAppSelector(state => selectPort(state))
    const setApi = function (apiPort: string) {
        dispatch(setPort(apiPort))
    }

    const DrawerList = (
        <Box sx={{ width: drawerWidth }} role="presentation">
            <List>
                {['1337', '3000', '8080'].map((text, index) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton selected={selectedPort === text} onClick={() => setApi(text)}>
                            <ListItemIcon>
                                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
                <Divider />
            </List>
        </Box>
    );

    return (
        <Drawer variant="permanent" anchor="left"
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
                }}>
            <Toolbar />
            {DrawerList}
        </Drawer>
    );
}

export default Navigation
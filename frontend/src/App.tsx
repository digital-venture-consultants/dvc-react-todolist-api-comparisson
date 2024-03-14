import "./App.css"
import { ToDoList } from "./features/list/list";
import { AddListItem } from "./features/add-list-item/add-list-item";

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import Toast from "./features/toast/toast";
import Navigation from "./features/navigation/navigation";
import Box from "@mui/material/Box";
import TopBar from "./features/top-bar/top-bar";
import Toolbar from "@mui/material/Toolbar";

const App = () => {
  return (
      <>
        <Toast />
        <Box sx={{ display: 'flex' }}>
            <TopBar />
            <Navigation />
            <Box role="main" sx={{ flexGrow: 1 }}>
                <Toolbar />
                <AddListItem />
                <ToDoList />
            </Box>
        </Box>
      </>
  )
}

export default App

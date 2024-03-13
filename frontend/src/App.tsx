import "./App.css"
import { ToDoList } from "./features/list/list";
import { AddListItem } from "./features/add-list-item/add-list-item";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { selectPort, setPort } from "./app/store";

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import Button from '@mui/material/Button';
import Toast from "./features/toast/toast";

const App = () => {
    const dispatch = useAppDispatch();
    const selectedPort = useAppSelector(state => selectPort(state))
    const setApi = function (apiPort: string) {
        dispatch(setPort(apiPort))
    }
  return (
    <div className="App">
        <header className="App-header">
          <h3>{selectedPort}</h3>
        </header>
        <Toast />
        <Button variant={ selectedPort === '1337' ? "contained" : "outlined"} onClick={() => setApi('1337')}>1337</Button>
        <Button variant={ selectedPort === '3000' ? "contained" : "outlined"} onClick={() => setApi('3000')}>3000</Button>
        <AddListItem />
        <ToDoList />
    </div>
  )
}

export default App

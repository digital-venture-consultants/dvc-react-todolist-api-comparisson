import "./App.css"
import { List } from "./features/list/list";
import {AddListItem} from "./features/add-list-item/add-list-item";

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <AddListItem />
        <List />
      </header>
    </div>
  )
}

export default App

import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from './Views/Home';
import AddItem from './Views/AddItem';
import EditItem from "./Views/EditItem";
import Bought from "./Views/Bought";
import ItemHistoryList from "./Views/ItemHistoryList";
import ItemHistory from "./Views/ItemHistory"

export const App = () => {
    return(
        <div>
            <div>
                <BrowserRouter>
                    <div>
                        <Routes>
                            <Route exact path = '/' element={<Home />}/>
                            <Route exact path = '/home' element={<Home />}/>
                            <Route exact path = '/add' element={<AddItem />}/>
                            <Route exact path = '/bought' element={<Bought />}/>
                            <Route exact path = '/edit/:itemId' element={<EditItem />}/>
                            <Route exact path = '/history' element={<ItemHistory/>}/>
                        </Routes>
                    </div>
                </BrowserRouter>
            </div>
        </div>
    )
}

export default App;
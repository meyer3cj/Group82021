import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from './Views/Home';
import AddItem from './Views/AddItem';
import EditItem from "./Views/EditItem";
import Bought from "./Views/Bought";
import ItemHistoryList from "./Views/ItemHistoryList";
import ItemHistory from "./Views/ItemHistory"
import Login from "./Views/Login";
import Signup from "./Views/Signup";
import Profile from "./Views/Profile";

export const App = () => {
    return(
        <div>
            <div>
                <BrowserRouter>
                    <div>
                        <Routes>
                            <Route exact path = '/' element={<Login />}/>
                            <Route exact path = '/login' element={<Login />}/>
                            <Route exact path = '/signup' element={<Signup />}/>
                            <Route exact path = '/:userId/home' element={<Home />}/>
                            <Route exact path = '/add' element={<AddItem />}/>
                            <Route exact path = '/bought' element={<Bought />}/>
                            <Route exact path = '/:usersId/:itemId/edit' element={<EditItem />}/>
                            <Route exact path = '/history' element={<ItemHistory/>}/>
                            <Route exact path = '/:userId/profile' element={<Profile />}/>
                        </Routes>
                    </div>
                </BrowserRouter>
            </div>
        </div>
    )
}

export default App;
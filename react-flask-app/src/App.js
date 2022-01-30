import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from './Views/Home';
import AddItem from './Views/AddItem';
import EditItem from "./Views/EditItem";
import Login from "./Views/Login";
import Signup from "./Views/Signup";

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
                            <Route exact path = '/:itemId/edit' element={<EditItem />}/>
                        </Routes>
                    </div>
                </BrowserRouter>
            </div>
        </div>
    )
}

export default App;
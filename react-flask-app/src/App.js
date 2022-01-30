import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from './Views/Home';
import AddItem from './Views/AddItem';
import EditItem from "./Views/EditItem";
import Login from "./Views/Login";

export const App = () => {
    return(
        <div>
            <div>
                <BrowserRouter>
                    <div>
                        <Routes>
                            <Route exact path = '/' element={<Login />}/>
                            <Route exact path = '/login' element={<Login />}/>
                            <Route exact path = '/home/:userId' element={<Home />}/>
                            <Route exact path = '/add' element={<AddItem />}/>
                            <Route exact path = '/edit/:itemId' element={<EditItem />}/>
                        </Routes>
                    </div>
                </BrowserRouter>
            </div>
        </div>
    )
}

export default App;
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from './Home';
import AddItem from './AddItem';
import EditItem from "./EditItem";

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
                            <Route exact path = '/edit/:itemId' element={<EditItem />}/>
                        </Routes>
                    </div>
                </BrowserRouter>
            </div>
        </div>
    )
}

export default App;
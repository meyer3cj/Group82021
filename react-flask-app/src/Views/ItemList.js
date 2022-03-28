import { List } from "semantic-ui-react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "../CSS_Files/LoginStyle.css";
import "../CSS_Files/itemstyle.css";

// TODO: This is used in many places, can extract into its own file
const api = axios.create({
    baseURL: 'http://localhost:3000/'
})

export const ItemList = ({items}) => {
    // Need to get user data for navigation
    const user = JSON.parse(localStorage.getItem("user"));
    const usersId = user[0].userId;

    // Use navigation for different forms
    const navigate = useNavigate();

    // When buttons are clicked Navigate to proper routes
    const addItemClicked = () => { 
        navigate("/add");
    }

    /*********************************************************************************************
     * Prevent default is called in order to prevent function from automatically getting called. *
     *    By doing this it will only get called when the user clicks edit and will pass the      *
     *                                  necessary information                                    *
    **********************************************************************************************/
    const editItemClicked = (itemId) => {
        navigate(`/${usersId}/${itemId}/edit`);
    }

    const removeItemClicked = async (itemId) => {
        const response = await api.post(`/${itemId}/remove`)

        if (response.status === 200) {
            // TODO: Look for different way to not force a reload of the page
            window.location.reload();
        }
    }
    const BoughtItemClicked = async (itemId) => {
        const response = await api.post(`/${itemId}/setBought`)
        if(response.status === 200){
            window.location.reload();
        }
    }

    return(
        <List className='itemList'>
            {items.map(item => {
                return (
                    <List.Item className= 'item' key = {item.itemId}>
                        <div>

                            <h3><a className='link' href={`//${item.url}`} target="_blank" rel="noreferrer">{item.name}</a></h3>
                            <p className="itemInfo">${item.price}</p>
                            <p className="itemInfo">{item.description}</p>
                            <img src={item.image} alt="" /> <br/>
                            <button className='btn' onClick={e => {e.preventDefault(); editItemClicked(item.itemId)}}>Edit</button>
                            <button className='btn' onClick={e => {e.preventDefault(); removeItemClicked(item.itemId)}}>Remove from list</button>
                            <button className='btn' onClick={e => {e.preventDefault(); BoughtItemClicked(item.itemId)}}>set as purchased</button>
                        </div>
                    </List.Item> 
                )
            })}
            <button className= 'btn' onClick = {e => {e.preventDefault(); addItemClicked()}}>add</button>
        </List>
    )
}

export default ItemList;
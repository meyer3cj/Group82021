import React, { Component } from 'react';
import '../../src/names/list.css';
import axios from 'axios';


const api = axios.create({
    baseURL: 'http://localhost:3000/'
})

class NameList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            view: '',
            itemName: '',
            price: '',
            description: '',
            url: '',
            id:''
        }
    }

    // Adds item url link
    addItemClicked = () => {
        this.setState({
            view: "addItem"
        });
    }
    // Edit item url link
    editItemClicked = async () => {
        await api.post(`/edit/${this.state.id}`, this.state)
    }

    editTestClicked = async (id,name,price,description,url) => {
        //await api.get(`/update/${id}`)
        console.log(price)
        this.setState({
            view: "editItem",
            itemName:name,
            price:price,
            description:description,
            url:url,
            id: id

        });
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = async (e) => {
        e.preventDefault()
        await api.post('/addItem', this.state)
        window.location.href = '.'
    }
    
    render() {

        const {itemName, price, description, url} = this.state

        // const itemstyle={
        //     border: '2px solid black',
        //     marginBottom:'20px',
        //     boxShadow:'2px 2px 4px 6px white',
        //     width: '80%',
        //     marginLeft: '10%',
        //     backgroundColor:'rgb(220,220,220'
        // }
        
        // const linkstyle= { 
        //     textDecoration:'none'
        // }

        // View if add button
        if(this.state.view === "addItem") {
            return (
                <div class= 'form-div'>
                    <form name="request" 
                        onSubmit={this.handleSubmit}>

                        <div>
                            <label>
                                Item name
                                <div>
                                    <input 
                                        type='text' 
                                        name='itemName'
                                        value={itemName}
                                        onChange={this.handleChange}
                                    ></input>
                                </div>
                            </label>
                        </div>
                        <div>
                            <label>
                                Price
                                <div>
                                    <input 
                                        type='number' 
                                        name='price'
                                        value={price}
                                        onChange={this.handleChange}
                                    ></input>
                                </div>
                            </label>
                        </div>
                        <div>
                            <label>
                                Description
                                <div>
                                    <input 
                                        type='text' 
                                        name='description'
                                        value={description}
                                        onChange={this.handleChange}
                                    ></input>
                                </div>
                            </label>
                        </div>
                        <div>
                            <label>
                                URL
                                <div>
                                    <input type="text"
                                        name='url'
                                        value={url}
                                        onChange={this.handleChange}>
                                    </input>
                                </div>
                            </label>
                        </div>
                        <div>
                            <button
                                type = 'submit'
                                onClick={this.handleChange}
                            >
                                add
                            </button>
                        </div>
                    </form>
                </div>
            )
        }

        // View if edit button
        if(this.state.view === "editItem") {
            return (
                <div class= 'form-div'>
                    <form name="request" 
                        onSubmit={this.editItemClicked}>

                        <div>
                            <label>
                                Item name
                                <div>
                                    <input 
                                        type='text' 
                                        name='itemName'
                                        value={itemName}
                                        onChange={this.handleChange}
                                        
                                    />
                                </div>
                            </label>
                        </div>
                        <div>
                            <label>
                                Price
                                <div>
                                <input 
                                    type='number' 
                                    name='price'
                                    value={price.toString()}
                                    onChange={this.handleChange}
                                    />
                                </div>
                            </label>
                        </div>
                        <div>
                            <label>
                                Description
                                <div>
                                    <input 
                                        type='text' 
                                        name='description'
                                        value={description}
                                        onChange={this.handleChange}
                                    />
                                </div>
                            </label>
                        </div>
                        <div>
                            <label>
                                URL
                                <div>
                                    <input type="text"
                                        name='url'
                                        value={url}
                                        onChange={this.handleChange} 
                                    />
                                </div>
                            </label>
                        </div>
                        <div>
                            <button
                                type = 'submit'
                                onClick={this.handleChange}
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            )
        }

        
     
        // Default view
        return( 
            <div>
                {/* <div>
                    {items.map((item, index)=>{return(
                        <div class='item'style={itemstyle}>
                            <div>
                            <p>{item.id.toString()}</p>
                            <h3><a class='link' style={linkstyle} href={item.url}target="_blank">{item.name}</a></h3>
                            <p>${item.price}</p>
                            </div>
                            <p>{item.description}</p>
                            <button onClick={e=> {e.preventDefault(); this.editTestClicked(item.id,item.name,item.price,item.description,item.url)}}>edit</button>
                            <button onClick= {()=>{
                                fetch('/del/'+item.id,{'method':'DELETE'})
                                console.log(item.id+' completed')
                                
                                }}>delete</button>   
                        </div>
                    )})}
                    <button onClick = {this.addItemClicked}>add</button>
                </div> */}
            </div> 
        )
    }
}

export default NameList;


    
    
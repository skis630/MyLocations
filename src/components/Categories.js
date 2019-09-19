import React from 'react';
import TopToolbar from './toolbars/topToolbar';
import { store } from '../index';
import Nav from './toolbars/nav';


class Categories extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: []
        }

        store.subscribe(() => {
            console.log(JSON.stringify(store.getState().categories))
            localStorage.setItem("categories", JSON.stringify(store.getState().categories))
            this.setState({
              categories: store.getState().categories
            });       
        })


    }

    render() {
        return (
            <div>
                <TopToolbar display="category" />
                <ul>
                    {JSON.parse(localStorage.getItem("categories") || "[]").map(cat => <li key={cat.id}>{cat.name}</li>)}
                </ul>
                <Nav />
            </div>
        )
    }
}


export default Categories;
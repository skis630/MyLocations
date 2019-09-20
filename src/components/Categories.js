import React from 'react';
import TopToolbar from './toolbars/topToolbar';
import { store } from '../index';
import Nav from './toolbars/nav.jsx';


class Categories extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: JSON.parse(localStorage["categories"] || "[]")
        }

        store.subscribe(() => {
            this.setState({
                categories: store.getState().categories
            })
            console.log(JSON.stringify(store.getState().categories))
            localStorage.setItem("categories", JSON.stringify(store.getState().categories))
        })


    }

    render() {
        return (
            <div>
                <TopToolbar display="category" />
                <ul>
                    {this.state.categories.map(cat => <li key={cat.id}>{cat.name}</li>)}
                </ul>
                <Nav />
            </div>
        )
    }
}


export default Categories;
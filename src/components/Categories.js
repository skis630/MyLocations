import React from 'react';
import TopToolbar from './toolbars/topToolbar';
import { store } from '../index';


class Categories extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: []
        }
        store.subscribe(() => {
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
                    {this.state.categories.map(cat => <li key={cat.id}>{cat.name}</li>)}
                </ul>
            </div>
        )
    }
}


export default Categories;
import React from 'react';
import TopToolbar from './toolbars/topToolbar';
import { store } from '../index';
import Nav from './toolbars/nav';


class Locations extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            locations: []
        }

        store.subscribe(() => {
            localStorage.setItem("locations", JSON.stringify(store.getState().locations));
            this.setState({
              locations: store.getState().locations
            });       
        })
    }

    render() {
        return (
            <div>
                <TopToolbar display="locations" />
                <ul>
                    {JSON.parse(localStorage.getItem("locations") || "[]").map(loc => <li key={loc.id}>{loc.name}</li>)}
                </ul>
                <Nav />
            </div>
        )
    }
}


export default Locations;
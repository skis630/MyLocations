import React from 'react';
import TopToolbar from './toolbars/topToolbar';
import { store } from '../index';


class Locations extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            locations: []
        }

        store.subscribe(() => {
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
                    {this.state.locations.map(loc => <li key={loc.id}>{loc.name}</li>)}
                </ul>
            </div>
        )
    }
}


export default Locations;
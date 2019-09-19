import React from 'react';
import TopToolbar from './toolbars/topToolbar';
import { store } from '../index';
import Nav from './toolbars/nav';
import { sortLoc } from '../actions/index'


class Locations extends React.Component {
    constructor(props) {
        super(props);
        this.sortLocations = this.sortLocations.bind(this);
        this.group = this.group.bind(this);

        store.subscribe(() => {
            localStorage.setItem("locations", JSON.stringify(store.getState().locations));
            this.setState({
              locations: store.getState().locations
            });       
        })
    }

    sortLocations() {
        let sorted = JSON.parse(localStorage.getItem("locations"));
        function compare(a, b) {
            // Use toUpperCase() to ignore character casing
            const nameA = a.name.toUpperCase();
            const nameB = b.name.toUpperCase();
          
            let comparison = 0;
            if (nameA > nameB) {
              comparison = 1;
            } else if (nameA < nameB) {
              comparison = -1;
            }
            return comparison;
          }
          
        sorted.sort(compare);
        store.dispatch(sortLoc(sorted));
        localStorage.setItem("locations", JSON.stringify(sorted));

    }

    render() {
        return (
            <div>
                <TopToolbar display="locations" />
                <ul>
                    {JSON.parse(localStorage.getItem("locations") || "[]").map(loc => <li key={loc.id}>{loc.name}</li>)}
                </ul>
                <button onClick={this.sortLocations} type="button">View by alphabetical order</button>
                <button type="button" onClick={this.group}>Group by category</button>
                <Nav />
            </div>
        )
    }
}


export default Locations;
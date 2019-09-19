import React from 'react';
import $ from 'jquery';
import { store } from '../../index';
import { addCat, addLoc } from '../../actions';


const ID = function () {
    // Math.random should be unique because of its seeding algorithm.
    // Convert it to base 36 (numbers + letters), and grab the first 9 characters
    // after the decimal.
    return '_' + Math.random().toString(36).substr(2, 9);
   };
   

class TopToolbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: []
        }
        this.addCategory = this.addCategory.bind(this);
        this.addLocation = this.addLocation.bind(this);
        
        store.subscribe(() => {
            this.setState({
              categories: store.getState().categories
            });       
        })
    }

    addCategory(e) {
        e.preventDefault();
        let name = $("#cat").val();
        store.dispatch(addCat(name, ID()));
    }

    addLocation(e) {
        e.preventDefault();
        let name = $("#name").val();
        let address = $("#address").val();
        let coor = $("#coor").val();
        let cat = $("#cat").val();
        store.dispatch(addLoc(name, address, coor, cat, ID()));
    }
    
    render() {
        if (this.props.display == 'category') {
            return (
                <form onSubmit={e => this.addCategory(e)}>
                    <label htmlFor="cat">Category: </label>
                    <input type="text" name="cat" id="cat"></input>
                    <button type="submit">Add Category</button>
                </form>
            )
        } else if (this.props.display == 'locations') {
            return (
                <form onSubmit={e => this.addLocation(e)}>
                    <label htmlFor="name">Name:</label>
                    <input type="text" id="name" name="name"></input>
                    <label htmlFor="address">Address:</label>
                    <input id="address" name="address" type="textarea"></input>
                    <label htmlFor="coor">Coordinates (Lat, Lon):</label>
                    <input id="coor" name="coor" type="range"></input>
                    <label htmlFor="cat">Category:</label>
                    <select id="cat" name="cat">
                        {this.state.categories.map(cat => <option key={cat.id}>{cat.name}</option>)}
                    </select>
                    <button type="submit">Add Location</button>
                </form>
            )
        }
    }
}

export default TopToolbar;

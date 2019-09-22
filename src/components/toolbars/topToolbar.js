import React from 'react';
import $ from 'jquery';
import { Navbar, Form, InputGroup, FormControl, Button } from 'react-bootstrap';
import { store } from '../../index';
import { addCat, addLoc } from '../../actions';
import './topToolbar.css';


const ID = function () {
    // Math.random should be unique because of its seeding algorithm.
    // Convert it to base 36 (numbers + letters), and grab the first 9 characters
    // after the decimal.
    return '_' + Math.random().toString(36).substr(2, 9);
   };
   

class TopToolbar extends React.Component {
    constructor(props) {
        super(props);
        this.addCategory = this.addCategory.bind(this);
        this.addLocation = this.addLocation.bind(this);
        
        store.subscribe(() => {
            localStorage.setItem("categories", JSON.stringify(store.getState().categories));
            localStorage.setItem("locations", JSON.stringify(store.getState().locations));
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
        let lat = $("#lat").val();
        let long = $("#long").val();
        let cat = $("#cat").val();
        store.dispatch(addLoc(name, address, lat, long, cat, ID()));
    }
    
    render() {
        if (this.props.display === 'category') {
            return (
                <Navbar bg="primary" variant="light">
                    <Form onSubmit={e => this.addCategory(e)} inline>
                        <FormControl id="cat" type="text" placeholder="Category name" className=" mr-sm-2" required />
                        <Button type="submit">Add Category</Button>
                    </Form>
                </Navbar>
            )
        } else if (this.props.display === 'locations') {
            return (
                <Navbar bg="primary" variant="light" expand="lg" className="justify-content-between">
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Form onSubmit={e => this.addLocation(e)} inline>
                            <FormControl type="text" id="name" required placeholder="Name" />
                            <FormControl type="textarea" id="address" placeholder="address" required />
                            <InputGroup>
                                <InputGroup.Prepend>
                                    <InputGroup.Text id="basic-addon1">(</InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl type="number" step="0.0000000001" id="lat" placeholder="Latitude" aria-label="Latitude" required />
                                <InputGroup.Append>
                                    <InputGroup.Text id="basic-addon2">,</InputGroup.Text>
                                </InputGroup.Append>
                
                            <FormControl type="number" step="0.0000000001" id="long" placeholder="Longtitude" aria-label="Longtitude" aria-describedby="basic-addon1" required />
                            <InputGroup.Append>
                                <InputGroup.Text id="basic-addon2">)</InputGroup.Text>
                            </InputGroup.Append>                           
                            </InputGroup>
                            <FormControl as="label" htmlFor="cat" required>Category</FormControl>
                            <FormControl id="cat" as="select">
                                {JSON.parse(localStorage.categories || "[]").map(cat => <option key={cat.id}>{cat.name}</option>)}
                            </FormControl>
                            <Button type="submit">Add Location</Button>
                        </Form>
                    </Navbar.Collapse>
                </Navbar>
            )
        }
    }
}

export default TopToolbar;

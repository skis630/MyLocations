import React from 'react';
import $ from 'jquery';
import { Card, Accordion, Button, InputGroup, Form, FormControl } from 'react-bootstrap';
import { FaTrashAlt, FaEdit } from 'react-icons/fa';
import { store } from '../index';
import { deleteLoc, toggleEditLoc, editLoc } from '../actions/index';
import GoogleMap from './map.jsx';


class Location extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            locations: JSON.parse(localStorage["locations"] || "[]")
        };
        this.edit = this.edit.bind(this);

        store.subscribe(() => {
            this.setState({
                locations: store.getState().locations
            })
            localStorage.setItem("locations", JSON.stringify(store.getState().locations));
        })
    }


    edit(e) {
        e.preventDefault();
        let name = $("#edit-name").val();
        let address = $("#edit-address").val();
        let cat = $("#edit-cat").val();
        let lat = $("#edit-lat").val();
        let long = $("#edit-long").val();

        store.dispatch(editLoc(this.props.id, name, lat, long, cat, address));
    }

    render () {
        let name = "";
        let details = "";
        if (this.props.editable) {
            details = <Form inline onSubmit={e => this.edit(e, this.props.id)}>
            <FormControl id="edit-address" type="textarea" defaultValue={this.props.address} required /><br />
            <InputGroup>
                <InputGroup.Prepend>
                    <InputGroup.Text id="edit-addon1">(</InputGroup.Text>
                </InputGroup.Prepend>
                    <FormControl id="edit-lat" type="number" step="0.0000000001" defaultValue={this.props.lat} required />
                <InputGroup.Append>
                    <InputGroup.Text id="basic-addon2">,</InputGroup.Text>
                </InputGroup.Append>
                        <FormControl id="edit-long" type="number" step="0.0000000001" defaultValue={this.props.long} required />
                <InputGroup.Append>
                    <InputGroup.Text id="basic-addon2">)</InputGroup.Text>
                </InputGroup.Append>                           
            </InputGroup>
                <FormControl as="select" id="edit-cat" type="text" defaultValue={this.props.cat} required >
                    {JSON.parse(localStorage.categories || "[]").map(cat => <option key={cat.id}>{cat.name}</option>)}
                </FormControl>
                <br/>
                <Button type="submit">Save</Button> 
          </Form>;
            name = <input id="edit-name" type="text" defaultValue={this.props.name} />;
        } else {
            details = <div>
                        <p>{this.props.address}</p>
                        <p><b>Coordinates:</b> ({this.props.lat} , {this.props.long})</p>
                        <p><b>Category:</b> {this.props.cat}</p>
                      </div>;
            name = this.props.name;                   
        }

        return (
            <Card>
            <Card.Header>
                <Accordion.Toggle as={Button} variant="link" eventKey={this.props.keyEvent}>
                    {name}
                </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey={this.props.keyEvent}>
                <Card.Body>
                <Button onClick={() => store.dispatch(deleteLoc(this.props.id))}><FaTrashAlt /></Button>
                <Button onClick={() => store.dispatch(toggleEditLoc(this.props.id))}><FaEdit /></Button><br/>
                    {details} <br />
                    <div className="rounded mb-0" style={{height: "250px"}}>
                        <GoogleMap lat={this.props.lat} long={this.props.long} />
                    </div>
                </Card.Body>
            </Accordion.Collapse>
        </Card>
        )
        
    }
}


export default Location;
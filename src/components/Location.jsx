import React from 'react';
import { Card, Accordion, Button } from 'react-bootstrap';
import { FaTrashAlt, FaEdit } from 'react-icons/fa';
import { store } from '../index';
import { deleteLoc } from '../actions/index';
import GoogleMap from './map.jsx';


class Location extends React.Component {
    constructor(props) {
        super(props);
        // this.state = {
        //     locations: JSON.parse(localStorage["locations"] || "[]")
        // }

        // store.subscribe(() => {
        //     this.setState({
        //         locations: store.getState().locations
        //     })
        //     localStorage.setItem("locations", JSON.stringify(store.getState().locations));
        // })
    }

    render () {
        
        let details = "";
        if (this.props.editable) {
            details = <div>
                <input id="edit-address" type="text" value={this.props.address} /><br />
                <input id="edit-lat" type="number" step="0.0000000001" value={this.props.lat} />
                <input id="edit-long" type="number" step="0.0000000001" value={this.props.long} />
                <input id="edit-cat" type="text" value={this.props.cat} /> 
            </div>;
        } else {
            details = <div>
                        <p>{this.props.address}</p>
                        <p><b>Coordinates:</b> ({this.props.lat} , {this.props.long})</p>
                        <p><b>Category:</b> {this.props.cat}</p>
                        <div className="rounded mb-0" style={{height: "250px"}}>
                            <GoogleMap lat={this.props.lat} long={this.props.long} />
                        </div>
                      </div>;                   
        }

        return (
            <Card>
            <Card.Header>
                <Accordion.Toggle as={Button} variant="link" eventKey={this.props.keyEvent}>
                    {this.props.children}
                </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey={this.props.keyEvent}>
                <Card.Body>
                    <Button onClick={() => store.dispatch(deleteLoc(this.props.key))}><FaTrashAlt></FaTrashAlt> </Button>
                    <Button> <FaEdit></FaEdit></Button><br/>
                    {details}
                </Card.Body>
            </Accordion.Collapse>
        </Card>
        )
        
    }
}


export default Location;
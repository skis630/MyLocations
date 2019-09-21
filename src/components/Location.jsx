import React from 'react';
import { Card, Accordion, Button } from 'react-bootstrap';


class Location extends React.Component {
    constructor(props) {
        super(props);
    }

    render () {
        <Card key={this.props.key}>
            <Card.Header>
                <Accordion.Toggle as={Button} variant="link" eventKey={`${index}`}>
                    {loc.name}
                </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey={`${index}`}>
                <Card.Body>
                    <Button onClick={() => store.dispatch(deleteLoc(loc.id))}><FaTrashAlt></FaTrashAlt> </Button>
                    <Button> <FaEdit></FaEdit></Button><br/>
                    {loc.address}<br/>
                    <b>Coordinates:</b> ({loc.lat},{loc.long}) <br/>
                    <b>Category:</b> {loc.category}
                    <div className="rounded mb-0" style={{height: "250px"}}>
                        <GoogleMap lat={loc.lat} long={loc.long} />
                    </div>
                    
                </Card.Body>
            </Accordion.Collapse>
        </Card>
    }
}
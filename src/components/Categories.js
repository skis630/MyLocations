import React from 'react';
import $ from 'jquery';
import {Button, ButtonGroup, ListGroup, FormControl, Form } from 'react-bootstrap';
import { FaTrashAlt, FaEdit } from 'react-icons/fa';
import TopToolbar from './toolbars/topToolbar';
import { store } from '../index';
import { deleteCat, toggleEditCat, editCat } from '../actions';
import Nav from './toolbars/nav.jsx';


class Categories extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: JSON.parse(localStorage["categories"] || "[]")
        };
        this.edit = this.edit.bind(this);

        store.subscribe(() => {
            this.setState({
                categories: store.getState().categories
            })
            console.log(JSON.stringify(store.getState().categories))
            localStorage.setItem("categories", JSON.stringify(store.getState().categories))
        })

    }


    edit(id) {
        let name = $("#edit-cat-name").val();

        store.dispatch(editCat(id, name));
    }

    render() {
        let list = "";
        return (
            <div>
                <TopToolbar display="category" />
                <ListGroup>
                    {this.state.categories.map(cat => {
                        if (cat.editable) {
                            list = <Form inline>
                                        <FormControl id="edit-cat-name" type="text" defaultValue={cat.name}
                                                     required /> <br />
                                        <Button type="button" onClick={() => this.edit(cat.id)}>Save</Button>
                                    </Form>;                    
                        } else { list = cat.name}

                        return (
                                <ListGroup.Item key={cat.id}>
                                    {list}
                                    <ButtonGroup>
                                        <Button onClick={() => store.dispatch(deleteCat(cat.id))} >
                                            <FaTrashAlt />
                                        </Button>
                                        <Button onClick={() => store.dispatch(toggleEditCat(cat.id))}>
                                            <FaEdit />
                                        </Button>
                                    </ButtonGroup> 
                                </ListGroup.Item>      
                                )
                    })}
                </ListGroup>
                <Nav />
            </div>
        )
    }
}


export default Categories;
import React from 'react';
import $ from 'jquery';
import {Button, ListGroup, FormControl, Form } from 'react-bootstrap';
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

    componentDidUpdate(prevProps) {
        if (this.props.id !== prevProps.id) {
          this.setDefaultTranslation(this.props.context)
        }
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
                            list = <div>
                                <FormControl id="edit-cat-name" type="text" defaultValue={cat.name} required /> <br />
                                    <Button type="button" onClick={() => this.edit(cat.id)}>Save</Button>
                            </div>;
                                
                                    {/* <Form inline > */}
                                    
                                    {/* </Form> */}
                                    {/* <Button type="button" onClick={() => store.dispatch(deleteCat(cat.id))} >
                                    <FaTrashAlt></FaTrashAlt>
                                    </Button> */}
                                    {/* <Button type="button" onClick={}>
                                        <FaEdit />
                                    </Button> */}
                                
                        } else {    list = cat.name}

                        return (
                            <ListGroup.Item key={cat.id}>
                                {list}
                                <Button onClick={() => store.dispatch(deleteCat(cat.id))} >
                                <FaTrashAlt></FaTrashAlt>
                                </Button>
                                <Button onClick={() => store.dispatch(toggleEditCat(cat.id))}>
                                    <FaEdit />
                                </Button>
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
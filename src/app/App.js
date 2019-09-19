import React from 'react';
import { Route, Switch, Router } from 'react-router-dom';
import { addLoc } from '../actions';
import { store } from '../index';
import Categories from '../components/Categories';
import Locations  from '../components/Locations';
import './app.css';
import $ from 'jquery';
import Nav from '../components/toolbars/nav';
import TopToolbar from '../components/toolbars/topToolbar';



class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
          <Switch>
            <Route exact path="/" component={Nav} />
            <Route path="/categories" component={Categories} />
            <Route path="/locations" component={Locations} /> 
          </Switch>
               
      </div>
      
    )
  }
  
}
export default App;

import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Categories from '../components/Categories';
import Locations  from '../components/Locations';
import './app.css';
import Nav from '../components/toolbars/nav.jsx';


class App extends React.Component {
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

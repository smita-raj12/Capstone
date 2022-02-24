import React from 'react';
import '../App.css';
import { Route, Switch } from "react-router";
import Register  from './Register';
import Login from './Login';
import TimeEntries from './TimeEntries';
import { BrowserRouter as Router } from "react-router-dom";
import NavBar from './NavBar';
import WorkOrders from './WorkOrders';
import Controlers from './Controlers';
import PageNotFound from './PageNotFound';

function App() {
  return (
    <React.Fragment>
      <Router>
          <div className="container ">
          <NavBar />
          <Switch>
            <Route path="/Register" component={Register} />
            <Route path="/Login" component={Login} />
            <Route path="/TimeEntries" component={TimeEntries} />
            <Route path="/WorkOrders" component={WorkOrders} />
            <Route path="/Controlers" component={Controlers} />
            <Route path="/PageNotFound" component={PageNotFound} />
          </Switch>
          </div>  
      </Router>
    </React.Fragment>
  );
}

export default App;


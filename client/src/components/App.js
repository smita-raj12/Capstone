import React, { useEffect, useState } from 'react';
import '../App.css';
import { Route, Switch, Redirect } from "react-router";
import Register  from './Register';
import Login from './Login';
import Logout from './Logout';
import TimeEntries from './TimeEntries';
import { BrowserRouter as Router } from "react-router-dom";
import NavBar from './NavBar';
import WorkOrders from './WorkOrders';
import Controlers from './Controlers';
import PageNotFound from './PageNotFound';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import auth from '../services/authService';
import ProtectedRoute from '../common/ProtectedRoute';

function App() {

  const [ user , setUser] = useState ("");

  useEffect(() => {
      const user1 = auth.getCurrentUser();
      var user = " ";
      if(user1 !== null){
          user = user1;
      } 
      setUser(user); 
      console.log(user);
  },[]);

  return (
    <React.Fragment>
      <ToastContainer />
      <Router>
          <div className="container">
          <NavBar user = {user.name}/>
          <Switch>
            <Route path="/Register" component={Register} />
            <Route path="/Login" component={Login} />
            <Route path="/Logout" component={Logout} />

            <ProtectedRoute path="/TimeEntries" 
            render = {(props)=>(
              <TimeEntries {...props} emailId = {user.id} />
            )} />
            
            <ProtectedRoute path="/WorkOrders" component={WorkOrders} />
            <Route path="/Controlers" component={Controlers} />
            <Route path="/PageNotFound" component={PageNotFound} />
            <Redirect from="/" exact to="/TimeEntries" />
            <Redirect to="/PageNotFound" />
          </Switch>
          </div>  
      </Router>
    </React.Fragment>
  );
}

export default App;


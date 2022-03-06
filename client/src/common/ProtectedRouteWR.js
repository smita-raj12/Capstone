import React from 'react';
import { Route,Redirect} from 'react-router';
import auth from '../services/authService';


const ProtectedRouteWR = ({path,component:Component,render,...rest}) => {
    return (   
            <Route
              {...rest}
                render={props=>{
                    if (!auth.getCurrentUser()) return <Redirect to={{
                        pathname:'/Login',
                        state:{from :props.location}
                    }}/>;
                        return Component ? <Component {...props}/>: render(props);
                }}
            />
          );
}
 
export default ProtectedRouteWR;
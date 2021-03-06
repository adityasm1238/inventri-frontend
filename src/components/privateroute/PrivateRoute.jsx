import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({component: Component,user,isLoading,handleLogout, ...rest}) => {
    return (

        // Show the component only when the user is logged in
        // Otherwise, redirect the user to /signin page
  
        <Route {...rest} render={props => (
            user.isLoggedIn ?
                <Component {...props} handleLogout={handleLogout} user = {user}/>
            : <Redirect to="/login" />
        )} />
    );
};

export default PrivateRoute;
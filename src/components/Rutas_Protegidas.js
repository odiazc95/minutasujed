import React from "react";
import { Route, Redirect } from "react-router-dom";


function RutasProtegidas(props) {
    if (props.isAuthenticated === true) {
        const Component = props.component;
        return(
            <Route>
                <Component {...props} />
            </Route>
        ) ;
      }else{
        //console.log("No estás autenticado");
        return (<Redirect to="/login" />);
      }
}

export default RutasProtegidas
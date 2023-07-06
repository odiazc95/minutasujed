import React from "react";

const User = (props) =>{
    return(
        <div className="usuario">
            <p className="text_usuarios"><strong>Nombre</strong>: {props.User.nombre}</p>
            <p className="text_usuarios"><strong>Cargo</strong>: {props.User.cargo}</p>
            <p className="text_usuarios"><strong>Email</strong>: {props.User.email}</p>
        </div>
    )
}

export default User;
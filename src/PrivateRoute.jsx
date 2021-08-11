import React, { useContext } from 'react'
import { Redirect, Route } from 'react-router-dom'
import AuthContext from './context/auth/authContext'

const PrivateRoute = (props) => {

    const { autenticado, cargando } = useContext(AuthContext)

    return (

        cargando ?
            <h1>CARGANDO</h1> :
            autenticado ?
                <Route path={props.path}>
                    {props.children}
                </Route> :
                <Redirect to="/" />

    )
}

export default PrivateRoute

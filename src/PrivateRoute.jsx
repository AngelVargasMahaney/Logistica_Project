import React, { useContext, useEffect, useState } from 'react'
import { Redirect, Route } from 'react-router-dom'
import AuthContext from './context/auth/authContext'
import { postVerificarToken } from './services/authService'
const PrivateRoute = (props) => {

    const { autenticado, cargando} = useContext(AuthContext)

    // // let autenticado = false;
    // const verificarToken = () => {
    //     postVerificarToken(localStorage.getItem('token')).then(rpta => {
    //         if (rpta.status === 200) {
    //             iniciarSesionContext(localStorage.getItem('token'))
    //             //autenticado = true;
    //         }
    //         setCargando(false);
    //     }).catch(err => {
    //         setCargando(false);
    //     })
    // }
    // useEffect(() => {
    //     verificarToken();
    // }, [])

    return (

        cargando ?
            <div className="loader__main">CARGANDO</div> :
            autenticado ?
                <Route path={props.path}>
                    {props.children}
                </Route> :
                <Redirect to="/" />

    )
}

export default PrivateRoute
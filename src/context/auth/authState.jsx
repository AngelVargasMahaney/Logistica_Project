import React, { useEffect, useState } from 'react'
import { postVerificarToken } from '../../services/authService'
import AuthContext from './authContext'


const AuthState = (props) => {

    const [state, setState] = useState({
        autenticado: false,
        name: null,
        token: null,
        cargando: true
    })

    const iniciarSesionLocalStorage = () => {
        const toquen = localStorage.getItem('token')
        if (toquen) {

            postVerificarToken(toquen).then(rpta => {
                if (rpta.statusText === 'OK') {
                    iniciarSesionContext(localStorage.getItem('token'))
                }else{
                    console.log("dffaw")
                }
            })


        }
    }

    useEffect(() => {
        iniciarSesionLocalStorage()
    }, [])


    const iniciarSesionContext = (token) => {
        localStorage.setItem('token', token);
        const payloadString = token.split('.')[1]
        const payloadDecrypt = atob(payloadString)
        const payloadJson = JSON.parse(payloadDecrypt)
        setState({
            autenticado: true,
            name: payloadJson.name,
            token: token,
            cargando: false
        })

    }

    return (
        <AuthContext.Provider value={{
            ...state,
            iniciarSesionContext
        }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthState

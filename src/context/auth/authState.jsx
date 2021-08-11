import React, { useState } from 'react'
import AuthContext from './authContext'


const AuthState = (props) => {

    const [state, setState] = useState({
        autenticado: false,
        name: null,
        token: null,
    })
    
    const iniciarSesionContext = (token) =>{
        const payloadString = token.split('.')[1]
        const payloadDecrypt = atob(payloadString)
        const payloadJson = JSON.parse(payloadDecrypt)
        setState({
            autenticado: true,
            name: payloadJson.name,
            token: token
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

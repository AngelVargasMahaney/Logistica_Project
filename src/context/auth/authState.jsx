import React, { useEffect, useState } from 'react'
import { postVerificarToken } from '../../services/authService'
import AuthContext from './authContext'


const AuthState = (props) => {

    const [state, setState] = useState({
        autenticado: false,
        name: null,
        apellido: null,
        token: null,
        cargando: true
    })

    const iniciarSesionContext = (token) => {
        localStorage.setItem('token', token);
        const payloadString = token.split('.')[1]
        const payloadDecrypt = atob(payloadString)
        const payloadJson = JSON.parse(payloadDecrypt)
        setState({
            autenticado: true,
            name: payloadJson.name,
            apellido: payloadJson.apellido,
            token: token,
            cargando: false
        })

    }
    const iniciarSesionLocalStorage = () => {
        const toquen = localStorage.getItem('token')
        if (toquen) {
            postVerificarToken(toquen).then(rpta => {
                if (rpta.status === 200) {
                    iniciarSesionContext(localStorage.getItem('token'))
                } else {
                    console.log("inicio de sesión fallido");
                    localStorage.removeItem('token')
                    setState({
                        autenticado: false,
                        name: null,
                        apellido: null,
                        token: null,
                        cargando: false
                    })
                }
            }).catch(err => {
                console.log(err)
                console.log("FALLO EN CATCH")
                localStorage.removeItem('token')
                setState({
                    autenticado: false,
                    name: null,
                    apellido: null,
                    token: null,
                    cargando: false
                })
            })
        }
    }

    useEffect(() => {
        iniciarSesionLocalStorage()
        // eslint-disable-next-line
    }, [])



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

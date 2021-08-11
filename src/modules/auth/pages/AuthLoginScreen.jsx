import React, { useContext, useState } from 'react'
import { useHistory } from 'react-router'
import AuthContext from '../../../context/auth/authContext'
import { postLogin } from '../../../services/authService'

const AuthLoginScreen = () => {

    const {iniciarSesionContext} = useContext(AuthContext)

    const [formulario, setFormulario] = useState({
        email: '',
        password: ''
    })

    const history = useHistory()

    const handleChange = e => {
        setFormulario({
            ...formulario,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = e => {
        e.preventDefault()
        postLogin(formulario).then(rpta=>{
            console.log(rpta)
            if(rpta.statusText === 'OK'){
                iniciarSesionContext(rpta.data.token)
                history.push("/admin")
            }
        })
    }

    return (
        <main className="login">
            <div className="login__form">
                <h1>Inicio de Sesión</h1>
                <form className="formulario" onSubmit={handleSubmit}>
                    <label htmlFor="">Email:</label>
                    <input
                        name="email"
                        onChange={handleChange}
                        value={formulario.email}
                        type="email"
                        className="formulario__input"
                        placeholder="Email" />
                    <label htmlFor="">Password:</label>
                    <input
                        name="password"
                        onChange={handleChange}
                        value={formulario.password}
                        type="password"
                        className="formulario__input"
                        placeholder="Password"
                    />
                    <button className="formulario__submit" type="submit">
                        Iniciar Sesión
                    </button>
                </form>
            </div>
        </main>
    )
}

export default AuthLoginScreen

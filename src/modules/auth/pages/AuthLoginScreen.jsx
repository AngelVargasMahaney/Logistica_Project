import React, { useContext, useEffect, useState } from 'react'
import AuthContext from '../../../context/auth/authContext'
import { postLogin } from '../../../services/authService'
import { useHistory } from "react-router-dom";
import policia from "../../../assets/PNP-FONDO-2.jpg"
import policia2 from "../../../assets/logo_login.png"

import swal from 'sweetalert2'
const AuthLoginScreen = () => {

    const [formulario, setFormulario] = useState({
        email: '',
        password: ''
    })
    const history = useHistory();

    const { iniciarSesionContext } = useContext(AuthContext)


    // console.log(tokencito)



    const handleChange = e => {
        setFormulario({
            ...formulario,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = e => {
        e.preventDefault()
        postLogin(formulario).then((rpta) => {
            console.log(rpta)
            if (rpta.status === 200) {
                iniciarSesionContext(rpta.data.token)

                swal.fire({
                    icon: 'success',
                    title: 'Login Exitoso',
                    text: 'BIENVENIDO',
                    footer: 'SISTEMA DE CONTROL DE BIENES'
                })
                history.push('/admin')

            } else {
                console.log("ERRRRRRRRRRRRRRRRRo")
            }
        }).catch(err => {
            swal.fire({
                icon: 'error',
                title: 'Login Incorrecto',
                text: 'Contáctese con el Administrador',
                footer: 'SISTEMA DE CONTROL DE BIENES'
            })
        })




    }

    return (
        <main className="login">
            <div className="login__form">

                <h2 className="mb-5">Inicio de Sesión</h2>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="mb-4">
                                <img src={policia2} className="img-fluid
                                " alt="Imagen del Bien" />
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <form className="formulario" onSubmit={handleSubmit}>
                                <label htmlFor="">Email:</label>
                                <input
                                    name="email"
                                    onChange={handleChange}
                                    value={formulario.correo}
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
                    </div>
                </div>



            </div>
        </main>

        // <div className="loginbackground">

        //     <div class="cerdito">

        //         <div class="login-wrap">
        //             <div class="login-html">
        //                 <div className="prueba">
        //                     <input id="tab-1" type="radio" name="tab" class="sign-in" checked /><label for="tab-1" class="tab" >Sign In</label>
        //                     <input id="tab-2" type="radio" name="tab" class="sign-up" /><label for="tab-2" class="tab"></label>

        //                     <div class="login-form">
        //                         <form onSubmit={handleSubmit}>
        //                             <div class="sign-in-htm">
        //                                 <div class="group">
        //                                     <label for="user" class="label">Username</label>
        //                                     <input id="user" name="email" type="email" class="input" value={formulario.email} onChange={handleChange} placeholder="Username" />
        //                                 </div>
        //                                 <div class="group">
        //                                     <label for="pass" class="label">Password</label>
        //                                     <input id="pass" type="password" placeholder="Password" class="input" data-type="password" name="password" value={formulario.password} onChange={handleChange} />
        //                                 </div>
        //                                 <div class="group">
        //                                     <input type="submit" class="button" />
        //                                 </div>

        //                             </div>
        //                         </form>
        //                     </div>
        //                 </div>

        //             </div>

        //         </div>

        //     </div>
        // </div>

        // <div className="loginbackground">
        //     <div className="container">
        //         <div className="row">
        //             <h1 className="card-title text-center mt-5 text-light">LOGÍSTICA PNP</h1>
        //             <div className="col-lg-10 col-xl-9 mx-auto">
        //                 <div className="card card-signin flex-row my-5">
        //                     <div className="card-img-left d-none d-md-flex">

        //                     </div>
        //                     <div className="card-body">
        //                         <p className="card-titles">Bienvenido</p>
        //                         <h3 className="card-title">Login</h3>
        //                         <form className="form-signin" onSubmit={handleSubmit}>
        //                             <div className="form-label-group">
        //                                 <input type="email" name="email" id="inputUserame" className="form-control" value={formulario.email}
        //                                     onChange={handleChange} placeholder="Username" required autoFocus />
        //                                 <label htmlFor="inputUserame"><i className="fa fa-envelope" aria-hidden="true"></i> Username</label>
        //                             </div>
        //                             <div className="form-label-group">
        //                                 <input type="password" id="inputPassword" name="password"
        //                                     value={formulario.password} onChange={handleChange} className="form-control" placeholder="Password" required autoFocus />
        //                                 <label htmlFor="inputPassword"><i className="fa fa-key" aria-hidden="true"></i> Password</label>
        //                             </div>

        //                             <button className="btn btn-lg btn-primary w-100 text-uppercase" type="submit">Ingresar</button>

        //                         </form>

        //                     </div>
        //                 </div>
        //             </div>

        //         </div>
        //     </div>
        // </div>

        /* 
                <main classNameName="container">
                    <div classNameName="row justify-content-center align-items-center vh-100">
                        <div classNameName="col-md-4">
                            <div classNameName="card">
                                <div className="card-body">
                                    <form onSubmit={handleSubmit}>
                                        <div>
                                            <label htmlFor="" className="form-label">
                                                Email
                                            </label>
                                            <input type="email" 
                                            className="form-control" 
                                            name = "email"
                                            value={formulario.email}
                                            onChange={handleChange}
                                            placeholder="Email"/>
                                        </div>
                                        <div>
                                            <label htmlFor="" className="form-label">
                                                Password
                                            </label>
                                            <input type="password" 
                                            className="form-control" 
                                            name = "password"
                                            value={formulario.password}
                                            onChange={handleChange}
                                            placeholder="Password"/>
                                        </div>
                                        <div>
                                            <button type="submit" className="btn btn-primary">Iniciar Sesión </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </main> */
    )
}

export default AuthLoginScreen

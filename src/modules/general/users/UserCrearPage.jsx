import React, { useEffect, useState } from 'react'
import { getRoles, postUsuario } from '../../../services/usuarioService'
import { useHistory } from 'react-router-dom'

import swal from 'sweetalert2'
const UserCrearPage = () => {
    const tituloOperacion = 'Formulario de Creación de un Usuario'
    //Variable de estado que se encarga de manejar los campos de nuestro formulario que servirán para llenar la bd (tener en cuenta los campos que el back-end envió, ver documentación)
    const [formulario, setFormulario] = useState({
        name: "",
        apellido: "",
        dni: "",
        email: "",
        password: "",
        role_id: 0
    })


    const history = useHistory()

    //Desestructuro los campos del formulario, con el objetivo de evitar poner formulario.valor en cada atributo del forumario (por limpieza de código)
    let { name, apellido, dni, email, password } = formulario

    // Cada vez que se dispara el evento onChange del formulario, se llama a esta funcion para manejar el envío de datos
    const handleChange = (e) => {
        setFormulario({
            ...formulario,
            [e.target.name]: e.target.value //Darle valor del name según el formulario
        })
    }
    const [roles, setRoles] = useState([])
    const obtenerRoles = () => {
        getRoles().then((rpta) => {
            setRoles(rpta.data)

        })
    }
    useEffect(() => {
        obtenerRoles()
    }, [])


    console.log(roles)
    const handleSubmit = (e) => {
        e.preventDefault() //Evito que se refresque la página

        const errorResponse = (({ response }) => {
            let mensaje = ""
            if (response.status === 400) {
                for (const [key, value] of Object.entries(response.data)) {
                    mensaje += key + ": " + value + "<br>";
                    console.log(key, value);

                }
            }
            swal.fire({
                icon: 'error',
                title: 'Ocurrio un Error',
                html: mensaje,
                footer: 'SISTEMA DE CONTROL DE BIENES'
            })
        });
        postUsuario(formulario).then((rpta) => {
            console.log(rpta)
            if (rpta.status === 200) { //Si el status es OK, entonces redirecciono a la lista de usuarios
                history.push("/admin/usuario")
            }
        }).catch(errorResponse);
    }

    console.log(formulario)

    return (
        <>
           
            <div className="home_content">
                <main className="container">
                    <div className="row mt-4">
                        <div className="col">
                            <div className="card">
                                <div className="card-header">
                                    <h4 className="card-title">
                                        {tituloOperacion}
                                    </h4>
                                </div>
                                <div className="card-body">

                                    <form onSubmit={handleSubmit}>
                                        <div>
                                            <label htmlFor="" className="form-label">
                                                Nombre del Usuario
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control my-2"
                                                placeholder="Ejm: Pedro Mario"
                                                name="name"
                                                value={name}
                                                onChange={handleChange}
                                                required
                                            />
                                            <label htmlFor="" className="form-label">
                                                Apellido
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control my-2"
                                                placeholder="Ejm: Pérez Sánchez"
                                                name="apellido"
                                                value={apellido}
                                                required
                                                onChange={handleChange}
                                            />
                                            <label htmlFor="" className="form-label">
                                                DNI
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control my-2"
                                                placeholder="74521589"
                                                name="dni"
                                                value={dni}
                                                pattern="[0-9]{8}"
                                                title="Debe poner 8 números"
                                                onChange={handleChange}
                                            />
                                            <label htmlFor="" className="form-label">
                                                Email
                                            </label>
                                            <input
                                                type="email"
                                                className="form-control my-2"
                                                placeholder="Ejm: Pmario@pnp.gob.pe"
                                                name="email"
                                                value={email}
                                                onChange={handleChange}
                                                required
                                            />
                                            <label htmlFor="" className="form-label">
                                                Password
                                            </label>
                                            <input
                                                type="password"
                                                className="form-control my-2"
                                                placeholder="Ejm: Pmario@pnp.gob.pe"
                                                name="password"
                                                value={password}
                                                minLength="4"
                                                maxLength="32"
                                                onChange={handleChange}
                                                required
                                            />

                                            <div className="form-group">
                                                <label htmlFor="">Rol de Usuario</label>
                                                <select onChange={handleChange} name="role_id" value={formulario.role_id} required className="form-select custom-select mr-sm-2">
                                                    <option value="">Seleccione Rol de Usuario</option>
                                                    {roles.map((objRol, i) => {
                                                        return (
                                                            <option key={objRol.id} value={objRol.id}>{objRol.name}</option>
                                                        );
                                                    })}

                                                </select>
                                            </div>

                                        </div>
                                        <div>


                                            <div>
                                                <button className="btn btn-primary" type="submit">
                                                    <span className="mx-1"><i className="fa fa-floppy-o" aria-hidden="true"></i></span>   Guardar
                                                </button>
                                                <button
                                                    className="btn btn-danger my-3 mx-3"
                                                    type="button"
                                                    onClick={() => {
                                                        history.push("/admin/usuario");
                                                    }}
                                                >
                                                    <span className="mx-1"><i className="fa fa-ban" aria-hidden="true"></i></span> Cancelar
                                                </button>
                                            </div>

                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </>
    )
}

export default UserCrearPage

import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { getUsuariosById, putUsuarioById, getRoles } from '../../../services/usuarioService'

import swal from 'sweetalert2'
const UserEditarPage = () => {

    const tituloOperacion = 'Formulario de Edición de un Usuario'
    //Variable de estado que se encarga de manejar los campos de nuestro formulario que servirán para llenar la bd (tener en cuenta los campos que el back-end envió, ver documentación)
    const [formulario, setFormulario] = useState({
        id: 0,
        name: "",
        apellido: "",
        dni: "",
        email: "",
        password: "",
        role_id: ""
    })

    //Recupero los parámetros de la URL
    const params = useParams()

    const history = useHistory()

    //Desestructuro los campos del formulario, con el objetivo de evitar poner formulario.valor en cada atributo del forumario (por limpieza de código)
    let { name, apellido, dni, email, password, role_id } = formulario

    // Cada vez que se dispara el evento onChange del formulario, se llama a esta funcion para manejar el envío de datos
    const handleChange = (e) => {
        setFormulario({
            ...formulario,
            [e.target.name]: e.target.value //Darle valor del name según el formulario
        })
    }

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
    const handleSubmit = (e) => {
        e.preventDefault() //Evito que se refresque la página
        // postUsuario({ ...formulario }).then((rpta) => { //Copia del formulario
        //     console.log(rpta)
        // })
        //console.log(formulario)

        //Validación genérica, se puede mejorar

        putUsuarioById(formulario).then((rpta) => {
            //console.log(rpta)
            if (rpta.status === 200) {
                history.push("/admin/usuario")
            }
        }).catch(errorResponse);

    }

    const [roles, setRoles] = useState([])
    const obtenerRoles = () => {
        getRoles().then((rpta) => {
            setRoles(rpta.data)

        })
    }
    useEffect(() => {
        obtenerRoles()
        getUsuariosById(params.id).then((rpta) => {
            //console.log(rpta)
            setFormulario({ ...rpta.data })
        })
        // eslint-disable-next-line
    }, [])

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
                                    {
                                        // error ? <div className="alert alert-danger">
                                        //     Todos los campos deben ser llenados
                                        // </div> : null
                                    }
                                    <form onSubmit={handleSubmit}>
                                        <div>
                                            <label htmlFor="" className="form-label my-2">Id</label>
                                            <input type="text" className="form-control mt-2" required disabled value={formulario.id} />
                                        </div>
                                        <div>
                                            <label htmlFor="" className="form-label my-2">
                                                Nombre del Usuario
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control mt-2"
                                                required placeholder="Ejm: Pedro Mario"
                                                name="name"
                                                value={name}
                                                onChange={handleChange}
                                            />
                                            <label htmlFor="" className="form-label my-2">
                                                Apellido
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control mt-2"
                                                required placeholder="Ejm: Pérez Sánchez"
                                                name="apellido"
                                                value={apellido}
                                                onChange={handleChange}
                                            />
                                            <label htmlFor="" className="form-label my-2">
                                                DNI
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control mt-2"
                                                placeholder="74521589"
                                                name="dni"
                                                required
                                                value={dni}
                                                pattern="[0-9]{8}"
                                                title="Debe poner 8 números"
                                                onChange={handleChange}
                                            />
                                            <label htmlFor="" className="form-label my-2">
                                                Email
                                            </label>
                                            <input
                                                type="email"
                                                className="form-control mt-2"
                                                required placeholder="Ejm: Pmario@pnp.gob.pe"
                                                name="email"
                                                value={email}
                                                onChange={handleChange}
                                            />
                                            <label htmlFor="" className="form-label my-2">
                                                Rol
                                            </label>
                                            <select
                                                required className="form-select custom-select mr-sm-2 my-2"
                                                name="role_id"
                                                onChange={handleChange}
                                                value={role_id}
                                            >
                                               {roles.map((objRol, i) => {
                                                        return (
                                                            <option key={objRol.id} value={objRol.id}>{objRol.name}</option>
                                                        );
                                                    })}

                                            </select>

                                            <label htmlFor="" className="form-label my-2">
                                                Password
                                            </label>
                                            <input
                                                type="password"
                                                className="form-control mt-2"
                                                name="password"
                                                value={password}
                                                minLength="4"
                                                maxLength="32"
                                                onChange={handleChange}
                                            />
                                        </div>
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

export default UserEditarPage

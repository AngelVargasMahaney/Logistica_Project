import React, { useState } from 'react'
import { postUsuario } from '../../../services/usuarioService'
import { useHistory } from 'react-router-dom'
import AdminSidebar from '../../admin/components/AdminSidebar'
import GeneralNavBar from '../../layout/GeneralNavBar'
const UserCrearPage = () => {
    const tituloOperacion = 'Formulario de Creación de un Usuario'
    //Variable de estado que se encarga de manejar los campos de nuestro formulario que servirán para llenar la bd (tener en cuenta los campos que el back-end envió, ver documentación)
    const [formulario, setFormulario] = useState({
        name: "",
        apellido: "",
        dni: "",
        email: "",
        password: ""
    })

    const [error, setError] = useState(false)
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

    const handleSubmit = (e) => {
        e.preventDefault() //Evito que se refresque la página
        // postUsuario({ ...formulario }).then((rpta) => { //Copia del formulario
        //     console.log(rpta)
        // })
        //console.log(formulario)

        //Validación genérica, se puede mejorar
        if (name.trim() === "" || apellido.trim === "" || dni.trim() === "" || email.trim() === "" || password.trim() === "") {
            setError(true);
            return
        }

        postUsuario(formulario).then((rpta) => {
            console.log(rpta)
            if (rpta.status === 200) { //Si el status es OK, entonces redirecciono a la lista de usuarios
                history.push("/admin/usuario")
            }
        })
    }


    return (
        <>
            <AdminSidebar />
            <GeneralNavBar />
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
                                        error ? <div className="alert alert-danger">
                                            Todos los campos deben ser llenados
                                        </div> : null
                                    }
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
                                                onChange={handleChange}
                                            />
                                            <label htmlFor="" className="form-label">
                                                Email
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control my-2"
                                                placeholder="Ejm: Pmario@pnp.gob.pe"
                                                name="email"
                                                value={email}
                                                onChange={handleChange}
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
                                                onChange={handleChange}
                                            />
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

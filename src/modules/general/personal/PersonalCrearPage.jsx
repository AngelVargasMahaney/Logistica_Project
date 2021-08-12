import React, { useState, useEffect } from 'react'

import { useHistory } from 'react-router-dom'
import AdminSidebar from '../../admin/components/AdminSidebar'
import GeneralNavBar from '../../layout/GeneralNavBar'

import { postPersonal } from "../../../services/personalService";


const PersonalCrearPage = () => {
    const TITULO = "Formulario de Creación de Personal";
    const HISTORY = "/admin/personal";
    //Variable de estado que se encarga de manejar los campos de nuestro formulario que servirán para llenar la bd (tener en cuenta los campos que el back-end envió, ver documentación)
    const [formulario, setFormulario] = useState({
        grado: "",
        nombre_completo: "",
        cip: "",
        dni: "",
    })
    const history = useHistory()


    //Desestructuro los campos del formulario, con el objetivo de evitar poner formulario.valor en cada atributo del forumario (por limpieza de código)
    let { grado, nombre_completo, cip, dni } = formulario

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

        postPersonal(formulario).then((rpta) => {
            console.log(rpta)
            if (rpta.status === 200) { //Si el status es OK, entonces redirecciono a la lista de usuarios
                history.push(HISTORY)
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
                                        {TITULO}
                                    </h4>
                                </div>
                                <div className="card-body">

                                    <form onSubmit={handleSubmit}>
                                        <div>
                                            <label htmlFor="" className="form-label">
                                                Grado
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control my-2"
                                                name="grado"
                                                value={grado}
                                                required
                                                onChange={handleChange}
                                            />

                                            <label htmlFor="" className="form-label">
                                                Nombre Completo
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control my-2"
                                                name="nombre_completo"
                                                value={nombre_completo}
                                                required
                                                onChange={handleChange}
                                            />

                                            <label htmlFor="" className="form-label">
                                                CIP
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control my-2"
                                                name="cip"
                                                value={cip}
                                                required
                                                onChange={handleChange}
                                                pattern="[0-9]{4,10}"
                                                title="4 - 10"
                                            />

                                            <label htmlFor="" className="form-label">
                                                DNI
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control my-2"
                                                name="dni"
                                                value={dni}
                                                required
                                                onChange={handleChange}
                                                pattern="[0-9]{8}"
                                                title="Debe poner 8 números"
                                            />

                                        </div>
                                        <div>

                                            <div>
                                                <button className="btn btn-primary" type="submit">
                                                    <span className="mx-1"><i class="fa fa-floppy-o" aria-hidden="true"></i></span>   Guardar
                                                </button>
                                                <button
                                                    className="btn btn-danger my-3 mx-3"
                                                    type="button"
                                                    onClick={() => {
                                                        history.push(HISTORY);
                                                    }}
                                                >
                                                    <span className="mx-1"><i class="fa fa-ban" aria-hidden="true"></i></span> Cancelar
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

export default PersonalCrearPage;

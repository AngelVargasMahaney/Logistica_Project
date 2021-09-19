import React, { useState } from 'react'

import { useHistory } from 'react-router-dom'
import AdminSidebar from '../../admin/components/AdminSidebar'
import GeneralNavBar from '../../layout/GeneralNavBar'

import { postBienAuxiliar } from '../../../services/bienesAuxiliaresService';


const BienesAuxiliaresCrearPage = () => {
    const TITULO = "Formulario de Registro de Bienes Auxiliar";
    const HISTORY = "/admin/bienes-auxiliares";
    //Variable de estado que se encarga de manejar los campos de nuestro formulario que servirán para llenar la bd (tener en cuenta los campos que el back-end envió, ver documentación)
    const [formulario, setFormulario] = useState({
        descripcion: "",
        marca: "",
        modelo: "",
        serie: "",
        tipo_material: "",
        color: "",
        dimensiones: "",
        estado_bien: "",
        fecha_adquisicion: "",
        observaciones: "",
    })
    const history = useHistory()


    //Desestructuro los campos del formulario, con el objetivo de evitar poner formulario.valor en cada atributo del forumario (por limpieza de código)
    let {
        descripcion,
        marca,
        modelo,
        serie,
        tipo_material,
        color,
        dimensiones,
        estado_bien,
        fecha_adquisicion,
        observaciones } = formulario

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
        postBienAuxiliar(formulario).then((rpta) => {
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
                                                Descripción
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control my-2"
                                                name="descripcion"
                                                value={descripcion}
                                                required
                                                onChange={handleChange}
                                            />
                                            <label htmlFor="" className="form-label">
                                                Marca
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control my-2"
                                                name="marca"
                                                value={marca}

                                                onChange={handleChange}
                                            />


                                            <label htmlFor="" className="form-label">
                                                Modelo
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control my-2"
                                                name="modelo"
                                                value={modelo}

                                                onChange={handleChange}
                                            />
                                            <label htmlFor="" className="form-label">
                                                Serie
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control my-2"
                                                name="serie"
                                                value={serie}

                                                onChange={handleChange}
                                            />
                                            <label htmlFor="" className="form-label">
                                               Tipo Material
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control my-2"
                                                name="tipo_material"
                                                value={tipo_material}

                                                onChange={handleChange}
                                            />
                                            <label htmlFor="" className="form-label">
                                               Color
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control my-2"
                                                name="color"
                                                value={color}

                                                onChange={handleChange}
                                            />
                                             <label htmlFor="" className="form-label">
                                              Dimensiones
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control my-2"
                                                name="dimensiones"
                                                value={dimensiones}

                                                onChange={handleChange}
                                            />
                                            <label htmlFor="" className="form-label">
                                                Estado del Bien
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control my-2"
                                                name="estado_bien"
                                                value={estado_bien}

                                                onChange={handleChange}
                                            />
                                            <label htmlFor="" className="form-label">
                                                Fecha de Adquisicion
                                            </label>
                                            <input
                                                type="date"
                                                className="form-control my-2"
                                                name="fecha_adquisicion"
                                                value={fecha_adquisicion}

                                                onChange={handleChange}
                                            />
                                          
                                            <label htmlFor="" className="form-label">
                                                Observaciones
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control my-2"
                                                name="observaciones"
                                                value={observaciones}

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
                                                        history.push(HISTORY);
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

export default BienesAuxiliaresCrearPage;

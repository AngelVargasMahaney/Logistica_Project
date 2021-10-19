import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import {
    getPersonalById,
    putPersonalById,
  } from "../../../services/personalService";
import AdminSidebar from '../../admin/components/AdminSidebar'
import GeneralNavBar from '../../layout/GeneralNavBar'
import swal from 'sweetalert2'
const PersonalEditarPage = () => {
    
    const TITULO = 'Formulario de Edición de un Personal'
    const HISTORY = "/admin/personal";
    //Variable de estado que se encarga de manejar los campos de nuestro formulario que servirán para llenar la bd (tener en cuenta los campos que el back-end envió, ver documentación)
    const [formulario, setFormulario] = useState({
        id: 0,
        grado: "",
        nombre: "",
        apellido:"",
        cip: "",
        dni: "",
    })
    
    //Recupero los parámetros de la URL
    const params = useParams()

    const history = useHistory()

    //Desestructuro los campos del formulario, con el objetivo de evitar poner formulario.valor en cada atributo del forumario (por limpieza de código)
    let { grado, nombre, apellido, cip, dni } = formulario


    // Cada vez que se dispara el evento onChange del formulario, se llama a esta funcion para manejar el envío de datos
    const handleChange = (e) => {
        setFormulario({
            ...formulario,
            [e.target.name]: e.target.value //Darle valor del name según el formulario
        })
    }

    const errorResponse = (({response}) => {
        let mensaje = ""
        if (response.status == 400) {
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
    } );
    const handleSubmit = (e) => {
        e.preventDefault(); //Evito que se refresque la página
        // postUsuario({ ...formulario }).then((rpta) => { //Copia del formulario
        //     console.log(rpta)
        // })
        //console.log(formulario)

        //Validación genérica, se puede mejorar

        putPersonalById(formulario).then((rpta) => {
            //console.log(rpta)
            if (rpta.status === 200) {
                history.push(HISTORY)
            }
        }).catch(errorResponse);

    }

    useEffect(() => {
        getPersonalById(params.id).then((rpta) => {
            //console.log(rpta)
            setFormulario({ ...rpta.data })
        })
        // eslint-disable-next-line
    }, [])

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
                                            <label htmlFor="" className="form-label my-2">Id</label>
                                            <input type="text" className="form-control mt-2" required disabled value={formulario.id} />
                                        </div>
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
                                                Nombres
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control my-2"
                                                name="nombre"
                                                value={nombre}
                                                required
                                                onChange={handleChange}
                                            />
                                             <label htmlFor="" className="form-label">
                                                Apellidos
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control my-2"
                                                name="apellido"
                                                value={apellido}
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
                                                pattern="[0-9]{8}"
                                                title="Debe poner 8 números"
                                                onChange={handleChange}
                                            />
                                        </div>
                                        
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

export default PersonalEditarPage

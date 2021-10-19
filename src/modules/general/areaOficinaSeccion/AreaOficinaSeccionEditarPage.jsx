import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import {
    getAreaOficinaSeccionById,
    putAreaOficinaSeccionById,
} from "../../../services/areaOficinaSeccionService";
import AdminSidebar from '../../admin/components/AdminSidebar'
import GeneralNavBar from '../../layout/GeneralNavBar'
import { getSubunidades } from "../../../services/subunidadesService";
const AreaOficinaSeccionEditarPage = () => {

    const TITULO = 'Formulario de Edición de un Área Oficina Sección'
    const HISTORY = "/admin/area-oficina-seccion";
    //Variable de estado que se encarga de manejar los campos de nuestro formulario que servirán para llenar la bd (tener en cuenta los campos que el back-end envió, ver documentación)
    const [formulario, setFormulario] = useState({
        id: 0,
        nombre: "",
        subunidad_id: "",
    })
    const [subunidades, setSubunidades] = useState([]);
    //Recupero los parámetros de la URL
    const params = useParams()

    const history = useHistory()

    //Desestructuro los campos del formulario, con el objetivo de evitar poner formulario.valor en cada atributo del forumario (por limpieza de código)
    let { nombre, subunidad_id} = formulario;
    const traerSubunidades = () => {
        getSubunidades().then((rpta) => {
            console.log(rpta);
            setSubunidades(rpta.data);
        });
    };

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

        putAreaOficinaSeccionById(formulario).then((rpta) => {
            //console.log(rpta)
            if (rpta.status === 200) {
                history.push(HISTORY)
            }
        })

    }

    useEffect(() => {
        getAreaOficinaSeccionById(params.id).then((rpta) => {
            setFormulario({ ...rpta.data })
        });
        traerSubunidades();

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
                                        <label htmlFor="" className="form-label my-2">
                                            Subunidad
                                        </label>

                                        <select defaultValue="DEFAULT" onChange={handleChange} value={subunidad_id} name="subunidad_id" required className="form-select custom-select mr-sm-2">
                                            <option value="DEFAULT" disabled>--- Elegir Subunidad ---</option>

                                            {subunidades.map((objTipoFormato, i) => {
                                                return (
                                                    <option key={objTipoFormato.id} value={objTipoFormato.id} >{objTipoFormato.nombre}</option>
                                                );
                                            })}
                                        </select>
                                        <div>
                                            <label htmlFor="" className="form-label my-2">
                                                Nombre del Area Oficina Sección
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control mt-2"
                                                required
                                                name="nombre"
                                                value={nombre}
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
                                                    history.push(HISTORY);
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

export default AreaOficinaSeccionEditarPage

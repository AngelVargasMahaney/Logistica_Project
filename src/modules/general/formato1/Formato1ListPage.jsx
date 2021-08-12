import React, { useState, useEffect } from 'react'
import {Link} from 'react-router-dom'
import { deleteFormatoById, getFormatos } from '../../../services/formatoService'
import AdminSidebar from '../../admin/components/AdminSidebar'
import GeneralNavBar from '../../layout/GeneralNavBar'
import Swal from 'sweetalert2'


const Formato1ListPage = () => {
    
    const urlFormatoCrear = '/admin/formatos/crear'
    const [formatos, setFormatos] = useState([])
    const [cargando, setCargando] = useState(true)

    const traerFormatos = () => {
        setCargando(true)
        getFormatos().then(rpta => {
            console.log(rpta)
            setFormatos(rpta.data)
            setCargando(false)
        })
    }

    useEffect(() => {
        traerFormatos()
    }, [])


    const eliminarFormato = id => {
        Swal.fire({
            title: '¿Seguro que deseas eliminar?',
            icon: 'warning',
            text: 'Los cambios serán irreversibles 😮',
            showCancelButton: true
        }).then((rpta) => {
            if (rpta.isConfirmed) {
                deleteFormatoById(id).then((rpta) => {
                    if (rpta.status === 200) {
                        //Se comprueba que se eliminó correctamente
                        traerFormatos() //Se llama otra vez para setear la variable de estado y recargar la página automáticamente al borrar un usuario
                    }
                })
            }
        })
    }


    return (
        <>
            <AdminSidebar />
            <GeneralNavBar />
            <div className="home_content">


                <div>
                    <main className="container-fluid mt-5">

                        <div className="card">
                            <div className="card-body">

                                <div className="d-flex justify-content-between mb-3">
                                    <h5>Lista de Bienes del Formato 1</h5>
                                    <Link to={urlFormatoCrear} className="btn btn-primary "> <i class="fa fa-plus"></i> Crear un Bien</Link>
                                </div>

                                <div className="row mt-2">

                                    <div className="col">

                                        {
                                            cargando ? <div className="alert alert-info text-center">
                                                <h4>Cargando ...</h4>
                                                <div className="spinner-border text-info" role="status">
                                                    <span className="visually-hidden">Loading...</span>
                                                </div>
                                            </div> :
                                                <div className="table-responsive miTabla ">
                                                    <table className="table table-bordered">
                                                        <thead>
                                                            <tr>
                                                                <th>Id</th>
                                                                <th>Código</th>
                                                                <th>Documento_nombre_original</th>
                                                                <th>Documento</th>
                                                                <th>Descripcion</th>
                                                                <th>Marca</th>
                                                                <th>Modelo</th>
                                                                <th>Serie</th>
                                                                <th>Tipo</th>
                                                                <th>Color</th>
                                                                <th>Dimensiones</th>
                                                                <th>Estado_bien</th>
                                                                <th>Fecha_adquisicion</th>
                                                                <th>Forma_adquisicion</th>
                                                                <th>Observaciones</th>
                                                                <th>Imagen_bien</th>
                                                                <th>Deleted_at</th>
                                                                <th>Created_at</th>
                                                                <th>Updated_at</th>
                                                              
                                                                <th className="acciones">Acciones</th>
                                                            </tr>
                                                        </thead>

                                                        <tbody>
                                                            {
                                                                formatos.map((objFormato, i) => {
                                                                    return (
                                                                        <tr key={objFormato.id}>
                                                                            <td>{objFormato.id}</td>
                                                                            <td>{objFormato.codigo}</td>
                                                                            <td>{objFormato.documento_nombre_original}</td>
                                                                            <td>{objFormato.documento}</td>
                                                                            <td>{objFormato.descripcion}</td>
                                                                            <td>{objFormato.marca}</td>
                                                                            <td>{objFormato.modelo}</td>
                                                                            <td>{objFormato.serie}</td>
                                                                            <td>{objFormato.tipo}</td>
                                                                            <td>{objFormato.color}</td>
                                                                            <td>{objFormato.dimensiones}</td>
                                                                            <td>{objFormato.estado_bien}</td>
                                                                            <td>{objFormato.fecha_adquisicion}</td>
                                                                            <td>{objFormato.forma_adquisicion}</td>
                                                                            <td>{objFormato.observaciones}</td>
                                                                            <td>{objFormato.imagen_bien}</td>
                                                                            <td>{objFormato.deleted_at}</td>
                                                                            <td>{objFormato.created_at}</td>
                                                                            <td>{objFormato.updated_at}</td>
                                                                          
                                                                            <td>


                                                                                <button data-toggle="tooltip" data-placement="top" title="Eliminar"
                                                                                    className="btn btn-danger mx-1"
                                                                                    onClick={() => {
                                                                                        eliminarFormato(objFormato.id);
                                                                                    }}
                                                                                >
                                                                                    <i className="fa fa-trash"></i>

                                                                                </button>
                                                                                <Link to={`formatos/editar/${objFormato.id}`}
                                                                                    className="btn btn-warning"
                                                                                > <i className="fa fa-pencil"></i>
                                                                                </Link>
                                                                            </td>
                                                                        </tr>

                                                                    )
                                                                })
                                                            }
                                                        </tbody>
                                                    </table>
                                                </div>
                                        }
                                    </div></div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </>


    )
}

export default Formato1ListPage

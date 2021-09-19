import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import { deleteBienAuxiliarById, getBienAuxiliar} from '../../../services/bienesAuxiliaresService'


import AdminSidebar from '../../admin/components/AdminSidebar';
import GeneralNavBar from '../../layout/GeneralNavBar';

const BienesAuxiliaresListPage = () => {

    const URL_CREAR = '/admin/bienes-auxiliares/crear'
    const TITULO = "Bienes Auxiliar";
    const [data, setData] = useState([])
    const [cargando, setCargando] = useState(true)

    const traerData = () => {
        setCargando(true)
        getBienAuxiliar().then(rpta => {
            setData(rpta.data)
            setCargando(false)
        })
    }

    useEffect(() => {
        traerData();
    }, [])


    const eliminar = id => {
        Swal.fire({
            title: '¿Seguro que deseas eliminar?',
            icon: 'warning',
            text: 'Los cambios serán irreversibles 😮',
            showCancelButton: true
        }).then((rpta) => {
            if (rpta.isConfirmed) {
                deleteBienAuxiliarById(id).then((rpta) => {
                    if (rpta.status === 200) {
                        //Se comprueba que se eliminó correctamente
                        traerData() //Se llama otra vez para setear la variable de estado y recargar la página automáticamente al borrar un usuario
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
                                    <h5>{TITULO}</h5>
                                    <Link to={URL_CREAR} className="btn btn-primary "> <i className="fa fa-plus"></i> Crear </Link>
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
                                                                <th>id</th>
                                                                <th>descripcion</th>
                                                                <th>marca</th>
                                                                <th>modelo</th>
                                                                <th>serie</th>
                                                                <th>tipo_material</th>
                                                                <th>color</th>
                                                                <th>dimensiones</th>
                                                                <th>estado_bien</th>
                                                                <th>fecha_adquisicion</th>
                                                                <th>observaciones</th>
                                                                <th className="acciones"></th>
                                                            </tr>
                                                        </thead>

                                                        <tbody>
                                                            {
                                                                data.map((obj, i) => {
                                                                    return (
                                                                        <tr key={obj.id}>
                                                                            <td>{obj.id}</td>
                                                                            <td>{obj.descripcion}</td>
                                                                            <td>{obj.marca}</td>
                                                                            <td>{obj.modelo}</td>
                                                                            <td>{obj.serie}</td>
                                                                            <td>{obj.tipo_material}</td>
                                                                            <td>{obj.color}</td>
                                                                            <td>{obj.dimensiones}</td>
                                                                            <td>{obj.estado_bien}</td>
                                                                            <td>{obj.fecha_adquisicion}</td>
                                                                            <td>{obj.observaciones}</td>
                                                                            <td>

                                                                                <button data-toggle="tooltip" data-placement="top" title="Eliminar"
                                                                                    className="btn btn-danger mx-1"
                                                                                    onClick={() => {
                                                                                        eliminar(obj.id);
                                                                                    }}
                                                                                >
                                                                                    <i className="fa fa-trash"></i>

                                                                                </button>

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

export default BienesAuxiliaresListPage

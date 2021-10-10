import React, { useEffect, useState } from 'react'
import { deleteDesinternarBien, getBienesInternadosBienesAuxiliares } from '../../../services/internamientoFormato1Service'
import AdminSidebar from '../../admin/components/AdminSidebar'
import GeneralNavBar from '../../layout/GeneralNavBar'
import Swal from 'sweetalert2'
import Modal from "react-bootstrap/Modal";
const InternamientoBienesAuxiliaresListPage = () => {

    const [listaInternamientoFormato1, setListaInternamientoFormato1] = useState([])
    const [cargando, setCargando] = useState(true)
    const traerData = () => {
        setCargando(true)
        getBienesInternadosBienesAuxiliares().then(rpta => {
            console.log(rpta)
            setListaInternamientoFormato1(rpta.data)
            setCargando(false)
        })
    }

    useEffect(() => {
        traerData()
    }, [])

    const [pdfActual, setpdfActual] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const showModal = (pdfActual) => {
        setpdfActual(pdfActual);
        setIsOpen(true);
    };

    const hideModal = () => {
        setIsOpen(false);
    };
    const desinternarBien = id => {
        Swal.fire({
            title: '¿Seguro que deseas internar el bien?',
            icon: 'warning',
            text: 'Los cambios serán irreversibles 😮',
            showCancelButton: true
        }).then((rpta) => {
            console.log("BIEN DESINTERNADO")
            console.log(rpta)
            if (rpta.isConfirmed) {
                //Aquí borro el usuario
                Swal.fire(
                    'Bien Desinternado',
                    '',
                    'success'
                )
                deleteDesinternarBien(id).then((rpta) => {
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
                                    <h5>Bienes Internados del Formato 1</h5>
                                </div>

                                <div className="row mt-2">

                                    <div className="col">

                                        {
                                            cargando ?

                                                <div className="loader__father">
                                                    <div className="loader">
                                                        <div className="face">
                                                            <div className="circle"></div>
                                                        </div>
                                                        <div className="face">
                                                            <div className="circle"></div>
                                                        </div>
                                                    </div>
                                                </div>

                                                :
                                                <div className="table-responsive miTabla ">
                                                    <table className="table table-bordered">
                                                        <thead>
                                                            <tr>
                                                                <th>N°</th>
                                                                {/* <th>Código del Bien</th> */}
                                                                <th>Descripción del Bien</th>
                                                                {/* <th>Marca</th> */}
                                                                <th>Estado del Bien</th>
                                                                <th>Observaciones</th>
                                                                <th>Fecha</th>
                                                                <th>Acta de entrega y recepción</th>
                                                                <th>Oficio de regularización</th>
                                                                <th className="acciones"> Acciones</th>
                                                            </tr>
                                                        </thead>

                                                        <tbody>
                                                            <Modal show={isOpen} onHide={hideModal} size="lg">
                                                                <div>
                                                                    <Modal.Body>
                                                                        <div className="ModalStyles">
                                                                            <iframe
                                                                                id="pdf-js-viewer"
                                                                                src={pdfActual}
                                                                                title="webviewer"
                                                                                frameBorder="0"
                                                                                width="100%"
                                                                                height="100%"
                                                                            ></iframe>
                                                                        </div>
                                                                    </Modal.Body>
                                                                    <Modal.Footer>
                                                                        <button onClick={hideModal}>Cancel</button>
                                                                    </Modal.Footer>
                                                                </div>
                                                            </Modal>
                                                            {
                                                                listaInternamientoFormato1.map((objLista, i) => {
                                                                    return (
                                                                        <tr key={objLista.id}>
                                                                                <td>{i + 1}</td>

                                                                                {/* <td>{objLista.bien_auxiliar.id}</td> */}
                                                                                <td>{objLista.bien_auxiliar.descripcion}</td>
                                                                                {/* <td>{objLista.bien_auxiliar.marca}</td> */}
                                                                                <td>{objLista.bien_auxiliar.estado_bien}</td>
                                                                                <td>{objLista.bien_auxiliar.observaciones}</td>
                                                                                <td>{objLista.bien_auxiliar.fecha_adquisicion}</td>
                                                                                <td>
                                                                                    <img
                                                                                        className="tamaño-icono-pdf rounded mx-auto d-block"
                                                                                        alt="some value"
                                                                                        title={objLista.nombre_original_acta_entrega_recepcion}
                                                                                        src={objLista.bien_auxiliar.icon_file}
                                                                                        onClick={() =>
                                                                                            showModal(objLista.documento_acta_entrega_recepcion)
                                                                                        }
                                                                                    />
                                                                                </td>
                                                                                <td>
                                                                                    <img
                                                                                        className="tamaño-icono-pdf rounded mx-auto d-block"
                                                                                        alt="some value"
                                                                                        title={objLista.nombre_original_oficio_regularizacion}
                                                                                        src={objLista.icon_file_oficio_regularizacion}
                                                                                        onClick={() =>
                                                                                            showModal(objLista.documento_oficio_regularizacion)
                                                                                        }
                                                                                    />
                                                                                </td>
                                                                                
                                                                                <td>


                                                                                    <button data-toggle="tooltip" data-placement="top" title="Eliminar"
                                                                                        className="btn btn-danger mx-1"
                                                                                        onClick={() => {
                                                                                            desinternarBien(objLista.id);
                                                                                        }}
                                                                                    >
                                                                                        Desinternar Bien <i className="fa fa-trash"></i>

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

export default InternamientoBienesAuxiliaresListPage

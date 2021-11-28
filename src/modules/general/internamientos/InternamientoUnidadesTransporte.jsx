import React, { useEffect, useState } from 'react'

import { Link } from "react-router-dom";
import { Button, Modal } from 'react-bootstrap'
import { getReportes } from '../../../services/reportesService';
import { deleteDesinternarBien, postEditarInternamientoById } from '../../../services/internamientoFormato1Service';
import Swal from 'sweetalert2';
import { getBienesInternadoUnidadesTransporte } from '../../../services/unidadesTransporteService';

const InternamientoUnidadesTransporte = () => {
    const [listaInternamientoUnidadesTransporte, setListaInternamientoUnidadesTransporte] = useState([])
    const [cargando, setCargando] = useState(true)
    const traerData = () => {
        setCargando(true)
        getBienesInternadoUnidadesTransporte().then(rpta => {
            console.log("Lista de bienes internados")
            console.log(rpta)

            setListaInternamientoUnidadesTransporte(rpta.data)
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

    const [showModalReasignar, setshowModalReasignar] = useState(false);
    const [idActualDelBien, setIdActualDelBien] = useState("")
    const showModalReasignarBien = (idBien, obj) => {
        setIdActualDelBien(idBien);
        setFormularioInternamiento({ ...obj });
        setshowModalReasignar(true);
        console.log("ENTRANDO AL LLAMADO DE DATA CON ID: " + idBien)
        // setCargando(true);
        // getHistorialFormatoById(idBien).then(rpta => {
        //   console.log("adwdwaw" + rpta)
        //   setDataHistorial(rpta.data);
        //   console.log("PRUEBAA" + rpta);
        //   setCargando(false);

        // })
    }

    const [formularioInternamiento, setFormularioInternamiento] = useState([]);
    const desinternarBien = id => {
        Swal.fire({
            title: '¿Seguro que deseas desinternar el bien?',
            icon: 'warning',
            text: 'El bien regresará a la lista de general',
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
    const handleCloseReasignar = () => setshowModalReasignar(false);
    const [documentoActa, setDocumentoActa] = useState(null)
    const [documentoOficio, setDocumentoOficio] = useState(null)
    const [documentoInformeTecnico, setDocumentoInformeTecnico] = useState(null)
    const handleDocumentoActa = e => {
        setDocumentoActa(e.target.files[0])
    }
    const handleDocumentoOficio = e => {
        setDocumentoOficio(e.target.files[0])
    }
    const handleDocumentoInformeTecnico = e => {
        setDocumentoInformeTecnico(e.target.files[0])
    }
    const handleChange = (e) => {
        setFormularioInternamiento({
            ...formularioInternamiento,
            [e.target.name]: e.target.value,
        })
    }
    const token = localStorage.getItem('token')
    const config = {
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`
        }
    }
    const handleSubmit = e => {
        e.preventDefault();
        const formData = new FormData();

        formData.append('estado_del_bien', formularioInternamiento.estado_del_bien ? formularioInternamiento.estado_del_bien : "");
        formData.append('fecha', formularioInternamiento.fecha ? formularioInternamiento.fecha : "")
        formData.append('observaciones', formularioInternamiento.observaciones ? formularioInternamiento.observaciones : "")
        formData.append('estado_del_bien', formularioInternamiento.estado_del_bien ? formularioInternamiento.estado_del_bien : "")


        if (documentoActa != null) {
            formData.append('documento_acta_entrega_recepcion', documentoActa)
        } else {
            formData.delete('documento_acta_entrega_recepcion', documentoActa)
        }
        if (documentoOficio != null) {
            formData.append('documento_memorandum', documentoOficio)
        } else {
            formData.delete('documento_memorandum', documentoOficio)
        }
        if (documentoInformeTecnico != null) {
            formData.append('informe_tecnico', documentoInformeTecnico)
        } else {
            formData.delete('informe_tecnico', documentoInformeTecnico)
        }


        postEditarInternamientoById(formData, config, idActualDelBien).then((rpta) => {
            if (rpta.status === 200) { //Si el status es OK, entonces redirecciono a la lista de usuarios
                console.log("Datos actualizados correctamente")
                Swal.fire(
                    'Internamiento Actualizado',
                    'El internamiento se actualizó correctamente',
                    'success'
                )
                traerData();

            } else {
                console.log("Error en postEditarInternamiento")
            }
            setshowModalReasignar(false);
        })

    }

    const tipoReporte = "unidadesTransporteInternados"
    const reportes = () => {
        getReportes(tipoReporte).then(() => {

        })
    }
    return (
        <>
           
            <div className="home_content">


                <div>
                    <main className="container-fluid mt-5">

                        <div className="card">

                            <div className="card-body">
                                <Button onClick={reportes} className="btn btn-success pull-right text-white" title={"Reporte"}>
                                    {" "}
                                    <i className="fas fa-file-excel"></i> Generar Reporte
                                </Button>
                                <div className="d-flex justify-content-between mb-3">
                                    <h5>Bienes Internados de Unidades de Transporte</h5>
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
                                                                <th>Código de la Unidad</th>
                                                                <th>Placa</th>
                                                                <th>Tipo de Vehículo</th>
                                                                <th>Estado de la Unidad</th>
                                                                <th>Observaciones</th>
                                                                <th>Fecha</th>
                                                                <th>Documento: Acta</th>
                                                                <th>Documento: Oficio</th>
                                                                <th>Documento: Informe Técnico</th>
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
                                                                listaInternamientoUnidadesTransporte.map((objLista, i) => {

                                                                    return (
                                                                        <tr key={objLista.id}>
                                                                            <td>{i + 1}</td>

                                                                            <td>{objLista.unidad_transporte.codigo}</td>
                                                                            <td>{objLista.unidad_transporte.placa_interna}</td>
                                                                            <td>{objLista.unidad_transporte.tipo_de_vehiculo}</td>
                                                                            <td>{objLista.estado_del_bien}</td>
                                                                            <td>{objLista.observaciones}</td>
                                                                            <td>{objLista.fecha}</td>
                                                                            <td>
                                                                                {objLista.documento_acta_entrega_recepcion ? (<img
                                                                                    className="tamaño-icono-pdf rounded mx-auto d-block"
                                                                                    alt="some value"
                                                                                    title={objLista.nombre_original_acta_entrega_recepcion}
                                                                                    src={objLista.icon_file_entrega_recepcion}
                                                                                    onClick={() =>
                                                                                        showModal(objLista.documento_acta_entrega_recepcion)
                                                                                    }
                                                                                />) : " "}

                                                                            </td>
                                                                            <td>
                                                                                {objLista.documento_oficio_regularizacion ? (<img
                                                                                    className="tamaño-icono-pdf rounded mx-auto d-block"
                                                                                    alt="some value"
                                                                                    title={objLista.nombre_original_oficio_regularizacion}
                                                                                    src={objLista.icon_file_oficio_regularizacion}
                                                                                    onClick={() =>
                                                                                        showModal(objLista.documento_oficio_regularizacion)
                                                                                    }
                                                                                />) : " "}

                                                                            </td>
                                                                            <td>
                                                                                {objLista.informe_tecnico ? (<img
                                                                                    className="tamaño-icono-pdf rounded mx-auto d-block"
                                                                                    alt="some value"
                                                                                    title={objLista.informe_tecnico_nombre}
                                                                                    src={objLista.informe_tecnico_icon}
                                                                                    onClick={() =>
                                                                                        showModal(objLista.informe_tecnico)
                                                                                    }
                                                                                />) : " "}

                                                                            </td>

                                                                            {/* <td>{objLista.nombre_original_acta_entrega_recepcion}</td>
                                                                        <td>{objLista.nombre_original_oficio_regularizacion}</td> */}
                                                                            <td>


                                                                                <button data-toggle="tooltip" data-placement="top" title="Desinternar"
                                                                                    className="btn btn-danger mx-1"
                                                                                    onClick={() => {
                                                                                        desinternarBien(objLista.id);
                                                                                    }}
                                                                                >
                                                                                    <i className="fa fa-trash"></i>

                                                                                </button>
                                                                                <Button
                                                                                    onClick={() => { showModalReasignarBien(objLista.id, objLista) }}
                                                                                    className="btn btn-warning"
                                                                                    title="Editar"
                                                                                >
                                                                                    {" "}
                                                                                    <i className="fa fa-pencil"></i>
                                                                                </Button>
                                                                                <Link
                                                                                    // to={`formatos/editar/${objFormato.id}`}
                                                                                    to={`/admin/unidades-transporte/historial/${objLista.bien_id}`}
                                                                                    className="btn btn-info ml-1"
                                                                                    title="Historial del bien"
                                                                                >
                                                                                    {" "}
                                                                                    <i className="fa fa-history"></i>
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
                                    </div>

                                </div>

                            </div>
                        </div>
                    </main>

                </div>
            </div>
            <Modal show={showModalReasignar} onHide={handleCloseReasignar}>
                <Modal.Header closeButton>
                    <Modal.Title>Internamiento de una Unidad de Transporte</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="">Estado del Bien:</label>
                            <input type="text" className="form-control"
                                value={formularioInternamiento.estado_del_bien} name="estado_del_bien" required onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="">Fecha:</label>
                            <input type="date" className="form-control"
                                value={formularioInternamiento.fecha} name="fecha" required onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="">Observaciones:</label>
                            <input type="text" className="form-control"
                                value={formularioInternamiento.observaciones} name="observaciones" onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="">Documento: Acta</label>
                            <input type="file" className="form-control"
                                name="documento_acta_entrega_recepcion" onChange={handleDocumentoActa} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="">Documento: Oficio</label>
                            <input type="file" className="form-control"
                                name="documento_memorandum" onChange={handleDocumentoOficio} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="">Documento: Informe Técnico</label>
                            <input type="file" className="form-control"
                                name="informe_tecnico" onChange={handleDocumentoInformeTecnico} />
                        </div>


                        <div className="form-group">
                            <button className="btn btn-primary" type="submit">Actualizar</button>
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseReasignar}>
                        Cerrar
                    </Button>

                </Modal.Footer>
            </Modal>
        </>
    )
}

export default InternamientoUnidadesTransporte

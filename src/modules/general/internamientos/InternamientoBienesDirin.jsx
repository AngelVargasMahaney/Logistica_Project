import React, { useEffect, useState } from 'react'

import { Link } from "react-router-dom";
import { Button, Modal } from 'react-bootstrap'
import Swal from 'sweetalert2';
import { deleteDesinternarBien, getBienesInternadosBienesDirin, postEditarInternamientoById } from '../../../services/internamientoFormato1Service';
import { getReportes } from '../../../services/reportesService';
import CargandoComponente from '../../layout/CargandoComponente';

const InternamientoBienesDirin = () => {

    const [listaInternamientoBienesDirin, setListaInternamientoBienesDirin] = useState([])
    const [cargando, setCargando] = useState(false)
    const traerData = () => {
        setCargando(true)
        getBienesInternadosBienesDirin().then(rpta => {
            console.log("Lista de bienes dirin")
            console.log(rpta)

            setListaInternamientoBienesDirin(rpta.data)
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
        setCargando(true)
        e.preventDefault();
        const formData = new FormData();

        formData.append('estado_del_bien', formularioInternamiento.estado_del_bien ? formularioInternamiento.estado_del_bien : "");
        formData.append('fecha', formularioInternamiento.fecha ? formularioInternamiento.fecha : "")
        formData.append('observaciones', formularioInternamiento.observaciones ? formularioInternamiento.observaciones : "")
        formData.append('estado_del_bien', formularioInternamiento.estado_del_bien ? formularioInternamiento.estado_del_bien : "")


        if (documentoActa != null) {
            formData.append('acta', documentoActa)
        } else {
            formData.delete('acta', documentoActa)
        }
        if (documentoOficio != null) {
            formData.append('oficio', documentoOficio)
        } else {
            formData.delete('oficio', documentoOficio)
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
                setCargando(false)
                traerData();

            } else {
                console.log("Error en postEditarInternamiento")
            }
            setshowModalReasignar(false);
        })

    }

    const tipoReporte = "bienesDirinInternados"
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
                                <Button onClick={reportes} className="btn btn-success pull-right text-white" title={"Generación del Reporte"}>
                                    {" "}
                                    <i className="fas fa-file-excel"></i> Generar Reporte
                                </Button>
                                <div className="d-flex justify-content-between mb-3">
                                    <h5>Bienes Dirin Internados</h5>
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
                                                                <th>Código</th>
                                                                <th>Correl</th>
                                                                <th>Denominación</th>
                                                                <th>Estado del bien</th>
                                                                <th>Observaciones</th>
                                                                <th>Fecha</th>
                                                                <th>Documento Acta</th>
                                                                <th>Documento Oficio</th>
                                                                <th>Documento Informe Técnico</th>
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
                                                                listaInternamientoBienesDirin.map((objLista, i) => {

                                                                    return (
                                                                        <tr key={objLista.id}>
                                                                            <td>{i + 1}</td>

                                                                            <td>{objLista.bien_dirin.codigo}</td>
                                                                            <td>{objLista.bien_dirin.correl}</td>
                                                                            <td>{objLista.bien_dirin.denominacion}</td>
                                                                            <td>{objLista.estado_del_bien}</td>
                                                                            <td>{objLista.observaciones}</td>
                                                                            <td>{objLista.fecha}</td>
                                                                            <td>
                                                                                {objLista.acta ? (<img
                                                                                    className="tamaño-icono-pdf rounded mx-auto d-block"
                                                                                    alt="some value"
                                                                                    title={objLista.acta_nombre}
                                                                                    src={objLista.acta_icon}
                                                                                    onClick={() =>
                                                                                        showModal(objLista.acta)
                                                                                    }
                                                                                />) : " "}
                                                                            </td>
                                                                            <td>
                                                                                {objLista.oficio ? (<img
                                                                                    className="tamaño-icono-pdf rounded mx-auto d-block"
                                                                                    alt="some value"
                                                                                    title={objLista.oficio_nombre}
                                                                                    src={objLista.oficio_icon}
                                                                                    onClick={() =>
                                                                                        showModal(objLista.oficio)
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
                                                                                    to={`/admin/bienes-dirin/historial/${objLista.bien_id}`}
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
                    <Modal.Title>Internamiento de un Bien Dirin</Modal.Title>
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
                                name="acta" onChange={handleDocumentoActa} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="">Documento: Oficio</label>
                            <input type="file" className="form-control"
                                name="oficio" onChange={handleDocumentoOficio} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="">Documento: Informe Técnico</label>
                            <input type="file" className="form-control"
                                name="informe_tecnico" onChange={handleDocumentoInformeTecnico} />
                        </div>


                        {!cargando && <button className="btn btn-primary" type="submit">
                            <span className="mx-1"></span>   Actualizar
                        </button>}
                        {cargando && <button className="btn btn-primary" type="submit" disabled={cargando}>
                            <span className="mx-1"><i className="fa fa-floppy-o" aria-hidden="true"></i></span>  Esperando respuesta del Servidor
                        </button>}
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseReasignar}>
                        Cerrar
                    </Button>

                </Modal.Footer>
            </Modal>
            {cargando && <CargandoComponente />}
        </>
    )
}

export default InternamientoBienesDirin

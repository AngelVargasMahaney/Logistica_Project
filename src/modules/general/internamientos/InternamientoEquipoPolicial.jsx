import React, { useEffect, useState } from 'react'
import { deleteDesinternarBien, getBienesInternadosEquipoPolicial, postEditarInternamientoById } from '../../../services/internamientoFormato1Service'

import Swal from 'sweetalert2'
import Modal from "react-bootstrap/Modal";
import { getReportes } from '../../../services/reportesService'
import { Link } from "react-router-dom";
import Button from '@restart/ui/esm/Button'
const InternamientoEquipoPolicial = () => {

    const [listaInternamientoFormato1, setListaInternamientoFormato1] = useState([])
    const [cargando, setCargando] = useState(true)
    const traerData = () => {
        setCargando(true)
        getBienesInternadosEquipoPolicial().then(rpta => {
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
    const tipoReporte = "equipoPolicialInternados"
    const reportes = () => {
        getReportes(tipoReporte).then(() => {

        })
    }



    const [showModalReasignar, setshowModalReasignar] = useState(false);
    const [idActualDelBien, setIdActualDelBien] = useState("")
    const handleCloseReasignar = () => setshowModalReasignar(false);

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
    //    for(let i = 0; i<listaInternamientoFormato1.length;i++){
    //        console.log(listaInternamientoFormato1[i])
    //    }

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

    const handleSubmit = e => {
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
                traerData();

            } else {
                console.log("Error en postEditarInternamiento")
            }
            setshowModalReasignar(false);
        })

    }
    return (

        <>
           
            <div className="home_content">


                <div>
                    <main className="container-fluid mt-5">

                        <div className="card">
                            <div className="card-body">
                                <Button onClick={reportes} className="btn btn-success pull-right text-white">
                                    {" "}
                                    <i className="fas fa-file-excel"></i> Generar Reporte
                                </Button>
                                <div className="d-flex justify-content-between mb-3">
                                    <h5>Bienes Internados de Equipo Policial</h5>
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
                                                                <th>Acta</th>
                                                                <th>Oficio</th>
                                                                <th>Informe Técnico</th>
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
                                                                            <td>{objLista.equipo_policial.descripcion}</td>
                                                                            {/* <td>{objLista.bien_auxiliar.marca}</td> */}
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
                                                                                    to={`/admin/equipo-policial/historial/${objLista.bien_id}`}
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
                                    </div></div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
            <Modal show={showModalReasignar} onHide={handleCloseReasignar}>
                <Modal.Header closeButton>
                    <Modal.Title>Internamiento de un bien del Formato 1</Modal.Title>
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

export default InternamientoEquipoPolicial

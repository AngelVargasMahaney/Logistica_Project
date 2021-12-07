import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import Swal from 'sweetalert2';
import { deleteHistorialById, getHistorialBienesDirin, postEditarHistorialById } from '../../../services/historialBienesService';

import { Modal } from 'react-bootstrap';
import { getPersonalActivo } from '../../../services/personalService';
import { getAreaOficinaSeccion } from '../../../services/areaOficinaSeccionService';
import { Button } from 'react-bootstrap'
import CargandoComponente from '../../layout/CargandoComponente';
import imgNoDisponible from "../../../assets/23.png"


const BienesDirinHistory = () => {
    const TITULO = "Historial de Bienes DIRIN";
    const [data, setData] = useState([])
    const [cargando, setCargando] = useState(false)
    let { internamiento, historial } = data;
    const [pdfActual, setpdfActual] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const params = useParams()
    const [formulario, setFormulario] = useState({
        personalEncargado: "",
        areaOficinaSeccion: "",
        estado_bien: "",
        observaciones: "",
    })
    const traerData = () => {
        setCargando(true)
        const idUrl = params.id;
        getHistorialBienesDirin(idUrl).then(rpta => {
            // console.log(rpta)
            setData(rpta.data);
            setCargando(false)
        })
    }
    useEffect(() => {
        traerData();
        // eslint-disable-next-line
    }, [])

    const eliminarHistorial = (idBien) => {
        Swal.fire({
            title: '¿Seguro que deseas eliminar este historial?',
            icon: 'warning',
            text: 'Los cambios serán irreversibles 😮',
            showCancelButton: true
        }).then((rpta) => {
            if (rpta.isConfirmed) {
                deleteHistorialById(idBien).then((rpta) => {
                    if (rpta.status === 200) {
                        Swal.fire({
                            icon: 'success',
                            title: 'Eliminación Correcta',
                            text: 'El historial fue eliminado de manera exitosa',
                        })
                        //Se comprueba que se eliminó correctamente
                        traerData() //Se llama otra vez para setear la variable de estado y recargar la página automáticamente al borrar un usuario
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Ocurrió un problema',
                            text: 'El historial no se pudo eliminar',
                        })
                    }
                })
            }
        })
    }
    const hideModal = () => {
        setIsOpen(false);
    };
    const showModal = (pdfActual) => {
        setpdfActual(pdfActual);
        setIsOpen(true);
    };
    const [idActualHistorialItem, setIdActualHistorialItem] = useState(null)
    const [showModalHistorial, setShowModalHistorial] = useState(false)
    const [formularioHistorial, setFormularioHistorial] = useState(({
        personal_id: "",
        area_oficina_seccion_id: "",
        estado_del_bien: "",
        observaciones: "",

    }))
    const showModalEditarHistorial = (idBien, obj) => {
        setIdActualHistorialItem(idBien);
        setFormularioHistorial({ ...obj })
        setShowModalHistorial(true);
        console.log("ENTRANDO AL LLAMADO DE DATA CON ID: " + idBien)
        // setCargando(true);
        // getHistorialFormatoById(idBien).then(rpta => {
        //   console.log("adwdwaw" + rpta)
        //   setDataHistorial(rpta.data);
        //   console.log("PRUEBAA" + rpta);
        //   setCargando(false);
        // })
    }
    const handleCloseModalHistorial = () => setShowModalHistorial(false);
    const handleChange = (e) => {
        setFormularioHistorial({
            ...formularioHistorial,
            [e.target.name]: e.target.value
        })
    }
    const token = localStorage.getItem('token')
    const config = {
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`
        }
    }
    const [acta, setActa] = useState(null)
    const [oficio, setOficio] = useState(null)
    const [informeTecnico, setInformeTecnico] = useState(null)
    const handleChangeDocsActa = e => {
        setActa(e.target.files[0])
    }
    const handleChangeDocsOficio = e => {
        setOficio(e.target.files[0])
    }
    const handleChangeDocsInformeTecnico = e => {
        setInformeTecnico(e.target.files[0])
    }
    const handleSubmit = e => {
        setCargando(true)
        e.preventDefault();
        const formData = new FormData();
        formData.append('personal_id', formularioHistorial.personal_id)
        formData.append('area_oficina_seccion_id', formularioHistorial.area_oficina_seccion_id)
        formData.append('estado_del_bien', formularioHistorial.estado_del_bien ? formularioHistorial.estado_del_bien : " ")
        formData.append('observaciones', formularioHistorial.observaciones ? formularioHistorial.observaciones: " ")
        if (acta !== null) {
            formData.append('acta', acta)
        } else {
            formData.delete('acta', acta)
        }
        if (oficio !== null) {
            formData.append('oficio', oficio)
        } else {
            formData.delete('oficio', oficio)
        }
        if (informeTecnico !== null) {
            formData.append('informe_tecnico', informeTecnico)
        } else {
            formData.delete('informe_tecnico', informeTecnico)
        }

        postEditarHistorialById(formData, config, idActualHistorialItem).then((rpta) => {
            setCargando(true)
            if (rpta.status === 200) { //Si el status es OK, entonces redirecciono a la lista de usuarios
                console.log("Datos actualizados correctamente")
                Swal.fire(
                    'Historial',
                    'Se actualizó el historial correctamente',
                    'success'
                )
                traerData()
                setCargando(false)
                setShowModalHistorial(false)
            }
        })
    }

    const [areaoficinaseccion, setAreaoficinaseccion] = useState([]);
    const [personalActivo, setPersonalActivo] = useState([]);
    const traerPersonalActivo = () => {
        setCargando(true)
        getPersonalActivo().then((rpta) => {
            //console.log(rpta);
            setPersonalActivo(rpta.data);
            setCargando(false)
        });
    };
    useEffect(() => {
        traerPersonalActivo();
    }, []);

    const traerSubunidades = () => {
        setCargando(true)
        getAreaOficinaSeccion().then((rpta) => {

            setAreaoficinaseccion(rpta.data);
            setCargando(false)
        }).catch((err) => {
            console.log("Data no cargada en traerSubunidades")
        })

    };
    useEffect(() => {
        traerSubunidades();
    }, []);

    let { personal, area_oficina_seccion } = formularioHistorial
    return (
        <>

            <div className="home_content">

                <main className="container mt-3 mb-5">

                    <div className="card">
                        <div className="card-body">

                            <div className="d-flex justify-content-between mb-3">
                                <h5>{TITULO}</h5>

                            </div>

                            <div className="row mt-2" >

                                <div className="col">
                                    <div className="">
                                        <h3>{data.denominacion}</h3>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="font-weight-bold mb-2">Ingreso del Bien</div>
                                            <div className="mt-1">código:  {data.codigo} </div>
                                            <div className="mt-1">correl: {data.correl} </div>
                                            <div className="mt-1">descripción: {data.denominacion} </div>
                                            <div className="mt-1">marca: {data.marca} </div>
                                            <div className="mt-1">color: {data.color} </div>
                                            <div className="mt-1">modelo: {data.modelo} </div>
                                            <div className="mt-1">serie: {data.serie} </div>
                                            <div className="mt-1">tipo: {data.tipo} </div>
                                            <div className="mt-1">color: {data.color} </div>
                                            <div className="mt-1">estado del bien: {data.estado_bien} </div>
                                            <div className="mt-1">observaciones: {data.observaciones} </div>
                                            <div className="mt-1">acta: {data?.acta ? (<>
                                                <div className="d-inline-block pointer" onClick={() =>
                                                    showModal(data.acta)
                                                }>
                                                    <img
                                                        className="icon-propios"
                                                        alt="some value"
                                                        title="hola"
                                                        src={data.acta_icon}

                                                    /> <span className="">{data.acta_nombre}</span>
                                                </div>  </>) : (<></>)}
                                            </div>
                                            <div className="mt-1">oficio: {data?.oficio ? (<>
                                                <div className="d-inline-block pointer" onClick={() =>
                                                    showModal(data.oficio)
                                                }>
                                                    <img
                                                        className="icon-propios"
                                                        alt="some value"
                                                        title="hola"
                                                        src={data.oficio_icon}

                                                    /> <span className="">{data.oficio_nombre}</span>
                                                </div>  </>) : (<></>)}
                                            </div>
                                            <div className="mt-1">informe técnico: {data?.informe_tecnico ? (<>
                                                <div className="d-inline-block pointer" onClick={() =>
                                                    showModal(data.informe_tecnico)
                                                }>
                                                    <img
                                                        className="icon-propios"
                                                        alt="some value"
                                                        title="hola"
                                                        src={data.informe_tecnico_icon}

                                                    /> <span className="">{data.informe_tecnico_nombre}</span>
                                                </div>  </>) : (<></>)}
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="mb-4">
                                                <img src={data.imagen_bien||imgNoDisponible} className="img-fluid img-thumbnail" alt="Imagen del Bien" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row mt-3">
                                        <div className="col-md-12">
                                            <div className="font-weight-bold mb-2">Internamiento</div>
                                            {data.is_internado ? (<>

                                                <div className="mt-1 mb-2"> El bien se encuentra <span className="badge badge-pill badge-danger">INTERNADO</span></div>

                                                <div className="border">

                                                    <div className="mt-1">Fecha: {internamiento?.fecha} </div>
                                                    <div className="mt-1">Estado del bien: {internamiento?.estado_del_bien} </div>
                                                    <div className="mt-1">Observaciones: {internamiento?.observaciones} </div>
                                                    <div className="mt-1">Acta: {internamiento?.acta ? (<>
                                                        <div className="d-inline-block pointer" onClick={() =>
                                                            showModal(internamiento.acta)
                                                        }>
                                                            <img
                                                                className="icon-propios"
                                                                alt="some value"
                                                                title="hola"
                                                                src={internamiento.acta_icon}

                                                            /> <span className="">{internamiento.acta_nombre}</span>
                                                        </div>  </>) : (<></>)}
                                                    </div>
                                                    <div className="mt-1">Oficio: {internamiento?.oficio ? (<>
                                                        <div className="d-inline-block pointer" onClick={() =>
                                                            showModal(internamiento.oficio)
                                                        }>
                                                            <img
                                                                className="icon-propios"
                                                                alt="some value"
                                                                title="hola"
                                                                src={internamiento.oficio_icon}

                                                            /> <span className="">{internamiento.oficio_nombre}</span>
                                                        </div>  </>) : (<></>)}
                                                    </div>
                                                    <div className="mt-1">Informe Técnico: {internamiento?.informe_tecnico ? (<>
                                                        <div className="d-inline-block pointer" onClick={() =>
                                                            showModal(internamiento.informe_tecnico)
                                                        }>
                                                            <img
                                                                className="icon-propios"
                                                                alt="some value"
                                                                title="hola"
                                                                src={internamiento.informe_tecnico_icon}

                                                            /> <span className="">{internamiento.informe_tecnico_nombre}</span>
                                                        </div>  </>) : (<></>)}
                                                    </div>


                                                </div>

                                            </>) : (<><div className="mt-1"> El bien se encuentra <span className="badge badge-pill badge-success">OPERATIVO</span></div></>)}

                                        </div>
                                    </div>
                                    <div className="row mt-3">
                                        <div className="col-md-12">

                                            <div className="font-weight-bold mb-2">Historial</div>
                                            {historial?.map((item, i) => {
                                                let j = historial.length;
                                                let { personal, area_oficina_seccion } = item;
                                                return (< div key={item.id}>
                                                    <div className="border mb-3">
                                                        <span className="badge badge-pill badge-secondary">{j - i}</span>
                                                        {i === 0 && data.is_internado === false ? (<><span className="badge badge-pill badge-primary ml-1">UBICACIÓN ACTUAL</span></>) : (<></>)}

                                                        <button
                                                            type="button"
                                                            className="btn pull-right mx-3 btn-outline-danger"
                                                            onClick={() => {
                                                                eliminarHistorial(item.id);
                                                            }}
                                                        >Eliminar

                                                        </button>
                                                        <button
                                                            type="button"
                                                            className="btn pull-right mx-3 btn-outline-info"
                                                            onClick={() => {
                                                                showModalEditarHistorial(item.id, item);
                                                            }}
                                                        >Editar Historial

                                                        </button>
                                                        <div className="mt-1">Fecha: {item?.fecha} </div>

                                                        <div className="mt-1">Personal encargado: {personal?.grado} {personal?.nombre} {personal?.apellido} </div>
                                                        <div className="mt-1">Subunidad: {area_oficina_seccion?.subunidad?.nombre}</div>
                                                        <div className="mt-1">Area: {area_oficina_seccion?.nombre}</div>
                                                        <div className="mt-1">Estado del bien: {item?.estado_del_bien} </div>
                                                        <div className="mt-1">Observaciones: {item?.observaciones} </div>
                                                        <div className="mt-1">Acta: {item?.acta ? (<>
                                                            <div className="d-inline-block pointer" onClick={() =>
                                                                showModal(item.acta)
                                                            }>
                                                                <img
                                                                    className="icon-propios"
                                                                    alt="some value"
                                                                    title="hola"
                                                                    src={item.acta_icon}

                                                                /> <span className="">{item.acta_nombre}</span>
                                                            </div>  </>) : (<></>)}
                                                        </div>

                                                        <div className="mt-1">Oficio: {item?.oficio ? (<>
                                                            <div className="d-inline-block pointer" onClick={() =>
                                                                showModal(item.oficio)
                                                            }>
                                                                <img
                                                                    className="icon-propios"
                                                                    alt="some value"
                                                                    title="hola"
                                                                    src={item.oficio_icon}

                                                                /> <span className="">{item.oficio_nombre}</span>
                                                            </div>  </>) : (<></>)}
                                                        </div>
                                                        <div className="mt-1">Informe Técnico: {item?.informe_tecnico ? (<>
                                                            <div className="d-inline-block pointer" onClick={() =>
                                                                showModal(item.informe_tecnico)
                                                            }>
                                                                <img
                                                                    className="icon-propios"
                                                                    alt="some value"
                                                                    title="hola"
                                                                    src={item.informe_tecnico_icon}

                                                                /> <span className="">{item.informe_tecnico_nombre}</span>
                                                            </div>  </>) : (<></>)}
                                                        </div>

                                                    </div></div>)
                                            })}
                                            {historial?.length === 0 ? (<>El historial esta vacio, el bien no ha rotado</>) : (<></>)}
                                        </div>
                                    </div>
                                </div></div>
                        </div>
                    </div>
                </main>
            </div>
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

            <Modal show={showModalHistorial} onHide={handleCloseModalHistorial}>
                <Modal.Header closeButton>
                    <Modal.Title>Edición de un historial</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleSubmit}>
                        {/* <div className="form-group">
                            <label htmlFor="">Fecha:</label>
                            <input type="date" className="form-control"
                                value={fecha} name="fecha" onChange={handleChange} />
                        </div> */}
                        <div className="form-group">
                            <label htmlFor="">Nueva persona encargada</label>
                            <select defaultValue="DEFAULT" onChange={handleChange} name="personal_id" required className="form-select custom-select mr-sm-2">
                                <option value="DEFAULT" disabled>{personal?.grado + " |-> " + personal?.apellido + " " + personal?.nombre}</option>

                                {personalActivo.map((objPersonal, i) => {
                                    return (
                                        <option key={objPersonal.id} value={objPersonal.id} >{objPersonal.grado + " |-> " + objPersonal.apellido + " " + objPersonal.nombre} {formulario.personalEncargado = objPersonal.apellido}</option>
                                    );
                                })}
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="">Area Oficina Sección</label>
                            <select defaultValue="DEFAULT" onChange={handleChange} name="area_oficina_seccion_id" required className="form-select custom-select mr-sm-2">

                                <option value="DEFAULT" disabled>{area_oficina_seccion?.nombre + " |-> " + area_oficina_seccion?.subunidad?.nombre}</option>
                                {areaoficinaseccion.map((objTipoFormato, i) => {
                                    let { subunidad } = objTipoFormato
                                    return (
                                        <option key={objTipoFormato.id} value={objTipoFormato.id}>{objTipoFormato.nombre + " |-> " + subunidad.nombre}</option>

                                    );
                                })}

                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="">Estado del bien: </label>
                            <input type="text" className="form-control"
                                value={formularioHistorial.estado_del_bien}
                                name="estado_del_bien" onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="">Observaciones: </label>
                            <input type="text" className="form-control"
                                value={formularioHistorial.observaciones}
                                name="observaciones" onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="">Acta</label>
                            <input type="file" className="form-control"
                                name="acta" onChange={handleChangeDocsActa} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="">Oficio:</label>
                            <input type="file" className="form-control"
                                name="oficio" onChange={handleChangeDocsOficio} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="">Informe Técnico:</label>
                            <input type="file" className="form-control"
                                name="informe_tecnico" onChange={handleChangeDocsInformeTecnico} />
                        </div>

                        {/* <div className="form-group">
                            <label htmlFor="">SubUnidad:</label>
                            <input type="text" className="form-control"
                                value={sub_unidad} name="estado_del_bien" onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="">Area:</label>
                            <input type="text" className="form-control"
                                value={area} name="estado_del_bien" onChange={handleChange} />
                        </div>

                        <div className="form-group">
                            <label htmlFor="">Estado del Bien:</label>
                            <input type="text" className="form-control"
                                value={estado_del_bien} name="estado_del_bien" onChange={handleChange} />
                        </div>

                        <div className="form-group">
                            <label htmlFor="">Observaciones:</label>
                            <input type="text" className="form-control"
                                value={observaciones} name="observaciones" onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="">Documento-Acta entrega y recepción:</label>
                            <input type="file" className="form-control"
                                name="documento_acta_entrega_recepcion" onChange={handleDocumentRecepcion} />
                        </div>
                        <div className="form-group" hidden>
                            <label htmlFor="">Id del Bien:</label>
                            <input type="text" className="form-control"
                                value={idActualDelBien} name="bien_id" onChange={handleChange} />
                        </div> */}
                        {/* <div className="form-group">
                        <label htmlFor="">Tipo bien</label>
                        <input type="text" className="form-control"
                          value={tipo_bien} name="tipo_bien" onChange={handleChange} />
                      </div> */}


                        {!cargando && <button className="btn btn-primary" type="submit">Actualizar <i className="ml-2 fa fa-check"></i></button>
                        }
                        {cargando && <button className="btn btn-primary" type="submit" disabled={cargando}>
                            <span className="mx-1"><i className="fa fa-floppy-o" aria-hidden="true"></i></span>  Esperando respuesta del Servidor
                        </button>}

                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModalHistorial}>
                        Cerrar
                    </Button>

                </Modal.Footer>
            </Modal>
            {cargando && <CargandoComponente />}
        </>
    )
}

export default BienesDirinHistory

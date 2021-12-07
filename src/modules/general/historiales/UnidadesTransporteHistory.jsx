import React, { useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap';
import { useParams } from 'react-router';
import Swal from 'sweetalert2';
import { deleteHistorialById, getHistorialUnidadTransporte, postEditarHistorialById } from '../../../services/historialBienesService';
import imgNoDisponible from "../../../assets/23.png"

import { Button } from 'react-bootstrap'
import { getPersonalActivo } from '../../../services/personalService';
import { getAreaOficinaSeccion } from '../../../services/areaOficinaSeccionService';

const UnidadesTransporteHistory = () => {
    const TITULO = "Historial de Unidades de Transporte";
    const [data, setData] = useState([])
    const [cargando, setCargando] = useState(true)
    let { internamiento, historial } = data;
    const [pdfActual, setpdfActual] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [masDataOpen, setMasDataOpen] = useState(false);
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
        getHistorialUnidadTransporte(idUrl).then(rpta => {
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
    const hideMasDataOpen = () => {
        setMasDataOpen(false);
    }
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
        formData.append('personal_id', formularioHistorial.personal_id)
        formData.append('area_oficina_seccion_id', formularioHistorial.area_oficina_seccion_id)
        formData.append('estado_del_bien', formularioHistorial.estado_del_bien)
        formData.append('observaciones', formularioHistorial.observaciones)
        if (documentoActa !== null) {
            formData.append('acta', documentoActa)
        } else {
            formData.delete('acta', documentoActa)
        }
        if (documentoOficio !== null) {
            formData.append('oficio', documentoOficio)
        } else {
            formData.delete('oficio', documentoOficio)
        }
        if (documentoInformeTecnico !== null) {
            formData.append('informe_tecnico', documentoInformeTecnico)
        } else {
            formData.delete('informe_tecnico', documentoInformeTecnico)
        }

        postEditarHistorialById(formData, config, idActualHistorialItem).then((rpta) => {
            if (rpta.status === 200) { //Si el status es OK, entonces redirecciono a la lista de usuarios
                console.log("Datos actualizados correctamente")
                Swal.fire(
                    'Historial',
                    'Se actualizó el historial correctamente',
                    'success'
                )
                traerData()
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
                                    {cargando ?
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

                                        : (
                                            <>
                                                <div className="">
                                                    <h3>{data.descripcion}</h3>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <div className="row">
                                                            <div className="col-12">
                                                                <div className="font-weight-bold mb-2">Ingreso del Bien</div>
                                                                <div className="mt-1">código: {data.codigo} </div>
                                                                <div className="mt-1">placa interna: {data.placa_interna} </div>
                                                                <div className="mt-1">placa de rodaje: {data.placa_de_rodaje} </div>
                                                                <div className="mt-1">tipo de vehículo: {data.tipo_de_vehiculo}  </div>
                                                                <div className="mt-1">marca: {data.marca} </div>
                                                                <div className="mt-1">modelo: {data.modelo} </div>
                                                                <div className="mt-1">año de fabricación: {data.anio_de_fabricacion} </div>
                                                                <div className="mt-1">combustible: {data.combustible} </div>
                                                                <div className="mt-1">número de chasis: {data.nro_de_chasis} </div>
                                                                <div className="mt-1">número de motor: {data.nro_de_motor} </div>


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
                                                                <Button

                                                                    onClick={() => {

                                                                        setMasDataOpen(true);
                                                                    }}
                                                                    className="btn btn-info mx-1 my-2"
                                                                    title="Ver más"
                                                                > Ver más Información
                                                                    {" "}
                                                                    <i className="fas fa-clipboard-list"></i>
                                                                </Button>
                                                            </div>

                                                        </div>
                                                    </div>


                                                    <div className="col-md-6">
                                                        <div className="mb-4">
                                                            <img src={data.imagen_bien || imgNoDisponible} className="img-fluid img-thumbnail" alt="Imagen del Bien" />
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
                                            </>
                                        )}

                                </div></div>
                        </div>
                    </div>
                </main>
            </div>
            <Modal show={masDataOpen} onHide={hideMasDataOpen} size="lg" aria-labelledby="contained-modal-title-vcenter"
                centered>
                <div>
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Datos Adicionales
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        {/* <div className="row">
                            <div className="col-md-4">
                                <div className="mt-1">vigencia soat: {data.soat_vigencia} </div>
                                <div className="mt-1">seguro particular: {data.seguro_particular} </div>
                                <div className="mt-1">llanta de repuesto: {data.llanta_repuesto} </div>
                                <div className="mt-1">llave de ruedas: {data.llave_ruedas} </div>
                                <div className="mt-1">gata: {data.gata} </div>
                                <div className="mt-1">tablet: {data.tablet} </div>
                                <div className="mt-1">cámaras: {data.camaras} </div>
                                <div className="mt-1">ubicación: {data.ubicacion} </div>
                                <div className="mt-1">valor de adquisición: {data.valor_adquisicion} </div>
                                <div className="mt-1">estado del vehículo: {data.estado_vehiculo} </div>
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
                            <div className="col-md-8">
                                <div className="mb-4">
                                    <img src={data.imagen_bien} className="rounded mx-auto d-block" alt="Imagen del Bien" />
                                </div>
                            </div>
                        </div> */}
                        <div class="contact3">
                            <div class="row no-gutters">
                                <div class="container">
                                    <div class="row">

                                        <div class="col-lg-6">
                                            <div class="contact-box ml-3">

                                                <form class="mt-1">
                                                    <div class="row">
                                                        <div class="col-lg-12">
                                                            <div class="form-group mt-2">
                                                                vigencia soat: {data.soat_vigencia}
                                                            </div>
                                                            <div class="form-group mt-2">
                                                                seguro particular: {data.seguro_particular}
                                                            </div>
                                                            <div class="form-group mt-2">
                                                                llanta de repuesto: {data.llanta_repuesto}
                                                            </div>
                                                            <div class="form-group mt-2">
                                                                llave de ruedas: {data.llave_ruedas}
                                                            </div>
                                                            <div class="form-group mt-2">
                                                                gata: {data.gata}
                                                            </div>
                                                            <div class="form-group mt-2">
                                                                tablet: {data.tablet}
                                                            </div>
                                                            <div class="form-group mt-2">
                                                                n° de cilindros: {data.nro_de_cilindros}
                                                            </div>

                                                            <div class="form-group mt-2">
                                                                ubicación: {data.ubicacion}
                                                            </div>
                                                            <div class="form-group mt-2">
                                                                cámaras: {data.camaras}
                                                            </div>
                                                            <div class="form-group mt-2">
                                                                procedencia: {data.procedencia}
                                                            </div>

                                                        </div>

                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                        <div class="col-lg-6">
                                            <div class="card-shadow">
                                                <img src={data.imagen_bien} className="img-fluid img-thumbnail" alt="Imagen del Bien" />
                                            </div>
                                            <div class="row">
                                                <div class="col-lg-12">

                                                    <div class="form-group mt-2">
                                                        valor de adquisición: {data.valor_adquisicion}
                                                    </div>
                                                    <div class="form-group mt-2">
                                                        estado del vehículo: {data.estado_vehiculo}
                                                    </div>
                                                    <div class="form-group mt-2">
                                                        observaciones: {data.observaciones}
                                                    </div>
                                                    <div class="form-group mt-2">
                                                        tracción: {data.traccion}
                                                    </div>
                                                    <div class="form-group mt-2">
                                                        vigencia soat: {data.soat_vigencia}
                                                    </div>


                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </Modal.Body>
                    <Modal.Footer>
                        <button onClick={hideMasDataOpen}>Cancel</button>
                    </Modal.Footer>
                </div>
            </Modal>

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
                            <label htmlFor="">Documento: Acta </label>
                            <input type="file" className="form-control"
                                name="acta" onChange={handleDocumentoActa} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="">Documento: Oficio </label>
                            <input type="file" className="form-control"
                                name="oficio" onChange={handleDocumentoOficio} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="">Documento: Informe técnico </label>
                            <input type="file" className="form-control"
                                name="informe_tecnico" onChange={handleDocumentoInformeTecnico} />
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

                        <div className="form-group">
                            <button className="btn btn-primary" type="submit">Actualizar <i className="ml-2 fa fa-check"></i></button>
                        </div>


                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModalHistorial}>
                        Cerrar
                    </Button>

                </Modal.Footer>
            </Modal>
        </>
    )
}

export default UnidadesTransporteHistory

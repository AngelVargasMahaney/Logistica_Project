import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { deleteUnidadesTransporteById, getUnidadesTransporte } from '../../../services/unidadesTransporteService'

import VisualizadorImagenes from '../../modales/VisualizadorImagenes'
import imgNoDisponible from "../../../assets/23.png"
import Swal from 'sweetalert2'
import { Modal } from 'react-bootstrap'
import { getAreaOficinaSeccion } from '../../../services/areaOficinaSeccionService'
import { getPersonalActivo } from '../../../services/personalService'
import { Button } from 'react-bootstrap'
import { getHistorialUnidadTransporte } from '../../../services/historialBienesService'
import { postInternarBienFormato1, postReasignarBienFormato1 } from '../../../services/internamientoFormato1Service'
import { getReportes } from '../../../services/reportesService'
import CargandoComponente from '../../layout/CargandoComponente'
import MaterialTable from 'material-table'
import { Avatar, IconButton } from '@material-ui/core'

const UnidadesTransporteListPage = () => {

    const [cargando, setCargando] = useState(false)
    const [unidadesTransporte, setUnidadesTransporte] = useState([])

    // TRAYENDO LAS UNIDADES DE TRANSPORTE (LSITADO)
    const traerUnidadesTransporte = () => {
        setCargando(true)
        getUnidadesTransporte().then(rpta => {
            setUnidadesTransporte(rpta.data)
            setCargando(false)
        })
    }
    console.log(unidadesTransporte)

    // CERRANDO EL METODO DE LISTADO
    useEffect(() => {
        traerUnidadesTransporte()
    }, [])
    const eliminarUnidadTransporteById = id => {
        Swal.fire({
            title: "¿Seguro que deseas eliminar la unidad ?",
            icon: "warning",
            text: "Los cambios serán irreversibles 😮",
            showCancelButton: true,
        }).then((rpta) => {
            if (rpta.isConfirmed) {
                deleteUnidadesTransporteById(id).then((rpta) => {
                    if (rpta.status === 200) {
                        console.log("BORRADO")
                        traerUnidadesTransporte();
                    }
                });
            }
        });
    };

    // Documentos
    const [pdfActual, setpdfActual] = useState("");
    const hideModal = () => { setIsOpen(false); };
    const [isOpen, setIsOpen] = useState(false);
    const showModal = (pdfActual) => {
        setpdfActual(pdfActual);
        setIsOpen(true);
    };
    // fin documentos
    const handleCloseInternar = () => setshowModalInternar(false);
    const [idActualDelBien, setIdActualDelBien] = useState("")
    const [modalImagenes, setmodalImagenes] = useState(false)
    const [imagenBien, setImagenBien] = useState("")
    const [imagenDescripcion, setImagenDescripcion] = useState("")
    const [showModalReasignar, setshowModalReasignar] = useState(false);
    const [showModalInternar, setshowModalInternar] = useState(false);
    const activarModalVIsualizardorImagen = (imagen, imagenDescripcion) => {
        setImagenDescripcion(imagenDescripcion)
        setImagenBien(imagen)
        setmodalImagenes(true)
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
    const showModalReasignarBien = (idBien) => {
        setIdActualDelBien(idBien);

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
    const showModalInternarBien = (idBien) => {
        setIdActualDelBien(idBien);

        setshowModalInternar(true);
        console.log("Internar:ENTRANDO AL LLAMADO DE DATA CON ID: " + idBien)
        // setCargando(true);
        // getHistorialFormatoById(idBien).then(rpta => {
        //   console.log("adwdwaw" + rpta)
        //   setDataHistorial(rpta.data);
        //   console.log("PRUEBAA" + rpta);
        //   setCargando(false);

        // })
    }
    const [formulario, setFormulario] = useState({
        estado_del_bien: "",
        fecha: "",
        observaciones: "",
        documento_alta: "",
        // bien_id: "",
        tipo_bien: 4,
        area_oficina_seccion_id: "",
        personal_id: ""
    })
    const handleChange = (e) => {
        setFormulario({
            ...formulario,
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
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('estado_del_bien', formulario.estado_del_bien)
        formData.append('fecha', formulario.fecha)
        formData.append('observaciones', formulario.observaciones)
        // formData.append('documento_acta_entrega_recepcion', documentoRecepcion)
        // formData.append('documento_oficio_regularizacion', documentoRegularizacion)
        formData.append('bien_id', idActualDelBien)
        formData.append('tipo_bien', formulario.tipo_bien)


        if (documentoActa != null) {
            formData.append('documento_acta_entrega_recepcion', documentoActa)
        } else {
            formData.delete('documento_acta_entrega_recepcion', documentoActa)
        }
        if (documentoOficio != null) {
            formData.append('documento_oficio_regularizacion', documentoOficio)
        } else {
            formData.delete('documento_oficio_regularizacion', documentoOficio)
        }
        if (documentoInformeTecnico != null) {
            formData.append('informe_tecnico', documentoInformeTecnico)
        } else {
            formData.delete('informe_tecnico', documentoInformeTecnico)
        }
        postInternarBienFormato1(formData, config).then((rpta) => {
            if (rpta.status === 200) { //Si el status es OK, entonces redirecciono a la lista de usuarios
                console.log("Datos subida correctamente")
                setshowModalInternar(false)
                Swal.fire(
                    'Internamiento Exitoso',
                    'El internamiento fue exitoso',
                    'success'
                )
                traerUnidadesTransporte()
            }
            console.log(rpta)
        }).catch((err) => {
            Swal.fire(
                'Internamiento Fallido',
                'No se puede internar un bien dos veces',
                'error'
            )
        })
    }


    const handleCloseReasignar = () => setshowModalReasignar(false);
    const [dataHistorial, setDataHistorial] = useState([])
    let { historial } = dataHistorial;
    const handleSubmitReasignacion = e => {

        e.preventDefault();
        const formDataReasignacion = new FormData();
        formDataReasignacion.append('estado_del_bien', formulario.estado_del_bien)
        formDataReasignacion.append('fecha', formulario.fecha)
        formDataReasignacion.append('observaciones', formulario.observaciones)
        if (documentoActa != null) {
            formDataReasignacion.append('documento_acta_entrega_recepcion', documentoActa)
        } else {
            formDataReasignacion.delete('documento_acta_entrega_recepcion', documentoActa)
        }
        if (documentoOficio != null) {
            formDataReasignacion.append('documento_memorandum', documentoOficio)
        } else {
            formDataReasignacion.delete('documento_memorandum', documentoOficio)
        }
        if (documentoInformeTecnico != null) {
            formDataReasignacion.append('informe_tecnico', documentoInformeTecnico)
        } else {
            formDataReasignacion.delete('informe_tecnico', documentoInformeTecnico)
        }
        formDataReasignacion.append('bien_id', idActualDelBien)
        formDataReasignacion.append('tipo_bien', formulario.tipo_bien)
        formDataReasignacion.append('area_oficina_seccion_id', formulario.area_oficina_seccion_id)
        formDataReasignacion.append('personal_id', formulario.personal_id)

        postReasignarBienFormato1(formDataReasignacion, config).then((rpta) => {
            setCargando(true)
            if (rpta.status === 200) { //Si el status es OK, entonces redirecciono a la lista de usuarios
                console.log("Datos subida correctamente")

                setshowModalReasignar(false)
                setCargando(false)
                Swal.fire({
                    title: 'Reasignación Exitosa',
                    text: 'La reasignación fue exitosa',
                    icon: 'success',

                    confirmButtonColor: '#3085d6',

                    confirmButtonText: 'Continuar'
                }).then((result) => {
                    if (result.isConfirmed) {
                        traerUnidadesTransporte()

                    }
                })
            }
            console.log(rpta)
        }).catch((err) => {
            Swal.fire(
                'Reasignaciòn Fallida',
                'No se puede internar un bien dos veces',
                'error'
            )
        })

    }
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
    //Aqui los metodos para traer las subunidades
    const [areaoficinaseccion, setAreaoficinaseccion] = useState([]);
    const traerAreaOficina = () => {
        setCargando(true)
        getAreaOficinaSeccion().then((rpta) => {

            setAreaoficinaseccion(rpta.data);
            setCargando(false)
        }).catch((err) => {
            console.log("Data no cargada en traerSubunidades")
        })

    }

    useEffect(() => {
        traerAreaOficina();
    }, []);


    const traerHistorialById = () => {

        if (idActualDelBien === "") {
            setCargando(true);
        } else {
            getHistorialUnidadTransporte(idActualDelBien).then(rpta => {
                //console.log("adwdwaw" + rpta.data)
                setDataHistorial(rpta.data);
                //console.log("PRUEBAA" + rpta);
                setCargando(false);

            }).catch((err) => {
                console.log("Data no cargada en getHistorialFOrmatoByID")
            })
        }
    }
    console.log(dataHistorial)
    useEffect(() => {
        traerHistorialById()
        // eslint-disable-next-line
        // }, [idActualDelBien, historial, dataHistorial])
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [idActualDelBien, showModalReasignar, showModalInternar])

    const tipoReporte = "unidadesTransporte"
    const reportes = () => {
        getReportes(tipoReporte).then(() => {

        })
    }
    const [modalObseraciones, setModalObseraciones] = useState(false)
    const [observacionesVer, setObservacionesVer] = useState("")
    const showModalObservaciones = (objObservaciones) => {
        setObservacionesVer(objObservaciones);

        setModalObseraciones(true);
        console.log("ENTRANDO AL LLAMADO DE DATA de : " + objObservaciones)
        // setCargando(true);
        // getHistorialFormatoById(idBien).then(rpta => {
        //   console.log("adwdwaw" + rpta)
        //   setDataHistorial(rpta.data);
        //   console.log("PRUEBAA" + rpta);
        //   setCargando(false);

        // })
    }
    const history = useHistory()

    const columns = [
        { title: 'Id', field: 'id', align: 'left' },
        { title: 'Placa Interna', field: 'placa_interna', align: 'left' },
        { title: 'Placa Rodaje', field: 'placa_de_rodaje', align: 'left' },
        { title: 'Tipo de Vehículo', field: 'tipo_de_vehiculo', align: 'left' },
        { title: 'Combustible', field: 'combustible', align: 'left' },
        {
            title: 'Imagen', align: 'left', field: 'imagen_bien', render:
                obj =>
                    <>
                        <IconButton>
                            <Avatar
                                variant="rounded"
                                src={obj.imagen_bien || imgNoDisponible}
                                style={{ height: '50px', width: '50px', margin: '-5px' }}
                                alt="some value"
                                title={obj.descripcion}
                                onClick={() => activarModalVIsualizardorImagen(obj.imagen_bien || imgNoDisponible, obj.descripcion + " ")}
                            />
                        </IconButton>
                    </>
        },
        {
            title: 'Código Qr', align: 'left', field: 'codigo_qr', render:
                obj =>
                    <>
                        <IconButton>
                            <Avatar
                                variant="rounded"
                                src={obj.codigo_qr || imgNoDisponible}
                                style={{ height: '50px', width: '50px', margin: '-5px' }}
                                alt="some value"
                                title={obj.descripcion}
                                onClick={() => activarModalVIsualizardorImagen(obj.codigo_qr || imgNoDisponible, obj.descripcion + " ")}
                            />
                        </IconButton>
                    </>
        },
        {
            title: 'Acta', align: 'left', field: 'acta', render:
                obj =>
                    <>
                        {
                            obj.acta_icon ? (<img
                                className="tamaño-icono-pdf"
                                alt="some value"
                                title={obj.acta_nombre}
                                src={obj.acta_icon}
                                onClick={() =>
                                    showModal(obj.acta)
                                }
                            />) : " "
                        }
                    </>
        },
        {
            title: 'Oficio', align: 'left', field: 'oficio', render:
                obj =>
                    <>
                        {
                            obj.oficio_icon ? (<img
                                className="tamaño-icono-pdf"
                                alt="some value"
                                title={obj.oficio_nombre}
                                src={obj.oficio_icon}
                                onClick={() =>
                                    showModal(obj.oficio)
                                }
                            />) : " "
                        }
                    </>
        },
        {
            title: 'Informe Técnico', align: 'left', field: 'informe_tecnico', render:
                obj =>
                    <>
                        {
                            obj.informe_tecnico_icon ? (<img
                                className="tamaño-icono-pdf"
                                alt="some value"
                                title={obj.informe_tecnico_nombre}
                                src={obj.informe_tecnico_icon}
                                onClick={() =>
                                    showModal(obj.informe_tecnico)
                                }
                            />) : " "
                        }
                    </>
        },
        { title: 'Estado del Vehículo', field: 'estado_vehiculo', align: 'left' },

        {
            title: 'Observaciones', align: 'left', field: 'observaciones', render: obj =>
                <>
                    <p title="Haga click en el texto para ver más detalles" onClick={() => showModalObservaciones(obj.observaciones)}>{(obj.observaciones)?.slice(0, 25).concat(" ...")}</p>
                </>,
            cellStyle: {
                cellWidth: '5%'
            },


        },


    ]

    return (
        <>

            <div className="home_content">
                <main className="container-fluid mt-5">

                    <div className="card">
                        <div className="card-body bg-light">
                            <h4 className="text-center letra__titulo">ACCIONES GENERALES</h4>
                            <div className="row text-center border-bottom-0 my-3 rounded">
                                <div className="col-md-4">
                                    <Link to="/admin/bienes-internados/unidades-transporte" className="btn btn-warning">
                                        {" "}
                                        <i className="fa fa-list"></i> Lista de Bienes Internados
                                    </Link>
                                </div>
                                <div className="col-md-4">
                                    <Button onClick={reportes} className="btn btn-success">
                                        {" "}
                                        <i className="fas fa-file-excel"></i> Generar Reporte
                                    </Button>
                                </div>
                                <div className="col-md-4">
                                    <Link to={"/admin/unidades-transporte/crear"} className="btn btn-primary ">
                                        {" "}
                                        <i className="fa fa-plus"></i> Crear un Bien
                                    </Link>
                                </div>
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
                                            (
                                                <div style={{}}>
                                                    <MaterialTable
                                                        title={"Lista de Unidades de Transporte"}

                                                        columns={columns}
                                                        data={unidadesTransporte}
                                                        actions={[
                                                            {
                                                                icon: () =>


                                                                    <i className="fas fa-trash" style={{ fontSize: '15px', color: "white", background: "#EC2300", padding: "5px", margin: "-5px", borderRadius: "5px" }} />,

                                                                tooltip: "Eliminar Bien",
                                                                onClick: (e, obj) => eliminarUnidadTransporteById(obj.id)
                                                            },
                                                            {
                                                                icon: () =>

                                                                    <i className="fa fa-pencil" style={{ fontSize: '15px', color: "black", background: "#ffd500", padding: "5px", margin: "-5px", borderRadius: "5px" }} />

                                                                ,
                                                                tooltip: "Editar Bien",
                                                                onClick: (e, obj) => history.push(`/admin/unidades-transporte/editar/${obj.id}`)
                                                            },
                                                            {
                                                                icon: () =>


                                                                    <i className="fas fa-clipboard-check" style={{ fontSize: '15px', color: "white", background: "#73a6e0", padding: "5px", margin: "-5px", borderRadius: "5px" }} />

                                                                ,
                                                                tooltip: "Reasignar un Bien",
                                                                onClick: (e, obj) => showModalReasignarBien(obj.id)
                                                            },
                                                            {
                                                                icon: () =>


                                                                    <i className="fas fa-angle-double-down" style={{ fontSize: '15px', color: "white", background: "#73a6e0", padding: "5px", margin: "-5px", borderRadius: "5px" }} />

                                                                ,
                                                                tooltip: "Internar Bien",
                                                                onClick: (e, obj) => showModalInternarBien(obj.id)
                                                            },
                                                            {
                                                                icon: () =>


                                                                    <i className="fa fa-history" style={{ fontSize: '15px', color: "white", background: "#73a6e0", padding: "5px", margin: "-5px", borderRadius: "5px" }} />

                                                                ,
                                                                tooltip: "Historial de un Bien",
                                                                onClick: (e, obj) => history.push(`/admin/unidades-transporte/historial/${obj.id}`)
                                                            },
                                                        ]}
                                                        options={

                                                            {
                                                                tableLayout: 'auto',

                                                                actionsColumnIndex: -1,
                                                                rowStyle: {
                                                                    fontSize: 12,
                                                                },
                                                                headerStyle: {
                                                                    fontSize: 12
                                                                }
                                                            }}
                                                        localization={
                                                            {
                                                                pagination: {
                                                                    labelRowsSelect: "filas",
                                                                },
                                                                header: {
                                                                    actions: "Acciones"
                                                                },
                                                                toolbar: {
                                                                    searchPlaceholder: "Buscar"

                                                                }
                                                            }}
                                                    />
                                                </div>
                                            )
                                    }
                                </div>

                            </div>
                        </div>

                    </div>
                </main>
                <VisualizadorImagenes visible={modalImagenes} onClose={() => setmodalImagenes(false)} imagen={imagenBien} imagenDescripcion={imagenDescripcion} />
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

                {/* Modal Internar una Unidad de Transporte */}
                <Modal show={showModalInternar} onHide={handleCloseInternar}>
                    <Modal.Header closeButton>
                        <Modal.Title>Internamiento de una Unidad de Transporte</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="">Estado del Vehículo:</label>
                                <input type="text" className="form-control"
                                    name="estado_del_bien" required onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="">Fecha:</label>
                                <input type="date" className="form-control"
                                    name="fecha" required onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="">Observaciones:</label>
                                <input type="text" className="form-control"
                                    name="observaciones" onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="">Documento: Acta</label>
                                <input type="file" className="form-control"
                                    name="documento_acta_entrega_recepcion" onChange={handleDocumentoActa} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="">Documento: Oficio</label>
                                <input type="file" className="form-control"
                                    name="documento_oficio_regularizacion" onChange={handleDocumentoOficio} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="">Documento: Informe Técnico</label>
                                <input type="file" className="form-control"
                                    name="informe_tecnico" onChange={handleDocumentoInformeTecnico} />
                            </div>

                            <div className="form-group" hidden>
                                <label htmlFor="">Id del Bien:</label>
                                <input type="text" className="form-control"
                                    value={idActualDelBien} name="bien_id" onChange={handleChange} />
                            </div>
                            {/* <div className="form-group">
                        <label htmlFor="">Tipo bien</label>
                        <input type="text" className="form-control"
                          value={tipo_bien} name="tipo_bien" onChange={handleChange} />
                      </div> */}

                            <div className="form-group">
                                <button className="btn btn-primary" type="submit">Internar<i className="ml-2 fa fa-check"></i></button>
                            </div>


                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseInternar}>
                            Cerrar
                        </Button>

                    </Modal.Footer>
                </Modal>

                {/* Modal de Reasignación */}

                <Modal show={showModalReasignar} onHide={handleCloseReasignar} size="lg" aria-labelledby="contained-modal-title-vcenter"
                    centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Reasignación de una Unidad de Transporte</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        {/* Header del Modal - Información del bien */}

                        <div className="container">
                            <div className="row">
                                <div className="col">
                                    {/* <p>Código: <span>${idActualDelBien}</span></p> */}
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

                                        :
                                        (
                                            <>
                                                <h3>Datos Actuales del Bien</h3>
                                                <p>Código: {dataHistorial.codigo}</p>
                                                <p>Tipo de Vehículo: {dataHistorial.tipo_de_vehiculo}</p>
                                                <p>Placa: {dataHistorial.placa_interna}</p>
                                            </>
                                        )}


                                </div>
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
                                        :
                                        (
                                            <>
                                                {
                                                    historial?.map((item, i) => {
                                                        const lastItem = historial.length
                                                        console.log(lastItem + " <<dfawdf")
                                                        if (i === 0) {
                                                            return (
                                                                <>
                                                                    <div key={item.id}>
                                                                        <h3>Ubicación Actual</h3>
                                                                        <p>Subunidad: {item.area_oficina_seccion?.subunidad?.nombre} </p>
                                                                        <p>Area: {item.area_oficina_seccion?.nombre}</p>
                                                                        <p>Persona Encargada: {item.personal?.grado + " " + item.personal?.apellido + " " + item.personal?.nombre}</p>
                                                                    </div>
                                                                </>
                                                            )
                                                        } else {
                                                            // not last one
                                                        }
                                                        return null
                                                    })
                                                }

                                            </>
                                        )}
                                </div>
                            </div>
                        </div>
                        {/* FIN DEL Header del Modal - Información del bien */}




                        <form onSubmit={handleSubmitReasignacion}>

                            <div className="form-group">
                                <label htmlFor="">Nueva persona encargada</label>
                                <select onChange={handleChange} name="personal_id" required className="form-select custom-select mr-sm-2">
                                    <option value="" >--- Elegir Personal---</option>

                                    {personalActivo.map((objPersonal, i) => {
                                        return (

                                            <option key={objPersonal.id} value={objPersonal.id} >{objPersonal.grado + " |-> " + objPersonal.apellido + " " + objPersonal.nombre}</option>

                                        );
                                    })}
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="">Area Oficina Sección</label>
                                <select onChange={handleChange} name="area_oficina_seccion_id" required className="form-select custom-select mr-sm-2">
                                    <option value="">--- Elegir Subunidad---</option>
                                    {areaoficinaseccion.map((objTipoFormato, i) => {
                                        let { subunidad } = objTipoFormato
                                        return (
                                            <option key={objTipoFormato.id} value={objTipoFormato.id}>{objTipoFormato.nombre + " |-> " + subunidad.nombre}</option>

                                        );
                                    })}

                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="">Estado del Bien: </label>
                                <input type="text" className="form-control"
                                    name="estado_del_bien" required onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="">Observaciones: </label>
                                <textarea className="form-control" rows={4} cols={50}
                                    name="observaciones" onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="">Fecha: </label>
                                <input type="date" className="form-control"
                                    name="fecha" required onChange={handleChange} />
                            </div>

                            <div className="form-group">
                                <label htmlFor="">Documento: Acta </label>
                                <input type="file" className="form-control"
                                    name="documento_acta_entrega_recepcion" onChange={handleDocumentoActa} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="">Documento: Oficio </label>
                                <input type="file" className="form-control"
                                    name="documento_memorandum" onChange={handleDocumentoOficio} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="">Documento: Informe Técnico</label>
                                <input type="file" className="form-control"
                                    name="informe_tecnico" onChange={handleDocumentoInformeTecnico} />
                            </div>

                            <div className="form-group" hidden>
                                <label htmlFor="">Id del Bien: </label>
                                <input type="text" className="form-control"
                                    value={idActualDelBien} name="bien_id" onChange={handleChange} readOnly />
                            </div>


                            {/* <div className="form-group">
                        <label htmlFor="">Tipo bien</label>
                        <input type="text" className="form-control"
                          value={tipo_bien} name="tipo_bien" onChange={handleChange} />
                      </div> */}


                            {!cargando && <button className="btn btn-primary" type="submit">Reasignar Bien
                                <i className="ml-2 fa fa-check"></i></button>
                            }
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


                <Modal
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    show={modalObseraciones}
                    onHide={() => setModalObseraciones(false)}
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Observaciones
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{ wordWrap: 'break-word' }}>
                        {observacionesVer}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={() => setModalObseraciones(false)}>Close</Button>
                    </Modal.Footer>
                </Modal>


            </div>
            {cargando && <CargandoComponente />}
        </>
    )
}

export default UnidadesTransporteListPage

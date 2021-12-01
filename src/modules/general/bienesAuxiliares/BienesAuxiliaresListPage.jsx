import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import Swal from 'sweetalert2'
import { deleteBienAuxiliarById, getBienAuxiliar, postReasignarBienAuxiliar } from '../../../services/bienesAuxiliaresService'
import imgNoDisponible from "../../../assets/23.png"
import Modal from "react-bootstrap/Modal";
import { Button } from "react-bootstrap";

import { postInternarBienAuxliar } from '../../../services/internamientoFormato1Service'
import { getAreaOficinaSeccion } from "../../../services/areaOficinaSeccionService";
import { getHistorialBienAuxiliarById } from '../../../services/historialBienesService'
import { getReportes } from '../../../services/reportesService'
import VisualizadorImagenes from '../../modales/VisualizadorImagenes'
import { getPersonalActivo } from '../../../services/personalService'
import MaterialTable from 'material-table'
import { Avatar, Icon, IconButton } from '@material-ui/core'

const BienesAuxiliaresListPage = () => {


    const history = useHistory()
    const URL_CREAR = '/admin/bienes-auxiliares/crear'
    const URL_EDITAR = "/admin/bienes-auxiliares/editar";
    const TITULO = "Bienes Auxiliares";
    const [data, setData] = useState([])
    const [cargando, setCargando] = useState(true)
    const [pdfActual, setpdfActual] = useState("");
    const [idActualDelBien, setIdActualDelBien] = useState("")
    const [showModalInternar, setshowModalInternar] = useState(false);
    const handleCloseInternar = () => setshowModalInternar(false);
    const [acta, setActa] = useState(null)
    const [oficio, setOficio] = useState(null)
    const [informeTecnico, setInformeTecnico] = useState(null)
    const [showModalReasignar, setshowModalReasignar] = useState(false);
    const handleCloseReasignar = () => setshowModalReasignar(false);
    const [dataHistorial, setDataHistorial] = useState([])
    const [areaoficinaseccion, setAreaoficinaseccion] = useState([]);
    const [personalActivo, setPersonalActivo] = useState([]);
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
    const columns =
        [
            { title: 'Id', field: 'id' },
            { title: 'Descripcion', field: 'descripcion' },
            {
                title: 'Imagen', field: 'imagen_bien', render:
                    obj =>
                        <>
                            <IconButton>
                                <Avatar
                                    variant="rounded"
                                    src={obj.imagen_bien || imgNoDisponible}
                                    style={{ height: '60px', width: '60px' }}
                                    alt="some value"
                                    title={obj.descripcion}
                                    onClick={() => activarModalVIsualizardorImagen(obj.imagen_bien || imgNoDisponible, obj.descripcion + " ")}
                                />
                            </IconButton>
                        </>
            },
            {
                title: 'Código Qr', field: 'codigo_qr', render:
                    obj =>
                        <>
                            <IconButton>
                                <Avatar
                                    variant="rounded"
                                    src={obj.codigo_qr || imgNoDisponible}
                                    style={{ height: '60px', width: '60px' }}
                                    alt="some value"
                                    title={obj.descripcion}
                                    onClick={() => activarModalVIsualizardorImagen(obj.codigo_qr || imgNoDisponible, obj.descripcion + " ")}
                                />
                            </IconButton>
                        </>
            },
            {
                title: 'Acta', field: 'acta', render:
                    obj =>
                        <>
                            {
                                obj.acta_icon ? (<img
                                    className="tamaño-icono-pdf rounded mx-auto d-block"
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
                title: 'Oficio', field: 'oficio', render:
                    obj =>
                        <>
                            {
                                obj.oficio_icon ? (<img
                                    className="tamaño-icono-pdf rounded mx-auto d-block"
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
                title: 'Informe Técnico', field: 'informe_tecnico', render:
                    obj =>
                        <>
                            {
                                obj.informe_tecnico_icon ? (<img
                                    className="tamaño-icono-pdf rounded mx-auto d-block"
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

            { title: 'Estado del bien', field: 'estado_bien' },
            { title: 'Fecha de Adquisición', field: 'fecha_adquisicion' },
            {
                title: 'Observaciones', field: 'observaciones', render: obj =>
                    <>
                        <p title="Haga click en el texto para ver más detalles" onClick={() => showModalObservaciones(obj.observaciones)}>{(obj.observaciones)?.slice(0, 25).concat(" ...")}</p>
                    </>,
                cellStyle: {
                    cellWidth: '5%'
                },


            },


        ]
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

    const prueba = () => {
        if (idActualDelBien === "") {
            setCargando(true);
        } else {
            getHistorialBienAuxiliarById(idActualDelBien).then(rpta => {
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
        prueba()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [idActualDelBien, showModalReasignar, showModalInternar])
    // Metodos para traer el historial

    const handleDocumentActa = e => {
        setActa(e.target.files[0])
    }
    const handleDocumentOficio = e => {
        setOficio(e.target.files[0])
    }

    const handleDocumentoInformeTecnico = e => {
        setInformeTecnico(e.target.files[0])
    }

    const traerData = () => {
        setCargando(true)
        getBienAuxiliar().then(rpta => {
            setData(rpta.data)
            setCargando(false)
        })
    }
    const [isOpen, setIsOpen] = useState(false);

    const showModal = (pdfActual) => {
        setpdfActual(pdfActual);
        setIsOpen(true);
    };
    useEffect(() => {
        traerData();
    }, [])

    const hideModal = () => {
        setIsOpen(false);
    };
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
    // Metodos para el modal del internamiento
    const [formulario, setFormulario] = useState({
        estado_del_bien: "",
        fecha: "",
        observaciones: "",
        documento_acta_entrega_recepcion: "",
        documento_oficio_regularizacion: "",
        // bien_id: "",
        tipo_bien: 2,
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
    const handleSubmit = e => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('estado_del_bien', formulario.estado_del_bien)
        formData.append('fecha', formulario.fecha)
        formData.append('observaciones', formulario.observaciones)
        formData.append('bien_id', idActualDelBien)
        formData.append('tipo_bien', formulario.tipo_bien)


        if (acta != null) {
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
        postInternarBienAuxliar(formData, config).then((rpta) => {
            if (rpta.status === 200) { //Si el status es OK, entonces redirecciono a la lista de usuarios
                setshowModalInternar(false)
                console.log("Datos subida correctamente")
                Swal.fire(
                    'Internamiento Exitoso',
                    'El internamiento fue exitoso',
                    'success'
                )
                traerData()
            }
        });

    }
    let { historial } = dataHistorial;

    const handleSubmitReasignacion = e => {

        e.preventDefault();

        const formDataReasignacion = new FormData();
        formDataReasignacion.append('estado_del_bien', formulario.estado_del_bien)
        formDataReasignacion.append('fecha', formulario.fecha)
        formDataReasignacion.append('observaciones', formulario.observaciones)

        formDataReasignacion.append('bien_id', idActualDelBien)
        formDataReasignacion.append('tipo_bien', formulario.tipo_bien)
        formDataReasignacion.append('area_oficina_seccion_id', formulario.area_oficina_seccion_id)
        formDataReasignacion.append('personal_id', formulario.personal_id)

        if (acta != null) {
            formDataReasignacion.append('acta', acta)
        } else {
            formDataReasignacion.delete('acta', acta)
        }
        if (oficio !== null) {
            formDataReasignacion.append('oficio', oficio)
        } else {
            formDataReasignacion.delete('oficio', oficio)
        }
        if (informeTecnico !== null) {
            formDataReasignacion.append('informe_tecnico', informeTecnico)
        } else {
            formDataReasignacion.delete('informe_tecnico', informeTecnico)
        }
        console.log(formulario);

        postReasignarBienAuxiliar(formDataReasignacion, config).then((rpta) => {
            setshowModalReasignar(false);
            if (rpta.status === 200) { //Si el status es OK, entonces redirecciono a la lista de usuarios
                console.log("Datos subida correctamente")
                Swal.fire(
                    'Reasignación Exitosa',
                    'La reasignación fue exitoso',
                    'success'
                )
                traerData()
            }

            console.log(rpta)
        });

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
    const tipoReporte = "bienesAuxiliares"
    const reportes = () => {
        getReportes(tipoReporte).then(() => {

        })
    }
    //Este STATE activa el modal de Visualizador de Imagenes
    const [modalImagenes, setmodalImagenes] = useState(false)
    const [imagenBien, setImagenBien] = useState("")
    const [imagenDescripcion, setImagenDescripcion] = useState("")
    const activarModalVIsualizardorImagen = (imagen, imagenDescripcion) => {
        setImagenDescripcion(imagenDescripcion)
        setImagenBien(imagen)
        setmodalImagenes(true)
    }
    //Aqui termina el estate del modal de Visualizador de Imagenes
    return (
        <>

            <div className="home_content">
                <div>
                    <main className="container-fluid mt-5">

                        <div className="card">
                            <div className="card-body">

                                <div className="row">
                                    <div className="col-md-3">
                                        <h5 className="mx-3">{TITULO}</h5>

                                    </div>
                                    <div className="col-md-3">
                                        <Link to="/admin/bienes-internados/bienes-auxiliares" className="btn btn-warning">
                                            {" "}
                                            <i className="fa fa-list"></i> Lista de Bienes Internados
                                        </Link>
                                    </div>
                                    <div className="col-md-3">
                                        <Button onClick={reportes} className="btn btn-success">
                                            {" "}
                                            <i className="fas fa-file-excel"></i> Generar Reporte
                                        </Button>
                                    </div>
                                    <div className="col-md-3">
                                        <Link to={URL_CREAR} className="btn btn-primary "> <i className="fa fa-plus"></i> Crear un Bien</Link>
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
                                                : (
                                                    <div style={{}}>
                                                        <MaterialTable
                                                            title="Lista de Bienes Auxiliares"
                                                            columns={columns}
                                                            data={data}

                                                            actions={[
                                                                {
                                                                    icon: () =>

                                                                        <Button className="btn btn-danger">
                                                                            <i className="fas fa-clipboard-check" />
                                                                        </Button>
                                                                    ,
                                                                    tooltip: "Eliminar Bien",
                                                                    onClick: (e, obj) => eliminar(obj.id)
                                                                },
                                                                {
                                                                    icon: () =>

                                                                        <Button className="btn btn-warning">
                                                                            <i className="fa fa-pencil" />
                                                                        </Button>
                                                                    ,
                                                                    tooltip: "Editar Bien",
                                                                    onClick: (e, obj) => history.push(`${URL_EDITAR}/${obj.id}`)
                                                                },
                                                                {
                                                                    icon: () =>

                                                                        <Button className="btn btn-info">
                                                                            <i className="fas fa-clipboard-check" />
                                                                        </Button>
                                                                    ,
                                                                    tooltip: "Reasignar un Bien",
                                                                    onClick: (e, obj) => showModalInternarBien(obj.id)
                                                                },
                                                                {
                                                                    icon: () =>

                                                                        <Button className="btn btn-info">
                                                                            <i className="fas fa-angle-double-down" />
                                                                        </Button>
                                                                    ,
                                                                    tooltip: "Internar Bien",
                                                                    onClick: (e, obj) => showModalInternarBien(obj.id)
                                                                },
                                                                {
                                                                    icon: () =>

                                                                        <Button className="btn btn-info">
                                                                            <i className="fa fa-history" />
                                                                        </Button>
                                                                    ,
                                                                    tooltip: "Historial de un Bien",
                                                                    onClick: (e, obj) => history.push(`/admin/bienes-auxiliares/historial/${obj.id}`)
                                                                },
                                                            ]}
                                                            options={{
                                                                tableLayout: 'auto',
                                                                actionsColumnIndex: -1,
                                                                rowStyle: {
                                                                    fontSize: 14,
                                                                },
                                                                headerStyle: {
                                                                    fontSize: 12
                                                                }
                                                            }}
                                                            localization={{
                                                                pagination: {
                                                                    labelRowsSelect: "filas",



                                                                },
                                                                header: {
                                                                    actions: "Acciones"
                                                                }
                                                            }}
                                                        />
                                                    </div>
                                                )

                                        }
                                    </div>
                                </div>
                                <Modal show={showModalInternar} onHide={handleCloseInternar}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>Internamiento de un Bien Auxiliar</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <form onSubmit={handleSubmit}>
                                            <div className="form-group">
                                                <label htmlFor="">Estado del Bien:</label>
                                                <input type="text" className="form-control" required
                                                    name="estado_del_bien" onChange={handleChange} />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="">Fecha:</label>
                                                <input type="date" className="form-control" required
                                                    name="fecha" onChange={handleChange} />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="">Observaciones:</label>
                                                <input type="text" className="form-control"
                                                    name="observaciones" onChange={handleChange} />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="">Acta:</label>
                                                <input type="file" className="form-control"
                                                    name="acta" onChange={handleDocumentActa} />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="">Oficio:</label>
                                                <input type="file" className="form-control"
                                                    name="oficio" onChange={handleDocumentOficio} />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="">Informe Técnico:</label>
                                                <input type="file" className="form-control"
                                                    name="informe_tecnico" onChange={handleDocumentoInformeTecnico} />
                                            </div>
                                            <div className="form-group" hidden>
                                                <label htmlFor="">Id del Bien:</label>
                                                <input type="text" className="form-control"
                                                    value={idActualDelBien} name="bien_id" onChange={handleChange} />
                                            </div>


                                            <div className="form-group">
                                                <button className="btn btn-primary" type="submit">Internar</button>
                                            </div>


                                        </form>
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button variant="secondary" onClick={handleCloseInternar}>
                                            Cerrar
                                        </Button>

                                    </Modal.Footer>
                                </Modal>


                                <Modal show={showModalReasignar} onHide={handleCloseReasignar}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>Reasignación de un Bien Auxiliar</Modal.Title>
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
                                                                <p>Descripción: {dataHistorial.descripcion}</p>
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
                                                                                        <p>Subunidad: {item.area_oficina_seccion.subunidad.nombre} </p>
                                                                                        <p>Area: {item.area_oficina_seccion.nombre}</p>
                                                                                        <p>Persona Encargada: {item.personal.grado + " " + item.personal.apellido + " " + item.personal.nombre}</p>
                                                                                    </div>
                                                                                </>
                                                                            )
                                                                        } else {
                                                                            // not last one
                                                                        }

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
                                                    <option value="">--- Elegir Personal---</option>

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
                                                <input type="text" className="form-control" required
                                                    name="estado_del_bien" onChange={handleChange} />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="">Observaciones: </label>
                                                <textarea className="form-control" rows={4} cols={50}
                                                    name="observaciones" onChange={handleChange} />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="">Fecha: </label>
                                                <input type="date" className="form-control" required
                                                    name="fecha" onChange={handleChange} />
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="">Acta: </label>
                                                <input type="file" className="form-control"
                                                    name="acta" onChange={handleDocumentActa} />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="">Oficio: </label>
                                                <input type="file" className="form-control"
                                                    name="oficio" onChange={handleDocumentOficio} />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="">Informe Técnico: </label>
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

                                            <div className="form-group">
                                                <button className="btn btn-primary" type="submit">ReasignarBien</button>
                                            </div>


                                        </form>
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button variant="secondary" onClick={handleCloseReasignar}>
                                            Cerrar
                                        </Button>

                                    </Modal.Footer>
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

                            </div>
                        </div>
                    </main>
                    {/* Aqui llamo a mi componente que permite hacer uso del visualizadorImagenes */}
                    <VisualizadorImagenes visible={modalImagenes} onClose={() => setmodalImagenes(false)} imagen={imagenBien} imagenDescripcion={imagenDescripcion} />
                    {/* Este es mi modal para ver más detalle de las observaciones */}
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
            </div>
        </>


    )
}

export default BienesAuxiliaresListPage
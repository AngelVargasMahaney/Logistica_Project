import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import { deleteBienAuxiliarById, getBienAuxiliar, postReasignarBienAuxiliar } from '../../../services/bienesAuxiliaresService'
import imgNoDisponible from "../../../assets/23.png"
import Modal from "react-bootstrap/Modal";
import { Button } from "react-bootstrap";
import { getPersonal, getPersonalActivo } from "../../../services/personalService";
import AdminSidebar from '../../admin/components/AdminSidebar';
import GeneralNavBar from '../../layout/GeneralNavBar';
import { postInternarBienAuxliar, postInternarBienFormato1, postReasignarBienFormato1 } from '../../../services/internamientoFormato1Service'
import { getAreaOficinaSeccion } from "../../../services/areaOficinaSeccionService";
import { getHistorialBienAuxiliarById, getHistorialFormatoById } from '../../../services/historialBienesService'
import { getReportes } from '../../../services/reportesService'
import VisualizadorImagenes from '../../modales/VisualizadorImagenes'

const BienesAuxiliaresListPage = () => {



    const URL_CREAR = '/admin/bienes-auxiliares/crear'
    const URL_EDITAR = "/admin/bienes-auxiliares/editar";
    const TITULO = "Bienes Auxiliares";
    const [data, setData] = useState([])
    const [cargando, setCargando] = useState(true)
    const [pdfActual, setpdfActual] = useState("");
    const [idActualDelBien, setIdActualDelBien] = useState("")
    const [showModalInternar, setshowModalInternar] = useState(false);
    const handleCloseInternar = () => setshowModalInternar(false);
    const [documentoRecepcion, setDocumentoRecepcion] = useState(null)
    const [documentoRegularizacion, setDocumentoRegularizacion] = useState(null)
    const [documentoMemorandum, setDocumentoMemorandum] = useState(null)
    const [showModalReasignar, setshowModalReasignar] = useState(false);
    const handleCloseReasignar = () => setshowModalReasignar(false);
    const [dataHistorial, setDataHistorial] = useState([])
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
    }, [idActualDelBien, showModalReasignar, showModalInternar])
    // Metodos para traer el historial

    const handleDocumentRecepcion = e => {
        setDocumentoRecepcion(e.target.files[0])
    }
    const handleDocumentRegularizacion = e => {
        setDocumentoRegularizacion(e.target.files[0])
    }

    const handleDocumentMemorandum = e => {
        setDocumentoMemorandum(e.target.files[0])
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
    let { estado_del_bien, fecha, observaciones } = formulario
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


        if (documentoRecepcion != null) {
            formData.append('documento_acta_entrega_recepcion', documentoRecepcion)
        } else {
            formData.delete('documento_acta_entrega_recepcion', documentoRecepcion)
        }

        if (documentoRegularizacion !== null) {
            formData.append('documento_oficio_regularizacion', documentoRegularizacion)
        } else {
            formData.delete('documento_oficio_regularizacion', documentoRegularizacion)
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
        formDataReasignacion.append('documento_acta_entrega_recepcion', documentoRecepcion)
        formDataReasignacion.append('documento_oficio_regularizacion', documentoRegularizacion)
        formDataReasignacion.append('bien_id', idActualDelBien)
        formDataReasignacion.append('tipo_bien', formulario.tipo_bien)
        formDataReasignacion.append('area_oficina_seccion_id', formulario.area_oficina_seccion_id)
        formDataReasignacion.append('personal_id', formulario.personal_id)

        if (documentoRecepcion != null) {
            formDataReasignacion.append('documento_acta_entrega_recepcion', documentoRecepcion)
        } else {
            formDataReasignacion.delete('documento_acta_entrega_recepcion', documentoRecepcion)
        }
        if (documentoMemorandum !== null) {
            formDataReasignacion.append('documento_memorandum', documentoMemorandum)
        } else {
            formDataReasignacion.delete('documento_memorandum', documentoMemorandum)
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
            <AdminSidebar />
            <GeneralNavBar />
            <div className="home_content">
                <div>
                    <main className="container-fluid mt-5">

                        <div className="card">
                            <div className="card-body">

                                <div className="d-flex justify-content-between mb-3">
                                    <h5>{TITULO}</h5>
                                    <Link to="/admin/bienes-internados/bienes-auxiliares" className="btn btn-warning">
                                        {" "}
                                        <i className="fa fa-list"></i> Lista de Bienes Internados
                                    </Link>
                                    <Button onClick={reportes} className="btn btn-success">
                                        {" "}
                                        <i className="fas fa-file-excel"></i> Generar Reporte
                                    </Button>
                                    <Link to={URL_CREAR} className="btn btn-primary "> <i className="fa fa-plus"></i> Crear un Bien</Link>
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
                                                                <th>ID</th>
                                                                <th>Descripción</th>
                                                                <th>Documento</th>
                                                                <th>Marca</th>
                                                                <th>Modelo</th>
                                                                <th>Serie</th>
                                                                <th>Tipo Material</th>
                                                                <th>Color</th>
                                                                <th>Dimensiones</th>
                                                                <th>Estado del Bien</th>
                                                                <th>Fecha Adquisición</th>
                                                                <th>Observaciones</th>
                                                                <th>Código QR</th>
                                                                <th>Imagen</th>
                                                                <th className="acciones"></th>
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
                                                                data.map((obj, i) => {
                                                                    return (
                                                                        <tr key={obj.id}>
                                                                            <td>{obj.id}</td>
                                                                            <td>{obj.descripcion}</td>
                                                                            <td>
                                                                                {obj.icon_file ? (<img
                                                                                    className="tamaño-icono-pdf rounded mx-auto d-block"
                                                                                    alt="some value"
                                                                                    title={obj.documento_nombre_original}
                                                                                    src={obj.icon_file}
                                                                                    onClick={() =>
                                                                                        showModal(obj.documento)
                                                                                    }
                                                                                />) : " "}

                                                                            </td>
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
                                                                                <img
                                                                                    className="tamaño-icono-pdf rounded mx-auto d-block"
                                                                                    alt="some value"
                                                                                    title="Codigo Qr del B>ien"

                                                                                    src={obj.codigo_qr || imgNoDisponible}
                                                                                    onClick={() =>
                                                                                        activarModalVIsualizardorImagen(obj.codigo_qr || imgNoDisponible, `Código QR de ${obj.descripcion}`)
                                                                                    }
                                                                                />
                                                                            </td>

                                                                            <td>
                                                                                <img
                                                                                    className="tamaño-icono-pdf rounded mx-auto d-block"
                                                                                    alt="some value"
                                                                                    title={obj.descripcion}
                                                                                    src={obj.imagen_bien || imgNoDisponible}
                                                                                    onClick={() =>
                                                                                        activarModalVIsualizardorImagen(obj.imagen_bien || imgNoDisponible, obj.descripcion + " ")
                                                                                    }
                                                                                />
                                                                            </td>
                                                                            <td>

                                                                                <button data-toggle="tooltip" data-placement="top" title="Eliminar"
                                                                                    className="btn btn-danger mx-1"
                                                                                    onClick={() => {
                                                                                        eliminar(obj.id);
                                                                                    }}
                                                                                >
                                                                                    <i className="fa fa-trash"></i>

                                                                                </button>
                                                                                <Link to={`${URL_EDITAR}/${obj.id}`}
                                                                                    className="btn btn-warning"
                                                                                > <i className="fa fa-pencil"></i>
                                                                                </Link>
                                                                                <Button

                                                                                    onClick={() => {
                                                                                        showModalReasignarBien(obj.id)

                                                                                    }}
                                                                                    className="btn btn-info mx-1"
                                                                                    title="Reasignar un Bien"
                                                                                >
                                                                                    {" "}
                                                                                    <i className="fas fa-clipboard-check"></i>
                                                                                </Button>
                                                                                <Button

                                                                                    onClick={() => {
                                                                                        showModalInternarBien(obj.id)

                                                                                    }}
                                                                                    className="btn btn-info"
                                                                                    title="Internar un Bien"
                                                                                >
                                                                                    {" "}
                                                                                    <i className="fas fa-angle-double-down"></i>
                                                                                </Button>
                                                                                <Link
                                                                                    // to={`formatos/editar/${objFormato.id}`}
                                                                                    to={`/admin/bienes-auxiliares/historial/${obj.id}`}
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
                                                <label htmlFor="">Documento-Acta entrega y recepción:</label>
                                                <input type="file" className="form-control"
                                                    name="documento_acta_entrega_recepcion" onChange={handleDocumentRecepcion} />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="">Documento-Oficio regularización:</label>
                                                <input type="file" className="form-control"
                                                    name="documento_oficio_regularizacion" onChange={handleDocumentRegularizacion} />
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
                                                <label htmlFor="">Documento-Acta entrega y recepción: </label>
                                                <input type="file" className="form-control"
                                                    name="documento_acta_entrega_recepcion" onChange={handleDocumentRecepcion} />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="">Documento Memorandum: </label>
                                                <input type="file" className="form-control"
                                                    name="documento_memorandum" onChange={handleDocumentMemorandum} />
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

                            </div>
                        </div>
                    </main>
                    {/* Aqui llamo a mi componente que permite hacer uso del visualizadorImagenes */}
                    <VisualizadorImagenes visible={modalImagenes} onClose={() => setmodalImagenes(false)} imagen={imagenBien} imagenDescripcion={imagenDescripcion} />

                </div>
            </div>
        </>


    )
}

export default BienesAuxiliaresListPage
import React, { useEffect, useState } from 'react'
import AdminSidebar from '../../admin/components/AdminSidebar';
import GeneralNavBar from '../../layout/GeneralNavBar';
import { Button } from 'react-bootstrap'
import imgNoDisponible from "../../../assets/23.png"
import Swal from 'sweetalert2'
import { Link } from 'react-router-dom';
import { deleteBienDirinById, getBienesDirin } from '../../../services/bienesDirinService';
import { Modal } from 'react-bootstrap'
import VisualizadorImagenes from '../../modales/VisualizadorImagenes';
import { postInternarBienFormato1, postReasignarBienFormato1 } from '../../../services/internamientoFormato1Service';
import { getPersonalActivo } from '../../../services/personalService';
import { getAreaOficinaSeccion } from '../../../services/areaOficinaSeccionService';
import { getHistorialBienesDirin } from '../../../services/historialBienesService';
import { getReporteFormato1Excel, getReportes } from "../../../services/reportesService";

const BienesDirinListPage = () => {
    const [cargando, setCargando] = useState(true)
    const [bienesDirin, setBienesDirin] = useState([])

    const traerBienesDirin = () => {
        setCargando(true)
        getBienesDirin().then((rpta) => {
            setBienesDirin(rpta.data)
            setCargando(false)
        })
    }
    console.log(bienesDirin)

    useEffect(() => {
        traerBienesDirin()
    }, [])

    const eliminarBienDirinById = id => {
        Swal.fire({
            title: "¿Seguro que deseas eliminar el bien ?",
            icon: "warning",
            text: "Los cambios serán irreversibles 😮",
            showCancelButton: true,
        }).then((rpta) => {
            if (rpta.isConfirmed) {
                deleteBienDirinById(id).then((rpta) => {
                    if (rpta.status === 200) {
                        console.log("BORRADO")
                        traerBienesDirin();
                    }
                });
            }
        });
    }

    const [formulario, setFormulario] = useState({
        estado_del_bien: "",
        fecha: "",
        observaciones: "",
        documento_alta: "",
        // bien_id: "",
        tipo_bien: 5,
        area_oficina_seccion_id: "",
        personal_id: ""
    })

    const handleChange = (e) => {
        setFormulario({
            ...formulario,
            [e.target.name]: e.target.value
        })
    }

    const handleCloseReasignar = () => setshowModalReasignar(false);
    const [dataHistorial, setDataHistorial] = useState([])
    let { historial } = dataHistorial;
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
    const [personalActivo, setPersonalActivo] = useState([]);
    const [areaoficinaseccion, setAreaoficinaseccion] = useState([]);
    const [documentoRecepcion, setDocumentoRecepcion] = useState(null)
    const [documentoRegularizacion, setDocumentoRegularizacion] = useState(null)
    const handleDocumentRecepcion = e => {
        setDocumentoRecepcion(e.target.files[0])
    }
    const handleDocumentRegularizacion = e => {
        setDocumentoRegularizacion(e.target.files[0])
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


        if (documentoRecepcion != null) {
            formData.append('documento_acta_entrega_recepcion', documentoRecepcion)
        } else {
            formData.delete('documento_acta_entrega_recepcion', documentoRecepcion)
        }

        if (documentoRegularizacion != null) {
            formData.append('documento_oficio_regularizacion', documentoRegularizacion)
        } else {
            formData.delete('documento_oficio_regularizacion', documentoRegularizacion)
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
                traerBienesDirin()
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
            getHistorialBienesDirin(idActualDelBien).then(rpta => {
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
        // }, [idActualDelBien, historial, dataHistorial])
    }, [idActualDelBien, showModalReasignar, showModalInternar])

    const handleSubmitReasignacion = (e) => {
        e.preventDefault();
        const formDataReasignacion = new FormData();
        formDataReasignacion.append('estado_del_bien', formulario.estado_del_bien)
        formDataReasignacion.append('fecha', formulario.fecha)
        formDataReasignacion.append('observaciones', formulario.observaciones)
        if (documentoRecepcion != null) {
            formDataReasignacion.append('documento_acta_entrega_recepcion', documentoRecepcion)
        } else {
            formDataReasignacion.delete('documento_acta_entrega_recepcion', documentoRecepcion)
        }

        if (documentoRegularizacion != null) {
            formDataReasignacion.append('documento_oficio_regularizacion', documentoRegularizacion)
        } else {
            formDataReasignacion.delete('documento_oficio_regularizacion', documentoRegularizacion)
        }
        formDataReasignacion.append('bien_id', idActualDelBien)
        formDataReasignacion.append('tipo_bien', formulario.tipo_bien)
        formDataReasignacion.append('area_oficina_seccion_id', formulario.area_oficina_seccion_id)
        formDataReasignacion.append('personal_id', formulario.personal_id)

        postReasignarBienFormato1(formDataReasignacion, config).then((rpta) => {
            if (rpta.status === 200) { //Si el status es OK, entonces redirecciono a la lista de usuarios
                console.log("Datos subida correctamente")

                setshowModalReasignar(false)

                Swal.fire({
                    title: 'Reasignación Exitosa',
                    text: 'La reasignación fue exitosa',
                    icon: 'success',

                    confirmButtonColor: '#3085d6',

                    confirmButtonText: 'Continuar'
                }).then((result) => {
                    if (result.isConfirmed) {
                        traerBienesDirin()

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
    const tipoReporte = "bienesDirin"
    const reportes = () => {
        getReportes(tipoReporte).then(() => {

        })
    }
    return (
        <>
            <AdminSidebar />
            <GeneralNavBar />
            <div className="home_content">
                <main className="container-fluid mt-5">

                    <div className="card">
                        <div className="card-body">

                            <div className="d-flex justify-content-between mb-3">
                                <h5>Lista de Bienes DIRIN</h5>
                                <Link to="/admin/bienes-internados/bienes-dirin" className="btn btn-warning">
                                    {" "}
                                    <i className="fa fa-list"></i> Lista de Bienes Internados
                                </Link>
                                <Button onClick={reportes} className="btn btn-success">
                                    {" "}
                                    <i className="fas fa-file-excel"></i> Generar Reporte
                                </Button>
                                <Link to={"/admin/bienes-dirin/crear"} className="btn btn-primary ">
                                    {" "}
                                    <i className="fa fa-plus"></i> Crear un Bien
                                </Link>
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
                                                            <th>Id</th>
                                                            <th>Código</th>
                                                            <th>Correl</th>
                                                            <th>Denominación</th>
                                                            <th>Documento</th>
                                                            <th>Marca</th>
                                                            <th>Modelo</th>
                                                            <th>Tipo</th>
                                                            <th>Estado del bien</th>
                                                            <th>Observaciones</th>
                                                            <th>Imagen del Bien</th>
                                                            <th>Código Qr</th>

                                                            <th className="acciones"> Acciones</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            bienesDirin.map((obj, i) => {
                                                                return (
                                                                    <tr key={i}>
                                                                        <td>{obj.id}</td>
                                                                        <td>{obj.codigo}</td>
                                                                        <td>{obj.correl}</td>
                                                                        <td>{obj.denominacion}</td>
                                                                        <td>
                                                                            {obj.icon_file ? (<img
                                                                                className="tamaño-icono-pdf rounded mx-auto d-block"
                                                                                alt="some value"
                                                                                title={obj.documento}
                                                                                src={obj.icon_file}
                                                                                onClick={() =>
                                                                                    showModal(obj.documento)
                                                                                }
                                                                            />) : " "}

                                                                        </td>
                                                                        <td>{obj.marca}</td>
                                                                        <td>{obj.modelo}</td>
                                                                        <td>{obj.tipo}</td>
                                                                        <td>{obj.estado_bien}</td>
                                                                        <td>{obj.observaciones}</td>
                                                                        <td>
                                                                            <img
                                                                                className="tamaño-icono-pdf rounded mx-auto d-block"
                                                                                alt="some value"
                                                                                title={obj.denominacion}
                                                                                src={obj.imagen_bien || imgNoDisponible}
                                                                                onClick={() =>
                                                                                    activarModalVIsualizardorImagen(obj.imagen_bien || imgNoDisponible, obj.denominacion + " ")
                                                                                }
                                                                            />
                                                                        </td>
                                                                        <td>
                                                                            <img
                                                                                className="tamaño-icono-pdf rounded mx-auto d-block"
                                                                                alt="some value"
                                                                                title={obj.denominacion}
                                                                                src={obj.codigo_qr || imgNoDisponible}
                                                                                onClick={() =>
                                                                                    activarModalVIsualizardorImagen(obj.codigo_qr || imgNoDisponible, obj.denominacion + " ")
                                                                                }
                                                                            />
                                                                        </td>
                                                                        <td>
                                                                            <button
                                                                                data-toggle="tooltip"
                                                                                data-placement="top"
                                                                                title="Eliminar"
                                                                                className="btn btn-danger mx-1"
                                                                                onClick={() => {
                                                                                    eliminarBienDirinById(obj.id);
                                                                                }}
                                                                            >
                                                                                <i className="fa fa-trash"></i>
                                                                            </button>
                                                                            <Link
                                                                                to={`/admin/bienes-dirin/editar/${obj.id}`}
                                                                                className="btn btn-warning"
                                                                                title="Modificar"
                                                                            >
                                                                                {" "}
                                                                                <i className="fa fa-pencil"></i>
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
                                                                                to={`/admin/bienes-dirin/historial/${obj.id}`}
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

                {/* Modal Internar un Bien Dirin */}
                <Modal show={showModalInternar} onHide={handleCloseInternar}>
                    <Modal.Header closeButton>
                        <Modal.Title>Internamiento de un Bien DIRIN</Modal.Title>
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
                                <label htmlFor="">Documento Entrega recepción:</label>
                                <input type="file" className="form-control"
                                    name="documento_acta_entrega_recepcion" onChange={handleDocumentRecepcion} />
                            </div>
                            
                            <div className="form-group">
                                <label htmlFor="">Documento Oficio Regularización:</label>
                                <input type="file" className="form-control"
                                    name="documento_oficio_regularizacion" onChange={handleDocumentRegularizacion} />
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

                <Modal show={showModalReasignar} onHide={handleCloseReasignar}>
                    <Modal.Header closeButton>
                        <Modal.Title>Reasignación de un Bien DIRIN</Modal.Title>
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
                                                <p>Descripción: {dataHistorial.denominacion}</p>
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
                                <label htmlFor="">Documento Entrega Recepción </label>
                                <input type="file" className="form-control"
                                    name="documento_alta" onChange={handleDocumentRecepcion} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="">Documento Oficio Regularización </label>
                                <input type="file" className="form-control"
                                    name="documento_alta" onChange={handleDocumentRegularizacion} />
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
                                <button className="btn btn-primary" type="submit">Reasignar Bien<i className="ml-2 fa fa-check"></i></button>
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
        </>
    )
}

export default BienesDirinListPage

import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { deleteEquipoPolicialById, getEquipoPolicial, getEquipoPolicialById } from '../../../services/equipoPolicialService'


import AdminSidebar from '../../admin/components/AdminSidebar';
import GeneralNavBar from '../../layout/GeneralNavBar';

import Swal from "sweetalert2";
import Modal from "react-bootstrap/Modal";
import { Button } from "react-bootstrap";
import { postInternarBienFormato1, postReasignarBienFormato1 } from "../../../services/internamientoFormato1Service";
import { getSubunidades } from "../../../services/subunidadesService";
import { getPersonal, getPersonalActivo } from "../../../services/personalService";
import { useParams } from 'react-router-dom'
import { getHistorialFormatoById, getHistorialEquipoPolicialById } from "../../../services/historialBienesService";
import imgNoDisponible from "../../../assets/23.png"
import { getAreaOficinaSeccion } from "../../../services/areaOficinaSeccionService";
import { getReporteFormato1Excel } from "../../../services/reportesService";


const EquipoPolicialListPage = () => {

    const URL_CREAR = '/admin/equipo-policial/crear'
    const TITULO = "Equipo Policial";
    const [data, setData] = useState([])
    const [cargando, setCargando] = useState(true)

    const [pdfActual, setpdfActual] = useState("");

    const [isOpen, setIsOpen] = useState(false);

    const showModal = (pdfActual) => {
        setpdfActual(pdfActual);
        setIsOpen(true);
    };


    //
    const [showModalInternar, setshowModalInternar] = useState(false);
    const handleCloseInternar = () => setshowModalInternar(false);
    const [idActualDelBien, setIdActualDelBien] = useState("")
    const [documentoRecepcion, setDocumentoRecepcion] = useState(null)
    const [documentoRegularizacion, setDocumentoRegularizacion] = useState(null)
    const [showModalReasignar, setshowModalReasignar] = useState(false);
    const handleCloseReasignar = () => setshowModalReasignar(false);



    const handleDocumentRecepcion = e => {
        setDocumentoRecepcion(e.target.files[0])
    }
    const handleDocumentRegularizacion = e => {
        setDocumentoRegularizacion(e.target.files[0])
    }


    // Metodos para el modal del internamiento
    const [formulario, setFormulario] = useState({
        estado_del_bien: "",
        fecha: "",
        observaciones: "",
        documento_acta_entrega_recepcion: "",
        documento_oficio_regularizacion: "",
        // bien_id: "",
        tipo_bien: 3,
        area_oficina_seccion_id: "",
        personal_id: ""
    })

    //  
    const [generarReporte, setGenerarReporte] = useState("")
    const reportes = () => {
        getReporteFormato1Excel().then(() => {

        })
    }
    //
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
    // 
    const handleSubmit = e => {
        e.preventDefault();


        const formData = new FormData();
        formData.append('estado_del_bien', formulario.estado_del_bien)
        formData.append('fecha:', formulario.fecha)
        formData.append('observaciones', formulario.observaciones)
        formData.append('documento_acta_entrega_recepcion', documentoRecepcion)
        formData.append('documento_oficio_regularizacion', documentoRegularizacion)
        formData.append('bien_id', idActualDelBien)
        formData.append('tipo_bien', formulario.tipo_bien)




        postInternarBienFormato1(formData, config).then((rpta) => {
            if (rpta.status === 200) { //Si el status es OK, entonces redirecciono a la lista de usuarios
                console.log("Datos subida correctamente")
                Swal.fire(
                    'Internamiento Exitoso',
                    'El internamiento fue exitoso',
                    'success'
                )
                traerData()
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

    //
    const handleSubmitReasignacion = e => {

        e.preventDefault();

        const formDataReasignacion = new FormData();
        formDataReasignacion.append('estado_del_bien', formulario.estado_del_bien)
        formDataReasignacion.append('fecha:', formulario.fecha)
        formDataReasignacion.append('observaciones', formulario.observaciones)
        formDataReasignacion.append('documento_acta_entrega_recepcion', documentoRecepcion)
        formDataReasignacion.append('documento_oficio_regularizacion', documentoRegularizacion)
        formDataReasignacion.append('bien_id', idActualDelBien)
        formDataReasignacion.append('tipo_bien', formulario.tipo_bien)
        formDataReasignacion.append('area_oficina_seccion_id', formulario.area_oficina_seccion_id)
        formDataReasignacion.append('personal_id', formulario.personal_id)


        postReasignarBienFormato1(formDataReasignacion, config).then((rpta) => {

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
        }).catch((err) => {
            Swal.fire(
                'Reasignaciòn Fallida',
                'No se puede internar un bien dos veces',
                'error'
            )
        })
    }
    const [dataHistorial, setDataHistorial] = useState([])

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
    //Aqui los metodos para traer las subunidades
    const [areaoficinaseccion, setAreaoficinaseccion] = useState([]);
    const traerSubunidades = () => {
        setCargando(true)
        getAreaOficinaSeccion().then((rpta) => {

            setAreaoficinaseccion(rpta.data);
            setCargando(false)
        }).catch((err) => {
            console.log("Data no cargada en traerSubunidades")
        })

    };
    const prueba = () => {

        if (idActualDelBien === "") {
            setCargando(true);
        } else {
            getHistorialEquipoPolicialById(idActualDelBien).then(rpta => {
                //console.log("adwdwaw" + rpta.data)
                setDataHistorial(rpta.data);
                //console.log("PRUEBAA" + rpta.data);
                setCargando(false);

            }).catch((err) => {
                console.log("Data no cargada en getHistorialFOrmatoByID")
            })
        }

    }
    console.log(dataHistorial)
    useEffect(() => {
        prueba()
    }, [idActualDelBien])
    // Metodos para traer el historial



    useEffect(() => {
        traerSubunidades();
    }, []);
    //Aqui los metodos para traer las personales
    const [personal, setPersonal] = useState([]);
    const traerPersonal = () => {
        setCargando(true)
        getPersonal().then((rpta) => {
            //console.log(rpta);
            setPersonal(rpta.data);
            setCargando(false)
        });
    };
    useEffect(() => {
        traerPersonal();
    }, []);

    //Variable "historial" que permite entrar al arreglo "historial" dentro de mi arreglo dataHistorial
    let { historial } = dataHistorial;
    console.log(historial)
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


    const traerData = () => {
        setCargando(true)
        getEquipoPolicial().then(rpta => {
            setData(rpta.data)
            setCargando(false)
        })
    }
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
                deleteEquipoPolicialById(id).then((rpta) => {
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
                                    <h5>{TITULO}</h5>
                                    <Link to="/admin/bienes-internados/equipo-policial" className="btn btn-warning">
                                        {" "}
                                        <i className="fa fa-list"></i> Lista de Bienes Internados
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
                                                                <th>id</th>
                                                                <th>codigo</th>
                                                                <th>descripcion</th>
                                                                <th>Documento</th>
                                                                <th>marca</th>
                                                                <th>modelo</th>
                                                                <th>serie</th>
                                                                <th>pais_fabricacion</th>
                                                                <th>estado_bien</th>
                                                                <th>fecha_adquisicion</th>
                                                                <th>Forma_adquisicion</th>
                                                                <th>tasacion</th>
                                                                <th>Código_QR</th>
                                                                <th>Observaciones</th>
                                                                <th>Imagen</th>


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
                                                                data.map((obj, i) => {
                                                                    return (
                                                                        <tr key={obj.id}>
                                                                            <td>{obj.id}</td>
                                                                            <td>{obj.codigo}</td>
                                                                            <td>
                                                                                <img
                                                                                    className="tamaño-icono-pdf rounded mx-auto d-block"
                                                                                    alt="some value"
                                                                                    title={obj.documento_nombre_original}
                                                                                    src={obj.icon_file}
                                                                                    onClick={() =>
                                                                                        showModal(obj.documento)
                                                                                    }
                                                                                /></td>
                                                                            <td>{obj.descripcion}</td>
                                                                            <td>{obj.marca}</td>
                                                                            <td>{obj.modelo}</td>
                                                                            <td>{obj.serie}</td>
                                                                            <td>{obj.pais_fabricacion}</td>
                                                                            <td>{obj.estado_bien}</td>
                                                                            <td>{obj.anio_adquisicion}</td>
                                                                            <td>{obj.forma_adquisicion}</td>
                                                                            <td>{obj.tasacion}</td>

                                                                            <td>
                                                                                <img
                                                                                    className="tamaño-icono-pdf rounded mx-auto d-block"
                                                                                    alt="some value"
                                                                                    title="Codigo Qr del B>ien"

                                                                                    src={obj.codigo_qr || imgNoDisponible}
                                                                                    onClick={() =>
                                                                                        showModal(obj.codigo_qr)
                                                                                    }
                                                                                />
                                                                            </td>

                                                                            <td>{obj.observaciones}</td>
                                                                            {/* <td>{objFormato.imagen_bien}</td> */}
                                                                            <td>
                                                                                <img
                                                                                    className="tamaño-icono-pdf rounded mx-auto d-block"
                                                                                    alt="some value"
                                                                                    title={obj.descripcion}
                                                                                    src={obj.imagen_bien || imgNoDisponible}
                                                                                    onClick={() =>
                                                                                        showModal(obj.imagen_bien)
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

                                                                                <Link
                                                                                    to={`equipo-policial/${obj.id}`}
                                                                                    className="btn btn-warning"
                                                                                    title="Modificar"
                                                                                >
                                                                                    {" "}
                                                                                    <i className="fa fa-pencil"></i>
                                                                                </Link>

                                                                                <Link
                                                                                    // to={`formatos/editar/${objFormato.id}`}
                                                                                    to={`/admin/equipo-policial/historial/${obj.id}`}
                                                                                    className="btn btn-info ml-1"
                                                                                    title="Historial del bien"
                                                                                >
                                                                                    {" "}
                                                                                    <i className="fa fa-history"></i>
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
                                <Modal show={showModalInternar} onHide={handleCloseInternar}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>Internamiento de un bien del Equipo Policial</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <form onSubmit={handleSubmit}>
                                            <div className="form-group">
                                                <label htmlFor="">Estado del Bien:</label>
                                                <input type="text" className="form-control"
                                                    value={formulario.estado_del_bien} name="estado_del_bien" onChange={handleChange} />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="">Fecha:</label>
                                                <input type="date" className="form-control"
                                                    value={formulario.fecha} name="fecha" onChange={handleChange} />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="">Observaciones:</label>
                                                <input type="text" className="form-control"
                                                    value={formulario.observaciones} name="observaciones" onChange={handleChange} />
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
                                            {/* <div className="form-group">
                        <label htmlFor="">Tipo bien</label>
                        <input type="text" className="form-control"
                          value={tipo_bien} name="tipo_bien" onChange={handleChange} />
                      </div> */}

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

                                {/* Modal de Reasignar un Bien */}
                                <Modal show={showModalReasignar} onHide={handleCloseReasignar}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>Reasignación de un bien del Equipo Policial</Modal.Title>
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
                                                <select defaultValue="DEFAULT" onChange={handleChange} name="personal_id" required className="form-select custom-select mr-sm-2">
                                                    <option value="DEFAULT" disabled>--- Elegir Personal---</option>

                                                    {personalActivo.map((objPersonal, i) => {
                                                        return (

                                                            <option key={objPersonal.id} value={objPersonal.id} >{objPersonal.grado + " |-> " + objPersonal.apellido + " " + objPersonal.nombre}</option>

                                                        );
                                                    })}
                                                </select>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="">Area Oficina Sección</label>
                                                <select defaultValue="DEFAULT" onChange={handleChange} name="area_oficina_seccion_id" required className="form-select custom-select mr-sm-2">
                                                    <option value="DEFAULT" disabled>--- Elegir Subunidad---</option>
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
                                                    value={formulario.estado_del_bien} name="estado_del_bien" onChange={handleChange} />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="">Observaciones: </label>
                                                <textarea className="form-control" rows={4} cols={50}
                                                    value={formulario.observaciones} name="observaciones" onChange={handleChange} />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="">Fecha: </label>
                                                <input type="date" className="form-control"
                                                    value={formulario.fecha} name="fecha" onChange={handleChange} />
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="">Documento-Acta entrega y recepción: </label>
                                                <input type="file" className="form-control"
                                                    name="documento_acta_entrega_recepcion" onChange={handleDocumentRecepcion} />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="">Documento-Oficio regularización: </label>
                                                <input type="file" className="form-control"
                                                    name="documento_oficio_regularizacion" onChange={handleDocumentRegularizacion} />
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
                </div>
            </div>
        </>


    )
}

export default EquipoPolicialListPage

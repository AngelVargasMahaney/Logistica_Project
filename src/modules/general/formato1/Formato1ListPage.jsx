import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  deleteFormatoById,
  getFormatos,
} from "../../../services/formatoService";
import AdminSidebar from "../../admin/components/AdminSidebar";

import GeneralNavBar from "../../layout/GeneralNavBar";
import Swal from "sweetalert2";
import Modal from "react-bootstrap/Modal";
import { Button } from "react-bootstrap";
import { postInternarBienFormato1, postReasignarBienFormato1 } from "../../../services/internamientoFormato1Service";
import { getSubunidades } from "../../../services/subunidadesService";
import { getPersonal, getPersonalActivo } from "../../../services/personalService";
import { useParams } from 'react-router-dom'
import { getHistorialFormatoById } from "../../../services/historialBienesService";
import imgNoDisponible from "../../../assets/23.png"
import { getAreaOficinaSeccion } from "../../../services/areaOficinaSeccionService";
import { getReporteFormato1Excel } from "../../../services/reportesService";
import VisualizadorImagenes from "../../modales/VisualizadorImagenes";
const Formato1ListPage = () => {
  const urlFormatoCrear = "/admin/formatos/crear";
  const [formatos, setFormatos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [pdfActual, setpdfActual] = useState("");
  const [idActualDelBien, setIdActualDelBien] = useState("")
  // Metodos para el modal del internamiento
  const [formulario, setFormulario] = useState({
    estado_del_bien: "",
    fecha: "",
    observaciones: "",
    documento_acta_entrega_recepcion: "",
    documento_oficio_regularizacion: "",
    // bien_id: "",
    tipo_bien: 1,
    area_oficina_seccion_id: "",
    personal_id: ""
  })

  let { estado_del_bien, fecha, observaciones } = formulario

  const [showModall, setShow] = useState(false);
  const [showModalReasignar, setshowModalReasignar] = useState(false);
  const [showModalInternar, setshowModalInternar] = useState(false);
  const handleClose = () => setShow(false);
  const handleCloseInternar = () => setshowModalInternar(false);
  const handleCloseReasignar = () => setshowModalReasignar(false);
  const handleShowModalInternarBien = () => setShow(true);
  const handleShowModalReasignarBien = () => setshowModalReasignar(true);

  const [documentoRecepcion, setDocumentoRecepcion] = useState(null)
  const [documentoRegularizacion, setDocumentoRegularizacion] = useState(null)

  const handleDocumentRecepcion = e => {
    setDocumentoRecepcion(e.target.files[0])
  }
  const handleDocumentRegularizacion = e => {
    setDocumentoRegularizacion(e.target.files[0])
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

  const handleSubmit = e => {
    e.preventDefault();


    const formData = new FormData();
    formData.append('estado_del_bien', formulario.estado_del_bien)
    formData.append('fecha', formulario.fecha)
    formData.append('observaciones', formulario.observaciones)
    // formData.append('documento_acta_entrega_recepcion', documentoRecepcion)
    // formData.append('documento_oficio_regularizacion', documentoRegularizacion)
    formData.append('bien_id', idActualDelBien)
    formData.append('tipo_bien', formulario.tipo_bien)


    if(documentoRecepcion!=null){
      formData.append('documento_acta_entrega_recepcion', documentoRecepcion)
    }else{
      formData.delete('documento_acta_entrega_recepcion', documentoRecepcion)      
    }

    if(documentoRegularizacion!==null){
      formData.append('documento_oficio_regularizacion', documentoRegularizacion)
    }else{
      formData.delete('documento_oficio_regularizacion', documentoRegularizacion)
    }

    postInternarBienFormato1(formData, config).then((rpta) => {
      if (rpta.status === 200) { //Si el status es OK, entonces redirecciono a la lista de usuarios
        setshowModalInternar(false)
        console.log("Datos subida correctamente")
        Swal.fire(
          'Internamiento Exitoso',
          'El internamiento fue exitoso',
          'success'
        )
        traerFormatos()
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


  const handleSubmitReasignacion = e => {

    e.preventDefault();

    const formDataReasignacion = new FormData();
    formDataReasignacion.append('estado_del_bien', formulario.estado_del_bien)
    formDataReasignacion.append('fecha:', formulario.fecha)
    formDataReasignacion.append('observaciones', formulario.observaciones)
    if(documentoRecepcion!=null){
      formDataReasignacion.append('documento_acta_entrega_recepcion', documentoRecepcion)
    }else{
      formDataReasignacion.delete('documento_acta_entrega_recepcion', documentoRecepcion)      
    }

    if(documentoRegularizacion!==null){
      formDataReasignacion.append('documento_oficio_regularizacion', documentoRegularizacion)
    }else{
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
            traerFormatos()

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

  // Aqui acaban los metodos para el modal de internamiento

  const [isOpen, setIsOpen] = useState(false);

  const showModal = (pdfActual) => {
    setpdfActual(pdfActual);
    setIsOpen(true);
  };
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

  //Variable "historial" que permite entrar al arreglo "historial" dentro de mi arreglo dataHistorial
  let { historial } = dataHistorial;
  const prueba = () => {

    if (idActualDelBien === "") {
      setCargando(true);
    } else {
      getHistorialFormatoById(idActualDelBien).then(rpta => {
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
  }, [idActualDelBien, historial, dataHistorial])
  // Metodos para traer el historial




  const hideModal = () => {
    setIsOpen(false);
  };

  const traerFormatos = () => {
    setCargando(true);
    getFormatos().then((rpta) => {
      //console.log(rpta);
      setFormatos(rpta.data);
      setCargando(false);
    });
  };

  useEffect(() => {
    traerFormatos();
  }, []);

  const eliminarFormato = (id) => {
    Swal.fire({
      title: "¿Seguro que deseas eliminar el bien ?",
      icon: "warning",
      text: "Los cambios serán irreversibles 😮",
      showCancelButton: true,
    }).then((rpta) => {
      if (rpta.isConfirmed) {
        deleteFormatoById(id).then((rpta) => {
          if (rpta.status === 200) {
            //Se comprueba que se eliminó correctamente
            traerFormatos(); //Se llama otra vez para setear la variable de estado y recargar la página automáticamente al borrar un usuario
          }
        });
      }
    });
  };

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

  const [generarReporte, setGenerarReporte] = useState("")
  const reportes = () => {
    getReporteFormato1Excel().then(() => {

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
                  <h5>Lista de Bienes del Formato 1</h5>
                  <Link to="/admin/bienes-internados/formato1" className="btn btn-warning">
                    {" "}
                    <i className="fa fa-list"></i> Lista de Bienes Internados
                  </Link>
                  <Button onClick={reportes} className="btn btn-success">
                    {" "}
                    <i className="fas fa-file-excel"></i> Generar Reporte
                  </Button>


                  <Link to={urlFormatoCrear} className="btn btn-primary ">
                    {" "}
                    <i className="fa fa-plus"></i> Crear un Bien
                  </Link>
                </div>

                <div className="row mt-2">
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
                        <div className="table-responsive miTabla ">
                          <table className="table table-bordered text-center">
                            <thead>
                              <tr>
                                <th>Id</th>
                                <th>Código</th>
                                {/* <th>Documento_nombre_original</th> */}
                                <th>Documento</th>
                                <th>Descripcion</th>
                                <th>Marca</th>
                                <th>Modelo</th>
                                <th>Serie</th>
                                <th>Tipo</th>
                                <th>Color</th>
                                <th>Dimensiones</th>
                                <th>Estado_bien</th>
                                <th>Fecha_adquisicion</th>
                                <th>Forma_adquisicion</th>
                                <th>Codigo Qr</th>
                                <th>Observaciones</th>
                                <th>Imagen_bien</th>


                                <th className="acciones">Acciones</th>
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
                              {formatos.map((objFormato, i) => {
                                console.log(objFormato)
                                return (
                                  <tr key={objFormato.id}>
                                    <td>{objFormato.id}</td>
                                    <td>{objFormato.codigo}</td>
                                    {/* <td>
                                    {objFormato.documento_nombre_original}
                                  </td> */}
                                    {/* <td>{objFormato.documento}</td> */}

                                    <td>
                                      <img
                                        className="tamaño-icono-pdf rounded mx-auto d-block"
                                        alt="some value"
                                        title={objFormato.documento_nombre_original}
                                        src={objFormato.icon_file}
                                        onClick={() =>
                                          showModal(objFormato.documento)
                                        }
                                      />
                                    </td>

                                    <td>{objFormato.descripcion}</td>
                                    <td>{objFormato.marca}</td>
                                    <td>{objFormato.modelo}</td>
                                    <td>{objFormato.serie}</td>
                                    <td>{objFormato.tipo}</td>
                                    <td>{objFormato.color}</td>
                                    <td>{objFormato.dimensiones}</td>
                                    <td>{objFormato.estado_bien}</td>
                                    <td>{objFormato.fecha_adquisicion}</td>
                                    <td>{objFormato.forma_adquisicion}</td>

                                    <td>
                                      <img
                                        className="tamaño-icono-pdf rounded mx-auto d-block"
                                        alt="some value"
                                        title="Codigo Qr del Bien"

                                        src={objFormato.codigo_qr || imgNoDisponible}
                                        onClick={() =>
                                          activarModalVIsualizardorImagen(objFormato.codigo_qr || imgNoDisponible, `Código QR de: ${objFormato.descripcion} `)
                                        }
                                      />
                                    </td>

                                    <td>{objFormato.observaciones}</td>
                                    {/* <td>{objFormato.imagen_bien}</td> */}
                                    <td>
                                      <img
                                        className="tamaño-icono-pdf rounded mx-auto d-block"
                                        alt="some value"
                                        title={objFormato.descripcion}
                                        src={objFormato.imagen_bien || imgNoDisponible}
                                        onClick={() =>
                                          activarModalVIsualizardorImagen(objFormato.imagen_bien || imgNoDisponible, objFormato.descripcion + " ")
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
                                          eliminarFormato(objFormato.id);
                                        }}
                                      >
                                        <i className="fa fa-trash"></i>
                                      </button>
                                      <Link
                                        to={`/admin/formatos/editar/${objFormato.id}`}
                                        className="btn btn-warning"
                                        title="Modificar"
                                      >
                                        {" "}
                                        <i className="fa fa-pencil"></i>
                                      </Link>

                                     

                                      <Button

                                        onClick={() => {
                                          showModalReasignarBien(objFormato.id)

                                        }}
                                        className="btn btn-info mx-1"
                                        title="Reasignar un Bien"
                                      >
                                        {" "}
                                        <i className="fas fa-clipboard-check"></i>
                                      </Button>
                                      <Button

                                        onClick={() => {
                                          showModalInternarBien(objFormato.id)

                                        }}
                                        className="btn btn-info"
                                        title="Internar un Bien"
                                      >
                                        {" "}
                                        <i className="fas fa-angle-double-down"></i>
                                      </Button>
                                      <Link
                                        // to={`formatos/editar/${objFormato.id}`}
                                        to={`/admin/formato1/historial/${objFormato.id}`}
                                        className="btn btn-info ml-1"
                                        title="Historial del bien"
                                      >
                                        {" "}
                                        <i className="fa fa-history"></i>
                                      </Link>

                                    </td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        </div>
                      )}
                  </div>
                </div>

                {/* <button type="button" className="btn btn-primary btn-lg btn-block mt-5 mb-5" onClick={handleShowModalInternarBien}>Internar un Bien</button> */}
                {/* <button type="button" className="btn btn-dark btn-lg btn-block mt-5 mb-5" onClick={handleShowModalReasignarBien}>Reasignar un Bien</button> */}




                <Modal show={showModalInternar} onHide={handleCloseInternar}>
                  <Modal.Header closeButton>
                    <Modal.Title>Internamiento de un bien del Formato 1</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <form onSubmit={handleSubmit}>
                      <div className="form-group">
                        <label htmlFor="">Estado del Bien:</label>
                        <input type="text" className="form-control"
                          value={estado_del_bien} name="estado_del_bien" onChange={handleChange} />
                      </div>
                      <div className="form-group">
                        <label htmlFor="">Fecha:</label>
                        <input type="date" className="form-control"
                          value={fecha} name="fecha" onChange={handleChange} />
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
                {/* Modal de Reasignar un Bien */}
                <Modal show={showModalReasignar} onHide={handleCloseReasignar}>
                  <Modal.Header closeButton>
                    <Modal.Title>Reasignación de un bien del Formato 1</Modal.Title>
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
                          value={estado_del_bien} name="estado_del_bien" onChange={handleChange} />
                      </div>
                      <div className="form-group">
                        <label htmlFor="">Observaciones: </label>
                        <textarea className="form-control" rows={4} cols={50}
                          value={observaciones} name="observaciones" onChange={handleChange} />
                      </div>
                      <div className="form-group">
                        <label htmlFor="">Fecha: </label>
                        <input type="date" className="form-control"
                          value={fecha} name="fecha" onChange={handleChange} />
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
            </div>
          </main>
        {/* Aqui llamo a mi componente que permite hacer uso del visualizadorImagenes */}
          <VisualizadorImagenes visible={modalImagenes} onClose={() => setmodalImagenes(false)} imagen={imagenBien} imagenDescripcion={imagenDescripcion} />

        </div>
      </div>
    </>
  );
};

export default Formato1ListPage;
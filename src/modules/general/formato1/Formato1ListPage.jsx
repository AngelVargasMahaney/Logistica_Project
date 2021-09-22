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
import { postInternarBienFormato1 } from "../../../services/internamientoFormato1Service";

const Formato1ListPage = () => {
  const urlFormatoCrear = "/admin/formatos/crear";
  const [formatos, setFormatos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [pdfActual, setpdfActual] = useState("");

  // Metodos para el modal del internamiento
  const [formulario, setFormulario] = useState({
    estado_del_bien: "",
    fecha: "",
    observaciones: "",
    documento_acta_entrega_recepcion: "",
    documento_oficio_regularizacion: "",
    bien_id: "",
    tipo_bien: 1
  })

  let { estado_del_bien, fecha, observaciones, bien_id, tipo_bien } = formulario

  const [showModall, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


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

  const handleSubmit = e => {
    e.preventDefault();


    const formData = new FormData();
    formData.append('estado_del_bien', formulario.estado_del_bien)
    formData.append('fecha:', formulario.fecha)
    formData.append('observaciones', formulario.observaciones)
    formData.append('documento_acta_entrega_recepcion', documentoRecepcion)
    formData.append('documento_oficio_regularizacion', documentoRegularizacion)
    formData.append('bien_id', formulario.bien_id)
    formData.append('tipo_bien', formulario.tipo_bien)
    const token = localStorage.getItem('token')

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`
      }
    }
    postInternarBienFormato1(formData, config).then((rpta) => {
      if (rpta.status === 200) { //Si el status es OK, entonces redirecciono a la lista de usuarios
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

  // Aqui acaban los metodos para el modal de internamiento

  const [isOpen, setIsOpen] = useState(false);

  const showModal = (pdfActual) => {
    setpdfActual(pdfActual);
    setIsOpen(true);
  };

  const hideModal = () => {
    setIsOpen(false);
  };

  const traerFormatos = () => {
    setCargando(true);
    getFormatos().then((rpta) => {
      console.log(rpta);
      setFormatos(rpta.data);
      setCargando(false);
    });
  };

  useEffect(() => {
    traerFormatos();
  }, []);

  const eliminarFormato = (id) => {
    Swal.fire({
      title: "¿Seguro que deseas eliminar?",
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
                  <Link to={urlFormatoCrear} className="btn btn-primary ">
                    {" "}
                    <i className="fa fa-plus"></i> Crear un Bien
                  </Link>
                </div>

                <div className="row mt-2">
                  <div className="col">
                    {cargando ? (
                      <div className="alert alert-info text-center">
                        <h4>Cargando ...</h4>
                        <div className="spinner-border text-info" role="status">
                          <span className="visually-hidden">Loading...</span>
                        </div>
                      </div>
                    ) : (
                      <div className="table-responsive miTabla ">
                        <table className="table table-bordered">
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
                              <th>Observaciones</th>
                              <th>Imagen_bien</th>
                              <th>Deleted_at</th>
                              <th>Created_at</th>
                              <th>Updated_at</th>

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
                                  <td>{objFormato.observaciones}</td>
                                  {/* <td>{objFormato.imagen_bien}</td> */}
                                  <td>
                                    <img
                                      className="tamaño-icono-pdf rounded mx-auto d-block"
                                      alt="some value"
                                      title={objFormato.documento_nombre_original}
                                      src={objFormato.icon_file}
                                      onClick={() =>
                                        showModal(objFormato.imagen_bien)
                                      }
                                    />
                                  </td>
                                  <td>{objFormato.deleted_at}</td>
                                  <td>{objFormato.created_at}</td>
                                  <td>{objFormato.updated_at}</td>

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
                                      to={`formatos/editar/${objFormato.id}`}
                                      className="btn btn-warning"
                                    >
                                      {" "}
                                      <i className="fa fa-pencil"></i>
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

                <button type="button" className="btn btn-primary btn-lg btn-block mt-5" onClick={handleShow}>Internar un Bien</button>
                <Link to="/admin/bienes-internados/formato1" className="btn btn-warning btn-lg btn-block mt-5">Ver Lista de Bienes Internados</Link>
              
            
                <Modal show={showModall} onHide={handleClose}>
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
                      <div className="form-group">
                        <label htmlFor="">Id del Bien:</label>
                        <input type="text" className="form-control"
                          value={bien_id} name="bien_id" onChange={handleChange} />
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
                    <Button variant="secondary" onClick={handleClose}>
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
  );
};

export default Formato1ListPage;

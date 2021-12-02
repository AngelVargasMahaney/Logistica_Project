import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import {
  deleteFormatoById,
  getFormatos,
} from "../../../services/formatoService";
import SearchIcon from "@material-ui/icons/Search";

import Swal from "sweetalert2";
import Modal from "react-bootstrap/Modal";
import { Button, Card, Image } from "react-bootstrap";
import { postInternarBienFormato1, postReasignarBienFormato1 } from "../../../services/internamientoFormato1Service";
import { getPersonal, getPersonalActivo } from "../../../services/personalService";
import { getHistorialFormatoById } from "../../../services/historialBienesService";
import imgNoDisponible from "../../../assets/23.png"
import { getAreaOficinaSeccion } from "../../../services/areaOficinaSeccionService";
import { getReporteFormato1Excel } from "../../../services/reportesService";
import VisualizadorImagenes from "../../modales/VisualizadorImagenes";
import DataTable, { Alignment } from 'react-data-table-component';
import { Avatar, IconButton, TextField } from "@material-ui/core";
import { Title } from "@material-ui/icons";
import CargandoComponte from "../../layout/CargandoComponente"
import SpinnerTable from "../../layout/SpinnerTable";
import MaterialTable from "material-table";
const Formato1ListPage = () => {

  const [filas, setFilas] = useState([])


  const history = useHistory()

  const tokens = localStorage.getItem('token')
  console.log(tokens)
  const urlFormatoCrear = "/admin/formatos/crear";
  const URL_EDITAR = "/admin/formatos/editar";
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
  const columns = [
    { title: 'Id', field: 'id', align: 'left' },
    { title: 'Descripcion', field: 'descripcion', align: 'left' },
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
    { title: 'Estado del bien', field: 'estado_bien', align: 'left' },
    { title: 'Fecha de Adquisición', field: 'fecha_adquisicion', align: 'left' },
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
  const columnss = [

    {
      name: 'Id',
      selector: row => row.id,
      sortable: true,
      maxWidth: "2px",
      reorder: true,
      center: true,
    },
    {

      name: 'Codigo',
      selector: row => row.codigo,
      sortable: true,
      reorder: true,
      center: true,

    },
    {

      name: 'Descripción',
      cell: row => row.descripcion,
      center: true,
      sortable: true,
      reorder: true,
      button: true

    },

    {
      name: 'Estado',

      selector: row => row.estado_bien,
      sortable: true,
      maxWidth: "2px",
      reorder: true,
      center: true,
    },
    {

      name: 'Fecha de Adquisición',
      selector: row => row.fecha_adquisicion,
      center: true,
      sortable: true,
      Width: "1px",
      reorder: true,

    },
    {

      name: 'Observaciones',

      selector: row =>
        <p title="Haga click en el texto para ver más detalles" onClick={() => showModalObservaciones(row.observaciones)}>{(row.observaciones)?.slice(0, 35).concat(" ...")}</p>
      ,
      style: {
        cursor: "pointer"
      },
      Width: "10px",
      sortable: true,
      center: true,
      reorder: true,
      wrap: true

    },
    {

      name: 'Acta',
      selector: row =>
        <td>
          {row.acta_icon ? (<img
            className="tamaño-icono-pdf rounded mx-auto d-block"
            alt="some value"
            title={row.acta_nombre}
            src={row.acta_icon}
            onClick={() =>
              showModal(row.acta)
            }
          />) : " "}

        </td>,

      center: true,
      sortable: true,
      Width: "1px",
      reorder: true,

    },
    {

      name: 'Oficio',
      selector: row =>
        <td>
          {row.oficio_icon ? (<img
            className="tamaño-icono-pdf rounded mx-auto d-block"
            alt="some value"
            title={row.oficio_nombre}
            src={row.oficio_icon}
            onClick={() =>
              showModal(row.oficio)
            }
          />) : " "}

        </td>,

      center: true,
      sortable: true,
      Width: "1px",
      reorder: true,

    },
    {

      name: 'Informe Técnico',
      selector: row =>

        <td>
          {row.informe_tecnico_icon ? (<img
            className="tamaño-icono-pdf rounded mx-auto d-block"
            alt="some value"
            title={row.informe_tecnico_nombre}
            src={row.informe_tecnico_icon}
            onClick={() =>
              showModal(row.informe_tecnico)
            }
          />) : " "}

        </td>,

      center: true,
      sortable: true,
      Width: "1px",
      reorder: true,

    },
    {

      name: 'Imagen del Bien',
      center: true,

      selector: row =>
        <IconButton>
          <Avatar
            variant="rounded"
            src={row.imagen_bien || imgNoDisponible}
            sx={{ width: 56, height: 56 }}
            alt="some value"
            title={row.descripcion}
            onClick={() => activarModalVIsualizardorImagen(row.imagen_bien || imgNoDisponible, row.descripcion + " ")}
          />
        </IconButton>,
      reorder: true,
    },
    {

      name: 'Código Qr',
      center: true,
      selector: row =>
        <IconButton>
          <Avatar
            variant="rounded"
            src={row.codigo_qr || imgNoDisponible}
            sx={{ width: 56, height: 56 }}
            alt="some value"
            title={row.descripcion}
            onClick={() => activarModalVIsualizardorImagen(row.codigo_qr || imgNoDisponible, `Código QR de: ${row.descripcion} `)}
          />
        </IconButton>,
      reorder: true,

    },
    {
      name: "Acciones",
      center: true,

      allowOverflow: true,
      cell: row => (
        <>
          <button
            data-toggle="tooltip"
            data-placement="top"
            title="Eliminar"
            className="btn btn-danger mx-1"
            onClick={() => {
              eliminarFormato(row.id);
            }}
          >
            <i className="fa fa-trash"></i>
          </button>
          <Link
            to={`/admin/formatos/editar/${row.id}`}
            className="btn btn-warning"
            title="Modificar"
          >
            {" "}
            <i className="fa fa-pencil"></i>
          </Link>
          <Button

            onClick={() => {
              showModalReasignarBien(row.id)

            }}
            className="btn btn-info mx-1"
            title="Reasignar un Bien"
          >
            {" "}
            <i className="fas fa-clipboard-check"></i>
          </Button>

          <Button

            onClick={() => {
              showModalInternarBien(row.id)

            }}
            className="btn btn-info"
            title="Internar un Bien"
          >
            {" "}
            <i className="fas fa-angle-double-down"></i>
          </Button>
          <Link
            // to={`formatos/editar/${row.id}`}
            to={`/admin/formato1/historial/${row.id}`}
            className="btn btn-info ml-1"
            title="Historial del bien"
          >
            {" "}
            <i className="fa fa-history"></i>
          </Link>

        </>
      ),

    }


  ]

  const customStyles = {
    rows: {
      style: {
        textAlign: "center" // override the row height
      },
    },
    headCells: {
      style: {
        textAlign: "center"
      },
    },
    cells: {
      style: {
        textAlign: "center"
      },
    },
  };
  const [showModalReasignar, setshowModalReasignar] = useState(false);
  const [showModalInternar, setshowModalInternar] = useState(false);
  const handleCloseInternar = () => setshowModalInternar(false);
  const handleCloseReasignar = () => setshowModalReasignar(false);

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
    formDataReasignacion.append('fecha', formulario.fecha)
    formDataReasignacion.append('observaciones', formulario.observaciones)
    if (acta !== null) {
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
    console.log(pdfActual)
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
    // }, [idActualDelBien, historial, dataHistorial])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idActualDelBien, showModalReasignar, showModalInternar])
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

  const [txtBuscar, setTxtBuscar] = useState('')
  function buscar(rows) {
    const columns = rows[0] && Object.keys(rows[0])
    return rows.filter((row) =>
      columns.some(
        (column) => row[column]?.toString().toLowerCase().indexOf(txtBuscar) > -1
      )
    )
  }

  //Aqui termina el estate del modal de Visualizador de Imagenes
  const legend = formatos.map(val =>
    val.codigo);
  console.log(formatos)
  return (
    <>

      <div className="home_content">
        <div>
          <main className="container-fluid mt-5">
            <div className="card">
              <div className="card-body bg-light">
                <h4 className="text-center letra__titulo">ACCIONES GENERALES</h4>
                <div className="row text-center border-bottom-0 my-3 rounded">
                  <div className="col-md-4">
                    <Link to="/admin/bienes-internados/formato1" className="btn btn-warning">
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
                    <Link to={urlFormatoCrear} className="btn btn-primary ">
                      {" "}
                      <i className="fa fa-plus"></i> Crear un Bien
                    </Link>
                  </div>
                </div>

                {/* <button type="button" className="btn btn-primary btn-lg btn-block mt-5 mb-5" onClick={handleShowModalInternarBien}>Internar un Bien</button> */}
                {/* <button type="button" className="btn btn-dark btn-lg btn-block mt-5 mb-5" onClick={handleShowModalReasignarBien}>Reasignar un Bien</button> */}

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
                              title={"Lista de Bienes del Formato 1"}

                              columns={columns}
                              data={formatos}
                              actions={[
                                {
                                  icon: () =>


                                    <i className="fas fa-trash" style={{ fontSize: '15px', color: "white", background: "#EC2300", padding: "5px", margin: "-5px", borderRadius: "5px" }} />,

                                  tooltip: "Eliminar Bien",
                                  onClick: (e, obj) => eliminarFormato(obj.id)
                                },
                                {
                                  icon: () =>

                                    <i className="fa fa-pencil" style={{ fontSize: '15px', color: "black", background: "#ffd500", padding: "5px", margin: "-5px", borderRadius: "5px" }} />

                                  ,
                                  tooltip: "Editar Bien",
                                  onClick: (e, obj) => history.push(`${URL_EDITAR}/${obj.id}`)
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
                                  onClick: (e, obj) => history.push(`/admin/formato1/historial/${obj.id}`)
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
                              localization={{
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
                          </div>)}
                  </div>
                </div>


                <Modal show={showModalInternar} onHide={handleCloseInternar}>
                  <Modal.Header closeButton>
                    <Modal.Title>Internamiento de un bien del Formato 1</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <form onSubmit={handleSubmit}>
                      <div className="form-group">
                        <label htmlFor="">Estado del Bien: </label>
                        <input type="text" className="form-control"
                          name="estado_del_bien" required onChange={handleChange} />
                      </div>
                      <div className="form-group">
                        <label htmlFor="">Fecha: </label>
                        <input type="date" className="form-control"
                          name="fecha" required onChange={handleChange} />
                      </div>
                      <div className="form-group">
                        <label htmlFor="">Observaciones: </label>
                        <input type="text" className="form-control"
                          name="observaciones" onChange={handleChange} />
                      </div>
                      <div className="form-group">
                        <label htmlFor="">Acta</label>
                        <input type="file" className="form-control"
                          name="acta" onChange={handleChangeDocsActa} />
                      </div>
                      <div className="form-group">
                        <label htmlFor="">Oficio: </label>
                        <input type="file" className="form-control"
                          name="oficio" onChange={handleChangeDocsOficio} />
                      </div>
                      <div className="form-group">
                        <label htmlFor="">Informe Técnico: </label>
                        <input type="file" className="form-control"
                          name="informe_tecnico" onChange={handleChangeDocsInformeTecnico} />
                      </div>
                      <div className="form-group" hidden>
                        <label htmlFor="">Id del Bien: </label>
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
                        <label htmlFor="">Acta</label>
                        <input type="file" className="form-control"
                          name="acta" onChange={handleChangeDocsActa} />
                      </div>
                      <div className="form-group">
                        <label htmlFor="">Oficio: </label>
                        <input type="file" className="form-control"
                          name="oficio" onChange={handleChangeDocsOficio} />
                      </div>
                      <div className="form-group">
                        <label htmlFor="">Informe Técnico: </label>
                        <input type="file" className="form-control"
                          name="informe_tecnico" onChange={handleChangeDocsInformeTecnico} />
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

          {/* Este es mi modal para visualizar documentos */}
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
            <Modal.Body>
              <p>
                {observacionesVer}
              </p>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={() => setModalObseraciones(false)}>Close</Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div >

    </>
  );
};

export default Formato1ListPage;
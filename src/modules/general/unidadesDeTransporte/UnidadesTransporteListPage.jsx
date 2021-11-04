import Button from '@restart/ui/esm/Button'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { deleteUnidadesTransporteById, getUnidadesTransporte } from '../../../services/unidadesTransporteService'
import AdminSidebar from '../../admin/components/AdminSidebar'
import GeneralNavBar from '../../layout/GeneralNavBar'
import VisualizadorImagenes from '../../modales/VisualizadorImagenes'
import imgNoDisponible from "../../../assets/23.png"
import Swal from 'sweetalert2'
import { Modal } from 'react-bootstrap'

const UnidadesTransporteListPage = () => {

    const [cargando, setCargando] = useState(true)
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

    const [modalImagenes, setmodalImagenes] = useState(false)
    const [imagenBien, setImagenBien] = useState("")
    const [imagenDescripcion, setImagenDescripcion] = useState("")
    const activarModalVIsualizardorImagen = (imagen, imagenDescripcion) => {
        setImagenDescripcion(imagenDescripcion)
        setImagenBien(imagen)
        setmodalImagenes(true)
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
                                <h5>Lista de bienes de Unidades de Transporte</h5>
                                <Link to="/admin/bienes-internados/equipo-policial" className="btn btn-warning">
                                    {" "}
                                    <i className="fa fa-list"></i> Lista de Bienes Internados
                                </Link>
                                <Button onClick={"reportes"} className="btn btn-success">
                                    {" "}
                                    <i className="fas fa-file-excel"></i> Generar Reporte
                                </Button>
                                <Link to={"/admin/unidades-transporte/crear"} className="btn btn-primary ">
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
                                                            <th>Placa Interna</th>
                                                            <th>Tipo de Vehículo</th>
                                                            <th>Documento de Alta</th>
                                                            <th>N° Chasis</th>
                                                            <th>N° Cilindros</th>
                                                            <th>Combustible</th>
                                                            <th>Estado del Vehículo</th>
                                                            <th>Vigencia SOAT</th>
                                                            <th>Ubicación</th>
                                                            <th>Imagen del Bien</th>


                                                            <th className="acciones"> Acciones</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            unidadesTransporte.map((obj, i) => {
                                                                return (
                                                                    <tr key={i}>
                                                                        <td>{obj.id}</td>
                                                                        <td>{obj.codigo}</td>
                                                                        <td>{obj.placa_interna}</td>
                                                                        <td>{obj.tipo_de_vehiculo}</td>
                                                                        <td>
                                                                            {obj.icon_file ? (<img
                                                                                className="tamaño-icono-pdf rounded mx-auto d-block"
                                                                                alt="some value"
                                                                                title={obj.documento_alta_nombre}
                                                                                src={obj.icon_file}
                                                                                onClick={() =>
                                                                                    showModal(obj.documento_alta)
                                                                                }
                                                                            />) : " "}

                                                                        </td>
                                                                        <td>{obj.nro_de_chasis}</td>
                                                                        <td>{obj.nro_de_cilindros}</td>
                                                                        <td>{obj.combustible}</td>
                                                                        <td>{obj.estado_vehiculo}</td>
                                                                        <td>{obj.soat_vigencia}</td>
                                                                        <td>{obj.ubicacion}</td>
                                                                        <td>
                                                                            <img
                                                                                className="tamaño-icono-pdf rounded mx-auto d-block"
                                                                                alt="some value"
                                                                                title={obj.placa_interna}
                                                                                src={obj.imagen_bien || imgNoDisponible}
                                                                                onClick={() =>
                                                                                    activarModalVIsualizardorImagen(obj.imagen_bien || imgNoDisponible, obj.placa_interna + " ")
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
                                                                                    eliminarUnidadTransporteById(obj.id);
                                                                                }}
                                                                            >
                                                                                <i className="fa fa-trash"></i>
                                                                            </button>
                                                                            <Link
                                                                                to={`/admin/unidades-transporte/editar/${obj.id}`}
                                                                                className="btn btn-warning"
                                                                                title="Modificar"
                                                                            >
                                                                                {" "}
                                                                                <i className="fa fa-pencil"></i>
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
            </div>
        </>
    )
}

export default UnidadesTransporteListPage

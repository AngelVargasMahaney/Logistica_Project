import React from 'react'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getHistorialBienAuxiliarById } from '../../../services/historialBienesService'
import Modal from "react-bootstrap/Modal";
import imgNoDisponible from "../../../assets/23.png"

const HistorialBienesAux = () => {
    const TITULO = "Bienes Auxiliares";
    const [data, setData] = useState([])
    const [cargando, setCargando] = useState(true)
    const [pdfActual, setpdfActual] = useState("");
    const [isOpen, setIsOpen] = useState(false);

    const params = useParams()
    const traerData = () => {
        setCargando(true)
        const idUrl = params.id;
        getHistorialBienAuxiliarById(idUrl).then(rpta => {
            setData(rpta.data);
            setCargando(false)
        })
    }
    const hideModal = () => {
        setIsOpen(false);
    };
    const showModal = (pdfActual) => {
        setpdfActual(pdfActual);
        setIsOpen(true);
    };
    useEffect(() => {
        traerData();
        // eslint-disable-next-line
    }, [])
    let { internamiento, historial } = data;
    return (
        < div className="public_content">
            <main className="container mt-3 mb-5">

                <div className="card">
                    <div className="card-body">

                        <div className="d-flex justify-content-between mb-3">
                            <h5>{TITULO}</h5>

                        </div>

                        <div className="row mt-2" >

                            <div className="col">
                                <div className="">
                                    <h3>{data.descripcion}</h3>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="font-weight-bold mb-2">Ingreso del Bien</div>
                                        <div className="mt-1">código: {data.codigo} </div>
                                        <div className="mt-1">descripción: {data.descripcion} </div>
                                        <div className="mt-1">marca: {data.marca} </div>
                                        <div className="mt-1">modelo: {data.modelo} </div>
                                        <div className="mt-1">serie: {data.serie} </div>
                                        <div className="mt-1">tipo: {data.tipo} </div>
                                        <div className="mt-1">color: {data.color} </div>
                                        <div className="mt-1">dimensiones: {data.dimensiones} </div>
                                        <div className="mt-1">estado del bien: {data.estado_bien} </div>
                                        <div className="mt-1">observaciones: {data.observaciones} </div>
                                        
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
                                                    <div className="d-inline-block" onClick={() =>
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
                                                    <div className="d-inline-block" onClick={() =>
                                                        showModal(internamiento.oficio)
                                                    }>
                                                        <img
                                                            className="icon-propios"
                                                            alt="some value"
                                                            title="hola"
                                                            src={internamiento.oficio_icon}

                                                        /> <span className="">{internamiento.oficio}</span>
                                                    </div>  </>) : (<></>)}
                                                </div>
                                               
                                                <div className="mt-1">Informe Técnico: {internamiento?.informe_tecnico ? (<>
                                                    <div className="d-inline-block" onClick={() =>
                                                        showModal(internamiento.informe_tecnico)
                                                    }>
                                                        <img
                                                            className="icon-propios"
                                                            alt="some value"
                                                            title="hola"
                                                            src={internamiento.informe_tecnico_icon}

                                                        /> <span className="">{internamiento.informe_tecnico}</span>
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
                                                <div className="border mb-2">
                                                    <span className="badge badge-pill badge-secondary">{j - i}</span>
                                                    {i === 0 && data.is_internado === false ? (<><span className="badge badge-pill badge-primary ml-1">UBICACIÓN ACTUAL</span></>) : (<></>)}

                                                    <div className="mt-1">Fecha: {item?.fecha} </div>
                                                    <div className="mt-1">Personal encargado: {personal?.grado} {personal?.nombre} {personal?.apellido} </div>
                                                    <div className="mt-1">Subunidad: {area_oficina_seccion?.subunidad?.nombre}</div>
                                                    <div className="mt-1">Area: {area_oficina_seccion?.nombre}</div>
                                                    <div className="mt-1">Estado del bien: {item?.estado_del_bien} </div>
                                                    <div className="mt-1">Observaciones: {item?.observaciones} </div>
                                                    <div className="mt-1">Acta: {item?.acta ? (<>
                                                        <div className="d-inline-block" onClick={() =>
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
                                                        <div className="d-inline-block" onClick={() =>
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
                                                        <div className="d-inline-block" onClick={() =>
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
                            </div></div>
                    </div>
                </div>
            </main>
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
    )
}

export default HistorialBienesAux

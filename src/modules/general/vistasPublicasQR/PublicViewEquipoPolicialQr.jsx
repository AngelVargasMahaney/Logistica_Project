import React from 'react'
import { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { getInfoEquipoPolicialById } from '../../../services/bienesPublicosService'

const PublicViewEquipoPolicialQr = () => {

    const TITULO = "Equipo Policial";
    const [data, setData] = useState([])
    const [cargando, setCargando] = useState(true)
    const params = useParams()
    const traerData = () => {
        setCargando(true)
        const idUrl = params.id;
        getInfoEquipoPolicialById(idUrl).then(rpta => {
            setData(rpta.data);
            setCargando(false)
        })
    }

    useEffect(() => {
        traerData();
    }, [])

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
                                <div className="mb-4">
                                    {data.is_internado ? (<>
                                        <div className="mt-1"> El bien se encuentra <span className="badge badge-pill badge-danger">INTERNADO</span></div>
                                    </>) : (<>
                                        <div className="mt-1"> El bien se encuentra <span className="badge badge-pill badge-success">OPERATIVO</span></div>
                                    </>)}
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <p className="font-weight-bold">Datos del Bien</p>
                                        <p>código: {data.codigo} </p>
                                        <p>descripción: {data.descripcion} </p>
                                        <p>marca: {data.marca} </p>
                                        <p>modelo: {data.modelo} </p>
                                        <p>serie: {data.serie} </p>
                                        <p>pais de fabricación: {data.pais_fabricacion} </p>
                                        <p>tasacion: {data.tasacion} </p>
                                        <p>estado del bien: {data.estado_bien} </p>
                                        <p>observaciones: {data.observaciones} </p>

                                    </div>
                                    <div className="col-md-6">

                                        <div className="mb-4">
                                            <img src={data.imagen_bien} className="rounded w-50" alt="Imagen del Bien" />
                                        </div>

                                        <div>
                                            <p className="font-weight-bold">Ubicación</p>
                                            <p>subunidad: {data.ubicacion?.area_oficina_seccion?.subunidad?.nombre} </p>
                                            <p>area: {data.ubicacion?.area_oficina_seccion?.nombre} </p>
                                        </div>
                                        <div>
                                            <p className="font-weight-bold">Personal Encargado</p>
                                            <p>grado: {data.ubicacion?.personal?.grado} </p>
                                            <p>nombre completo: {data.ubicacion?.personal?.nombre} {data.ubicacion?.personal?.apellido} </p>
                                            <p>cip: {data.ubicacion?.personal?.cip} </p>
                                        </div>
                                    </div>
                                </div>

                            </div></div>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default PublicViewEquipoPolicialQr

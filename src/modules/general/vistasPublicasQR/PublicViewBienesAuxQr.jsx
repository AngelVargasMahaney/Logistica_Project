import React from 'react'
import { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { getInfoBienAuxiliarById } from '../../../services/bienesPublicosService'


const PublicViewBienesAuxQr = () => {
    const TITULO = "Bienes Auxiliares";
    const [data, setData] = useState([])
    const [cargando, setCargando] = useState(true)
    const params = useParams()
    const traerData = () => {
        setCargando(true)
        const idUrl = params.id;
        getInfoBienAuxiliarById(idUrl).then(rpta => {
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
                                <div className="row">
                                    <div className="col-md-6">
                                        <p className="font-weight-bold">Datos del bien</p>
                                        <p>código: {data.codigo} </p>
                                        <p>descripción: {data.descripcion} </p>
                                        <p>marca: {data.marca} </p>
                                        <p>modelo: {data.modelo} </p>
                                        <p>serie: {data.serie} </p>
                                        <p>tipo: {data.tipo} </p>
                                        <p>color: {data.color} </p>
                                        <p>dimensiones: {data.dimensiones} </p>
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

export default PublicViewBienesAuxQr

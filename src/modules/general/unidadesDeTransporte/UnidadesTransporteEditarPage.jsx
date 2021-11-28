import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router';
import { getUnidadTransportById, putEditarUnidadTransporteById } from '../../../services/unidadesTransporteService';
import CargandoComponente from '../../layout/CargandoComponente';

const UnidadesTransporteEditarPage = () => {
    const [cargando, setCargando] = useState(false);
    const [formulario, setFormulario] = useState({
        codigo: "",
        placa_interna: "",
        placa_de_rodaje: "",
        tipo_de_vehiculo: "",
        marca: "",
        modelo: "",
        anio_de_fabricacion: "",
        combustible: "",
        nro_de_chasis: "",
        nro_de_motor: "",
        nro_de_cilindros: "",
        traccion: "",
        procedencia: "",
        estado_vehiculo: "",
        soat_vigencia: "",
        seguro_particular: "",
        valor_adquisicion: "",
        llanta_repuesto: "",
        llave_ruedas: "",
        gata: "",
        tablet: "",
        camaras: "",
        ubicacion: "",
        observaciones: "",
    })

    const handleChange = (e) => {
        setFormulario({
            ...formulario,
            [e.target.name]: e.target.value //Darle valor del name según el formulario
        })
    }
    const params = useParams()
    const config = { headers: { 'Content-Type': 'multipart/form-data' } }
    const history = useHistory()
    const [documentoActa, setDocumentoActa] = useState(null)
    const [documentoOficio, setDocumentoOficio] = useState(null)
    const [documentoInformeTecnico, setDocumentoInformeTecnico] = useState(null)
    const [imagenBien, setImagenBien] = useState(null)
    const handleChangeImages = e => {
        setImagenBien(e.target.files[0])
    }
    const handleChangeDocsActa = e => {
        setDocumentoActa(e.target.files[0])
    }
    const handleChangeDocsOficio = e => {
        setDocumentoOficio(e.target.files[0])
    }
    const handleChangeDocsInformeTecnico = e => {
        setDocumentoInformeTecnico(e.target.files[0])
    }

    const handleSubmit = (e) => {
        setCargando(true)
        e.preventDefault()
        const formData = new FormData()
        formData.append(`codigo`, formulario.codigo ? formulario.codigo : " ")
        formData.append(`placa_interna`, formulario.placa_interna ? formulario.placa_interna : " ")
        formData.append(`placa_de_rodaje`, formulario.placa_de_rodaje ? formulario.placa_de_rodaje : " ")
        formData.append(`tipo_de_vehiculo`, formulario.tipo_de_vehiculo ? formulario.tipo_de_vehiculo : " ")
        formData.append(`marca`, formulario.marca ? formulario.marca : " ")
        formData.append(`modelo`, formulario.modelo ? formulario.modelo : " ")
        formData.append(`anio_de_fabricacion`, formulario.anio_de_fabricacion ? formulario.anio_de_fabricacion : " ")
        formData.append(`combustible`, formulario.combustible ? formulario.combustible : " ")
        formData.append(`nro_de_chasis`, formulario.nro_de_chasis ? formulario.nro_de_chasis : " ")
        formData.append(`nro_de_motor`, formulario.nro_de_motor ? formulario.nro_de_motor : " ")
        formData.append(`nro_de_cilindros`, formulario.nro_de_cilindros ? formulario.nro_de_cilindros : " ")
        formData.append(`traccion`, formulario.traccion ? formulario.traccion : " ")
        formData.append(`procedencia`, formulario.procedencia ? formulario.procedencia : " ")
        formData.append(`estado_vehiculo`, formulario.estado_vehiculo ? formulario.estado_vehiculo : " ")
        formData.append(`soat_vigencia`, formulario.soat_vigencia ? formulario.soat_vigencia : " ")
        formData.append(`seguro_particular`, formulario.seguro_particular ? formulario.seguro_particular : " ")
        formData.append(`valor_adquisicion`, formulario.valor_adquisicion ? formulario.valor_adquisicion : " ")
        formData.append(`llanta_repuesto`, formulario.llanta_repuesto ? formulario.llanta_repuesto : " ")
        formData.append(`llave_ruedas`, formulario.llave_ruedas ? formulario.llave_ruedas : " ")
        formData.append(`gata`, formulario.gata ? formulario.gata : " ")
        formData.append(`tablet`, formulario.tablet ? formulario.tablet : " ")
        formData.append(`camaras`, formulario.camaras ? formulario.camaras : " ")
        formData.append(`ubicacion`, formulario.ubicacion ? formulario.ubicacion : " ")
        formData.append(`observaciones`, formulario.observaciones ? formulario.observaciones : " ")

        if (documentoActa !== null) {
            formData.append('acta', documentoActa)
        } else {
            formData.delete('acta', documentoActa)
        }
        if (documentoOficio !== null) {
            formData.append('oficio', documentoOficio)
        } else {
            formData.delete('oficio', documentoOficio)
        }
        if (documentoInformeTecnico !== null) {
            formData.append('informe_tecnico', documentoInformeTecnico)
        } else {
            formData.delete('informe_tecnico', documentoInformeTecnico)
        }
        if (imagenBien !== null) {
            formData.append('imagen_bien', imagenBien)
        } else {
            formData.delete('imagen_bien', imagenBien)
        }
        putEditarUnidadTransporteById(formData, config, params.id).then((rpta) => {
            if (rpta.status === 200) {
                history.push(`/admin/unidades-transporte`)
                setCargando(false)
            }
        })
    }

    useEffect(() => {
        setCargando(true)
        getUnidadTransportById(params.id).then((rpta) => {
            setFormulario({ ...rpta.data })
            setCargando(false)
        })
        // eslint-disable-next-line
    }, [])


    return (
        <>


            <div className="home_content">
                <main className="container">
                    <div className="row mt-4">
                        <div className="col">
                            <div className="card">
                                <div className="card-header">
                                    <h4 className="card-title">
                                        {"Formulario de Edición de Unidades de Transporte"}
                                    </h4>
                                </div>
                                <div className="card-body">
                                    <form onSubmit={handleSubmit}>
                                        <div className="row">
                                            <div className="col-4">
                                                <label htmlFor="" className="form-label">
                                                    Código
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control my-2"
                                                    placeholder="VHA-827"
                                                    name="codigo"

                                                    value={formulario.codigo}
                                                    onChange={handleChange}
                                                />
                                                <label htmlFor="" className="form-label">
                                                    Placa Interna
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control my-2"
                                                    placeholder="VHA-827"
                                                    name="placa_interna"

                                                    value={formulario.placa_interna}
                                                    onChange={handleChange}
                                                />

                                                <label htmlFor="" className="form-label">
                                                    Placa de Rodaje
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control my-2"
                                                    placeholder="AXK-221"
                                                    name="placa_de_rodaje"
                                                    value={formulario.placa_de_rodaje}

                                                    onChange={handleChange}
                                                />
                                                <label htmlFor="" className="form-label">
                                                    Tipo de Vehículo
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control my-2"
                                                    placeholder="Camioneta"
                                                    name="tipo_de_vehiculo"
                                                    value={formulario.tipo_de_vehiculo}
                                                    onChange={handleChange}
                                                />
                                                <label htmlFor="" className="form-label">
                                                    Seguro Particular
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control my-2"
                                                    placeholder="Si presenta"
                                                    name="seguro_particular"
                                                    value={formulario.seguro_particular}
                                                    onChange={handleChange}
                                                />
                                                <label htmlFor="" className="form-label">
                                                    Valor de Adquisición
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control my-2"
                                                    placeholder="S/. 25000"
                                                    name="valor_adquisicion"
                                                    value={formulario.valor_adquisicion}
                                                    onChange={handleChange}
                                                />
                                                <label htmlFor="" className="form-label">
                                                    Llanta de Repuesto
                                                </label>
                                                <select
                                                    required className="form-select custom-select mr-sm-2 my-2"
                                                    name="llanta_repuesto"
                                                    onChange={handleChange}
                                                    value={formulario.llanta_repuesto}
                                                >
                                                    <option value="Si" >Si</option>
                                                    <option value="No" >No</option>
                                                </select>



                                                <label htmlFor="" className="form-label">
                                                    Llave de Ruedas
                                                </label>
                                                <select
                                                    required className="form-select custom-select mr-sm-2 my-2"
                                                    name="llave_ruedas"
                                                    onChange={handleChange}
                                                    value={formulario.llave_ruedas}
                                                >
                                                    <option value="Si" >Si</option>
                                                    <option value="No" >No</option>
                                                </select>
                                                <label htmlFor="" className="form-label">
                                                    Gata
                                                </label>
                                                <select
                                                    required className="form-select custom-select mr-sm-2 my-2"
                                                    name="gata"
                                                    onChange={handleChange}
                                                    value={formulario.gata}
                                                >
                                                    <option value="Si" >Si</option>
                                                    <option value="No" >No</option>
                                                </select>
                                                <label htmlFor="" className="form-label">
                                                    Tablet
                                                </label>
                                                <select
                                                    required className="form-select custom-select mr-sm-2 my-2"
                                                    name="tablet"
                                                    onChange={handleChange}
                                                    value={formulario.tablet}
                                                >
                                                    <option value="Si" >Si</option>
                                                    <option value="No" >No</option>
                                                </select>


                                            </div>
                                            <div className="col-4">
                                                <label htmlFor="" className="form-label">
                                                    Ubicación
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control my-2"
                                                    placeholder="Contrainteligencia"
                                                    name="ubicacion"
                                                    value={formulario.ubicacion}
                                                    onChange={handleChange}
                                                />
                                                <label htmlFor="" className="form-label">
                                                    Observaciones
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control my-2"
                                                    placeholder="Presenta una ruptura en la puerta delantera"
                                                    name="observaciones"
                                                    value={formulario.observaciones}
                                                    onChange={handleChange}
                                                />
                                                <label htmlFor="" className="form-label">
                                                    Marca
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control my-2"
                                                    placeholder="Hyundai"
                                                    name="marca"
                                                    value={formulario.marca}
                                                    onChange={handleChange}
                                                />
                                                <label htmlFor="" className="form-label">
                                                    Modelo
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control my-2"
                                                    placeholder="Elantra"
                                                    name="modelo"
                                                    value={formulario.modelo}
                                                    onChange={handleChange}
                                                />
                                                <label htmlFor="" className="form-label">
                                                    Año de fabricación
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control my-2"
                                                    placeholder="2011"
                                                    name="anio_de_fabricacion"
                                                    value={formulario.anio_de_fabricacion}
                                                    onChange={handleChange}
                                                />



                                                <label htmlFor="" className="form-label">
                                                    Combustible
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control my-2"
                                                    placeholder="Petróleo"
                                                    name="combustible"
                                                    value={formulario.combustible}
                                                    onChange={handleChange}
                                                />
                                                <label htmlFor="" className="form-label">
                                                    Número de Motor
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control my-2"
                                                    placeholder="V2200"
                                                    name="nro_de_motor"
                                                    value={formulario.nro_de_motor}
                                                    onChange={handleChange}
                                                />
                                                <label htmlFor="" className="form-label">
                                                    Número de Cilindros
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control my-2"
                                                    placeholder="V6"
                                                    name="nro_de_cilindros"
                                                    value={formulario.nro_de_cilindros}
                                                    onChange={handleChange}
                                                />
                                                <label htmlFor="" className="form-label">
                                                    Traccion
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control my-2"
                                                    placeholder="Delantera"
                                                    name="traccion"
                                                    value={formulario.traccion}
                                                    onChange={handleChange}
                                                />
                                                <label htmlFor="" className="form-label">
                                                    Camaras
                                                </label>
                                                <select
                                                    required className="form-select custom-select mr-sm-2 my-2"
                                                    name="camaras"
                                                    onChange={handleChange}
                                                    value={formulario.camaras}
                                                >
                                                    <option value="Si" >Si</option>
                                                    <option value="No" >No</option>
                                                </select>
                                            </div>
                                            <div className="col-4">
                                                <label htmlFor="" className="form-label">
                                                    Documento: Acta
                                                </label>
                                                <input
                                                    type="file"
                                                    className="form-control my-2"
                                                    placeholder="Archivo.pdf"
                                                    name="acta"

                                                    onChange={handleChangeDocsActa}

                                                />
                                                <label htmlFor="" className="form-label">
                                                    Documento: Oficio
                                                </label>
                                                <input
                                                    type="file"
                                                    className="form-control my-2"
                                                    placeholder="Archivo.pdf"
                                                    name="oficio"

                                                    onChange={handleChangeDocsOficio}

                                                />
                                                <label htmlFor="" className="form-label">
                                                    Documento: Informe Técnico
                                                </label>
                                                <input
                                                    type="file"
                                                    className="form-control my-2"
                                                    placeholder="Archivo.pdf"
                                                    name="informe_tecnico"

                                                    onChange={handleChangeDocsInformeTecnico}

                                                />
                                                <label htmlFor="" className="form-label">
                                                    Número de Chasis
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control my-2"
                                                    placeholder="AW-289"
                                                    name="nro_de_chasis"
                                                    value={formulario.nro_de_chasis}
                                                    onChange={handleChange}
                                                />
                                                <label htmlFor="" className="form-label">
                                                    Procedencia
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control my-2"
                                                    placeholder="Contrainteligencia"
                                                    name="procedencia"
                                                    value={formulario.procedencia}
                                                    onChange={handleChange}
                                                />
                                                <label htmlFor="" className="form-label">
                                                    Estado del Vehículo
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control my-2"
                                                    placeholder="Operativo"
                                                    name="estado_vehiculo"
                                                    value={formulario.estado_vehiculo}
                                                    onChange={handleChange}
                                                />
                                                <label htmlFor="" className="form-label">
                                                    Vigencia del Soat
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control my-2"
                                                    placeholder="Activo"
                                                    name="soat_vigencia"
                                                    value={formulario.soat_vigencia}
                                                    onChange={handleChange}
                                                />
                                                <label htmlFor="" className="form-label">
                                                    Imagen del Bien
                                                </label>
                                                <input
                                                    type="file"
                                                    className="form-control my-2"
                                                    placeholder="VHX-514.png"
                                                    name="imagen_bien"
                                                    onChange={handleChangeImages}
                                                />
                                            </div>






                                        </div>







                                        <div>
                                            <div>
                                                {!cargando && <button className="btn btn-primary" type="submit">
                                                    <span className="mx-1"><i className="fa fa-floppy-o" aria-hidden="true"></i></span>   Guardar
                                                </button>}
                                                {cargando && <button className="btn btn-primary" type="submit" disabled={cargando}>
                                                    <span className="mx-1"><i className="fa fa-floppy-o" aria-hidden="true"></i></span>  Esperando respuesta del Servidor
                                                </button>}
                                                <button
                                                    className="btn btn-danger my-3 mx-3"
                                                    type="button"
                                                    onClick={() => {
                                                        history.push("/admin/unidades-transporte");
                                                    }}
                                                >
                                                    <span className="mx-1"><i className="fa fa-ban" aria-hidden="true"></i></span> Cancelar
                                                </button>
                                            </div>

                                        </div>

                                    </form>

                                </div>
                            </div>
                        </div>

                    </div>

                </main>
                {cargando && <CargandoComponente />}
            </div>

        </>
    )
}

export default UnidadesTransporteEditarPage

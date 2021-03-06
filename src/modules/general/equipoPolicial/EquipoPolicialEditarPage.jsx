import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router'
import { getEquipoPolicialById, postEditarEquipoPolicialById } from '../../../services/equipoPolicialService'


const EquipoPolicialEditarPage = () => {
    const [acta, setActa] = useState(null)
    const [oficio, setOficio] = useState(null)
    const [informeTecnico, setInformeTecnico] = useState(null)

    const [imagenBienEquipoPolicial, setImagenBienEquipoPolicial] = useState(null)
    const handleDocumentoActa = e => (setActa(e.target.files[0]))
    const handleDocumentoOficio= e => (setOficio(e.target.files[0]))
    const handleDocumentoInformeTecnico = e => (setInformeTecnico(e.target.files[0]))
    const handleImagenEquipoPolicial = e => (setImagenBienEquipoPolicial(e.target.files[0]))
    const [formulario, setFormulario] = useState({
        codigo: "",
        descripcion: "",
        marca: "",
        modelo: "",
        serie: "",
        pais_fabricacion: "",
        estado_bien: "",
        forma_adquisicion: "",
        anio_adquisicion: "",
        tasacion: "",
        tipo_afectacion: "",
        observaciones: "",
    })
    const handleChange = e => {
        setFormulario({
            ...formulario,
            [e.target.name]: e.target.value
        })
    }
    const params = useParams()
    const history = useHistory()
    const config = { headers: { 'Content-Type': 'multipart/form-data' } }

    const handleSubmit = e => {
        e.preventDefault()
        const formData = new FormData()
        formData.append(`codigo`, formulario.codigo ? formulario.codigo : "")
        formData.append(`descripcion`, formulario.descripcion ? formulario.descripcion : "")
        formData.append(`marca`, formulario.marca ? formulario.marca : "")
        formData.append(`modelo`, formulario.modelo ? formulario.modelo : "")
        formData.append(`serie`, formulario.serie ? formulario.serie : "")
        formData.append(`pais_fabricacion`, formulario.pais_fabricacion ? formulario.pais_fabricacion : "")
        formData.append(`estado_bien`, formulario.estado_bien ? formulario.estado_bien : "")
        formData.append(`forma_adquisicion`, formulario.forma_adquisicion ? formulario.forma_adquisicion : "")
        formData.append(`anio_adquisicion`, formulario.anio_adquisicion ? formulario.anio_adquisicion : "")
        formData.append(`tasacion`, formulario.tasacion ? formulario.tasacion : "")
        formData.append(`tipo_afectacion`, formulario.tipo_afectacion ? formulario.tipo_afectacion : "")
        formData.append(`observaciones`, formulario.observaciones ? formulario.observaciones : "")

        if (acta !== null) {
            formData.append(`acta`, acta)
        } else {
            formData.delete(`acta`, acta)
        }
        if (oficio !== null) {
            formData.append(`oficio`, oficio)
        } else {
            formData.delete(`oficio`, oficio)
        }
        if (informeTecnico !== null) {
            formData.append(`informe_tecnico`, informeTecnico)
        } else {
            formData.delete(`informe_tecnico`, informeTecnico)
        }
        if (imagenBienEquipoPolicial !== null) {
            formData.append(`imagen_bien`, imagenBienEquipoPolicial)
        } else {
            formData.delete(`imagen_bien`, imagenBienEquipoPolicial)
        }
        postEditarEquipoPolicialById(formData, config, params.id).then((rpta) => {
            if (rpta.status === 200) {
                history.push(`/admin/equipo-policial`)
            }
        })
    }
    useEffect(() => {
        getEquipoPolicialById(params.id).then((rpta) => {
            setFormulario({ ...rpta.data })
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
                                        {"Formulario de Edici??n de un Equipo Policial"}
                                    </h4>
                                </div>
                                <div className="card-body">

                                    <form onSubmit={handleSubmit}>
                                        <div className="row">
                                            <div className="col-6">
                                                <div>
                                                    <label htmlFor="" className="form-label my-2">Id</label>
                                                    <input type="text" className="form-control mt-2" required disabled value={formulario.id} />
                                                </div>
                                                <div>
                                                    <label htmlFor="" className="form-label my-2">
                                                        C??digo
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="form-control mt-2"
                                                        name="codigo"
                                                        value={formulario.codigo}
                                                        onChange={handleChange}
                                                    />
                                                </div>
                                                <div>
                                                    <label htmlFor="" className="form-label my-2">
                                                        Descripci??n
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="form-control mt-2"
                                                        required
                                                        name="descripcion"
                                                        value={formulario.descripcion}
                                                        onChange={handleChange}
                                                    />
                                                </div>
                                                <div>
                                                    <label htmlFor="" className="form-label my-2">
                                                        Marca
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="form-control mt-2"

                                                        name="marca"
                                                        value={formulario.marca}
                                                        onChange={handleChange}
                                                    />
                                                </div>
                                                <div>
                                                    <label htmlFor="" className="form-label my-2">
                                                        Modelo
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="form-control mt-2"

                                                        name="modelo"
                                                        value={formulario.modelo}
                                                        onChange={handleChange}
                                                    />
                                                </div>
                                                <div>
                                                    <label htmlFor="" className="form-label my-2">
                                                        Serie
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="form-control mt-2"

                                                        name="serie"
                                                        value={formulario.serie}
                                                        onChange={handleChange}
                                                    />
                                                </div>
                                                <div>
                                                    <label htmlFor="" className="form-label my-2">
                                                        Pais de Fabricaci??n
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="form-control mt-2"

                                                        name="pais_fabricacion"
                                                        value={formulario.pais_fabricacion}
                                                        onChange={handleChange}
                                                    />
                                                </div>

                                                <div>
                                                    <label htmlFor="" className="form-label my-2">
                                                        Estado del Bien
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="form-control mt-2"
                                                        required
                                                        name="estado_bien"
                                                        value={formulario.estado_bien}
                                                        onChange={handleChange}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-6">
                                                <div>
                                                    <label htmlFor="" className="form-label my-2">
                                                        Forma de Adquisici??n
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="form-control mt-2"

                                                        name="forma_adquisicion"
                                                        value={formulario.forma_adquisicion}
                                                        onChange={handleChange}
                                                    />
                                                </div>
                                                <div>
                                                    <label htmlFor="" className="form-label my-2">
                                                        Fecha de Adquisici??n
                                                    </label>
                                                    <input
                                                        type="date"
                                                        className="form-control mt-2"

                                                        name="anio_adquisicion"
                                                        value={formulario.anio_adquisicion}
                                                        onChange={handleChange}
                                                    />
                                                </div>
                                                <div>
                                                    <label htmlFor="" className="form-label my-2">
                                                        Tasaci??n
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="form-control mt-2"

                                                        name="tasacion"
                                                        value={formulario.tasacion}
                                                        onChange={handleChange}
                                                    />
                                                </div>
                                                <div>
                                                    <label htmlFor="" className="form-label my-2">
                                                        Tipo de Afectaci??n
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="form-control mt-2"

                                                        name="tipo_afectacion"
                                                        value={formulario.tipo_afectacion}
                                                        onChange={handleChange}
                                                    />
                                                </div>
                                                <div>
                                                    <label htmlFor="" className="form-label my-2">
                                                        Observaciones
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="form-control mt-2"
                                                        name="observaciones"
                                                        value={formulario.observaciones}
                                                        onChange={handleChange}
                                                    />
                                                </div>

                                                <div>
                                                    <label htmlFor="" className="form-label my-2">
                                                        Acta
                                                    </label>
                                                    <input
                                                        type="file"
                                                        className="form-control mt-2"

                                                        name="acta"

                                                        onChange={handleDocumentoActa}
                                                    />
                                                </div>
                                                <div>
                                                    <label htmlFor="" className="form-label my-2">
                                                        Oficio
                                                    </label>
                                                    <input
                                                        type="file"
                                                        className="form-control mt-2"

                                                        name="oficio"

                                                        onChange={handleDocumentoOficio}
                                                    />
                                                </div>
                                                <div>
                                                    <label htmlFor="" className="form-label my-2">
                                                        Informe T??cnico
                                                    </label>
                                                    <input
                                                        type="file"
                                                        className="form-control mt-2"

                                                        name="informe_tecnico"

                                                        onChange={handleDocumentoInformeTecnico}
                                                    />
                                                </div>

                                                <div>
                                                    <label htmlFor="" className="form-label my-2">
                                                        Imagen
                                                    </label>
                                                    <input
                                                        type="file"
                                                        className="form-control mt-2"

                                                        name="imagen_bien"

                                                        onChange={handleImagenEquipoPolicial}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <button className="btn btn-primary" type="submit">
                                                <span className="mx-1"><i className="fa fa-floppy-o" aria-hidden="true"></i></span>   Guardar
                                            </button>
                                            <button
                                                className="btn btn-danger my-3 mx-3"
                                                type="button"
                                                onClick={() => {
                                                    history.push(`/admin/equipo-policial`);
                                                }}
                                            >
                                                <span className="mx-1"><i className="fa fa-ban" aria-hidden="true"></i></span> Cancelar
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </>
    )
}

export default EquipoPolicialEditarPage

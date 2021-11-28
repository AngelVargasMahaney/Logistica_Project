import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router'
import { getBienFormato1ById, postEditarFormato1ById } from '../../../services/formatoService'


const Formato1EditarPage = () => {
    // Estados y handlers, para el manejo de documentos e imágenes
    const [acta, setActa] = useState(null)
    const [oficio, setOficio] = useState(null)
    const [informeTecnico, setInformeTecnico] = useState(null)
    const [imagenBienFormato1, setImagenBienFormato1] = useState(null)
    const handleDocumentoActa = e => { setActa(e.target.files[0]) }
    const handleDocumentoOficio = e => { setOficio(e.target.files[0]) }
    const handleDocumentoInformeTecnico = e => { setInformeTecnico(e.target.files[0]) }
    const handleImagenFormato1 = e => { setImagenBienFormato1(e.target.files[0]) }
    //
    const [formulario, setFormulario] = useState({
        codigo:"",
        descripcion: "",
        marca: "",
        modelo: "",
        serie: "",
        tipo: "",
        color: "",
        dimensiones: "",
        estado_bien: "",
        fecha_adquisicion: "",
        forma_adquisicion: "",
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
        formData.append(`codigo`, formulario.codigo ? formulario.codigo : " ")
        formData.append(`descripcion`, formulario.descripcion ? formulario.descripcion : " ")
        formData.append(`marca`, formulario.marca ? formulario.marca : " ")
        formData.append(`modelo`, formulario.modelo ? formulario.modelo : " ")
        formData.append(`serie`, formulario.serie ? formulario.serie : " ")
        formData.append(`tipo`, formulario.tipo ? formulario.tipo : " ")
        formData.append(`color`, formulario.color ? formulario.color : " ")
        formData.append(`dimensiones`, formulario.dimensiones ? formulario.dimensiones : " ")
        formData.append(`estado_bien`, formulario.estado_bien ? formulario.estado_bien : " ")
        formData.append(`fecha_adquisicion`, formulario.fecha_adquisicion ? formulario.fecha_adquisicion : " ")
        formData.append(`forma_adquisicion`, formulario.forma_adquisicion ? formulario.forma_adquisicion : " ")
        formData.append(`observaciones`, formulario.observaciones ? formulario.observaciones : " ")

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
        if (imagenBienFormato1 !== null) {
            formData.append(`imagen_bien`, imagenBienFormato1)
        } else {
            formData.delete(`imagen_bien`, imagenBienFormato1)
        }

        postEditarFormato1ById(formData, config, params.id).then((rpta) => {
            if (rpta.status === 200) {
                history.push(`/admin/formatos`)
            }
        })

    }

    useEffect(() => {
        getBienFormato1ById(params.id).then((rpta) => {
            setFormulario({ ...rpta.data })
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
                                        {"Formulario de Edición de un Bien del Formato 1"}
                                    </h4>
                                </div>
                                <div className="card-body">

                                    <form onSubmit={handleSubmit}>
                                        <div>
                                            <label htmlFor="" className="form-label my-2">Id</label>
                                            <input type="text" className="form-control mt-2" required disabled value={formulario.id} />
                                        </div>
                                        <div>
                                            <label htmlFor="" className="form-label my-2">
                                                Código
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control mt-2"
                                                required
                                                name="codigo"
                                                value={formulario.codigo}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="" className="form-label my-2">
                                                Descripción
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
                                                Tipo de Material
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control mt-2"
                                                name="tipo"
                                                value={formulario.tipo}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="" className="form-label my-2">
                                                Color
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control mt-2"
                                                name="color"
                                                value={formulario.color}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="" className="form-label my-2">
                                                Dimensiones
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control mt-2"
                                                name="dimensiones"
                                                value={formulario.dimensiones}
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
                                                Fecha de Adquisición
                                            </label>
                                            <input
                                                type="date"
                                                className="form-control mt-2"
                                                name="fecha_adquisicion"
                                                value={formulario.fecha_adquisicion}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="" className="form-label my-2">
                                                Forma de Adquisición
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
                                                Informe Técnico
                                            </label>
                                            <input
                                                type="file"
                                                className="form-control mt-2"

                                                name="documento"

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

                                                onChange={handleImagenFormato1}
                                            />
                                        </div>

                                        <div>
                                            <button className="btn btn-primary" type="submit">
                                                <span className="mx-1"><i className="fa fa-floppy-o" aria-hidden="true"></i></span>   Guardar
                                            </button>
                                            <button
                                                className="btn btn-danger my-3 mx-3"
                                                type="button"
                                                onClick={() => {
                                                    history.push(`/admin/formatos`);
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

export default Formato1EditarPage

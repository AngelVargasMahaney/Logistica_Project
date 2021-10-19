import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router'
import { getEquipoPolicial, getEquipoPolicialById, postEditarEquipoPolicialById } from '../../../services/equipoPolicialService'
import AdminSidebar from '../../admin/components/AdminSidebar'
import GeneralNavBar from '../../layout/GeneralNavBar'

const EquipoPolicialEditarPage = () => {
    const [documentoEquipoPolicial, setDocumentoEquipoPolicial] = useState(null)
    const [imagenBienEquipoPolicial, setImagenBienEquipoPolicial] = useState(null)
    const handleDocumentoEquipoPolicial = e => (setDocumentoEquipoPolicial(e.target.files[0]))
    const handleImagenEquipoPolicial = e => (setImagenBienEquipoPolicial(e.target.files[0]))
    const [formulario, setFormulario] = useState({
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
        formData.append(`descripcion`, formulario.descripcion)
        formData.append(`marca`, formulario.marca)
        formData.append(`modelo`, formulario.modelo)
        formData.append(`serie`, formulario.serie)
        formData.append(`pais_fabricacion`, formulario.pais_fabricacion)
        formData.append(`estado_bien`, formulario.estado_bien)
        formData.append(`forma_adquisicion`, formulario.forma_adquisicion)
        formData.append(`anio_adquisicion`, formulario.anio_adquisicion)
        formData.append(`tasacion`, formulario.tasacion)
        formData.append(`tipo_afectacion`, formulario.tipo_afectacion)
        formData.append(`observaciones`, formulario.observaciones)

        if (documentoEquipoPolicial !== null) {
            formData.append(`documento`, documentoEquipoPolicial)
        } else {
            formData.delete(`documento`, documentoEquipoPolicial)
        }
        if (imagenBienEquipoPolicial !== null) {
            formData.append(`imagen_bien`, imagenBienEquipoPolicial)
        } else {
            formData.delete(`imagen_bien`, imagenBienEquipoPolicial)
        }
        postEditarEquipoPolicialById(formData, config, params.id).then((rpta) => {
            if (rpta.status === 200) {
                history.push(`admin/equipo-policial`)
            }
        })
    }
    useEffect(() => {
        getEquipoPolicialById(params.id).then((rpta) => {
            setFormulario({ ...rpta.data })
        })
    }, [])

    return (
        <>
            <AdminSidebar />
            <GeneralNavBar />
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
                                                required
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
                                                required
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
                                                required
                                                name="serie"
                                                value={formulario.serie}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="" className="form-label my-2">
                                                Pais de Fabricación
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control mt-2"
                                                required
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
                                        <div>
                                            <label htmlFor="" className="form-label my-2">
                                                Forma de Adquisición
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control mt-2"
                                                required
                                                name="forma_adquisicion"
                                                value={formulario.forma_adquisicion}
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
                                                required
                                                name="anio_adquisicion"
                                                value={formulario.anio_adquisicion}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="" className="form-label my-2">
                                                Tasación
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control mt-2"
                                                required
                                                name="tasacion"
                                                value={formulario.tasacion}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="" className="form-label my-2">
                                                Tipo de Afectación
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control mt-2"
                                                required
                                                name="tipo_afectacion"
                                                value={formulario.tipo_afectacion}
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
                                                required
                                                name="Observaciones"
                                                value={formulario.observaciones}
                                                onChange={handleChange}
                                            />
                                        </div>

                                        <div>
                                            <label htmlFor="" className="form-label my-2">
                                                Documento
                                            </label>
                                            <input
                                                type="file"
                                                className="form-control mt-2"

                                                name="documento"

                                                onChange={handleDocumentoEquipoPolicial}
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

                                        <div>
                                            <button className="btn btn-primary" type="submit">
                                                <span className="mx-1"><i class="fa fa-floppy-o" aria-hidden="true"></i></span>   Guardar
                                            </button>
                                            <button
                                                className="btn btn-danger my-3 mx-3"
                                                type="button"
                                                onClick={() => {
                                                    history.push(`/admin/equipo-policial`);
                                                }}
                                            >
                                                <span className="mx-1"><i class="fa fa-ban" aria-hidden="true"></i></span> Cancelar
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

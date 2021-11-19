import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router';
import { getBienDirinById, postEditarBienDirinById } from '../../../services/bienesDirinService';
import AdminSidebar from '../../admin/components/AdminSidebar';
import CargandoComponente from '../../layout/CargandoComponente';
import GeneralNavBar from '../../layout/GeneralNavBar';

const BienesDirinEditarPage = () => {
    const [cargando, setCargando] = useState(false);
    const [formulario, setFormulario] = useState({
        codigo: "",
        correl: "",
        denominacion: "",
        marca: "",
        modelo: "",
        tipo: "",
        color: "",
        serie: "",
        estado_bien: "",
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
     const handleDocumentoActa = e => {
        setDocumentoActa(e.target.files[0])
    }
    const handleDocumentoOficio = e => {
        setDocumentoOficio(e.target.files[0])
    }
    const handleDocumentoInformeTecnico = e => {
        setDocumentoInformeTecnico(e.target.files[0])
    }
    const handleSubmit = (e) => {
        setCargando(true)
        e.preventDefault() //Evito que se refresque la página
        // postUsuario({ ...formulario }).then((rpta) => { //Copia del formulario
        //     console.log(rpta)
        // })
        //console.log(formulario)
        const formData = new FormData()
        formData.append(`codigo`, formulario.codigo)
        formData.append(`correl`, formulario.correl)
        formData.append(`denominacion`, formulario.denominacion)
        formData.append(`marca`, formulario.marca)
        formData.append(`modelo`, formulario.modelo)
        formData.append(`tipo`, formulario.tipo)
        formData.append(`color`, formulario.color)
        formData.append(`serie`, formulario.serie)
        formData.append(`estado_bien`, formulario.estado_bien)
        formData.append(`observaciones`, formulario.observaciones)

        if (documentoActa != null) {
            formData.append('acta', documentoActa)
        } else {
            formData.delete('acta', documentoActa)
        }
        if (documentoOficio != null) {
            formData.append('oficio', documentoOficio)
        } else {
            formData.delete('oficio', documentoOficio)
        }
        if (documentoInformeTecnico != null) {
            formData.append('informe_tecnico', documentoInformeTecnico)
        } else {
            formData.delete('informe_tecnico', documentoInformeTecnico)
        }
        if (imagenBien !== null) {
            formData.append('imagen_bien', imagenBien)
        } else {
            formData.delete('imagen_bien', imagenBien)
        }
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }

        postEditarBienDirinById(formData, config, params.id).then((rpta) => {
            if (rpta.status === 200) {
                history.push(`/admin/bienes-dirin`)
                setCargando(false)
            }
        })
    }
    useEffect(() => {
        setCargando(true)
        getBienDirinById(params.id).then((rpta) => {
            setFormulario({ ...rpta.data })
            setCargando(false)
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
                                        {"Formulario de Edición de Bienes Dirin"}
                                    </h4>
                                </div>
                                <div className="card-body">
                                    <form onSubmit={handleSubmit}>
                                        <div className="row">
                                            <div className="col-6">
                                                <label htmlFor="" className="form-label">
                                                    Código
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control my-2"
                                                    placeholder="BD-27182"
                                                    name="codigo"
                                                    required
                                                    value={formulario.codigo}
                                                    onChange={handleChange}
                                                />
                                                <label htmlFor="" className="form-label">
                                                    Correl
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control my-2"
                                                    placeholder="ACH-123"
                                                    name="correl"
                                                    required
                                                    value={formulario.correl}
                                                    onChange={handleChange}
                                                />
                                                <label htmlFor="" className="form-label">
                                                    Denominación
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control my-2"
                                                    placeholder="Archivador de Metal"
                                                    name="denominacion"
                                                    required
                                                    value={formulario.denominacion}
                                                    onChange={handleChange}
                                                />


                                                <label htmlFor="" className="form-label">
                                                    Marca
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control my-2"
                                                    placeholder="EPX-2"
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
                                                    placeholder="Cuadrado"
                                                    name="modelo"
                                                    value={formulario.modelo}
                                                    onChange={handleChange}
                                                />
                                                <label htmlFor="" className="form-label">
                                                    Tipo
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control my-2"
                                                    placeholder="Sobremesa"
                                                    name="tipo"
                                                    value={formulario.tipo}
                                                    onChange={handleChange}
                                                />
                                                <label htmlFor="" className="form-label">
                                                    Color
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control my-2"
                                                    placeholder="Gris"
                                                    name="color"
                                                    value={formulario.color}
                                                    onChange={handleChange}
                                                />

                                            </div>
                                            <div className="col-6">
                                                <label htmlFor="" className="form-label">
                                                    Serie
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control my-2"
                                                    placeholder="AX-221"
                                                    name="serie"
                                                    value={formulario.serie}
                                                    onChange={handleChange}
                                                />
                                                <label htmlFor="" className="form-label">
                                                    Documento: Acta
                                                </label>
                                                <input
                                                    type="file"
                                                    className="form-control my-2"
                                                    placeholder="Archivo.pdf"
                                                    name="documento"

                                                    onChange={handleDocumentoActa}

                                                />
                                                <label htmlFor="" className="form-label">
                                                    Documento: Oficio
                                                </label>
                                                <input
                                                    type="file"
                                                    className="form-control my-2"
                                                    placeholder="Archivo.pdf"
                                                    name="documento"

                                                    onChange={handleDocumentoOficio}

                                                />
                                                <label htmlFor="" className="form-label">
                                                    Documento: Informe Técnico
                                                </label>
                                                <input
                                                    type="file"
                                                    className="form-control my-2"
                                                    placeholder="Archivo.pdf"
                                                    name="documento"

                                                    onChange={handleDocumentoInformeTecnico}

                                                />
                                                <label htmlFor="" className="form-label">
                                                    Estado del Bien
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control my-2"
                                                    placeholder="Funcional"
                                                    name="estado_bien"
                                                    value={formulario.estado_bien}
                                                    onChange={handleChange}
                                                />
                                                <label htmlFor="" className="form-label">
                                                    Observaciones
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control my-2"
                                                    placeholder="Presenta una ruptura"
                                                    name="observaciones"
                                                    value={formulario.observaciones}
                                                    onChange={handleChange}
                                                />

                                                <label htmlFor="" className="form-label">
                                                    Imagen del Bien
                                                </label>
                                                <input
                                                    type="file"
                                                    className="form-control my-2"
                                                    placeholder="Archivador.png"
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
                                                        history.push("/admin/bienes-dirin");
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

export default BienesDirinEditarPage

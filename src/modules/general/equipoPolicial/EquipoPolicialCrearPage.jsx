import React, { useState } from 'react'

import { useHistory } from 'react-router-dom'


import { postEquipoPolicialFiles } from '../../../services/equipoPolicialService';


const EquipoPolicialCrearPage = () => {
    const TITULO = "Formulario de Registro de Equipo Policial";
    const HISTORY = "/admin/equipo-policial";
    //Variable de estado que se encarga de manejar los campos de nuestro formulario que servirán para llenar la bd (tener en cuenta los campos que el back-end envió, ver documentación)
    const [formulario, setFormulario] = useState({
        codigo: "",
        documento: "",
        descripcion: "",
        marca: "",
        modelo: "",
        serie: "",
        pais_fabricacion: "",
        estado_bien: "",
        fecha_adquisicion: "",
        forma_adquisicion: "",
        tasacion: "",
        tipo_afectacion:"",
        observaciones: "",
        imagen_bien: ""
    })
    const history = useHistory()

    const [acta, setActa] = useState(null)
    const [oficio, setOficio] = useState(null)
    const [informeTecnico, setInformeTecnico] = useState(null)
    const [imagen_bien, setImagen_bien] = useState(null)
    const handleChangeDocsActa = e => {
        setActa(e.target.files[0])
    }
    const handleChangeDocsOficio = e => {
        setOficio(e.target.files[0])
    }
    const handleChangeDocsInformeTecnico = e => {
        setInformeTecnico(e.target.files[0])
    }
    const handleChangeImages = e => {
        setImagen_bien(e.target.files[0])
    }


    //Desestructuro los campos del formulario, con el objetivo de evitar poner formulario.valor en cada atributo del forumario (por limpieza de código)
    let {
        codigo,
        descripcion,
        marca,
        modelo,
        serie,
        pais_fabricacion,
        estado_bien,
        fecha_adquisicion,
        forma_adquisicion,
        tasacion,
        tipo_afectacion,
        observaciones,
    } = formulario

    // Cada vez que se dispara el evento onChange del formulario, se llama a esta funcion para manejar el envío de datos
    const handleChange = (e) => {
        setFormulario({
            ...formulario,
            [e.target.name]: e.target.value //Darle valor del name según el formulario
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()


        const formData = new FormData()
        formData.append('codigo', codigo)
        formData.append('descripcion', descripcion)
        formData.append('marca', marca)
        formData.append('modelo', modelo)
        formData.append('serie', serie)
        formData.append('pais_fabricacion', pais_fabricacion)
        formData.append('estado_bien', estado_bien)
        formData.append('anio_adquisicion', fecha_adquisicion)
        formData.append('forma_adquisicion', forma_adquisicion)
        formData.append('tasacion', tasacion)
        formData.append('tipo_afectacion', tipo_afectacion)
        formData.append('observaciones', observaciones)
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
        if (imagen_bien !== null) {
            formData.append('imagen_bien', imagen_bien)
        } else {
            formData.delete('imagen_bien', imagen_bien)
        }

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }

        postEquipoPolicialFiles(formData, config).then((rpta) => {
            console.log(rpta)
            if (rpta.status === 200) { //Si el status es OK, entonces redirecciono a la lista de usuarios
                history.push(HISTORY)
            }
        })
    }


    return (
        <>
           
            <div className="home_content">
                <main className="container">
                    <div className="row mt-4">
                        <div className="col">
                            <div className="card">
                                <div className="card-header">
                                    <h4 className="card-title">
                                        {TITULO}
                                    </h4>
                                </div>
                                <div className="card-body">

                                    <form onSubmit={handleSubmit}>
                                        <div className="row">
                                            <div className="col-6">
                                                <label htmlFor="" className="form-label">
                                                    Codigo
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control my-2"
                                                    name="codigo"
                                                    value={codigo}
                                                    onChange={handleChange}
                                                />

                                                <label htmlFor="" className="form-label">
                                                    Descripción
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control my-2"
                                                    name="descripcion"
                                                    value={descripcion}
                                                    required
                                                    onChange={handleChange}
                                                />
                                                <label htmlFor="" className="form-label">
                                                    Acta
                                                </label>
                                                <input
                                                    type="file"
                                                    className="form-control my-2"
                                                    placeholder="Archivo.pdf"
                                                    name="acta"
                                                    onChange={handleChangeDocsActa}

                                                />
                                                <label htmlFor="" className="form-label">
                                                    Oficio
                                                </label>
                                                <input
                                                    type="file"
                                                    className="form-control my-2"
                                                    placeholder="Archivo.pdf"
                                                    name="oficio"
                                                    onChange={handleChangeDocsOficio}

                                                />
                                                <label htmlFor="" className="form-label">
                                                    Informe Técnico
                                                </label>
                                                <input
                                                    type="file"
                                                    className="form-control my-2"
                                                    placeholder="Archivo.pdf"
                                                    name="informe_tecnico"
                                                    onChange={handleChangeDocsInformeTecnico}

                                                />
                                                <label htmlFor="" className="form-label">
                                                    Marca
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control my-2"
                                                    name="marca"
                                                    value={marca}
                                                    onChange={handleChange}
                                                />

                                                <label htmlFor="" className="form-label">
                                                    Modelo
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control my-2"
                                                    name="modelo"
                                                    value={modelo}
                                                    onChange={handleChange}
                                                />
                                                <label htmlFor="" className="form-label">
                                                    Serie
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control my-2"
                                                    name="serie"
                                                    value={serie}
                                                    onChange={handleChange}
                                                />



                                                <label htmlFor="" className="form-label">
                                                    Pais de Fabricación
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control my-2"
                                                    name="pais_fabricacion"
                                                    value={pais_fabricacion}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                            <div className="col-6">
                                                <label htmlFor="" className="form-label">
                                                    Estado del Bien
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control my-2"
                                                    name="estado_bien"
                                                    value={estado_bien}
                                                    required
                                                    onChange={handleChange}
                                                />
                                                <label htmlFor="" className="form-label">
                                                    Forma de Adquisición
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control my-2"
                                                    name="forma_adquisicion"
                                                    value={forma_adquisicion}
                                                    onChange={handleChange}
                                                />
                                                <label htmlFor="" className="form-label">
                                                    Fecha de Adquisicion
                                                </label>
                                                <input
                                                    type="date"
                                                    className="form-control my-2"
                                                    name="fecha_adquisicion"
                                                    value={fecha_adquisicion}
                                                    onChange={handleChange}
                                                />
                                                <label htmlFor="" className="form-label">
                                                    Tasacion
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control my-2"
                                                    name="tasacion"
                                                    value={tasacion}

                                                    onChange={handleChange}
                                                />
 <label htmlFor="" className="form-label my-2">
                                                        Tipo de Afectación
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="form-control mt-2"
                                                        name="tipo_afectacion"
                                                        value={formulario.tipo_afectacion}
                                                        onChange={handleChange}
                                                    />
                                                <label htmlFor="" className="form-label">
                                                    Observaciones
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control my-2"
                                                    name="observaciones"
                                                    value={observaciones}

                                                    onChange={handleChange}
                                                />
                                                <label htmlFor="" className="form-label">
                                                    Imagen del Bien
                                                </label>
                                                <input
                                                    type="file"
                                                    className="form-control my-2"
                                                    placeholder="laptop.png"
                                                    name="imagen_bien"

                                                    onChange={handleChangeImages}
                                                />
                                            </div>

                                        </div>
                                        <div>

                                            <div>
                                                <button className="btn btn-primary" type="submit">
                                                    <span className="mx-1"><i className="fa fa-floppy-o" aria-hidden="true"></i></span>   Guardar
                                                </button>
                                                <button
                                                    className="btn btn-danger my-3 mx-3"
                                                    type="button"
                                                    onClick={() => {
                                                        history.push(HISTORY);
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
            </div>
        </>
    )
}

export default EquipoPolicialCrearPage;

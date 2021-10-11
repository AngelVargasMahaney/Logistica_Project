import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import {
    getBienAuxiliarById,
    postBienAuxiliarById,
} from "../../../services/bienesAuxiliaresService";
import AdminSidebar from '../../admin/components/AdminSidebar'
import GeneralNavBar from '../../layout/GeneralNavBar'

const BienesAuxiliaresEditarPage = () => {

    const TITULO = 'Formulario de Edición de un Bien Auxiliar'
    const HISTORY = "/admin/bienes-auxiliares";
    const [documentoBienAuxiliar, setDocumentoBienAuxiliar] = useState(null)   
    const [ImagenBienAuxiliar, setImagenBienAuxiliar] = useState(null)

    const handleDocumentoBienAuxiliar = e => {setDocumentoBienAuxiliar(e.target.files[0])}
    const handleImagenBienAuxiliar = e => {setImagenBienAuxiliar(e.target.files[0])}

    const config = {headers: {'Content-Type': 'multipart/form-data'}}

    //Variable de estado que se encarga de manejar los campos de nuestro formulario que servirán para llenar la bd (tener en cuenta los campos que el back-end envió, ver documentación)
    const [formulario, setFormulario] = useState({
        documento: "",
        descripcion: "",
        marca: "",
        modelo: "",
        serie: "",
        tipo_material: "",
        color: "",
        dimensiones: "",
        estado_bien: "",
        fecha_adquisicion: "",
        observaciones: "",
        imagen_bien: "",
    })

    let {
        documento,
        descripcion,
        marca,
        modelo,
        serie,
        tipo_material,
        color,
        dimensiones,
        estado_bien,
        imagen_bien,
        fecha_adquisicion,
        observaciones } = formulario

    

    //Recupero los parámetros de la URL
    const params = useParams()

    const history = useHistory()

    //Desestructuro los campos del formulario, con el objetivo de evitar poner formulario.valor en cada atributo del forumario (por limpieza de código)
    

    // Cada vez que se dispara el evento onChange del formulario, se llama a esta funcion para manejar el envío de datos
    const handleChange = (e) => {
        setFormulario({
            ...formulario,
            [e.target.name]: e.target.value //Darle valor del name según el formulario
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault() //Evito que se refresque la página
        // postUsuario({ ...formulario }).then((rpta) => { //Copia del formulario
        //     console.log(rpta)
        // })
        //console.log(formulario)

        //Validación genérica, se puede mejorar
        const formData = new FormData();
        formData.append('descripcion', formulario.descripcion)
        formData.append('marca', formulario.marca)
        formData.append('modelo', formulario.modelo)
        formData.append('serie', formulario.serie)
        formData.append('tipo_material', formulario.tipo_material)
        formData.append('color', formulario.color)
        formData.append('dimensiones', formulario.dimensiones)
        formData.append('estado_bien', formulario.estado_bien)
        formData.append('descripcion', formulario.descripcion)
        formData.append('observaciones', formulario.observaciones)

        formData.append('documento', documentoBienAuxiliar)
        formData.append('imagen_bien', ImagenBienAuxiliar)

        postBienAuxiliarById(formData,config, params.id).then((rpta) => {
            //console.log(rpta)
            if (rpta.status === 200) {
                history.push(HISTORY)
            }
        })

    }

    useEffect(() => {
        getBienAuxiliarById(params.id).then((rpta) => {
            console.log(rpta)
            setFormulario({ ...rpta.data })
        })
        // eslint-disable-next-line
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
                                        {TITULO}
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
                                                value={descripcion}
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
                                                value={marca}
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
                                                value={modelo}
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
                                                value={serie}
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
                                                required
                                                name="tipo_material"
                                                value={tipo_material}
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
                                                required
                                                name="color"
                                                value={color}
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
                                                required
                                                name="dimensiones"
                                                value={dimensiones}
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
                                                value={estado_bien}
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
                                                required
                                                name="observaciones"
                                                value={observaciones}
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
                                                
                                                onChange={handleDocumentoBienAuxiliar}
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
                                                
                                                onChange={handleImagenBienAuxiliar}
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
                                                    history.push(HISTORY);
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

export default BienesAuxiliaresEditarPage
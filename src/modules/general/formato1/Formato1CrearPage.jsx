import React, { useState, useRef } from 'react'
import { useHistory } from 'react-router-dom'
import { postFormatos, postFormatosFiles } from '../../../services/formatoService'
import AdminSidebar from '../../admin/components/AdminSidebar'
import GeneralNavBar from '../../layout/GeneralNavBar'
const Formato1CrearPage = () => {
    const tituloOperacion = 'Formulario de Creación de Bienes del Formato 1'
    //Variable de estado que se encarga de manejar los campos de nuestro formulario que servirán para llenar la bd (tener en cuenta los campos que el back-end envió, ver documentación)
    const [formulario, setFormulario] = useState({
        codigo: "",
        documento_nombre_original: "",
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
        deleted_at: "",
        created_at: "",
        updated_at: "",
        modified_by: ""
    })


    const history = useHistory()

    //Desestructuro los campos del formulario, con el objetivo de evitar poner formulario.valor en cada atributo del forumario (por limpieza de código)
    let { codigo, descripcion, marca,
        modelo, serie, tipo, color, dimensiones, estado_bien, fecha_adquisicion, forma_adquisicion, observaciones,
         } = formulario

    // Cada vez que se dispara el evento onChange del formulario, se llama a esta funcion para manejar el envío de datos
    const handleChange = (e) => {

        setFormulario({
            ...formulario,

            [e.target.name]: e.target.value, //Darle valor del name según el formulario

        })
    }

    const [documento, setDocumento] = useState(null)
    const [imagen_bien, setImagen_bien] = useState(null)
    const handleChangeDocs = e => {
        setDocumento(e.target.files[0])
    }


    const handleChangeImages = e => {
        setImagen_bien(e.target.files[0])
    }


    const handleSubmit = (e) => {
        e.preventDefault() //Evito que se refresque la página
        // postUsuario({ ...formulario }).then((rpta) => { //Copia del formulario
        //     console.log(rpta)
        // })
        //console.log(formulario)


      
        const formData = new FormData()
        formData.append('codigo', codigo)
        formData.append('descripcion', descripcion)
        formData.append('marca', marca)
        formData.append('modelo', modelo)
        formData.append('serie', serie)
        formData.append('tipo', tipo)
        formData.append('color', color)
        formData.append('dimensiones', dimensiones)
        formData.append('estado_bien', estado_bien)
        formData.append('fecha_adquisicion', fecha_adquisicion)
        formData.append('forma_adquisicion', forma_adquisicion)
        formData.append('observaciones', observaciones)
        formData.append('imagen_bien', imagen_bien)
        formData.append('documento', documento)

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }

        postFormatosFiles(formData, config).then((rpta) => {
            if (rpta.status === 200) { //Si el status es OK, entonces redirecciono a la lista de usuarios
                console.log("Datos subida correctamente")
                history.push("/admin/formatos")
            }
           
            console.log(rpta)
        })
    }


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
                                        {tituloOperacion}
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
                                                    placeholder="Cod_003"
                                                    name="codigo"
                                                    value={codigo}
                                                    onChange={handleChange}
                                                />
                                                <label htmlFor="" className="form-label">
                                                    Documento
                                                </label>
                                                <input
                                                    type="file"
                                                    className="form-control my-2"
                                                    placeholder="Archivo.pdf"
                                                    name="documento"

                                                    onChange={handleChangeDocs}

                                                />
                                                <label htmlFor="" className="form-label">
                                                    Descripcion
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control my-2"
                                                    placeholder="Laptop de Sobremesa"
                                                    name="descripcion"
                                                    value={descripcion}
                                                    onChange={handleChange}
                                                />
                                                <label htmlFor="" className="form-label">
                                                    Marca
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control my-2"
                                                    placeholder="Asus"
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
                                                    placeholder="LP-00021"
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
                                                    placeholder="MP09_29"
                                                    name="serie"
                                                    value={serie}
                                                    onChange={handleChange}
                                                />
                                                <label htmlFor="" className="form-label">
                                                    Tipo
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control my-2"
                                                    placeholder="Ordenador"
                                                    name="tipo"
                                                    value={tipo}
                                                    onChange={handleChange}
                                                />

                                            </div>
                                            <div className="col-6">
                                                <label htmlFor="" className="form-label">
                                                    Color
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control my-2"
                                                    placeholder="Plateado"
                                                    name="color"
                                                    value={color}
                                                    onChange={handleChange}
                                                />
                                                <label htmlFor="" className="form-label">
                                                    Dimensiones
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control my-2"
                                                    placeholder="20*16"
                                                    name="dimensiones"
                                                    value={dimensiones}
                                                    onChange={handleChange}
                                                />
                                                <label htmlFor="" className="form-label">
                                                    Estado del Bien
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control my-2"
                                                    placeholder="Usado"
                                                    name="estado_bien"
                                                    value={estado_bien}
                                                    onChange={handleChange}
                                                />
                                                <label htmlFor="" className="form-label">
                                                    Fecha de Adquisición
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control my-2"
                                                    placeholder="17-07-2021"
                                                    name="fecha_adquisicion"
                                                    value={fecha_adquisicion}
                                                    onChange={handleChange}
                                                />
                                                <label htmlFor="" className="form-label">
                                                    Forma de Adquisición
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control my-2"
                                                    placeholder="Envío"
                                                    name="forma_adquisicion"
                                                    value={forma_adquisicion}
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
                                                    <span className="mx-1"><i class="fa fa-floppy-o" aria-hidden="true"></i></span>   Guardar
                                                </button>
                                                <button
                                                    className="btn btn-danger my-3 mx-3"
                                                    type="button"
                                                    onClick={() => {
                                                        history.push("/admin/formatos");
                                                    }}
                                                >
                                                    <span className="mx-1"><i class="fa fa-ban" aria-hidden="true"></i></span> Cancelar
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

export default Formato1CrearPage

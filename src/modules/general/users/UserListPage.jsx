import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import { deleteUsuarioById, getUsuarios, putActiveUsuarioById, putDesactiveUsuarioById } from '../../../services/usuarioService'


const UserListPage = () => {

    const urlUsuarioCrear = '/admin/usuario/crear'
    const [usuarios, setUsuarios] = useState([])
    const [cargando, setCargando] = useState(true)

    const traerUsuarios = () => {
        setCargando(true)
        getUsuarios().then(rpta => {
            console.log(rpta)
            setUsuarios(rpta.data)
            setCargando(false)
        })
    }

    useEffect(() => {
        traerUsuarios()
    }, [])

    const cambiarEstado = (usuario) => {
        if (usuario.is_active) {
            putDesactiveUsuarioById(usuario.id).then((rpta) => {
                if (rpta.status === 200) {
                    traerUsuarios()
                }
            });
        } else {
            putActiveUsuarioById(usuario.id).then((rpta) => {
                if (rpta.status === 200) {
                    traerUsuarios()
                }
            });
        }
    };
    const eliminarUsuario = id => {
        Swal.fire({
            title: '¿Seguro que deseas eliminar?',
            icon: 'warning',
            text: 'Los cambios serán irreversibles 😮',
            showCancelButton: true
        }).then((rpta) => {
            if (rpta.isConfirmed) {
                //Aquí borro el usuario
                deleteUsuarioById(id).then((rpta) => {
                    if (rpta.status === 200) {
                        //Se comprueba que se eliminó correctamente
                        traerUsuarios() //Se llama otra vez para setear la variable de estado y recargar la página automáticamente al borrar un usuario
                    }
                })
            }
        })
    }


    return (
        <>
           
            <div className="home_content">


                <div>
                    <main className="container-fluid mt-5">

                        <div className="card">
                            <div className="card-body">

                                <div className="d-flex justify-content-between mb-3">
                                    
                                    <h5>Usuarios</h5>
                                    <Link to={urlUsuarioCrear} className="btn btn-primary "> <i className="fa fa-plus"></i> Crear Usuario</Link>
                                </div>

                                <div className="row mt-2">

                                    <div className="col">

                                        {
                                            cargando ?
                                                <div className="loader__father">
                                                    <div className="loader">
                                                        <div className="face">
                                                            <div className="circle"></div>
                                                        </div>
                                                        <div className="face">
                                                            <div className="circle"></div>
                                                        </div>
                                                    </div>
                                                </div>
                                                :
                                                <div className="table-responsive miTabla ">
                                                    <table className="table table-bordered">
                                                        <thead>
                                                            <tr>
                                                                <th>Id</th>
                                                                <th>Nombre</th>
                                                                <th>Apellido</th>
                                                                <th>DNI</th>
                                                                <th>Email</th>
                                                                <th>Estado</th>
                                                                <th>Rol</th>
                                                                <th></th>
                                                                <th className="acciones"></th>
                                                            </tr>
                                                        </thead>

                                                        <tbody>
                                                            {
                                                                usuarios.map((objUsuario, i) => {
                                                                    return (
                                                                        <tr key={objUsuario.id}>

                                                                            <td>{objUsuario.id}</td>
                                                                            <td>{objUsuario.name}</td>
                                                                            <td>{objUsuario.apellido}</td>
                                                                            <td>{objUsuario.dni}</td>
                                                                            <td>{objUsuario.email}</td>
                                                                            <td>
                                                                                {
                                                                                    objUsuario.role
                                                                                }
                                                                            </td>
                                                                            <td>{objUsuario.is_active ? (<>ACTIVO</>) : (<>DESACTIVO</>)}  </td>
                                                                            <td><button type="button" className="btn btn-outline-dark btn-sm personalizado" onClick={() => {
                                                                                cambiarEstado(objUsuario);
                                                                            }} >{objUsuario.is_active ? (<>DESACTIVAR</>) : (<>ACTIVAR</>)} </button></td>
                                                                            <td>


                                                                                <button data-toggle="tooltip" data-placement="top" title="Eliminar"
                                                                                    className="btn btn-danger mx-1"
                                                                                    onClick={() => {
                                                                                        eliminarUsuario(objUsuario.id);
                                                                                    }}
                                                                                >
                                                                                    <i className="fa fa-trash"></i>

                                                                                </button>
                                                                                <Link to={`usuario/editar/${objUsuario.id}`}
                                                                                    className="btn btn-warning"
                                                                                > <i className="fa fa-pencil"></i>
                                                                                </Link>
                                                                            </td>

                                                                        </tr>

                                                                    )
                                                                })
                                                            }
                                                        </tbody>
                                                    </table>
                                                </div>
                                        }
                                    </div></div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </>


    )
}

export default UserListPage

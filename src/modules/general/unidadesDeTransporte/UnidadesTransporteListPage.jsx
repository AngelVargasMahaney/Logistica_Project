import Button from '@restart/ui/esm/Button'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import AdminSidebar from '../../admin/components/AdminSidebar'
import GeneralNavBar from '../../layout/GeneralNavBar'

const UnidadesTransporteListPage = () => {

    const [cargando, setCargando] = useState(false)

    return (
        <>
            <AdminSidebar />
            <GeneralNavBar />
            <div className="home_content">
                <main className="container-fluid mt-5">

                    <div className="card">
                        <div className="card-body">

                            <div className="d-flex justify-content-between mb-3">
                                <h5>Lista de bienes de Unidades de Transporte</h5>
                                <Link to="/admin/bienes-internados/equipo-policial" className="btn btn-warning">
                                    {" "}
                                    <i className="fa fa-list"></i> Lista de Bienes Internados
                                </Link>
                                <Button onClick={"reportes"} className="btn btn-success">
                                    {" "}
                                    <i className="fas fa-file-excel"></i> Generar Reporte
                                </Button>
                                <Link to={"/admin/equipo-policial/crear"} className="btn btn-primary ">
                                    {" "}
                                    <i className="fa fa-plus"></i> Crear un Bien
                                </Link>
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
                                                            <th>id</th>
                                                            <th>codigo</th>
                                                            <th>Documento</th>
                                                            <th>Descripción</th>
                                                            <th>marca</th>
                                                            <th>modelo</th>
                                                            <th>serie</th>
                                                            <th>pais_fabricacion</th>
                                                            <th>estado_bien</th>
                                                            <th>fecha_adquisicion</th>
                                                            <th>Forma_adquisicion</th>
                                                            <th>tasacion</th>
                                                            <th>Código_QR</th>
                                                            <th>Observaciones</th>
                                                            <th>Imagen</th>


                                                            <th className="acciones"> Acciones</th>
                                                        </tr>
                                                    </thead>
                                                </table>
                                            </div>
                                    }
                                </div>

                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </>
    )
}

export default UnidadesTransporteListPage

import React from 'react'
import icon from '../../../../environments/iconDashAdmin'
import GeneralNavBar from '../../../layout/GeneralNavBar'

const AdminDashboardPage = () => {
    return (
        <div className="home_content">
        
            <div className="text ml-4">TABLERO DE CONTROL</div>

            <div>
                <div className="p-4">
                    <div className="row">
                        <div className="col-lg-3 col-md-6">
                            <div className="card text-center card-dash m-2">
                                <div className="card-body p-4">
                                    <img
                                        src={icon.usuario}
                                        className="rounded img-thumbnail svg-img"
                                        alt="insertar"
                                    />
                                    <h6 className="card-title text-center m-2">Usuarios</h6>
                                    <h5 className="text-primary">15</h5>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6">
                            <div className="card text-center card-dash m-2">
                                <div className="card-body p-4">
                                    <img
                                        src={icon.personal}
                                        className="rounded img-thumbnail svg-img"
                                        alt="insertar"
                                    />

                                    <h6 className="card-title text-center m-2">Personal</h6>
                                    <h5 className="text-primary">15</h5>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6">
                            <div className="card text-center card-dash m-2">
                                <div className="card-body p-4">
                                    <img
                                        src={icon.subUnidades}
                                        className="rounded img-thumbnail svg-img"
                                        alt="insertar"
                                    />

                                    <h6 className="card-title text-center m-2">Sub Unidades</h6>
                                    <h5 className="text-primary">15</h5>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6">
                            <div className="card text-center card-dash m-2">
                                <div className="card-body p-4">
                                    <img
                                        src={icon.areaOficinaSeccion}
                                        className="rounded img-thumbnail svg-img"
                                        alt="insertar"
                                    />

                                    <h6 className="card-title text-center m-2">
                                        Area Oficina Y seccion
                                    </h6>
                                    <h5 className="text-primary">15</h5>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6">
                            <div className="card text-center card-dash m-2">
                                <div className="card-body p-4">
                                    <img
                                        src={icon.historial}
                                        className="rounded img-thumbnail svg-img"
                                        alt="insertar"
                                    />

                                    <h6 className="card-title text-center m-2">
                                        Historial de un Bien
                                    </h6>
                                    <h5 className="text-primary">15</h5>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-3 col-md-6">
                            <div className="card text-center card-dash m-2">
                                <div className="card-body p-4">
                                    <img
                                        src={icon.bienesAuxiliares}
                                        className="rounded img-thumbnail svg-img"
                                        alt="insertar"
                                    />

                                    <h6 className="card-title text-center m-2">
                                        Bienes Auxiliares
                                    </h6>
                                    <h5 className="text-primary">15</h5>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6">
                            <div className="card text-center card-dash m-2">
                                <div className="card-body p-4">
                                    <img
                                        src={icon.equipoPolicial}
                                        className="rounded img-thumbnail svg-img"
                                        alt="insertar"
                                    />

                                    <h6 className="card-title text-center m-2">
                                        Equipo Policial
                                    </h6>
                                    <h5 className="text-primary">15</h5>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6">
                            <div className="card text-center card-dash m-2">
                                <div className="card-body p-4">
                                    <img
                                        src={icon.unidadTransporte}
                                        className="rounded img-thumbnail svg-img"
                                        alt="insertar"
                                    />

                                    <h6 className="card-title text-center m-2">
                                        Unidades de Transporte
                                    </h6>
                                    <h5 className="text-primary">15</h5>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6">
                            <div className="card text-center card-dash m-2">
                                <div className="card-body p-4">
                                    <img
                                        src={icon.bienesInternaDestru}
                                        className="rounded img-thumbnail svg-img"
                                        alt="insertar"
                                    />

                                    <h6 className="card-title text-center m-2">
                                        Bienes internados y destruidos
                                    </h6>
                                    <h5 className="text-primary">15</h5>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6">
                            <div className="card text-center card-dash m-2">
                                <div className="card-body p-4">
                                    <img
                                        src={icon.maquinariaYEquipos}
                                        className="rounded img-thumbnail svg-img"
                                        alt="insertar"
                                    />

                                    <h6 className="card-title text-center m-2">
                                        Maquinarias y Equipos
                                    </h6>
                                    <h5 className="text-primary">15</h5>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    )
}

export default AdminDashboardPage

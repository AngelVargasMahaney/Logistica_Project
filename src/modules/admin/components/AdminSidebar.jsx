import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../../assets/logo_innova.png'

const AdminSidebar = () => {
    const [sidebar, setsidebar] = useState(false)

    const showSidebar = () => setsidebar(!sidebar);

    return (
        <>

            <div className={sidebar ? 'sidebar' : 'sidebar active'}>
                
                <div className="logo_content" onClick={showSidebar}>
                    <div className="logo">
                        <span className="iconify" data-icon="map:police" data-inline="false" data-width="25" data-height="25"></span>
                        <div className="logo_name">
                            LogisticaPNP
                        </div>
                    </div>
                    <i className='bx bx-menu' id="btn"></i>
                </div>
                <ul className="nav_list">
                    <li>
                        <Link to="/admin" >
                            <i className="bx bx-grid-alt"></i>
                            <span className="links_name">Dashboard</span>
                        </Link>
                        <span className="tooltip">Dashboard</span>
                    </li>
                    <li>
                        <Link to="/admin/personal" >
                            <i className="bx bx-user"></i>
                            <span className="links_name">Personal</span>
                        </Link>
                        <span className="tooltip">Personal</span>
                    </li>
                    <li>
                        <Link to="/admin/area-oficina-seccion" >
                            <i className="bx bx-tag-alt"></i>
                            <span className="links_name">area-oficina-seccion</span>
                        </Link>
                        <span className="tooltip">area-oficina-seccion</span>
                    </li>
                    <li>
                        <Link to="/admin" >
                            <i className="bx bx-history"></i>
                            <span className="links_name">Historial</span>
                        </Link>
                        <span className="tooltip">Historial</span>
                    </li>
                    <li>
                        <Link to="/admin/usuario" >
                            <i className="bx bxs-user-badge"></i>
                            <span className="links_name">Usuarios</span>
                        </Link>
                        <span className="tooltip">Historial</span>
                    </li>
                    <li>
                        <Link to="/admin/formatos" >
                            <i className="bx bx-plus-circle"></i>
                            <span className="links_name">Bienes</span>
                        </Link>
                        <span className="tooltip">Bienes Internados y Destruidos</span>
                    </li>
                    <li>
                        <Link to="/admin" >
                            <i className="bx bx-briefcase-alt-2"></i>
                            <span className="links_name">Maquinarias</span>
                        </Link>
                        <span className="tooltip">Maquinarias, Equipos, Muebles y Enseres</span>
                    </li>
                    <li>
                        <Link to="/admin" >
                            <i className="bx bxs-car-mechanic"></i>
                            <span className="links_name">Unidades Transporte</span>
                        </Link>
                        <span className="tooltip">Unidades</span>
                    </li>
                    <li>
                        <Link to="/admin/bienes-auxiliares" >
                            <i className="bx bx-heart"></i>
                            <span className="links_name">Bienes Auxiliares</span>
                        </Link>
                        <span className="tooltip">Bienes Auxiliares</span>
                    </li>
                    <li>
                        <Link to="/admin/subunidades" >
                            <i className="bx bxs-component"></i>
                            <span className="links_name">SubUnidades</span>
                        </Link>
                        <span className="tooltip">SubUnidades</span>
                    </li>
                    <li>
                        <Link to="/admin/equipo-policial" >
                            <i className="bx bx-shield-quarter"></i>
                            <span className="links_name">Equipo Policial</span>
                        </Link>
                        <span className="tooltip">Equipo Policial</span>
                    </li>
                </ul>

                <div className="profile_content">
                    
                    <div className="profile">
                        <div className="profile_details">
                            <img src={logo} alt=""></img>
                            <div className="name_job">
                                <div className="name">
                                    Innova Tek
                                </div>
                                <div className="job">
                                    UNSA
                                </div>
                            </div>
                        </div>
                        <i className='bx bx-log-out' id="log_out"></i>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AdminSidebar

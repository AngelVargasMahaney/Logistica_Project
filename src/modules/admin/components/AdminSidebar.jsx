import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../../assets/logo_innova.png'
import { NAVEGACION_URL } from '../../../environments/environments';
const AdminSidebar = () => {
    const [sidebar, setsidebar] = useState(false)

    const showSidebar = () => setsidebar(!sidebar);

    const itemsUrl = NAVEGACION_URL;
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


                    {itemsUrl.map((item, i) => {
                        return (
                            <li key={i}>
                                <Link to={item.url} >
                                    <i className={item.icon}></i>
                                    <span className="links_name">{item.nombre}</span>
                                </Link>
                                <span className="tooltip">{item.nombre}</span>
                            </li>
                        )
                    })}



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

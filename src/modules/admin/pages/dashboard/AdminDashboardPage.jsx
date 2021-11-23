import React, { useEffect } from 'react'
import AdminSidebar from '../../components/AdminSidebar'


import GeneralNavBar from '../../../layout/GeneralNavBar';
import { NAVEGACION_URL } from '../../../../environments/environments';
import { Link } from 'react-router-dom';

const AdminDashboardPage = () => {

    useEffect(() => {
        
        
    }, [])
    const itemsUrl = NAVEGACION_URL;
    return (

        <>
            <AdminSidebar />
            <div className="home_content">
                <GeneralNavBar />
                <div className="text ml-4">TABLERO DE CONTROL</div>

                <div>
                    <div className="p-4">
                        <div className="row">

                            {itemsUrl.map((item, i) => {
                                return (
                                    <div key={i} className="col-lg-3 col-md-6">
                                         <Link to={item.url}>
                                        <div className="card text-center card-dash m-2">
                                            <div className="card-body p-4">
                                               
                                                    <img
                                                        src={item.iconDashboard}
                                                        className="rounded img-thumbnail svg-img"
                                                        alt="insertar"
                                                    />
                                                    <h6 className="card-title text-center m-2">{item.nombre}</h6>
                                                
                                            </div>
                                        </div>
                                        </Link>
                                    </div>
                                )
                            })}



                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default AdminDashboardPage

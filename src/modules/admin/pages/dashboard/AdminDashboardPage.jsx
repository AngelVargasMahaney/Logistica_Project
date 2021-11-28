import React, { useContext } from 'react'

import { NAVEGACION_URL } from '../../../../environments/environments';
import { Link } from 'react-router-dom';
import AuthContext from '../../../../context/auth/authContext';

const AdminDashboardPage = () => {

    const { ...state } = useContext(AuthContext)
    let itemsUrl = NAVEGACION_URL;
    if (state.is_admin === false) {
        itemsUrl = itemsUrl.slice(1, itemsUrl.length)
    }
    return (

        <>
          
            <div className="home_content">
                
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

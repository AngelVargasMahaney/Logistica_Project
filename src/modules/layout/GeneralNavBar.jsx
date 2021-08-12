import React, { useContext } from 'react'
import { Link, useHistory } from 'react-router-dom'
import AuthContext from '../../context/auth/authContext'

const GeneralNavBar = () => {

    const { autenticado } = useContext(AuthContext)
    console.log(autenticado)
    const { name, apellido } = useContext(AuthContext)
    const history = useHistory()
    const logoutHandler = () => {
        localStorage.removeItem('token')
        history.push('/auth/login')
       
    }
    console.log(autenticado)

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark ">

                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarText">
                    <ul className="navbar-nav ml-auto ">

                        <li className="nav-item dropdown">
                            <Link className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                {name} {apellido}
                            </Link>
                            <div className="dropdown-menu dropdown-menu-right text-right" aria-labelledby="navbarDropdownMenuLink">
                                <Link className="dropdown-item" href="/" onClick={logoutHandler}>Cerrar Sesión</Link>
                            </div>
                        </li>
                    </ul>

                </div>
            </nav>
        </>
    )
}

export default GeneralNavBar

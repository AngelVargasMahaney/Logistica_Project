import React from 'react'
import { Link } from 'react-router-dom'

const Error404Page = () => {
    return (
        <div className="body404">
            <div className="noise"></div>
            <div className="overlay"></div>
            <div className="terminal">
                <h1>Error <span className="errorcode">404</span></h1>
                <p className="output">La página a la que desea acceder no existe</p>
                <p className="output">Redirigirse a
                    <Link to={`/admin`}
                        className="btn btn-success mx-3"
                    >
                        Admin
                    </Link>
                </p>
                <p className="output">Good luck.</p>
            </div>
        </div>
    )
}

export default Error404Page

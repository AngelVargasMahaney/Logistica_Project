import React from 'react'

import { Switch, Route } from "react-router-dom"
import AdminDashboardPage from './pages/dashboard/AdminDashboardPage'
import UserListPage from '../general/users/UserListPage'

import UserEditarPage from '../general/users/UserEditarPage'
import UserCrearPage from '../general/users/UserCrearPage'
import Formato1ListPage from '../general/formato1/Formato1ListPage'
import Formato1CrearPage from '../general/formato1/Formato1CrearPage'

const AdminRouter = () => {
    return (
        <>

            <Switch>

                <Route path="/admin/formatos/crear">
                    <Formato1CrearPage/>
                </Route>
                <Route path="/admin/formatos">
                    <Formato1ListPage/>
                </Route>




                <Route path="/admin/usuario/editar/:id">
                    <UserEditarPage />
                </Route>
                <Route path="/admin/usuario/crear">
                    <UserCrearPage />
                </Route>
                <Route path="/admin/usuario">
                    <UserListPage />
                </Route>
                <Route path="/admin" exact>
                    <AdminDashboardPage />
                </Route>
            </Switch>
        </>
    )
}

export default AdminRouter

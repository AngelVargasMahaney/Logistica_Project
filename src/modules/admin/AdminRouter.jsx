import React from 'react'

import { Switch, Route } from "react-router-dom"
import AdminDashboardPage from './pages/dashboard/AdminDashboardPage'
import UserListPage from '../general/users/UserListPage'

import UserEditarPage from '../general/users/UserEditarPage'
import UserCrearPage from '../general/users/UserCrearPage'
import AreaOficinaSeccionCrearPage from '../general/areaOficinaSeccion/AreaOficinaSeccionCrearPage'
import AreaOficinaSeccionEditarPage from '../general/areaOficinaSeccion/AreaOficinaSeccionEditarPage'
import AreaOficinaSeccionListPage from '../general/areaOficinaSeccion/AreaOficinaSeccionListPage'
const AdminRouter = () => {
    return (
        <>
            
            <Switch>
                <Route path="/admin/usuario/editar/:id">
                    <UserEditarPage />
                </Route>
                <Route path="/admin/usuario/crear">
                    <UserCrearPage />
                </Route>
                <Route path="/admin/usuario">
                    <UserListPage />
                </Route>

                <Route path="/admin/area-oficina-seccion/editar/:id">
                    <AreaOficinaSeccionEditarPage />
                </Route>
                <Route path="/admin/area-oficina-seccion/crear">
                    <AreaOficinaSeccionCrearPage />
                </Route>
                <Route path="/admin/area-oficina-seccion">
                    <AreaOficinaSeccionListPage />
                </Route>

                <Route path="/admin" exact>
                    <AdminDashboardPage />
                </Route>
            </Switch>
        </>
    )
}

export default AdminRouter

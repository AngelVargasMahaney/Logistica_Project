import React from 'react'

import { Switch, Route } from "react-router-dom"
import AdminDashboardPage from './pages/dashboard/AdminDashboardPage'
import UserListPage from '../general/users/UserListPage'

import UserEditarPage from '../general/users/UserEditarPage'
import UserCrearPage from '../general/users/UserCrearPage'
import AreaOficinaSeccionCrearPage from '../general/areaOficinaSeccion/AreaOficinaSeccionCrearPage'
import AreaOficinaSeccionEditarPage from '../general/areaOficinaSeccion/AreaOficinaSeccionEditarPage'
import AreaOficinaSeccionListPage from '../general/areaOficinaSeccion/AreaOficinaSeccionListPage'

import PersonalCrearPage from '../general/personal/PersonalCrearPage'
import PersonalEditarPage from '../general/personal/PersonalEditarPage'
import PersonalListPage from '../general/personal/PersonalListPage'
import EquipoPolicialListPage from '../general/equipoPolicial/EquipoPolicialListPage'
import EquipoPolicialCrearPage from '../general/equipoPolicial/EquipoPolicialCrearPage'
import BienesAuxiliaresCrearPage from '../general/bienesAuxiliares/BienesAuxiliaresCrearPage'
import BienesAuxiliaresListPage from '../general/bienesAuxiliares/BienesAuxiliaresListPage'

import SubUnidadesListPage from '../general/SubUnidades/SubUnidadesListPage'
import SubUnidadesEditarPage from '../general/SubUnidades/SubUnidadesEditarPage'
import SubUnidadesCrearPage from '../general/SubUnidades/SubUnidadesCrearPage'

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



                <Route path="/admin/personal/editar/:id">
                    <PersonalEditarPage />
                </Route>
                <Route path="/admin/personal/crear">
                    <PersonalCrearPage />
                </Route>
                <Route path="/admin/personal">
                    <PersonalListPage />
                </Route>



                <Route path="/admin/equipo-policial/crear">
                    <EquipoPolicialCrearPage />
                </Route>
                <Route path="/admin/equipo-policial">
                    <EquipoPolicialListPage />
                </Route>



                <Route path="/admin/bienes-auxiliares/crear">
                    <BienesAuxiliaresCrearPage />
                </Route>
                <Route path="/admin/bienes-auxiliares">
                    <BienesAuxiliaresListPage />
                </Route>
                
                
                <Route path="/admin/subunidades/editar/:id">
                    <SubUnidadesEditarPage />
                </Route>
                <Route path="/admin/subunidades/crear">
                    <SubUnidadesCrearPage />
                </Route>
                <Route path="/admin/subunidades">
                    <SubUnidadesListPage />
                </Route>



                <Route path="/admin" exact>
                    <AdminDashboardPage />
                </Route>
            </Switch>
        </>
    )
};
export default AdminRouter

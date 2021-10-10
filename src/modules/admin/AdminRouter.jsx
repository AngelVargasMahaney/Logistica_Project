import React from 'react'

import { Switch, Route } from "react-router-dom"
import AdminDashboardPage from './pages/dashboard/AdminDashboardPage'
import UserListPage from '../general/users/UserListPage'

import UserEditarPage from '../general/users/UserEditarPage'
import UserCrearPage from '../general/users/UserCrearPage'
import Formato1ListPage from '../general/formato1/Formato1ListPage'
import Formato1CrearPage from '../general/formato1/Formato1CrearPage'
import AreaOficinaSeccionEditarPage from '../general/areaOficinaSeccion/AreaOficinaSeccionEditarPage'
import AreaOficinaSeccionCrearPage from '../general/areaOficinaSeccion/AreaOficinaSeccionCrearPage'
import AreaOficinaSeccionListPage from '../general/areaOficinaSeccion/AreaOficinaSeccionListPage'
import PersonalEditarPage from '../general/personal/PersonalEditarPage'
import PersonalCrearPage from '../general/personal/PersonalCrearPage'
import PersonalListPage from '../general/personal/PersonalListPage'
import EquipoPolicialCrearPage from '../general/equipoPolicial/EquipoPolicialCrearPage'
import EquipoPolicialListPage from '../general/equipoPolicial/EquipoPolicialListPage'
import BienesAuxiliaresCrearPage from '../general/bienesAuxiliares/BienesAuxiliaresCrearPage'
import BienesAuxiliaresListPage from '../general/bienesAuxiliares/BienesAuxiliaresListPage'
import SubUnidadesEditarPage from '../general/SubUnidades/SubUnidadesEditarPage'
import SubUnidadesCrearPage from '../general/SubUnidades/SubUnidadesCrearPage'
import SubUnidadesListPage from '../general/SubUnidades/SubUnidadesListPage'
import EquipoPolicialHistory from '../general/historiales/EquipoPolicialHistory'
import BienesAuxiliaresHistory from '../general/historiales/BienesAuxiliaresHistory'
import Formato1History from '../general/historiales/Formato1History'
import InternamientoFormato1ListPage from '../general/internamientos/InternamientoFormato1ListPage'
import BienesAuxiliaresEditarPage from '../general/bienesAuxiliares/BienesAuxiliaresEditarPage'
import InternamientoBienesAuxiliaresListPage from '../general/internamientos/InternamientoBienesAuxiliaresListPage'
import InternamientoEquipoPolicial from '../general/internamientos/InternamientoEquipoPolicial'

const AdminRouter = () => {
    return (
        <>
            <Switch>
                <Route path="/admin/equipo-policial/historial/:id">
                    <EquipoPolicialHistory />
                </Route>
                <Route path="/admin/formato1/historial/:id">
                    <Formato1History />
                </Route>
                <Route path="/admin/bienes-auxiliares/historial/:id">
                    <BienesAuxiliaresHistory />
                </Route>

                <Route path="/admin/formatos/crear">
                    <Formato1CrearPage />
                </Route>
                <Route path="/admin/formatos">
                    <Formato1ListPage />
                </Route>

                <Route path="/admin/bienes-internados/formato1">
                    <InternamientoFormato1ListPage/>
                </Route>
                <Route path="/admin/bienes-internados/bienes-auxiliares">
                    <InternamientoBienesAuxiliaresListPage/>
                </Route>
                <Route path="/admin/bienes-internados/equipo-policial">
                    <InternamientoEquipoPolicial/>
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


                <Route path="/admin/bienes-auxiliares/editar/:id">
                    <BienesAuxiliaresEditarPage />
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

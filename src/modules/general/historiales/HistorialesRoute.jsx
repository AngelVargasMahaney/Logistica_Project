import React from 'react'
import { Route, Switch } from 'react-router-dom'
import BienesAuxiliaresHistory from './BienesAuxiliaresHistory'
import EquipoPolicialHistory from './EquipoPolicialHistory'
import Formato1History from './Formato1History'

const HistorialesRoute = () => {
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
            </Switch>
        </>
    )
}

export default HistorialesRoute

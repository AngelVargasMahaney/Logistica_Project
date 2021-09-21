import React from 'react'
import { Route, Switch } from 'react-router-dom'
import PublicGeneralView from './PublicGeneralView'

import PublicViewBienesAuxQr from './PublicViewBienesAuxQr'
import PublicViewEquipoPolicialQr from './PublicViewEquipoPolicialQr'
import PublicViewFormato1Qr from './PublicViewFormato1Qr'
const PublicRoute = () => {
    return (
        <>
            <Switch>
                <Route path="/public/bienes/formato1/:id">
                    <PublicViewFormato1Qr />
                </Route>
                <Route path="/public/bienes/bienes-auxiliares/:id">
                    <PublicViewBienesAuxQr />
                </Route>
                <Route path="/public/bienes/equipo-policial/:id">
                    <PublicViewEquipoPolicialQr />
                </Route>
                <Route path="/public" exact>
                    <PublicGeneralView />
                </Route>
            </Switch>
        </>
    )
}

export default PublicRoute

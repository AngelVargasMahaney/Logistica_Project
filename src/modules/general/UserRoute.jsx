import React from 'react'
import { Route, Switch } from 'react-router-dom'
import AdminSidebar from '../admin/components/AdminSidebar'
import UserListPage from './users/UserListPage'

const UserRoute = () => {
    return (
        <>
        
            <Switch>
                <Route path="/usuario/cressar">
                    <h1>Crear</h1>
                </Route>
            </Switch>
        </>
    )
}

export default UserRoute

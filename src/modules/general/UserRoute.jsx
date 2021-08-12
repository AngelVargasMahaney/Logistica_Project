import React from 'react'
import { Route, Switch } from 'react-router-dom'
import AdminSidebar from '../admin/components/AdminSidebar'
import UserListPage from './users/UserListPage'

const UserRoute = () => {
    return (
        <>
        
            <Switch>
                <Route path="/user">
                    <h1>sdsd</h1>
                </Route>
            </Switch>
        </>
    )
}

export default UserRoute

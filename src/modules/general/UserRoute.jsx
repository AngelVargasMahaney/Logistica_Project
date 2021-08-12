import React from 'react'
import { Route, Switch } from 'react-router-dom'
import AdminSidebar from '../admin/components/AdminSidebar'
import UserListPage from './users/UserListPage'

const UserRoute = () => {
    return (
        <>
        <AdminSidebar />
            <Switch>
                <Route path="/user">
                    <UserListPage />
                </Route>
            </Switch>
        </>
    )
}

export default UserRoute

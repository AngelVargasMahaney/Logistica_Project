import React from 'react'
import AdminSidebar from './components/AdminSidebar'
import { Switch, Route } from "react-router-dom"
import AdminDashboardPage from './pages/dashboard/AdminDashboardPage'
import UserListPage from '../general/users/UserListPage'
import GeneralNavBar from '../layout/GeneralNavBar'

const AdminRouter = () => {
    return (
        <>
            <AdminSidebar />
            <GeneralNavBar/>
            <Switch>
                <Route path="/admin/user">
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

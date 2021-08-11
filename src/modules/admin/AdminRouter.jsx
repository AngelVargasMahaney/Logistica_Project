import React from 'react'
import AdminSidebar from './components/AdminSidebar'
import { Switch, Route } from "react-router-dom"
import AdminDashboardPage from './pages/dashboard/AdminDashboardPage'

const AdminRouter = () => {
    return (
        <>
            <AdminSidebar />
            <Switch>
                <Route path="/admin">
                    <AdminDashboardPage />
                </Route>
            </Switch>
        </>
    )
}

export default AdminRouter

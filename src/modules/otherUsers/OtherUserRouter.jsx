import React from 'react'
import { Switch, Route } from 'react-router-dom'
import OtherUserDashboardPage from './pages/dashboard_otheUser/OtherUserDashboardPage'
const OtherUserRouter = () => {
    return (
       <Switch>
           <Route path="/otherUser">
                <OtherUserDashboardPage/>
           </Route>
       </Switch>
    )
}

export default OtherUserRouter

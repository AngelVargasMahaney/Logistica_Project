import React from 'react'
import { Switch, BrowserRouter as Router, Route } from 'react-router-dom';
import AdminRouter from './modules/admin/AdminRouter';
import AuthRouter from './modules/auth/AuthRouter';
import Error404Page from './modules/layout/Error404Page';
import OtherUserRouter from './modules/otherUsers/OtherUserRouter';
import AuthState from './context/auth/authState';
import './styles/sidebar.css';
import './styles/dashboard.css';
import './styles/allstyles.css';
import PrivateRoute from './PrivateRoute';
import HomePage from './modules/layout/HomePage';

const App = () => {
  return (

    <Router>
      <AuthState>
        <Switch>
          <PrivateRoute path="/admin">
            <AdminRouter />
          </PrivateRoute>
          <Route path="/auth">
            <AuthRouter />
          </Route>
          <Route path="/otherUser">
            <OtherUserRouter />
          </Route>
          <Route path="/" exact>
            <HomePage />
          </Route>
          <Route component={Error404Page} />
        </Switch>
      </AuthState>
    </Router>


  )
}

export default App

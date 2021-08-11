import React from 'react'
import { Switch, BrowserRouter as Router, Route } from 'react-router-dom';
import AuthContext from './context/auth/authContext';
import AdminRouter from './modules/admin/AdminRouter';
import AuthRouter from './modules/auth/AuthRouter';
import Error404Page from './modules/layout/Error404Page';
import OtherUserRouter from './modules/otherUsers/OtherUserRouter';
import AuthState from './context/auth/authState';
import './styles/sidebar.css';
import PrivateRoute from './PrivateRoute';

const App = () => {
  return (

    <AuthState>


      <Router>

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
            <h1>Esta sería la página del login</h1>
          </Route>
          <Route component={Error404Page} />

        </Switch>
      </Router>

    </AuthState>


  )
}

export default App

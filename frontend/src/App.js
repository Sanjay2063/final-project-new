// src/App.js

import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import { AuthProvider, AuthContext } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import AdminNavbar from './components/AdminNavbar';
import EmployeeNavbar from './components/EmployeeNavbar';

import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import ManageUsers from './pages/ManageUsers';
import ManageSkills from './pages/ManageSkills';
import ManageCourses from './pages/ManageCourses';
import ManageCertifications from './pages/ManageCertifications';
import ManageEmployeeSkills from './pages/ManageEmployeeSkills';
import EmployeeDashboard from './pages/EmployeeDashboard';
import MySkills from './pages/MySkills';
import AddEmployeeSkill from './pages/AddEmployeeSkill';

const App = () => {
  const { user } = useContext(AuthContext);

  return (
    <AuthProvider>
      <Router>
        {user && user.role === 'ADMIN' && <AdminNavbar />}
        {user && user.role === 'EMPLOYEE' && <EmployeeNavbar />}

        <Switch>
          <Route exact path="/login" component={Login} />

          {/* Admin Routes */}
          <ProtectedRoute exact path="/admin" roles={['ADMIN']} component={AdminDashboard} />
          <ProtectedRoute exact path="/admin/manage-users" roles={['ADMIN']} component={ManageUsers} />
          <ProtectedRoute exact path="/admin/manage-skills" roles={['ADMIN']} component={ManageSkills} />
          <ProtectedRoute exact path="/admin/manage-courses" roles={['ADMIN']} component={ManageCourses} />
          <ProtectedRoute exact path="/admin/manage-certifications" roles={['ADMIN']} component={ManageCertifications} />
          <ProtectedRoute exact path="/admin/employee-skills" roles={['ADMIN']} component={ManageEmployeeSkills} />

          {/* Employee Routes */}
          <ProtectedRoute exact path="/employee" roles={['EMPLOYEE']} component={EmployeeDashboard} />
          <ProtectedRoute exact path="/employee/my-skills" roles={['EMPLOYEE']} component={MySkills} />
          <ProtectedRoute exact path="/employee/add-skill" roles={['EMPLOYEE']} component={AddEmployeeSkill} />

          {/* Redirect to login if no route matches */}
          <Route path="*">
            <Redirect to="/login" />
          </Route>
        </Switch>
      </Router>
    </AuthProvider>
  );
};

export default App;

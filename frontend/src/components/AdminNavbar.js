// src/components/AdminNavbar.js

import React, { useContext } from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const AdminNavbar = () => {
  const { logout } = useContext(AuthContext);
  const history = useHistory();

  const handleLogout = () => {
    logout();
    history.push('/login');
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/admin">
          Admin Dashboard
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="admin-navbar-nav" />
        <Navbar.Collapse id="admin-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/admin/manage-users">
              Manage Users
            </Nav.Link>
            <Nav.Link as={Link} to="/admin/manage-skills">
              Manage Skills
            </Nav.Link>
            <Nav.Link as={Link} to="/admin/manage-courses">
              Manage Courses
            </Nav.Link>
            <Nav.Link as={Link} to="/admin/manage-certifications">
              Manage Certifications
            </Nav.Link>
            <Nav.Link as={Link} to="/admin/employee-skills">
              Employee Skills
            </Nav.Link>
          </Nav>
          <Button variant="outline-light" onClick={handleLogout}>
            Logout
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AdminNavbar;

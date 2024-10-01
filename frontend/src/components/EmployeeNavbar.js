// src/components/EmployeeNavbar.js

import React, { useContext } from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const EmployeeNavbar = () => {
  const { logout } = useContext(AuthContext);
  const history = useHistory();

  const handleLogout = () => {
    logout();
    history.push('/login');
  };

  return (
    <Navbar bg="primary" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/employee">
          Employee Dashboard
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="employee-navbar-nav" />
        <Navbar.Collapse id="employee-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/employee/my-skills">
              My Skills
            </Nav.Link>
            <Nav.Link as={Link} to="/employee/add-skill">
              Add Skill
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

export default EmployeeNavbar;

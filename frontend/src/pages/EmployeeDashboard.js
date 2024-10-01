// src/pages/EmployeeDashboard.js

import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const EmployeeDashboard = () => {
  return (
    <Container className="mt-4">
      <h1>Employee Dashboard</h1>
      <Row className="mt-4">
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title>My Skills</Card.Title>
              <Card.Text>View your skills, certifications, and competencies.</Card.Text>
              <Link to="/employee/my-skills" className="btn btn-primary">
                View Skills
              </Link>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title>Add Skill</Card.Title>
              <Card.Text>Add a new skill with course details.</Card.Text>
              <Link to="/employee/add-skill" className="btn btn-primary">
                Add Skill
              </Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default EmployeeDashboard;

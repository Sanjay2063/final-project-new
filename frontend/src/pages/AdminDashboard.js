// src/pages/AdminDashboard.js

import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

const AdminDashboard = () => {
  return (
    <Container className="mt-4">
      <h1>Admin Dashboard</h1>
      <Row className="mt-4">
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Manage Users</Card.Title>
              <Card.Text>View, create, edit, and delete users.</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Manage Skills</Card.Title>
              <Card.Text>View, create, edit, and delete skills.</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Manage Courses</Card.Title>
              <Card.Text>View, create, edit, and delete courses.</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Manage Certifications</Card.Title>
              <Card.Text>View, create, edit, and delete certifications.</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Employee Skills</Card.Title>
              <Card.Text>Approve or reject employee skill submissions.</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminDashboard;

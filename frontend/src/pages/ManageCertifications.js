// src/pages/ManageCertifications.js

import React, { useEffect, useState } from 'react';
import { Container, Table, Button, Modal, Form } from 'react-bootstrap';
import api from '../services/api';

const ManageCertifications = () => {
  const [certifications, setCertifications] = useState([]);
  const [show, setShow] = useState(false);
  const [editingCert, setEditingCert] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    link: '',
  });

  const fetchCertifications = async () => {
    const response = await api.get('/certifications');
    setCertifications(response.data);
  };

  useEffect(() => {
    fetchCertifications();
  }, []);

  const handleClose = () => {
    setShow(false);
    setEditingCert(null);
    setFormData({
      name: '',
      link: '',
    });
  };
  const handleShow = (cert = null) => {
    if (cert) {
      setEditingCert(cert);
      setFormData({
        name: cert.name,
        link: cert.link || '',
      });
    }
    setShow(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingCert) {
        await api.put(`/certifications/${editingCert.id}`, formData);
      } else {
        await api.post('/certifications', formData);
      }
      fetchCertifications();
      handleClose();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this certification?')) {
      await api.delete(`/certifications/${id}`);
      fetchCertifications();
    }
  };

  return (
    <Container className="mt-4">
      <h2>Manage Certifications</h2>
      <Button className="mb-3" onClick={() => handleShow()}>
        Add Certification
      </Button>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Certification Name</th>
            <th>Link</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {certifications.map((cert) => (
            <tr key={cert.id}>
              <td>{cert.id}</td>
              <td>{cert.name}</td>
              <td>
                {cert.link ? (
                  <a href={cert.link} target="_blank" rel="noopener noreferrer">
                    View Certificate
                  </a>
                ) : (
                  'N/A'
                )}
              </td>
              <td>
                <Button variant="warning" size="sm" onClick={() => handleShow(cert)}>
                  Edit
                </Button>{' '}
                <Button variant="danger" size="sm" onClick={() => handleDelete(cert.id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal for Add/Edit Certification */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{editingCert ? 'Edit Certification' : 'Add Certification'}</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group controlId="formCertName" className="mb-3">
              <Form.Label>Certification Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter certification name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formCertLink" className="mb-3">
              <Form.Label>Link</Form.Label>
              <Form.Control
                type="url"
                placeholder="Enter certification link"
                name="link"
                value={formData.link}
                onChange={handleChange}
              />
              <Form.Text className="text-muted">Optional</Form.Text>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" type="submit">
              {editingCert ? 'Update Certification' : 'Add Certification'}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </Container>
  );
};

export default ManageCertifications;

// src/pages/ManageSkills.js

import React, { useEffect, useState } from 'react';
import { Container, Table, Button, Modal, Form } from 'react-bootstrap';
import api from '../services/api';

const ManageSkills = () => {
  const [skills, setSkills] = useState([]);
  const [show, setShow] = useState(false);
  const [editingSkill, setEditingSkill] = useState(null);
  const [skillName, setSkillName] = useState('');

  const fetchSkills = async () => {
    const response = await api.get('/skills');
    setSkills(response.data);
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  const handleClose = () => {
    setShow(false);
    setEditingSkill(null);
    setSkillName('');
  };

  const handleShow = (skill = null) => {
    if (skill) {
      setEditingSkill(skill);
      setSkillName(skill.name);
    }
    setShow(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingSkill) {
        await api.put(`/skills/${editingSkill.id}`, { name: skillName });
      } else {
        await api.post('/skills', { name: skillName });
      }
      fetchSkills();
      handleClose();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this skill?')) {
      await api.delete(`/skills/${id}`);
      fetchSkills();
    }
  };

  return (
    <Container className="mt-4">
      <h2>Manage Skills</h2>
      <Button className="mb-3" onClick={() => handleShow()}>
        Add Skill
      </Button>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Skill Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {skills.map((skill) => (
            <tr key={skill.id}>
              <td>{skill.id}</td>
              <td>{skill.name}</td>
              <td>
                <Button variant="warning" size="sm" onClick={() => handleShow(skill)}>
                  Edit
                </Button>{' '}
                <Button variant="danger" size="sm" onClick={() => handleDelete(skill.id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal for Add/Edit Skill */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{editingSkill ? 'Edit Skill' : 'Add Skill'}</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group controlId="formSkillName" className="mb-3">
              <Form.Label>Skill Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter skill name"
                value={skillName}
                onChange={(e) => setSkillName(e.target.value)}
                required
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" type="submit">
              {editingSkill ? 'Update Skill' : 'Add Skill'}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </Container>
  );
};

export default ManageSkills;

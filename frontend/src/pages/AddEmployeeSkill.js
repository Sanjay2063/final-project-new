// src/pages/AddEmployeeSkill.js

import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import api from '../services/api';
import { useHistory } from 'react-router-dom';

const AddEmployeeSkill = () => {
  const history = useHistory();
  const [skills, setSkills] = useState([]);
  const [courses, setCourses] = useState([]);
  const [certifications, setCertifications] = useState([]);
  const [formData, setFormData] = useState({
    skillId: '',
    courseId: '',
    score: '',
    certificateId: '',
  });
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const fetchData = async () => {
    const [skillsRes, coursesRes, certificationsRes] = await Promise.all([
      api.get('/skills'),
      api.get('/courses'),
      api.get('/certifications'),
    ]);
    setSkills(skillsRes.data);
    setCourses(coursesRes.data);
    setCertifications(certificationsRes.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/employee-skills', {
        skillId: parseInt(formData.skillId),
        courseId: parseInt(formData.courseId),
        score: parseFloat(formData.score),
        certificateId: formData.certificateId ? parseInt(formData.certificateId) : null,
      });
      setSuccess('Skill added successfully and is pending approval.');
      setFormData({
        skillId: '',
        courseId: '',
        score: '',
        certificateId: '',
      });
      setError('');
      history.push('/employee/my-skills');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add skill');
      setSuccess('');
    }
  };

  return (
    <Container className="mt-4" style={{ maxWidth: '600px' }}>
      <h2>Add Employee Skill</h2>
      {success && <Alert variant="success">{success}</Alert>}
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formSkill" className="mb-3">
          <Form.Label>Skill</Form.Label>
          <Form.Control
            as="select"
            name="skillId"
            value={formData.skillId}
            onChange={handleChange}
            required
          >
            <option value="">Select Skill</option>
            {skills.map((skill) => (
              <option key={skill.id} value={skill.id}>
                {skill.name}
              </option>
            ))}
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="formCourse" className="mb-3">
          <Form.Label>Course</Form.Label>
          <Form.Control
            as="select"
            name="courseId"
            value={formData.courseId}
            onChange={handleChange}
            required
          >
            <option value="">Select Course</option>
            {courses.map((course) => (
              <option key={course.id} value={course.id}>
                {course.name}
              </option>
            ))}
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="formScore" className="mb-3">
          <Form.Label>Score</Form.Label>
          <Form.Control
            type="number"
            step="0.1"
            placeholder="Enter score"
            name="score"
            value={formData.score}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formCertificate" className="mb-3">
          <Form.Label>Certificate</Form.Label>
          <Form.Control
            as="select"
            name="certificateId"
            value={formData.certificateId}
            onChange={handleChange}
          >
            <option value="">Select Certificate (Optional)</option>
            {certifications.map((cert) => (
              <option key={cert.id} value={cert.id}>
                {cert.name}
              </option>
            ))}
          </Form.Control>
        </Form.Group>

        <Button variant="primary" type="submit">
          Add Skill
        </Button>
      </Form>
    </Container>
  );
};

export default AddEmployeeSkill;

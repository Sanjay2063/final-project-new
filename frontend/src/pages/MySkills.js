// src/pages/MySkills.js

import React, { useEffect, useState } from 'react';
import { Container, Table, Alert } from 'react-bootstrap';
import api from '../services/api';

const MySkills = () => {
  const [skills, setSkills] = useState([]);
  const [error, setError] = useState('');

  const fetchSkills = async () => {
    try {
      const response = await api.get('/employee-skills');
      setSkills(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch skills');
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  return (
    <Container className="mt-4">
      <h2>My Skills</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Table striped bordered hover responsive className="mt-3">
        <thead>
          <tr>
            <th>Skill Name</th>
            <th>Course Name</th>
            <th>Score</th>
            <th>Certificate</th>
            <th>Approval Status</th>
          </tr>
        </thead>
        <tbody>
          {skills.map((skill) => (
            <tr key={skill.id}>
              <td>{skill.skill.name}</td>
              <td>{skill.course.name}</td>
              <td>{skill.score}</td>
              <td>
                {skill.certificate ? (
                  <a href={skill.certificate.link} target="_blank" rel="noopener noreferrer">
                    View Certificate
                  </a>
                ) : (
                  'N/A'
                )}
              </td>
              <td>{skill.approvalStatus}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default MySkills;

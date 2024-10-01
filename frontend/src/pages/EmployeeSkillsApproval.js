// src/pages/EmployeeSkillsApproval.js

import React, { useEffect, useState } from 'react';
import { Container, Alert } from 'react-bootstrap';
import SkillTable from '../components/SkillTable';
import api from '../services/api';

const EmployeeSkillsApproval = () => {
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

  const handleApprove = async (id) => {
    try {
      await api.put(`/employee-skills/${id}/approve`, { approvalStatus: 'APPROVED' });
      fetchSkills();
    } catch (err) {
      console.error(err);
    }
  };

  const handleReject = async (id) => {
    try {
      await api.put(`/employee-skills/${id}/approve`, { approvalStatus: 'REJECTED' });
      fetchSkills();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Container className="mt-4">
      <h2>Employee Skills Approval</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <SkillTable skills={skills} onApprove={handleApprove} onReject={handleReject} />
    </Container>
  );
};

export default EmployeeSkillsApproval;

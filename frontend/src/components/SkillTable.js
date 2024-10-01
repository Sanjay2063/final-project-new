// src/components/SkillTable.js

import React from 'react';
import { Table, Button } from 'react-bootstrap';

const SkillTable = ({ skills, onApprove, onReject }) => {
  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th>Skill Name</th>
          <th>Course Name</th>
          <th>Score</th>
          <th>Certificate</th>
          <th>Approval Status</th>
          <th>Actions</th>
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
            <td>
              {skill.approvalStatus === 'PENDING' && (
                <>
                  <Button variant="success" size="sm" onClick={() => onApprove(skill.id)}>
                    Approve
                  </Button>{' '}
                  <Button variant="danger" size="sm" onClick={() => onReject(skill.id)}>
                    Reject
                  </Button>
                </>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default SkillTable;

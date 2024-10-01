// src/services/employeeSkillService.js

import api from './api';

export const getEmployeeSkills = async () => {
  const response = await api.get('/employee-skills');
  return response.data;
};

export const addEmployeeSkill = async (skillData) => {
  const response = await api.post('/employee-skills', skillData);
  return response.data;
};

export const updateEmployeeSkill = async (id, skillData) => {
  const response = await api.put(`/employee-skills/${id}`, skillData);
  return response.data;
};

export const deleteEmployeeSkill = async (id) => {
  const response = await api.delete(`/employee-skills/${id}`);
  return response.data;
};

export const approveEmployeeSkill = async (id, status) => {
  const response = await api.put(`/employee-skills/${id}/approve`, { approvalStatus: status });
  return response.data;
};

// src/services/certificationService.js

import api from './api';

export const getCertifications = async () => {
  const response = await api.get('/certifications');
  return response.data;
};

export const getCertificationById = async (id) => {
  const response = await api.get(`/certifications/${id}`);
  return response.data;
};

export const createCertification = async (certData) => {
  const response = await api.post('/certifications', certData);
  return response.data;
};

export const updateCertification = async (id, certData) => {
  const response = await api.put(`/certifications/${id}`, certData);
  return response.data;
};

export const deleteCertification = async (id) => {
  const response = await api.delete(`/certifications/${id}`);
  return response.data;
};

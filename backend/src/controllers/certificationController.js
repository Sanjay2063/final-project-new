// src/controllers/certificationController.js

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getCertifications = async (req, res) => {
  const certifications = await prisma.certification.findMany();
  res.json(certifications);
};

const getCertificationById = async (req, res) => {
  const { id } = req.params;
  const certification = await prisma.certification.findUnique({
    where: { id: parseInt(id) },
  });
  if (certification) {
    res.json(certification);
  } else {
    res.status(404).json({ message: 'Certification not found' });
  }
};

const createCertification = async (req, res) => {
  const { name, link } = req.body;
  const certification = await prisma.certification.create({
    data: { name, link },
  });
  res.status(201).json(certification);
};

const updateCertification = async (req, res) => {
  const { id } = req.params;
  const { name, link } = req.body;
  const certification = await prisma.certification.update({
    where: { id: parseInt(id) },
    data: { name, link },
  });
  res.json(certification);
};

const deleteCertification = async (req, res) => {
  const { id } = req.params;
  await prisma.certification.delete({
    where: { id: parseInt(id) },
  });
  res.json({ message: 'Certification deleted' });
};

module.exports = {
  getCertifications,
  getCertificationById,
  createCertification,
  updateCertification,
  deleteCertification,
};

// src/controllers/employeeSkillController.js

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getEmployeeSkills = async (req, res) => {
  const employeeSkills = await prisma.employeeSkill.findMany({
    where: { userId: req.user.id },
    include: {
      skill: true,
      course: true,
      certificate: true,
    },
  });
  res.json(employeeSkills);
};

const addEmployeeSkill = async (req, res) => {
  const { skillId, courseId, score, certificateId } = req.body;

  const employeeSkill = await prisma.employeeSkill.create({
    data: {
      userId: req.user.id,
      skillId,
      courseId,
      score,
      certificateId: certificateId || null,
    },
  });
  res.status(201).json(employeeSkill);
};

const updateEmployeeSkill = async (req, res) => {
  const { id } = req.params;
  const { skillId, courseId, score, certificateId } = req.body;

  const employeeSkill = await prisma.employeeSkill.update({
    where: { id: parseInt(id) },
    data: {
      skillId,
      courseId,
      score,
      certificateId: certificateId || null,
      approvalStatus: 'PENDING',
    },
  });
  res.json(employeeSkill);
};

const deleteEmployeeSkill = async (req, res) => {
  const { id } = req.params;
  await prisma.employeeSkill.delete({
    where: { id: parseInt(id) },
  });
  res.json({ message: 'Employee skill deleted' });
};

// Admin specific controllers

const getAllEmployeeSkills = async (req, res) => {
  const employeeSkills = await prisma.employeeSkill.findMany({
    include: {
      user: true,
      skill: true,
      course: true,
      certificate: true,
    },
  });
  res.json(employeeSkills);
};

const approveEmployeeSkill = async (req, res) => {
  const { id } = req.params;
  const { approvalStatus } = req.body;

  if (!['APPROVED', 'REJECTED'].includes(approvalStatus)) {
    return res.status(400).json({ message: 'Invalid approval status' });
  }

  const employeeSkill = await prisma.employeeSkill.update({
    where: { id: parseInt(id) },
    data: { approvalStatus },
  });
  res.json(employeeSkill);
};

module.exports = {
  getEmployeeSkills,
  addEmployeeSkill,
  updateEmployeeSkill,
  deleteEmployeeSkill,
  getAllEmployeeSkills,
  approveEmployeeSkill,
};

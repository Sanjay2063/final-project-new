// src/controllers/skillController.js

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getSkills = async (req, res) => {
  const skills = await prisma.skill.findMany();
  res.json(skills);
};

const getSkillById = async (req, res) => {
  const { id } = req.params;
  const skill = await prisma.skill.findUnique({
    where: { id: parseInt(id) },
  });
  if (skill) {
    res.json(skill);
  } else {
    res.status(404).json({ message: 'Skill not found' });
  }
};

const createSkill = async (req, res) => {
  const { name } = req.body;
  const skill = await prisma.skill.create({
    data: { name },
  });
  res.status(201).json(skill);
};

const updateSkill = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const skill = await prisma.skill.update({
    where: { id: parseInt(id) },
    data: { name },
  });
  res.json(skill);
};

const deleteSkill = async (req, res) => {
  const { id } = req.params;
  await prisma.skill.delete({
    where: { id: parseInt(id) },
  });
  res.json({ message: 'Skill deleted' });
};

module.exports = {
  getSkills,
  getSkillById,
  createSkill,
  updateSkill,
  deleteSkill,
};

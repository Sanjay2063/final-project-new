// src/controllers/courseController.js

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getCourses = async (req, res) => {
  const courses = await prisma.course.findMany();
  res.json(courses);
};

const getCourseById = async (req, res) => {
  const { id } = req.params;
  const course = await prisma.course.findUnique({
    where: { id: parseInt(id) },
  });
  if (course) {
    res.json(course);
  } else {
    res.status(404).json({ message: 'Course not found' });
  }
};

const createCourse = async (req, res) => {
  const { name, description } = req.body;
  const course = await prisma.course.create({
    data: { name, description },
  });
  res.status(201).json(course);
};

const updateCourse = async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;
  const course = await prisma.course.update({
    where: { id: parseInt(id) },
    data: { name, description },
  });
  res.json(course);
};

const deleteCourse = async (req, res) => {
  const { id } = req.params;
  await prisma.course.delete({
    where: { id: parseInt(id) },
  });
  res.json({ message: 'Course deleted' });
};

module.exports = {
  getCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
};

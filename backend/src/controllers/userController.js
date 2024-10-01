// src/controllers/userController.js

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getUsers = async (req, res) => {
  const users = await prisma.user.findMany({
    include: { department: true },
  });
  res.json(users);
};

const getUserById = async (req, res) => {
  const { id } = req.params;
  const user = await prisma.user.findUnique({
    where: { id: parseInt(id) },
    include: { department: true },
  });
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
};

const createUser = async (req, res) => {
  const { name, email, password, role, departmentId } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      role,
      departmentId: departmentId || null,
    },
  });
  res.status(201).json(user);
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email, role, departmentId } = req.body;

  const user = await prisma.user.update({
    where: { id: parseInt(id) },
    data: {
      name,
      email,
      role,
      departmentId: departmentId || null,
    },
  });
  res.json(user);
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  await prisma.user.delete({
    where: { id: parseInt(id) },
  });
  res.json({ message: 'User deleted' });
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};

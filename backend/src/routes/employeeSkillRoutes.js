// src/routes/employeeSkillRoutes.js

const express = require('express');
const router = express.Router();
const {
  getEmployeeSkills,
  addEmployeeSkill,
  updateEmployeeSkill,
  deleteEmployeeSkill,
  getAllEmployeeSkills,
  approveEmployeeSkill,
} = require('../controllers/employeeSkillController');
const { protect, admin } = require('../middlewares/authMiddleware');

router.route('/').get(protect, admin ? getAllEmployeeSkills : getEmployeeSkills).post(protect, addEmployeeSkill);
router.route('/:id').put(protect, updateEmployeeSkill).delete(protect, deleteEmployeeSkill);
router.route('/:id/approve').put(protect, admin, approveEmployeeSkill);

module.exports = router;

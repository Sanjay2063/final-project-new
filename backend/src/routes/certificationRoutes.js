// src/routes/certificationRoutes.js

const express = require('express');
const router = express.Router();
const {
  getCertifications,
  getCertificationById,
  createCertification,
  updateCertification,
  deleteCertification,
} = require('../controllers/certificationController');
const { protect, admin } = require('../middlewares/authMiddleware');

router
  .route('/')
  .get(protect, getCertifications)
  .post(protect, admin, createCertification);
router
  .route('/:id')
  .get(protect, getCertificationById)
  .put(protect, admin, updateCertification)
  .delete(protect, admin, deleteCertification);

module.exports = router;

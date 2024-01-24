// // routes/authRoutes.js
// const express = require('express');
// const authController = require('../controllers/authController');


// const router = express.Router();

// router.post('/signup', authController.signup);
// router.post('/login', authController.login);
// // Add other routes as needed

// module.exports = router;

// routes/authRoutes.js
const express = require('express');
const authController = require('../controllers/authController');
const adminController = require('../controllers/adminController');
const coursesController = require('../controllers/coursesController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.post('/admin/login', adminController.adminLogin);

// Protected routes
router.get('/courses', authMiddleware, coursesController.getAllCourses);
router.get('/mycourses', authMiddleware, coursesController.getUserCourses);
router.post('/addcourse', authMiddleware, coursesController.addCourse);

module.exports = router;

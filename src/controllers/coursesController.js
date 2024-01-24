// controllers/coursesController.js
const Course = require('../models/Course');

async function getAllCourses(req, res) {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function getUserCourses(req, res) {
  try {
    // Assuming you have a user ID available in req.userId (from JWT token)
    const userId = req.userId;
    const userCourses = await Course.find({ enrolledUsers: userId });
    res.json(userCourses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function addCourse(req, res) {
  try {
    const { title, description } = req.body;

    // Assuming you have a user ID available in req.userId (from JWT token)
    const userId = req.userId;

    // Create a new course
    const course = new Course({
      title,
      description,
      createdBy: userId,
    });

    await course.save();

    res.json({ message: 'Course added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

module.exports = {
  getAllCourses,
  getUserCourses,
  addCourse,
};

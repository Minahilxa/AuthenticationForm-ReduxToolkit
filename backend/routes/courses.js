const express = require('express');
const router = express.Router();
const Course = require('../models/Course');
const auth = require('../middleware/auth');

// GET /api/courses - public or protected (we'll return all)
router.get('/', async (req, res) => {
  const courses = await Course.find().populate('owner', 'name email pfp').populate('enrolledUsers', 'name email');
  res.json(courses);
});
// GET /api/courses/enrolled - courses where user is enrolled
router.get('/enrolled', auth, async (req, res) => {
  const courses = await Course.find({ enrolledUsers: req.user._id }).populate('owner', 'name email');
  res.json(courses);
});
// protected routes below
// GET /api/courses/owned - courses where owner == user
router.get('/owned', auth, async (req, res) => {
  const courses = await Course.find({ owner: req.user._id }).populate('enrolledUsers', 'name email');
  res.json(courses);
});

// GET /api/courses/:id
router.get('/:id', async (req, res) => {
  const course = await Course.findById(req.params.id).populate('owner', 'name email pfp').populate('enrolledUsers', 'name email');
  if(!course) return res.status(404).json({ message: 'Course not found' });
  res.json(course);
});




// POST /api/courses - create course (authenticated)
router.post('/', auth, async (req, res) => {
  const { title, description, image } = req.body;
  const course = new Course({ title, description, image, owner: req.user._id });
  await course.save();
  const populated = await Course.findById(course._id).populate('owner', 'name email');
  res.json(populated);
});

// PUT /api/courses/:id - update course (owner only)
router.put('/:id', auth, async (req, res) => {
  const course = await Course.findById(req.params.id);
  if (!course) return res.status(404).json({ message: 'Course not found' });
  if (!course.owner.equals(req.user._id)) return res.status(403).json({ message: 'Forbidden' });

  course.title = req.body.title ?? course.title;
  course.description = req.body.description ?? course.description;
  course.image = req.body.image ?? course.image;
  await course.save();
  const updated = await Course.findById(course._id).populate('owner', 'name email');
  res.json(updated);
});

// DELETE /api/courses/:id - owner only
router.delete('/:id', auth, async (req, res) => {
  const course = await Course.findById(req.params.id);
  if (!course) return res.status(404).json({ message: 'Course not found' });
  if (!course.owner.equals(req.user._id)) return res.status(403).json({ message: 'Forbidden' });
  await course.remove();
  res.json({ message: 'Course deleted' });
});

// POST /api/courses/:id/enroll - enroll current user
router.post('/:id/enroll', auth, async (req, res) => {
  console.log("Incoming enroll request id:", req.params.id);
  console.log("Full URL:", req.originalUrl);
  console.log("User:", req.user?._id);
  const course = await Course.findById(req.params.id);
  if (!course) return res.status(404).json({ message: 'Course not found' });
  if (!course.enrolledUsers.includes(req.user._id)) {
    course.enrolledUsers.push(req.user._id);
    await course.save();
  }
  const updated = await Course.findById(course._id).populate('enrolledUsers', 'name email').populate('owner','name email');
  res.json(updated);
});

// POST /api/courses/:id/unenroll - remove user from enrolled
router.post('/:id/unenroll', auth, async (req, res) => {
  const course = await Course.findById(req.params.id);
  if (!course) return res.status(404).json({ message: 'Course not found' });
  course.enrolledUsers = course.enrolledUsers.filter(u => !u.equals(req.user._id));
  await course.save();
  const updated = await Course.findById(course._id).populate('enrolledUsers', 'name email');
  res.json(updated);
});

module.exports = router;

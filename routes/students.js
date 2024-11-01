const express = require('express');
const router = express.Router();
const Student = require('../models/student');

// In-memory student "database"
let students = [];

// GET /students - Retrieve all students
router.get('/', (req, res) => {
  res.json(students);
});

// GET /students/:id - Retrieve a student by ID
router.get('/:id', (req, res) => {
  const student = students.find(s => s.id == req.params.id);
  if (!student) return res.status(404).send('Student not found');
  res.json(student);
});

// POST /students - Create a new student
router.post('/', (req, res) => {
  const { id, name, grade, email } = req.body;
  const newStudent = new Student(id, name, grade, email);
  students.push(newStudent);
  res.status(201).json(newStudent);
});

// PUT /students/:id - Update a student by ID
router.put('/:id', (req, res) => {
  const student = students.find(s => s.id == req.params.id);
  if (!student) return res.status(404).send('Student not found');

  const { name, grade, email } = req.body;
  student.name = name || student.name;
  student.grade = grade || student.grade;
  student.email = email || student.email;
  res.json(student);
});

// DELETE /students/:id - Delete a student by ID
router.delete('/:id', (req, res) => {
  const index = students.findIndex(s => s.id == req.params.id);
  if (index === -1) return res.status(404).send('Student not found');
  students.splice(index, 1);
  res.status(204).send();
});

module.exports = router;

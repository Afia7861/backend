import { Request, Response } from "express";
import { Student } from "../types/student";

let students: Student[] = [
  {
    id: 1,
    name: "Afia",
    age: 21,
    email: "afia@example.com",
    course: "Backend Development",
    isActive: true
  }
];

let nextId = 2;

// GET all students
export const getAllStudents = (req: Request, res: Response) => {
  try {
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// GET student by ID
export const getStudentById = (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({ message: "Invalid student ID" });
    }

    const student = students.find((s) => s.id === id);

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// POST new student
export const addStudent = (req: Request, res: Response) => {
  try {
    const { name, age, email, course, isActive } = req.body;

    if (
      typeof name !== "string" || !name.trim() ||
      typeof age !== "number" || !Number.isInteger(age) || age <= 0 ||
      typeof email !== "string" ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
      typeof course !== "string" || !course.trim() ||
      typeof isActive !== "boolean"
    ) {
      return res.status(400).json({
        message: "Please provide valid student details"
      });
    }

    const newStudent: Student = {
      id: nextId++,
      name: name.trim(),
      age,
      email,
      course: course.trim(),
      isActive
    };

    students.push(newStudent);

    res.status(201).json(newStudent);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// PUT update student
export const updateStudent = (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({ message: "Invalid student ID" });
    }

    const student = students.find((s) => s.id === id);

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    const { name, age, email, course, isActive } = req.body;

    if (
      typeof name !== "string" || !name.trim() ||
      typeof age !== "number" || !Number.isInteger(age) || age <= 0 ||
      typeof email !== "string" ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
      typeof course !== "string" || !course.trim() ||
      typeof isActive !== "boolean"
    ) {
      return res.status(400).json({
        message: "Please provide valid student details"
      });
    }

    student.name = name.trim();
    student.age = age;
    student.email = email;
    student.course = course.trim();
    student.isActive = isActive;

    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// DELETE student
export const deleteStudent = (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({ message: "Invalid student ID" });
    }

    const index = students.findIndex((s) => s.id === id);

    if (index === -1) {
      return res.status(404).json({ message: "Student not found" });
    }

    students.splice(index, 1);

    res.status(200).json({ message: "Student deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
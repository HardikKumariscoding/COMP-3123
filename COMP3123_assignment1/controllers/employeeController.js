const Employee = require('../models/employeeModel'); 
const { validationResult } = require('express-validator'); 
// Get all employees
exports.getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find(); 
    res.status(200).json(employees); 
  } catch (err) {
    res.status(500).json({ message: err.message }); 
  }
};

exports.createEmployee = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() }); 
  }

  const { first_name, last_name, email, position, salary, date_of_joining, department } = req.body; 
  try {
    const employee = new Employee({ 
      first_name, 
      last_name, 
      email, 
      position, 
      salary, 
      date_of_joining, 
      department 
    }); 
    await employee.save(); 
    res.status(201).json({ message: 'Employee created successfully.' }); 
  } catch (err) {
    res.status(500).json({ message: err.message }); 
  }
};

exports.getEmployeeById = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.eid); 
    if (!employee) return res.status(404).json({ message: 'Employee not found' }); 
    res.status(200).json(employee); 
  } catch (err) {
    res.status(500).json({ message: err.message }); 
  }
};

exports.updateEmployee = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() }); 
  }

  try {
    const employee = await Employee.findByIdAndUpdate(req.params.eid, req.body, { new: true }); 
    if (!employee) return res.status(404).json({ message: 'Employee not found' }); 
    res.status(200).json({ message: 'Employee updated successfully.', employee }); 
  } catch (err) {
    res.status(500).json({ message: err.message }); 
  }
};

exports.deleteEmployee = async (req, res) => {
  const { eid } = req.query; 
  try {
    if (!eid) {
      return res.status(400).json({ message: 'Employee ID is required.' }); 
    }
    const employee = await Employee.findByIdAndDelete(eid);
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' }); 
    }
    res.status(204).json({ message: 'Employee deleted successfully.' }); 
  } catch (err) {
    res.status(500).json({ message: err.message }); 
  }
};


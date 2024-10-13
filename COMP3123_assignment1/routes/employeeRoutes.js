const express = require('express');
const { check, validationResult } = require('express-validator');
const {
  getEmployees,
  createEmployee,
  getEmployeeById,
  updateEmployee,
  deleteEmployee
} = require('../controllers/employeeController'); 

const router = express.Router();

router.post('/employees', [
  check('first_name').notEmpty().withMessage('First name is required.'),
  check('last_name').notEmpty().withMessage('Last name is required.'),
  check('email').isEmail().withMessage('Please include a valid email.'),
  check('position').notEmpty().withMessage('Position is required.'),
  check('salary').isNumeric().withMessage('Salary must be a number.'),
  check('date_of_joining').isISO8601().withMessage('Date of joining must be a valid date.'),
  check('department').notEmpty().withMessage('Department is required.')
], createEmployee);

router.get('/employees', getEmployees); 

router.get('/employees/:eid', getEmployeeById); 

router.put('/employees/:eid', [
  check('first_name').optional().notEmpty().withMessage('First name cannot be empty.'),
  check('last_name').optional().notEmpty().withMessage('Last name cannot be empty.'),
  check('email').optional().isEmail().withMessage('Please include a valid email.'),
  check('position').optional().notEmpty().withMessage('Position cannot be empty.'),
  check('salary').optional().isNumeric().withMessage('Salary must be a number.'),
  check('date_of_joining').optional().isISO8601().withMessage('Date of joining must be a valid date.'),
  check('department').optional().notEmpty().withMessage('Department cannot be empty.')
], updateEmployee);

router.delete('/employees', [
  check('eid').notEmpty().withMessage('Employee ID is required.')
], deleteEmployee); 

module.exports = router; 

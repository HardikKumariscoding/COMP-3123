const express = require('express');
const { check, validationResult } = require('express-validator');
const { signup, login } = require('../controllers/userController');
const router = express.Router();

router.post('/signup', [
  check('username').notEmpty().withMessage('Username is required.'),
  check('email').isEmail().withMessage('Please include a valid email.'),
  check('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long.')
], signup);

router.post('/login', [
  check('email').isEmail().withMessage('Please include a valid email.'),
  check('password').notEmpty().withMessage('Password is required.')
], login);

module.exports = router; 

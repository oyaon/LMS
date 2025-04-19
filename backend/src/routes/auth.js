const express = require('express');
const { check } = require('express-validator');
const authController = require('../controllers/authController');
const auth = require('../middleware/auth');

const router = express.Router();

// Updated register route with validation
router.post(
  '/register',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password must be 6 or more characters').isLength({ min: 6 }),
    check('role', 'Invalid role').optional().isIn(['admin', 'librarian', 'member'])
  ],
  authController.register
);

// Updated login route with validation
router.post(
  '/login',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists()
  ],
  authController.login
);

// Add routes for user CRUD operations
router.get('/users', auth(['admin']), authController.getAllUsers);
router.get('/users/:id', auth(['admin']), authController.getUserById);
router.put('/users/:id', auth(['admin', 'member']), authController.updateUser);
router.delete('/users/:id', auth(['admin']), authController.deleteUser);

// Admin: Get user activity logs
router.get('/users/:id/activity-logs', auth(['admin']), authController.getUserActivityLogs);

// Password reset endpoints
router.post('/forgot-password', authController.forgotPassword);
router.post('/reset-password/:token', authController.resetPassword);

// Updated to restrict updateUser to admin only
router.put(
  '/:id',
  [
    auth(['admin']),
    check('name', 'Name is required').optional().not().isEmpty(),
    check('email', 'Please include a valid email').optional().isEmail(),
    check('role', 'Invalid role').optional().isIn(['admin', 'librarian', 'member']),
    check('password', 'Password must be 6 or more characters').optional().isLength({ min: 6 })
  ],
  authController.updateUser
);
router.delete('/:id', auth(['admin']), authController.deleteUser);

// Profile update for authenticated users
router.put(
  '/profile',
  [
    auth(['admin', 'librarian', 'member']),
    check('name', 'Name is required').optional().not().isEmpty(),
    check('email', 'Please include a valid email').optional().isEmail(),
    check('password', 'Password must be 6 or more characters').optional().isLength({ min: 6 })
  ],
  authController.updateProfile
);

module.exports = router;
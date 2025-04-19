// Utility to log user activity
const User = require('../models/User');

async function logActivity(userId, action, details = '') {
  await User.findByIdAndUpdate(userId, {
    $push: {
      activityLogs: {
        action,
        details,
        timestamp: new Date()
      }
    }
  });
}

module.exports = logActivity;
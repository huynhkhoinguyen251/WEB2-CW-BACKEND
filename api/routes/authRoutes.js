const authController = require('../controllers/authController');

module.exports = app => {
  app.post('/auth/login', authController.login);
  app.post('/auth/register', authController.register);
};
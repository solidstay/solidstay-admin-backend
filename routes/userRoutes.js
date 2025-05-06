const router = require("express").Router();
const controller = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");
const userSchemas = require('../validationSchemas/userSchemas');
const validationMiddleware = require('../middleware/validationMiddleware');

router.post(
  "/:userType-register",
  validationMiddleware.validateParams(userSchemas.userTypeSchema),
  validationMiddleware.validateRequest(userSchemas.registerSchema),
  controller.Register
);

router.post(
  "/login",
  validationMiddleware.validateRequest(userSchemas.loginSchema),
  controller.Login
);

router.post(
  "/forgot-password",
  validationMiddleware.validateRequest(userSchemas.forgotPasswordSchema),
  controller.ForgotPassword
);

router.post(
  "/reset-password",
  validationMiddleware.validateRequest(userSchemas.resetPasswordSchema),
  controller.ResetPassword
);

router.post(
  "/refresh-token",
  controller.RefreshToken
);

router.post(
  "/logout",
  controller.Logout
);

router.get(
  "/fetch-user-info",
  authMiddleware.authenticateRequest,
  controller.FetchUserInfo
);

router.patch(
  "/update-user-info",
  authMiddleware.authenticateRequest,
  validationMiddleware.validateRequest(userSchemas.updateUserSchema),
  controller.UpdateUserInfo
);

router.patch(
  "/change-user-password",
  authMiddleware.authenticateRequest,
  validationMiddleware.validateRequest(userSchemas.changeUserPasswordSchema),
  controller.ChangeUserPassword
);

router.get(
  "/search-employees",
  authMiddleware.authenticateRequest,
  authMiddleware.verifyRole(['admin']),
  validationMiddleware.validateQuery(userSchemas.searchUsersSchema),
  controller.SearchEmployees
);

router.get(
  "/search-users",
  authMiddleware.authenticateRequest,
  authMiddleware.verifyRole(['admin', 'employee']),
  validationMiddleware.validateQuery(userSchemas.searchUsersSchema),
  controller.SearchUsers
);

router.post(
  "/create-employee",
  authMiddleware.authenticateRequest,
  authMiddleware.verifyRole(['admin']),
  validationMiddleware.validateRequest(userSchemas.createUserSchema),
  controller.CreateEmployee
);

router.post(
  "/create-user",
  authMiddleware.authenticateRequest,
  authMiddleware.verifyRole(['admin', 'employee']),
  validationMiddleware.validateRequest(userSchemas.createUserSchema),
  controller.CreateUser
);

router.patch(
  "/update-employee/:userId",
  authMiddleware.authenticateRequest,
  authMiddleware.verifyRole(['admin']),
  validationMiddleware.validateParams(userSchemas.userIdSchema),
  validationMiddleware.validateRequest(userSchemas.updateUserSchema),
  controller.UpdateEmployee
);

router.patch(
  "/update-user/:userId",
  authMiddleware.authenticateRequest,
  authMiddleware.verifyRole(['admin', 'employee']),
  validationMiddleware.validateParams(userSchemas.userIdSchema),
  validationMiddleware.validateRequest(userSchemas.updateUserSchema),
  controller.UpdateUser
);

router.delete(
  "/delete-employee/:userId",
  authMiddleware.authenticateRequest,
  authMiddleware.verifyRole(['admin']),
  validationMiddleware.validateParams(userSchemas.userIdSchema),
  controller.DeleteEmployee
);

router.delete(
  "/delete-user/:userId",
  authMiddleware.authenticateRequest,
  authMiddleware.verifyRole(['admin', 'employee']),
  validationMiddleware.validateParams(userSchemas.userIdSchema),
  controller.DeleteUser
);

module.exports = router;

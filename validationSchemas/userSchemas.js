const yup = require('yup');
const mongoose = require('mongoose');

const ObjectId = yup.string().test('is-valid', 'Invalid user ID', value => mongoose.Types.ObjectId.isValid(value));

const registerSchema = yup.object().shape({
  name: yup.string().trim().required('Name is required'),
  email: yup.string().trim().email('Invalid email address').required('Email is required'),
  number: yup.string().trim().required('Number is required'),
  totalContacts: yup.number(),
  dateOfBirth: yup.string().trim(),
  address: yup.string().trim().required('Address is required'),
  city: yup.string().trim().required('City is required'),
  zip: yup.string().trim().required('Zip is required'),
  password: yup.string().trim().required('Password is required'),
});

const loginSchema = yup.object().shape({
  email: yup.string().email('Invalid email address').trim().required('Email is required'),
  password: yup.string().trim().required('Password is required'),
});

const forgotPasswordSchema = yup.object().shape({
  email: yup.string().email('Invalid email address').trim().required('Email is required'),
});

const userTypeSchema = yup.object().shape({
  userType: yup.string().oneOf(['user', 'company'], 'Invalid user type').required('User type is required')
});

const resetPasswordSchema = yup.object().shape({
  token: yup.string().trim().required('Token is required'),
  newPassword: yup.string().trim().required('New Password is required'),
});

const createUserSchema = yup.object().shape({
  name: yup.string().trim().required('Name is required'),
  email: yup.string().email('Invalid email address').trim().required('Email is required'),
  number: yup.string().trim().required('Number is required'),
  dateOfBirth: yup.string().trim().required('Date of birth is required'),
  address: yup.string().trim().required('Address is required'),
  city: yup.string().trim().required('City is required'),
  zip: yup.string().trim().required('Zip is required'),
  password: yup.string().trim().required('Password is required'),
  notes: yup.string().trim()
});

const updateUserSchema = yup.object().shape({
  name: yup.string().trim(),
  email: yup.string().trim().email('Invalid email address'),
  number: yup.string().trim(),
  totalContacts: yup.number(),
  dateOfBirth: yup.string().trim(),
  address: yup.string().trim(),
  city: yup.string().trim(),
  zip: yup.string().trim(),
  // password: yup.string().trim(),
});

const userIdSchema = yup.object().shape({
  userId: ObjectId.required('User ID is required'),
});

const searchUsersSchema = yup.object().shape({
  pageIndex: yup.number().required('Page index is required'),
  limit: yup.number().positive('Limit must be positive').required('Limit is required'),
  searchQuery: yup.string().trim(),
  status: yup.string().trim(),
});

const changeUserPasswordSchema = yup.object().shape({
  oldPassword: yup.string().trim().required('Old Password is required'),
  newPassword: yup.string().trim().required('New Password is required'),
});

module.exports = {
  registerSchema,
  loginSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  userTypeSchema,
  createUserSchema,
  updateUserSchema,
  userIdSchema,
  searchUsersSchema,
  changeUserPasswordSchema
};

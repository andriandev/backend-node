import UserModel from '../models/UsersModel.js';
import bcrypt from 'bcrypt';

export const getUsers = async (req, res) => {
  try {
    const dataUser = await UserModel.findAll({
      attributes: { exclude: ['password'] },
    });
    res.status(200).json({ status: 200, data: dataUser });
  } catch (e) {
    res.status(500).json({ status: 500, data: e?.message });
  }
};

export const getUserById = async (req, res) => {
  try {
    // Get user by id from database
    const dataUser = await UserModel.findOne({
      where: {
        id: req.params.id,
      },
      attributes: { exclude: ['password'] },
    });

    // If user not exist
    if (!dataUser) {
      return res.status(404).json({ status: 404, data: 'User not found' });
    }

    // Send user data by id
    res.status(200).json({ status: 200, data: dataUser });
  } catch (e) {
    res.status(500).json({ status: 500, data: e?.message });
  }
};

export const createUser = async (req, res) => {
  // Set variabel from request body, default empty string
  const { name = '', email = '', password = '', role = '' } = req.body;

  // Check if input from request body empty
  if (
    name.length === 0 ||
    email.length === 0 ||
    password.length === 0 ||
    role.length === 0
  ) {
    return res.status(400).json({ status: 400, data: 'Input cannot empty' });
  }

  // Hash password using bcrypt
  const hashPassword = await bcrypt.hash(password, 10);

  try {
    // Create user
    await UserModel.create({
      name, // username: username
      email, // email: email
      password: hashPassword,
      role, // role: role
    });

    // Send status and message
    res.status(201).json({ status: 200, data: 'Register succesfully' });
  } catch (e) {
    let message = e?.message;
    // If email already exist in database
    if (e?.name == 'SequelizeUniqueConstraintError') {
      message = 'Email is already exist';
    }
    res.status(400).json({ status: 400, data: message });
  }
};

export const deleteUser = async (req, res) => {
  // Function delete user protect by AuthMiddleware (only admin)
  // Get user by id from database
  const dataUser = await UserModel.findOne({
    where: {
      id: req.params.id,
    },
  });

  // If user not exist
  if (!dataUser) {
    return res.status(404).json({ status: 404, data: 'User not found' });
  }

  try {
    // Delete user by id
    await UserModel.destroy({
      where: {
        id: dataUser.id,
      },
    });
    res.status(200).json({ status: 200, data: 'User deleted succesfully' });
  } catch (e) {
    res.status(400).json({ status: 400, data: e?.message });
  }
};

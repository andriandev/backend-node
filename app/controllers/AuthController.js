import UserModel from '../models/UsersModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const authLogin = async (req, res) => {
  const { email = '', password = '' } = req.body;
  try {
    // Get user by email from database
    const dataUser = await UserModel.findOne({
      where: {
        email: email,
      },
    });

    // If data user not exist
    if (!dataUser) {
      return res.status(404).json({ status: 404, data: 'User not found' });
    }

    // Check password
    const checkPassword = await bcrypt.compare(password, dataUser?.password);

    // If password not match
    if (!checkPassword) {
      return res
        .status(400)
        .json({ status: 400, data: 'Username and Password not match' });
    }

    // Create token using jwt expired 1 days
    const token = jwt.sign(
      {
        id: dataUser?.id,
      },
      process.env.SECRET_TOKEN,
      { expiresIn: '1d' }
    );

    // Send data token
    res.status(200).json({ status: 200, data: { token } });
  } catch (e) {
    res.status(500).json({ status: 500, data: e?.message });
  }
};

export const authMe = async (req, res) => {
  // Check if variabel req.isLoggedIn (set in AuthMiddleware) = true
  if (req?.isLoggedIn) {
    res.status(200).json({ status: 200, data: req?.dataUser });
  } else {
    res.status(401).json({ status: 401, data: 'Access unauthorized' });
  }
};

export const authLogout = async (req, res) => {};

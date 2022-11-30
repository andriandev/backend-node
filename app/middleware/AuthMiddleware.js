import jwt from 'jsonwebtoken';
import UserModel from '../models/UsersModel.js';

export const isLoggedIn = async (req, res, next) => {
  // Check if req.headers.authorization exist
  if (
    req?.headers?.authorization &&
    req?.headers?.authorization?.startsWith('Bearer')
  ) {
    try {
      // Get token from headers
      const token = req?.headers?.authorization?.split(' ')[1];

      // Decode token
      const tokenDecoded = jwt.verify(token, process.env.SECRET_TOKEN);

      // Get user from database by id
      const dataUser = await UserModel.findOne({
        where: { id: tokenDecoded?.id },
        attributes: { exclude: ['password'] },
      });

      // Check data user if exist
      if (dataUser) {
        // Set variabel req
        req.dataUser = dataUser;
        req.isLoggedIn = true;
        req.isRole = dataUser?.role;
      } else {
        return res
          .status(401)
          .json({ status: 401, data: 'Access unauthorized, user not found' });
      }

      next();
    } catch (e) {
      // Get error name and error message
      const nameError = e?.name;
      let message = e?.message;

      // Set error message based on jwt error name
      if (nameError == 'TokenExpiredError') {
        message = 'Token expired';
      } else if (nameError == 'JsonWebTokenError') {
        message = 'Invalid token credential';
      } else if (nameError == 'NotBeforeError') {
        message = 'Token not active';
      }
      return res.status(400).json({ status: 400, data: message });
    }
  } else {
    return res.status(401).json({ status: 401, data: 'Access unauthorized' });
  }
};

export const isAdmin = (req, res, next) => {
  // Check if var req.isLoggedIn = true and req.isRole = admin
  if (req?.isLoggedIn && req?.isRole == 'admin') {
    next();
  } else {
    return res
      .status(403)
      .json({ status: 403, data: 'Access denied, admin only' });
  }
};

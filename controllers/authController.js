import { StatusCodes } from 'http-status-codes';
import User from '../models/UserModel.js';
import { hashPassword, comparePassword } from '../utils/passwordUtils.js';
import { UnauthenticatedError } from '../errors/customErrors.js';
import { createJWT } from '../utils/tokenUtils.js';

export const register = async (req, res) => {
  try {
    // a random value that is added to the password before hashing
    const hashedPassword = await hashPassword(req.body.password);
    req.body.password = hashedPassword;

    const user = await User.create(req.body);

    res.status(StatusCodes.CREATED).json({ msg: 'User created', user });
  } catch (error) {
    console.error('Error registering user:', error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: 'Failed to register user' });
  }
};

export const login = async (req, res, next) => {
  try {
    // check if user exists
    const user = await User.findOne({ userName: req.body.userName });
    const isValidUser =
      user && (await comparePassword(req.body.password, user.password));
    if (!isValidUser) {
      throw new UnauthenticatedError('Invalid credentials');
    }
    const token = createJWT({
      userId: user._id,
      userName: user.userName,
    });
    const oneDay = 1000 * 60 * 60 * 24;
    res.cookie('token', token, {
      httpOnly: true,
      expires: new Date(Date.now() + oneDay),
      secure: process.env.NODE_ENV === 'production',
    });
    res.status(201).json({ msg: 'user logged in', token: token });
  } catch (error) {
    // Pass the error to the error handling middleware
    next(error);
  }
};

export const logout = (req, res) => {
  try {
    // Clear the authentication token cookie
    res.cookie('token', 'logout', {
      httpOnly: true,
      expires: new Date(Date.now()),
    });

    // Send a success response to the client
    res.status(StatusCodes.OK).json({ msg: 'User logged out!' });
  } catch (error) {
    // Handle errors gracefully
    console.error('Error logging out user:', error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: 'Failed to logout user' });
  }
};

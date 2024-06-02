import { StatusCodes } from 'http-status-codes';
import User from '../models/UserModel.js';

export const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user.userId });
    res.status(StatusCodes.OK).json({ user });
  } catch (error) {
    // Handle errors gracefully
    console.error('Error fetching current user:', error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: 'Failed to fetch current user' });
  }
};

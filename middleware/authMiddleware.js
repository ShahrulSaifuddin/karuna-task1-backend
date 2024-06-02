import { UnauthenticatedError } from '../errors/customErrors.js';
import { verifyJWT } from '../utils/tokenUtils.js';

export const authenticateUser = (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    throw new UnauthenticatedError('authentication invalid');
  }

  try {
    const { userId, userName } = verifyJWT(token);
    // create new object(user) attach to the req and use it in the upcoming controller
    req.user = { userId, userName };
    next();
  } catch (error) {
    throw new UnauthenticatedError('authentication invalid');
  }
};

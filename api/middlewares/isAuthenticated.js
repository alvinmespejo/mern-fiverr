import jwt from 'jsonwebtoken';
import genericErrorException from '../exceptions/genericErrorException.js';

export default function isAuthenticated(req, res, next) {
  const accessToken = req.cookies.token;

  if (!accessToken) {
    return next(genericErrorException(401, 'Unauthorized access.'));
    // return res.status(401).json({ message: 'Unauthorized access.' });
  }

  try {
    const payload = jwt.verify(accessToken, process.env.JWT_SECRET);
    if (!payload) {
      return next(genericErrorException(401, 'Unauthorized access.'));
    }

    req.user = payload;
    next();
  } catch (error) {
    return next(
      genericErrorException(
        500,
        'An error occured while processing request.',
        error
      )
    );
  }
}

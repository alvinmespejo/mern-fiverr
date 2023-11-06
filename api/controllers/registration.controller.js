import bcrypt from 'bcrypt';
import User from '../models/user.model.js';
import genericErrorException from '../exceptions/genericErrorException.js';

const bcryptSaltRounds = 16;

export const register = async (req, res, next) => {
  const { username, password, email, country, img, phone, isSeller, desc } =
    req.body;

  const user = new User();
  user.username = username;
  user.email = email;
  user.country = country;
  user.img = img;
  user.phone = phone;
  user.isSeller = isSeller;
  user.desc = desc;

  try {
    user.password = await bcrypt.hash(password, bcryptSaltRounds);
    await user.save();
    return res.status(201).json({ message: 'Registration success.' });
  } catch (error) {
    return next(
      genericErrorException(500, '', [`User registration error`, error])
    );
  }
};

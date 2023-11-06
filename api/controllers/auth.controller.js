import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
import genericErrorException from '../exceptions/genericErrorException.js';

export const signin = async (req, res, next) => {
  const { username } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // option 1
    // const { password, ...userObject } = user._doc;

    // option 2
    delete user._doc.password;

    // create token
    const token = jwt.sign(
      {
        id: user.id.toString(),
        username: user.username,
        isSeller: user.isSeller,
      },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    let cookieOptions = {
      httpOnly: true,
      signed: true,
      maxAge: 24 * 60 * 60 * 1000, // 24 hrs hrs/mins/secs
    };

    res.cookie('token', token, { cookieOptions }).status(200).json({ user });
  } catch (error) {
    return next(genericErrorException(500, null, error));
  }
};

export const signout = (req, res) => {
  return res
    .clearCookie('token', {
      secure: true,
      sameSite: 'none',
    })
    .status(201)
    .json({ message: 'Signed Out.' });
};

import User from '../models/user.model.js';
import genericErrorException from '../exceptions/genericErrorException.js';

const index = (req, res, next) => {
  return res.send('FROM CONTROLLER INDEX');
};

const show = async (req, res, next) => {
  const userId = req.params.id;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'Unknown specified resource.' });
    }

    delete user._doc.password;
    return res.status(200).json({ user });
  } catch (err) {
    return next(genericErrorException(404, '', err));
  }
};

const destroy = async (req, res, next) => {
  const userId = req.params.id;

  try {
    const user = await User.findById(userId);
    if (!user.length) {
      return next(genericErrorException(404, 'Invalid resource supplied.'));
    }

    if (req.user.id === user._id.toString()) {
      return next(genericErrorException(403, 'Forbidden action.'));
      // return res.status(403).json({ message: 'Forbidden action.' });
    }

    await User.findByIdAndDelete(userId);
    return res.status(200).json({ message: 'Delete success.' });
  } catch (error) {
    return next(
      genericErrorException(
        500,
        'An error occured while processing request.',
        error
      )
    );
  }
};

const updateUser = (req, res, next) => {
  return res.send('FROM CONTROLLER UPDATE');
};

export { destroy, updateUser, index, show };

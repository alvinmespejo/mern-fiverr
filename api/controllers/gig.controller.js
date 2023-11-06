import genericErrorException from '../exceptions/genericErrorException.js';
import Gig from '../models/gig.model.js';

const index = async (req, res, next) => {
  const q = req.query;
  const filters = {
    ...(q.cat && { cat: { $regex: q.cat, $options: 'i' } }),
    ...((q.min || q.max) && {
      price: {
        ...(q.min && { $gte: parseInt(q.min) }),
        ...(q.max && { $lte: parseInt(q.max) }),
      },
    }),
    ...(q.search && { title: { $regex: q.search, $options: 'i' } }),
    ...(q.userId && { userId: q.userId }),
  };

  try {
    const gigs = await Gig.find(filters)
      .populate({
        path: 'userId',
        select: '-password -createdAt -updatedAt',
      })
      .sort({ [q.sort]: -1 });
    return res.status(200).json({ gigs });
  } catch (err) {
    return next(
      genericErrorException(500, '', [`Error fetching gigs resource.`, err])
    );
  }
};

const show = async (req, res, next) => {
  const gigId = req.params.id;
  try {
    const gig = await Gig.findById(gigId).populate({
      path: 'userId',
      select: '-password -createdAt -updatedAt',
    });
    if (!gig) {
      return res.status(404).json({ message: 'Unknown specified resource.' });
    }

    return res.status(200).json({ gig });
  } catch (err) {
    return next(
      genericErrorException(500, '', [
        `Error fetching gig resource. ${gigId}`,
        err,
      ])
    );
  }
};

const create = async (req, res, next) => {
  if (!req.user.isSeller) {
    return next(
      genericErrorException(403, 'Forbidden: Only sellers can create gigs.')
    );
  }

  try {
    const newGig = new Gig({
      userId: req.user.id,
      ...req.body,
    });

    const gig = await newGig.save();
    return res.status(201).json({ gig });
  } catch (err) {
    return next(
      genericErrorException(500, '', ['Error creating new gig.', err])
    );
  }
};

const update = async (req, res, next) => {
  return res.send('FROM CONTROLLER UPDATE');
};

const destroy = async (req, res, next) => {
  const gigId = req.params.id;

  try {
    const gig = await Gig.findById(gigId);
    if (gig === undefined || !gig) {
      return res.status(404).json({ message: 'Unknown specified resource.' });
    }

    if (req.user.id !== gig.userId.toString()) {
      return res.status(403).json({ message: 'Forbidden resource access.' });
    }

    await Gig.findByIdAndDelete(gigId);
    return res.status(200).json({ message: 'Record deleted successfully.' });
  } catch (err) {
    return next(
      genericErrorException(500, '', [`Error updating gig - ${gigId}`, err])
    );
  }
};

export { destroy, update, index, show, create };

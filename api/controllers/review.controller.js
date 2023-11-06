import Review from '../models/review.model.js';
import Gig from '../models/gig.model.js';

import genericErrorException from '../exceptions/genericErrorException.js';

const create = async (req, res, next) => {
  const { gigId, desc, star } = req.body;
  const userId = req.user.id;

  if (req.user.isSeller) {
    return res
      .status(403)
      .json({ message: "Sorry, sellers can't add reviews." });
  }

  try {
    const review = await Review.findOne({
      gigId,
      userId,
    });

    if (review) {
      return res
        .status(403)
        .json({ message: 'You already added a review for this gig.' });
    }

    const newReview = new Review({
      userId,
      gigId,
      desc,
      star,
    });

    const savedReview = await newReview.save();
    await Gig.findOneAndUpdate(
      { gigId },
      {
        $inc: { totalStars: star, starNumber: 1 },
      }
    );

    return res.status(201).json({ review: savedReview });
  } catch (err) {
    return next(
      genericErrorException(500, '', [
        `Error occured while creating new reviews for GIG - ${gigId}`,
        err,
      ])
    );
  }
};

const show = async (req, res, next) => {
  const gigId = req.params.id;
  try {
    const reviews = await Review.find({ gigId });
    return res.status(200).json({ reviews });
  } catch (err) {
    return next(
      genericErrorException(500, '', [
        `Error occured while fetching reviews for GIG - ${gigId}`,
        err,
      ])
    );
  }
};

const update = (req, res, next) => {
  return res.send('FROM CONTROLLER INDEX');
};

const destroy = (req, res, next) => {
  return res.send('FROM CONTROLLER DELETE');
};

export { destroy, create, show, update };

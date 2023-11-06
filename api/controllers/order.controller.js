import genericErrorException from '../exceptions/genericErrorException.js';
import Gig from '../models/gig.model.js';
import Order from '../models/order.model.js';
import Stripe from 'stripe';

const paymentIntent = async (req, res, next) => {
  const stripeSecret = process.env.STRIPE_SECRET;
  const stripe = new Stripe(stripeSecret);
  const gigId = req.params.id;

  try {
    const gig = await Gig.findById(gigId);
    if (!gig) {
      return res.status(404).json({ message: 'Unknown specified resource.' });
    }

    const intent = await stripe.paymentIntents.create({
      amount: gig.price * 100,
      currency: 'usd',
      automatic_payment_methods: {
        enabled: true,
      },
    });

    const newOrder = new Order({
      gigId: gig._id,
      img: gig.cover,
      title: gig.title,
      buyerId: req.userId,
      sellerId: gig.userId,
      price: gig.price,
      payment_intent: intent.id,
    });

    await newOrder.save();
    res.status(201).json({ clientSecret: intent.client_secret });
  } catch (err) {
    next(
      genericErrorException(500, '', [
        `Error creating new stripe payment intent.`,
        err,
      ])
    );
  }
};

const create = async (req, res, next) => {
  const gigId = req.params.id;

  const newOrder = new Order();
  newOrder.sellerId = gig.userId;
  newOrder.buyerId = req.user.id;
  newOrder.gigId = gig._id;
  newOrder.img = gig.cover;
  newOrder.price = gig.price;
  newOrder.title = gig.title;
  newOrder.payment_intent = 'temporary';

  try {
    const gig = await Gig.findById(gigId);
    if (!gig) {
      return res.status(404).json({ message: 'Unknow specified resource.' });
    }

    await newOrder.save();
    res.status(201).json({ order: newOrder });
  } catch (err) {
    next(genericErrorException(500, '', [`Error creating new order.`, err]));
  }
};

const index = async (req, res, next) => {
  try {
    const orders = await Order.find({
      ...(req.user.isSeller
        ? { sellerId: req.user.id }
        : { buyerId: req.user.id }),
      isCompleted: true,
    });

    res.status(200).json({ orders });
  } catch (err) {
    next(genericErrorException(500, '', [`Error fetching orders.`, err]));
  }
};

const confirmPayment = async (req, res, next) => {
  const paymentIntent = req.body.payment_intent;
  try {
    const resp = await Order.findOneAndUpdate(
      {
        payment_intent: paymentIntent,
      },
      { $set: { isCompleted: true } }
    );

    res.status(200).json({ message: 'Payment confirm successfully.' });
  } catch (err) {
    next(
      genericErrorException(500, '', [
        `Error confirming payment for ${paymentIntent}.`,
        err,
      ])
    );
  }
};

export { paymentIntent, confirmPayment, create, index };

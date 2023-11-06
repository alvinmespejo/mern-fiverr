import genericErrorException from '../exceptions/genericErrorException.js';
import Conversation from '../models/conversation.model.js';
import Message from '../models/message.model.js';

const index = async (req, res, next) => {
  try {
    const conversations = await Conversation.find(
      req.user.isSeller ? { sellerId: req.user.id } : { buyerId: req.user.id }
    )
      .populate({ path: 'buyerId', select: '-password -createdAt -updatedAt' })
      .populate({
        path: 'sellerId',
        select: '-password -createdAt -updatedAt',
      })
      .sort({ updatedAt: '-1' });

    res.status(200).json({ conversations });
  } catch (err) {
    next(genericErrorException(500, '', ['Error fetching conversations', err]));
  }
};

const show = async (req, res, next) => {
  try {
    const conversation = await Conversation.findOne({ id: req.params.id }).sort(
      { updatedAt: '-1' }
    );
    if (!conversation) {
      return res.status(404).json({ message: 'Unknow specified resource.' });
    }

    res.status(200).json({ conversation });
  } catch (err) {
    next(
      genericErrorException(500, '', [
        `Error fetching conversation: ${req.params.id}`,
        err,
      ])
    );
  }
};

const create = async (req, res, next) => {
  const newConversation = new Conversation({
    id: req.user.isSeller
      ? req.user.id + req.body.to
      : req.body.to + req.user.id,
    sellerId: req.user.isSeller ? req.user.id : req.body.to,
    buyerId: req.user.isSeller ? req.body.to : req.user.id,
    readByBuyer: req.user.isSeller,
    readBySeller: !req.user.isSeller,
  });

  try {
    const conversation = await newConversation.save();
    res.status(201).json({ conversation });
  } catch (err) {
    next(
      genericErrorException(500, '', ['Error creating new conversation', err])
    );
  }
};

const update = async (req, res, next) => {
  const conversationId = req.params.id.toString();
  try {
    const updatedConversation = await Conversation.findOneAndUpdate(
      { id: conversationId },
      {
        $set: {
          ...(req.user.isSeller
            ? { readBySeller: true }
            : { readByBuyer: true }),
        },
      },
      { new: true }
    );

    res.status(200).json({ conversation: updatedConversation });
  } catch (err) {
    next(
      genericErrorException(500, '', ['Error creating new conversation', err])
    );
  }
};

const messages = async (req, res, next) => {
  try {
    const messages = Message.find({ conversationId: req.params.id });

    res.status(200).json({ messages });
  } catch (err) {
    next(
      genericErrorException(500, '', [
        'Error fetching conversation messages',
        err,
      ])
    );
  }
};

export { index, show, create, update, messages };

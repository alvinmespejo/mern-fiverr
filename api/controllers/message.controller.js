import Message from '../models/message.model.js';
import Conversation from '../models/conversation.model.js';
import genericErrorException from '../exceptions/genericErrorException.js';

const create = async (req, res, next) => {
  const newMessage = new Message({
    conversationId: req.body.conversationId,
    userId: req.user.id,
    desc: req.body.desc,
  });

  try {
    const message = await newMessage.save();
    await Conversation.findOneAndUpdate(
      { id: req.body.conversationId },
      {
        $set: {
          readByBuyer: !req.user.isSeller,
          readBySeller: req.user.isSeller,
          lastMessage: req.body.desc,
        },
      },
      { new: true }
    );

    res.status(201).json({ message });
  } catch (err) {
    next(genericErrorException(500, '', [`Error creating new message.`, err]));
  }
};

const show = async (req, res, next) => {
  try {
    const messages = await Message.find({ conversationId: req.params.id });
    if (!messages) {
      return res.status(404).json({ messagn: 'Unknown specified resource.' });
    }

    res.status(200).json({ messages });
  } catch (err) {
    next(genericErrorException(500, '', [`Error creating new message.`, err]));
  }
};

export { create, show };

import mongoose from 'mongoose';
const { Schema } = mongoose;

const OrderSchema = new Schema(
  {
    gigId: {
      type: Schema.Types.ObjectId,
      ref: 'Gig',
    },
    buyerId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    sellerId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    img: {
      type: String,
      required: false,
    },
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
    payment_intent: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Order', OrderSchema);

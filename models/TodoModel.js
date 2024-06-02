import mongoose from 'mongoose';

const TodoSchema = new mongoose.Schema(
  {
    title: String,
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
    },
    completed: {
      type: Boolean,
      default: false,
    },
    todoDate: Date,
  },
  { timestamps: true }
);

export default mongoose.model('Todo', TodoSchema);

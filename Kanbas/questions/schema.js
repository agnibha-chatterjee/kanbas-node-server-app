import mongoose from "mongoose";

const questionsSchema = new mongoose.Schema(
  {
    _id: { type: String, required: true },
    quizId: { type: String, required: true },
    question: { type: String, required: true },
    options: [String],
    correctAnswer: { type: Number, required: true },
    points: { type: Number, required: true },
    type: {
      type: String,
      required: true,
      enum: ["multiple_choice", "true_false", "fill_in_the_blanks"],
    },
  },
  { collection: "questions" }
);

export default questionsSchema;

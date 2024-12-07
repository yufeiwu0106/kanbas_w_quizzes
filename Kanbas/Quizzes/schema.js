import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    title: String,
    course: { type: mongoose.Schema.Types.ObjectId, ref: "CourseModel" },
    availableDate: String,
    dueDate: String,
    untilDate: String,
    point: String,
    isPublished: String, // Yes or No
  },
  { collection: "quizzes" }
);

export default schema;

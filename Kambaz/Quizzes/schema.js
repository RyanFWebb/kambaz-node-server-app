import mongoose from "mongoose";
const quizSchema = new mongoose.Schema(
    {
        _id: String,
        title: String,
        course: { type: String, ref: "CourseModel" },
        available: Date,
        due: Date,
        points: Number,
        assignTo: String,
        displayGrade: {
            type: String,
            enum: ["Percentage", "Decimal", "Number", "PROJECTS"],
            default: "Percentage",
        },
        description: String,
    },
    { collection: "assignments" }
);
export default quizSchema;
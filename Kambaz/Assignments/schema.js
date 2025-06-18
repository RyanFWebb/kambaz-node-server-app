import mongoose from "mongoose";
const assignmentSchema = new mongoose.Schema(
    {
        _id: String,
        title: String,
        course: { type: String, ref: "CourseModel" },
        available: Date,
        due: Date,
        points: Number,
        assignTo: String,
        type: {
            type: String,
            enum: ["ASSIGNMENTS", "QUIZZES", "EXAMS", "PROJECTS"],
            default: "ASSIGNMENTS",
        },
        displayGrade: {
            type: String,
            enum: ["Percentage", "Decimal", "Number", "PROJECTS"],
            default: "Percentage",
        },
        submissionType: {
            type: String,
            enum: ["Online", "Hand-In"],
            default: "Online",
        },
        description: String,
    },
    { collection: "assignments" }
);
export default assignmentSchema;
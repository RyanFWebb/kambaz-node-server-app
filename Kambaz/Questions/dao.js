import model from "./model.js";
import { v4 as uuidv4 } from "uuid";

export async function findQuestionsForQuiz(quizId) {
    return await model.find({ quiz: quizId });
}

export async function findQuestionById(questionId) {
    return await model.findById(questionId);
}

export async function createQuestion(question) {
    const newQuestion = { ...question, _id: uuidv4() };
    return await model.create(newQuestion);
}

export async function updateQuestion(questionId, updates) {
    return await model.findByIdAndUpdate(questionId, updates, { new: true });
}

export async function deleteQuestion(questionId) {
    return await model.findByIdAndDelete(questionId);
}
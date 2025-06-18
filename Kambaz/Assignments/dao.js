// import Database from "../Database/index.js";
import model from "./model.js";
import { v4 as uuidv4 } from "uuid";

export async function findAssignmentsForCourse(courseId) {
    return await model.find({ course: courseId });
    // return Database.assignments.filter((a) => a.course === courseId);
}

export async function findAssignmentById(assignmentId) {
    return await model.findById(assignmentId);
    // return Database.assignments.find((a) => a._id === assignmentId);
}

export async function createAssignment(assignment) {
    const newAssignment = { ...assignment, _id: uuidv4() };
    return await model.create(newAssignment);
    // const newAssignment = { ...assignment, _id: uuidv4() };
    // Database.assignments.push(newAssignment);
    // return newAssignment;
}

export async function updateAssignment(assignmentId, updates) {
    return await model.findByIdAndUpdate(assignmentId, updates, { new: true });
    // const assignment = Database.assignments.find((a) => a._id === assignmentId);
    // if (assignment) {
    //     Object.assign(assignment, updates);
    // }
    // return assignment;
}

export async function deleteAssignment(assignmentId) {
    return await model.findByIdAndDelete(assignmentId);
    // Database.assignments = Database.assignments.filter((a) => a._id !== assignmentId);
}

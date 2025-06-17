// // import Database from "../Database/index.js";
// import model from "./model.js";
// import { v4 as uuidv4 } from "uuid";


// // export function enrollUserInCourse(userId, courseId) {
// //   const { enrollments } = Database;
// //   enrollments.push({ _id: uuidv4(), user: userId, course: courseId });
// // }

// // export function unenrollUserFromCourse(userId, courseId) {
// //   const { enrollments } = Database;
// //   const index = enrollments.findIndex(
// //     (e) => e.user === userId && e.course === courseId
// //   );
// //   if (index !== -1) {
// //     enrollments.splice(index, 1);
// //     return { status: "success" };
// //   }
// //   return { status: "not found" };
// // }

// export async function enrollUserInCourse(userId, courseId) {
//   try {
//     const enrollment = await model.create({
//       _id: uuidv4(),
//       user: userId,
//       course: courseId,
//     });
//     return enrollment;
//   } catch (error) {
//     console.error("Error enrolling user:", error);
//     throw error;
//   }
// }

// export async function unenrollUserFromCourse(userId, courseId) {
//   try {
//     const result = await model.deleteOne({ user: userId, course: courseId });
//     if (result.deletedCount > 0) {
//       return { status: "success" };
//     } else {
//       return { status: "not found" };
//     }
//   } catch (error) {
//     console.error("Error unenrolling user:", error);
//     throw error;
//   }
// }

import model from "./model.js";

export async function findCoursesForUser(userId) {
  const enrollments = await model.find({ user: userId }).populate("course");
  return enrollments.map((enrollment) => enrollment.course);
}

export async function findUsersForCourse(courseId) {
  const enrollments = await model.find({ course: courseId }).populate("user");
  return enrollments.map((enrollment) => enrollment.user);
}

export function enrollUserInCourse(user, course) {
  const newEnrollment = { user, course, _id: `${user}-${course}` };
  return model.create(newEnrollment);
}

export function unenrollUserFromCourse(user, course) {
  return model.deleteOne({ user, course });
}
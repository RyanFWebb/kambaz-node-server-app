import Database from "../Database/index.js";
import model from "./model.js";
import enrollmentModel from "../Enrollments/model.js";
import { v4 as uuidv4 } from "uuid";

export function findAllCourses() {
  // return Database.courses;
  return model.find();
}

// export function findCoursesForEnrolledUser(userId) {
//   const { courses, enrollments } = Database;
//   const enrolledCourses = courses.filter((course) =>
//     enrollments.some((enrollment) => enrollment.user === userId && enrollment.course === course._id));
//   return enrolledCourses;
// }

// export function findCoursesForEnrolledUser(userId) {
//   const { courses, enrollments } = Database;
//   const enrolledCourseIds = enrollments
//     .filter((enrollment) => enrollment.user === userId)
//     .map((enrollment) => enrollment.course);

//   const enrolledCourses = courses
//     .filter((course) => enrolledCourseIds.includes(course._id))
//     .map((course) => ({
//       ...course,
//       enrolled: true,
//     }));

//   return enrolledCourses;
// }

export async function findCoursesForEnrolledUser(userId) {
  try {
    // Find all enrollments for the given user
    const enrollments = await enrollmentModel.find({ user: userId });

    // Extract course IDs from the enrollments
    const courseIds = enrollments.map((enrollment) => enrollment.course);

    // Find the courses with those IDs
    const courses = await model.find({ _id: { $in: courseIds } });

    // Mark each course as enrolled
    const coursesWithEnrollmentFlag = courses.map((course) => ({
      ...course.toObject(),
      enrolled: true,
    }));

    return coursesWithEnrollmentFlag;
  } catch (err) {
    console.error("Error fetching enrolled courses:", err);
    throw err;
  }
}

export function createCourse(course) {
  const newCourse = { ...course, _id: uuidv4() };
  return model.create(newCourse);
  // Database.courses = [...Database.courses, newCourse];
  // return newCourse;
}

// export function deleteCourse(courseId) {
//     const { courses, enrollments } = Database;
//     Database.courses = courses.filter((course) => course._id !== courseId);
//     Database.enrollments = enrollments.filter(
//         (enrollment) => enrollment.course !== courseId
//     );
// }

export function deleteCourse(courseId) {
  return model.deleteOne({ _id: courseId });
}

export function updateCourse(courseId, courseUpdates) {
    return model.updateOne({ _id: courseId }, { $set: courseUpdates });
    // const { courses } = Database;
    // const course = courses.find((course) => course._id === courseId);
    // Object.assign(course, courseUpdates);
    // return course;
}
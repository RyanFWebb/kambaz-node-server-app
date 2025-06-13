import * as enrollmentsDao from "./dao.js";


export default function EnrollmentRoutes(app) {
  app.post("/api/users/:userId/courses/:courseId", async (req, res) => {
    const { userId, courseId } = req.params;
    const enrollment = await enrollmentsDao.enrollUserInCourse(userId, courseId);
    res.status(201).send(enrollment);
  });

  app.delete("/api/users/:userId/courses/:courseId", async (req, res) => {
    const { userId, courseId } = req.params;
    const result = await enrollmentsDao.unenrollUserFromCourse(userId, courseId);
    res.send(result);
  });
}
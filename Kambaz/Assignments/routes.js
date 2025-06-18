import * as dao from "./dao.js";

export default function AssignmentRoutes(app) {
    app.get("/api/courses/:cid/assignments", async (req, res) => {
        const { cid } = req.params;
        const assignments = await dao.findAssignmentsForCourse(cid);
        res.send(assignments);
    });

    app.get("/api/assignments/:aid", async (req, res) => {
        const { aid } = req.params;
        const assignment = await dao.findAssignmentById(aid);
        if (assignment) {
        res.send(assignment);
        } else {
        res.status(404).send({ message: "Assignment not found" });
        }
    });

    app.post("/api/courses/:cid/assignments", async (req, res) => {
        const { cid } = req.params;
        const newAssignment = await dao.createAssignment({ ...req.body, course: cid });
        res.send(newAssignment);
    });

    app.put("/api/assignments/:aid", async (req, res) => {
        const { aid } = req.params;
        const updated = await dao.updateAssignment(aid, req.body);
        res.send(updated);
    });

    app.delete("/api/assignments/:aid", async (req, res) => {
        const { aid } = req.params;
        await dao.deleteAssignment(aid);
        res.sendStatus(200);
    });
}
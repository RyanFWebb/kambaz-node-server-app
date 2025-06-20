import * as dao from "./dao.js";

export default function QuizRoutes(app) {
    app.get("/api/courses/:cid/quizzes", async (req, res) => {
        const { cid } = req.params;
        const quizzes = await dao.findQuizzesForCourse(cid);
        res.send(quizzes);
    });

    app.get("/api/quizzes/:qid", async (req, res) => {
        const { qid } = req.params;
        const quiz = await dao.findQuizById(qid);
        if (quiz) {
            res.send(quiz);
        } else {
            res.status(404).send({ message: "Quiz not found" });
        }
    });

    app.post("/api/courses/:cid/quizzes", async (req, res) => {
        const { cid } = req.params;
        const newQuiz = await dao.createQuiz({ ...req.body, course: cid });
        res.send(newQuiz);
    });

    app.put("/api/quizzes/:qid", async (req, res) => {
        const { qid } = req.params;
        const updated = await dao.updateQuiz(qid, req.body);
        res.send(updated);
    });

    app.delete("/api/quizzes/:qid", async (req, res) => {
        const { qid } = req.params;
        await dao.deleteQuiz(qid);
        res.sendStatus(200);
    });
}

// import * as dao from "./dao.js";

// console.log("QuizRoutes file executing...");

// export default function QuizRoutes(app) {
//     console.log("QuizRoutes function called!");
    
//     // Test route to verify routes are working
//     app.get("/api/quiz-health", (req, res) => {
//         console.log("Health check route hit");
//         res.json({ 
//             status: "Quiz routes working!", 
//             timestamp: new Date(),
//             message: "If you see this, QuizRoutes is registered correctly"
//         });
//     });

//     // GET all quizzes for a course
//     app.get("/api/courses/:cid/quizzes", async (req, res) => {
//         try {
//             const { cid } = req.params;
//             console.log("GET quizzes for course:", cid);
            
//             const quizzes = await dao.findQuizzesForCourse(cid);
//             console.log("Found", quizzes.length, "quizzes for course", cid);
            
//             res.json(quizzes);
//         } catch (error) {
//             console.error("Error fetching quizzes for course:", error);
//             res.status(500).json({ 
//                 message: "Error fetching quizzes", 
//                 error: error.message 
//             });
//         }
//     });

//     // GET specific quiz by ID
//     app.get("/api/quizzes/:qid", async (req, res) => {
//         try {
//             const { qid } = req.params;
//             console.log("GET quiz by ID:", qid);
            
//             const quiz = await dao.findQuizById(qid);
//             if (quiz) {
//                 console.log("Found quiz:", quiz.title);
//                 res.json(quiz);
//             } else {
//                 console.log("Quiz not found:", qid);
//                 res.status(404).json({ message: "Quiz not found" });
//             }
//         } catch (error) {
//             console.error("Error fetching quiz by ID:", error);
//             res.status(500).json({ 
//                 message: "Error fetching quiz", 
//                 error: error.message 
//             });
//         }
//     });

//     // CREATE new quiz for a course
//     app.post("/api/courses/:cid/quizzes", async (req, res) => {
//         try {
//             const { cid } = req.params;
//             console.log("POST quiz creation for course:", cid);
//             console.log("Request body:", JSON.stringify(req.body, null, 2));
//             console.log("Request headers:", req.headers);
            
//             // Validate required fields
//             if (!req.body.title) {
//                 console.log("Validation failed: Missing title");
//                 return res.status(400).json({ 
//                     message: "Quiz title is required" 
//                 });
//             }
            
//             console.log("Calling DAO createQuiz...");
//             const quizData = { ...req.body, course: cid };
//             const newQuiz = await dao.createQuiz(quizData);
            
//             console.log("Quiz created successfully!");
//             console.log("Created quiz ID:", newQuiz._id);
//             console.log("Created quiz title:", newQuiz.title);
            
//             res.status(201).json(newQuiz);
//         } catch (error) {
//             console.error("Error creating quiz:", error);
//             console.error("Error stack:", error.stack);
//             console.error("Error message:", error.message);
            
//             res.status(500).json({ 
//                 message: "Error creating quiz", 
//                 error: error.message,
//                 stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
//             });
//         }
//     });

//     // UPDATE existing quiz
//     app.put("/api/quizzes/:qid", async (req, res) => {
//         try {
//             const { qid } = req.params;
//             console.log("PUT quiz update:", qid);
//             console.log("Update data:", JSON.stringify(req.body, null, 2));
            
//             const updated = await dao.updateQuiz(qid, req.body);
//             if (updated) {
//                 console.log("Quiz updated successfully:", updated.title);
//                 res.json(updated);
//             } else {
//                 console.log("Quiz not found for update:", qid);
//                 res.status(404).json({ message: "Quiz not found" });
//             }
//         } catch (error) {
//             console.error("Error updating quiz:", error);
//             res.status(500).json({ 
//                 message: "Error updating quiz", 
//                 error: error.message 
//             });
//         }
//     });

//     // DELETE quiz
//     app.delete("/api/quizzes/:qid", async (req, res) => {
//         try {
//             const { qid } = req.params;
//             console.log("DELETE quiz:", qid);
            
//             const deleted = await dao.deleteQuiz(qid);
//             if (deleted) {
//                 console.log("Quiz deleted successfully");
//                 res.json({ message: "Quiz deleted successfully" });
//             } else {
//                 console.log("Quiz not found for deletion:", qid);
//                 res.status(404).json({ message: "Quiz not found" });
//             }
//         } catch (error) {
//             console.error("Error deleting quiz:", error);
//             res.status(500).json({ 
//                 message: "Error deleting quiz", 
//                 error: error.message 
//             });
//         }
//     });
    
//     console.log("All quiz routes registered successfully");
// }
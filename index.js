import express from 'express';
import Hello from './Hello.js';
import Lab5 from './Lab5/index.js';
import cors from "cors";
import UserRoutes from "./Kambaz/Users/routes.js";
import CourseRoutes from "./Kambaz/Courses/routes.js";
// import EnrollmentRoutes from "./Kambaz/Enrollments/routes.js":
// import AssignmentRoutes from "./Assignments/routes.js";
import ModuleRoutes from './Kambaz/Modules/routes.js';
import "dotenv/config";
import session from "express-session";

const app = express();
const allowedOrigins = [
    process.env.NETLIFY_URL,
    "https://kambaz-react-web-app-webb.netlify.app",
    /^https:\/\/[a-z0-9]+--kambaz-react-web-app-webb\.netlify\.app$/
];
// app.use(
//   cors({
//     credentials: true,
//     origin: process.env.NETLIFY_URL || "http://localhost:5173" || allowedOrigins,
//   })
// );

app.use(
  cors({
    credentials: true,
    origin: function (origin, callback) {
      if (!origin) return callback(null, true); // Allow requests like curl or Postman
      const allowedOrigins = [
        "https://kambaz-react-web-app-webb.netlify.app",
        /^https:\/\/[a-z0-9]+--kambaz-react-web-app-webb\.netlify\.app$/,
        "http://localhost:5173"
      ];
      const isAllowed = allowedOrigins.some(o =>
        typeof o === "string" ? o === origin : o.test(origin)
      );
      if (isAllowed) {
        return callback(null, true);
      }
      callback(new Error("Not allowed by CORS"));
    }
  })
);


const sessionOptions = {
  secret: process.env.SESSION_SECRET || "kambaz",
  resave: false,
  saveUninitialized: false,
};
if (process.env.NODE_ENV !== "development") {
  sessionOptions.proxy = true;
  sessionOptions.cookie = {
    sameSite: "none",
    secure: true,
    domain: process.env.NODE_SERVER_DOMAIN,
  };
}
app.use(session(sessionOptions));
app.use(express.json());

Lab5(app);
UserRoutes(app);
CourseRoutes(app);
// EnrollmentRoutes(app);
ModuleRoutes(app);
// AssignmentRoutes(app)
Hello(app);

app.listen(process.env.PORT || 4000);
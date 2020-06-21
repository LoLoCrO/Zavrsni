import { Router } from "express";
import Groups from "./routes/groups";
import Users from "./routes/users";
import Professors from "./routes/professors";
import Students from "./routes/students";
import Auth from "./routes/auth";

const router = Router();

Auth(router);
Groups(router);
Users(router);
Professors(router);
Students(router);

export default router;

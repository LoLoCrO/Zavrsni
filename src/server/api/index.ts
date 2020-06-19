import { Router } from "express";
import Groups from "./routes/groups";
import Users from "./routes/users";
import Professors from "./routes/professors";
import Students from "./routes/students";
import Login from "./routes/login";

const router = Router();

Groups(router);
Users(router);
Professors(router);
Students(router);
Login(router);

export default router;

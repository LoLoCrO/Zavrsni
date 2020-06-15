import { Router } from "express";
import Groups from "./routes/groups";
import Professors from "./routes/professors";
import Students from "./routes/students";

const router = Router();
Groups(router);
Professors(router);
Students(router);

export default router;

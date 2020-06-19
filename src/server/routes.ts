export type routesType = {
  role: string;
  path: string;
  pageToRender: string;
};

const routes: Array<routesType> = [
  { role: "public", path: "/login", pageToRender: "login" },
  { role: "student", path: "/studenthome", pageToRender: "studentHome" },
  { role: "student", path: "/questionnaire", pageToRender: "questionnaire" },
  { role: "admin", path: "/adminhome", pageToRender: "adminHome" },
  { role: "admin", path: "/addstudents", pageToRender: "addStudents" },
  { role: "admin", path: "/addgroups", pageToRender: "addGroups" },
];

export default routes;

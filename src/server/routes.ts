export type routesType = {
  role: string;
  path: string;
  pageToRender: string;
};

export const studentRoutes: Array<routesType> = [
  { role: "student", path: "/studenthome", pageToRender: "studentHome" },
  { role: "student", path: "/questionnaire", pageToRender: "questionnaire" },
];

export const adminRoutes: Array<routesType> = [
  { role: "admin", path: "/adminhome", pageToRender: "adminHome" },
  { role: "admin", path: "/addstudents", pageToRender: "addStudents" },
  { role: "admin", path: "/addgroups", pageToRender: "addGroups" },
  { role: "admin", path: "/populategroup", pageToRender: "populateGroup" },
  {
    role: "admin",
    path: "/professorprofile",
    pageToRender: "professorProfile",
  },
];

export const publicPaths = ["/login", "/api/auth", "/_next"];

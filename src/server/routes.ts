export type routesType = {
    path: string | RegExp;
    pageToRender: string;
};

const routes: Array<routesType> = [
    { path: '/login', pageToRender: 'login' },
    { path: '/studenthome', pageToRender: 'studentHome' },
    { path: '/questionnaire', pageToRender: 'questionnaire' },
];

export default routes;

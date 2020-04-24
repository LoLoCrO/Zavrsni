export type routesType = {
    path: string | RegExp;
    pageToRender: string;
};

const routes: Array<routesType> = [
    { path: '/desktop/login', pageToRender: 'login' },
    { path: '/desktop/studentHome', pageToRender: 'studentHome' },
    { path: '/desktop/questionnarie', pageToRender: 'questionnarie' },
    { path: '/tablet/login', pageToRender: 'login' },
    { path: '/tablet/studentHome', pageToRender: 'studentHome' },
    { path: '/tablet/questionnarie', pageToRender: 'questionnarie' },
    { path: '/mobile/login', pageToRender: 'login' },
    { path: '/mobile/studentHome', pageToRender: 'studentHome' },
    { path: '/mobile/questionnarie', pageToRender: 'questionnarie' },
];

export default routes;

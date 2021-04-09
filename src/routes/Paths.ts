enum Paths {
    Home = '/',
    Test = '/test',
    Test2 = '/test2',
}

export const pageRoutes: { path: string }[] = [
    {
        path: Paths.Home,
    },
    {
        path: Paths.Test,
    },
    {
        path: Paths.Test2,
    },
];

export default Paths;

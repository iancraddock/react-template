// export default {
//     routes: [
//         { id: 1, path: '/', title: 'Home' },
//         { id: 2, path: '/test', title: 'Test' },
//         { id: 3, path: '/test2', title: 'Test2' },
//     ],
// };

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

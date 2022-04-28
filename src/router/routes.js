const routes = [{
  path: '/',
  component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue'),
},
{
  path: '/detail',
  component: () => import(/* webpackChunkName: "detail" */ '../views/Detail.vue'),
},
];

export default routes;

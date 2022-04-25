const routes = [{
  path: '/',
  component: () => import(/* webpackChunkName: "about" */ '../views/Home.vue'),
},
{
  path: '/detail',
  component: () => import(/* webpackChunkName: "about" */ '../views/Detail.vue'),
},
];

export default routes;

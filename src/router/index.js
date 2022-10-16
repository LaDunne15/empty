import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
//import ListView from '../views/ListView.vue'
import HelloWorld from '../components/HelloWorld.vue'
//const HW = { template: '<div>{{$route.params.id}}</div>'}
const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView
  },
  {
    path: '/list/:id',
    component: HelloWorld,
    props: route => ({ id: route.params.id })
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

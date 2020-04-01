import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Players from '../views/Players.vue'
import Games from "../views/Games";
import CreateGame from "../views/CreateGame";
import CreatePlay from "../views/CreatePlay";
import CreatePlayer from "../views/CreatePlayer";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/players',
    name: 'Players',
    component: Players
  },
  {
    path:'/games',
    name:'Games',
    component: Games
  },
  {
    path:'/createplay',
    name:'CreatePlay',
    component: CreatePlay
  },
  {
    path:'/creategame',
    name:'CreateGame',
    component:CreateGame
  },
  {
    path:'/createplayer',
    name:'CreatePlayer',
    component:CreatePlayer
  }

]

const router = new VueRouter({
  routes
})

export default router

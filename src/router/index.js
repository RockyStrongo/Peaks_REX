//vue-router library used for navigation
import {
    createWebHistory,
    createRouter
} from "vue-router";


// 1. Define route components.
// These can be imported from other files
import LoginPage from "../pages/LoginPage/LoginPage.vue";
import SignUpPage from "../pages/SignUpPage/SignUpPage.vue";
import RecoverPasswordPage from "../pages/RecoverPasswordPage/RecoverPasswordPage.vue";
import ListOfExperiencesPage from "../pages/ListOfExperiencesPage/ListOfExperiencesPage.vue";
import ProfilePage from "../pages/ProfilePage/ProfilePage.vue";
import ExperiencePage from "../pages/ExperiencePage/ExperiencePage.vue";
import CreateFakeData from "../mock-data/CreateFakeData.vue";


const history = createWebHistory();
const routes = [
  {
    path: "/",
    component: ListOfExperiencesPage,
    meta: { requiresAuth: true }
  },
  {
    path: "/login",
    component: LoginPage
  },
  {
    path: "/signup",
    component: SignUpPage
  },
  {
    path: "/recover-password",
    component: RecoverPasswordPage
  },
  {
    path: "/list-of-experiences",
    component: ListOfExperiencesPage,
    meta: { requiresAuth: true }
  },
  {
    path: "/profile",
    component: ProfilePage,
    meta: { requiresAuth: true }
  },
  {
    path: "/experience/:experienceId",
    component: ExperiencePage,
    meta: { requiresAuth: true }
  },
  {
    path: "/create-data",
    component: CreateFakeData
  },
];


const router = createRouter({
  history,
  routes
});


router.beforeEach((to, from) => {
  
  let userConnected = JSON.parse(sessionStorage.getItem('userConnected'))

  if (to.meta.requiresAuth && !userConnected) {
    return {
      path: '/login'
    }
  } 
})


export default router;
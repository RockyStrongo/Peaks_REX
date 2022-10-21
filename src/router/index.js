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

const history = createWebHistory();
const routes = [
  {
    path: "/",
    component: LoginPage
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
    component: ListOfExperiencesPage
  },
];


const router = createRouter({
  history,
  routes
});
export default router;
//vue-router library used for navigation
import {
    createWebHistory,
    createRouter
} from "vue-router";


// 1. Define route components.
// These can be imported from other files
import LoginPage from "../components/LoginPage/LoginPage.vue";
import SignUpPage from "../components/SignUpPage/SignUpPage.vue";


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
];

const router = createRouter({
  history,
  routes
});
export default router;
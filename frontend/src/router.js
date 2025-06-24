import { createRouter, createWebHistory } from "vue-router";

import Home from "./components/Home.vue";
import AssignmentCreation from "./components/AssignmentCreation.vue";
import MyLibrary from "./components/MyLibrary.vue";
import axios from "axios";
import RegisterPage from "./components/Register.vue";
import LoginPage from "./components/Login.vue";
import ResetPasswordPage from "./components/ForgotPassword.vue";

import PrivacyAndPolicyPage from "./components/PrivacyAndPolicy.vue";
import TermAndConditionPage from "./components/TermAndCondition.vue";
import RedirectionPage from "./components/RedirectPage.vue";

import DiscoveryPage from "./components/Discovery.vue";
import AssignmentViewPage from "./components/AssignmentView.vue";

const routes = [
  {
    path: "/",
    component: Home,
  },
  {
    path: "/assignmentcreation",
    component: AssignmentCreation,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/assignmentcreation/:id",
    component: AssignmentCreation,
    props: true,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/mylibrary",
    component: MyLibrary,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/signup",
    component: RegisterPage,
  },
  {
    path: "/signin",
    component: LoginPage,
  },
  {
    path: "/appredirection",
    component: RedirectionPage,
    props: true,
  },
  {
    // View the assignment created from anyone.
    path: "/discovery",
    component: DiscoveryPage,
  },
  {
    // this page can be redirected form discovery page and required assignment ID to view, the assignment instruction are unable to be modify.
    path: "/assignmentview/:id",
    props: true,
    component: AssignmentViewPage,
  },
  {
    path: "/resetpassword",
    component: ResetPasswordPage,
  },
  {
    path: "/privacypolicy",
    component: PrivacyAndPolicyPage,
  },
  {
    path: "/termandcondition",
    component: TermAndConditionPage,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (localStorage.getItem("userInfo") === null) {
      router.push({ path: "/signin" });
    } else {
      axios
        .get("/checkvalidcreator")
        .then(() => {
          next();
        })
        .catch((e) => {
          router.push({ path: "/signin" });
        });
    }
  } else {
    next();
  }
});

export default router;

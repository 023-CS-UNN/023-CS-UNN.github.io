import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _31cf8b02 = () => interopDefault(import('..\\pages\\addCourse.vue' /* webpackChunkName: "pages/addCourse" */))
const _66fce2a4 = () => interopDefault(import('..\\pages\\courses\\index.vue' /* webpackChunkName: "pages/courses/index" */))
const _3e184a62 = () => interopDefault(import('..\\pages\\login.vue' /* webpackChunkName: "pages/login" */))
const _9015d0a6 = () => interopDefault(import('..\\pages\\register.vue' /* webpackChunkName: "pages/register" */))
const _81a57972 = () => interopDefault(import('..\\pages\\courses\\_courseId.vue' /* webpackChunkName: "pages/courses/_courseId" */))
const _174c37b8 = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages/index" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/023-CS-UNN.github.io/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/addCourse",
    component: _31cf8b02,
    name: "addCourse"
  }, {
    path: "/courses",
    component: _66fce2a4,
    name: "courses"
  }, {
    path: "/login",
    component: _3e184a62,
    name: "login"
  }, {
    path: "/register",
    component: _9015d0a6,
    name: "register"
  }, {
    path: "/courses/:courseId",
    component: _81a57972,
    name: "courses-courseId"
  }, {
    path: "/",
    component: _174c37b8,
    name: "index"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}

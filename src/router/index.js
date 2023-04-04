import { createRouter, createWebHistory } from 'vue-router'
import MainComp      from '../components/MainComp.vue'
import NoticeList    from '../views/NoticeList.vue'
import NoticeView    from '../views/NoticeView.vue'
import InquireList   from '../views/InquireList.vue'
import InquireWrite  from '../views/InquireWrite.vue'
import InquireView   from '../views/InquireView.vue'
import InquireModify from '../views/InquireModify.vue'


const routes = [
  { path: '/',                      name: 'home',          component: MainComp                                     },
  { path: '/login',                 name: 'login',         component: () => import("../views/LoginView.vue")       },
  { path: '/categories/item/:cno',  name: 'item',          component: () => import("../views/ItemsView.vue")       },
  { path: '/product/search/:typed', name: 'search',        component: () => import("../views/SearchItems.vue")     },
  { path: '/product/detail/:pno',   name: 'product',       component: () => import("../views/ProductDetail.vue")   },
  { path: '/NoticeList',            name: 'NoticeList',    component: NoticeList                                   },
  { path: '/NoticeView',            name: 'NoticeView',    component: NoticeView                                   },
  { path: '/InquireList',           name: 'InquireList',   component: InquireList                                  },
  { path: '/InquireWrite',          name: 'InquireWrite',  component: InquireWrite                                 },
  { path: '/InquireView',           name: 'InquireView',   component: InquireView                                  },
  { path: '/InquireModify',         name: 'InquireModify', component: InquireModify                                },
  { path: '/joinmember',            name: 'joinmember',    component: () => import("../components/JoinMember.vue") },
  { path: '/mypage',                name: 'mypage',        component: () => import("../components/MyPage.vue")     },
  { path: '/passverify',            name: 'passverify',    component: () => import("../components/PassVerify.vue") },
  { path: '/cart',                  name: 'cart',          component: () => import("../views/Cart.vue")            }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

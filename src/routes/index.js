
import Login from '../pages/Login'
import Relation from '../pages/admin/about/Relation'
import Vision from '../pages/admin/about/Vision'
import PageNotFound from '../pages/PageNotFound'
import City from '../pages/admin/City'
import Discuss from '../pages/admin/Discuss'
import Home from '../pages/admin/homePage'
import Order from '../pages/admin/Order'
import Rest from '../pages/admin/Rest'
export const mainRoutes=[{
    path:'/login',
    component:Login
},{
    path:'/404',
    component:PageNotFound
}];
export const adminRoutes=[{
    path:'/admin/about/relation',
    component: Relation,
},{
    path:'/admin/about/vision',
    component:Vision
},{
    path:'/admin/city',
    component:City
  
},{
    path:'/admin/discuss',
    component:Discuss
},{
    path:'/admin/homePage',
    component:Home,
    exact:true
},
{
    path:'/admin/order',
    component:Order
},{
    path:'/admin/rest',
    component:Rest
}]
import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import TodoList from '@/components/TodoList'
import Stock from '@/components/Stock'
import Carousel from '@/components/Carousel'
import VueCharts from 'vue-charts'

import BootstrapVue from 'bootstrap-vue'

import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'bootstrap/dist/css/bootstrap.css'

Vue.use(BootstrapVue)
Vue.use(Router)
Vue.use(VueCharts)

export default new Router({
  routes: [
    {
    	path: '/todo',
    	name: 'Todo',
    	component: TodoList,
    //   props:(route)=>{ 
    // 		return {
    // 			todos:[
    //       {title: 'Todo A', project: 'Project A', done: false},
				//   {title: 'Todo B', project: 'Project B', done: true}
    //       ]
			 //  }
		  // }
   	},
    {
      path: '/stock',
      name: 'Stock',
      component: Stock,
    },
    {
      	path: '/',
      	name: 'Hello',
      	component: HelloWorld,
    },
    {
      path: '/carousel',
      name: 'Carousel',
      component: Carousel,
    }



  ]
})

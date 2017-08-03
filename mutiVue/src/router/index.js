import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home'


const side = resolve => require(["@/components/side"], resolve);

Vue.use(Router)


const options = {
    routes: [{
        path: '/',
        name: 'home',
        component: home
    }, {
        path: '/side',
        name: 'side',
        component: side
    }]
};
export default new Router(options);
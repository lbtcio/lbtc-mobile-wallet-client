import Vue from 'vue';
import VueRouter from 'vue-router';
import Vuex from 'vuex';

Vue.use(VueRouter);
Vue.use(Vuex);

const router = new VueRouter({
	// mode: 'history',
	routes: [
		{
			path: '/guide',
			name: 'guide',
			component: (resolve) => require(['./pages/guide/index.vue'], resolve)
		},
		{
			path: '/',
			name: 'main',
			component: (resolve) => require(['./pages/main/index.vue'], resolve)
		},
		{
			path: '/create-index',
			name: 'create-index',
			component: (resolve) => require(['./pages/create/index.vue'], resolve)
		},
		{
			path: '/create-create',
			name: 'create-create',
			component: (resolve) => require(['./pages/create/create.vue'], resolve)
		},
		{
			path: '/create-packup',
			name: 'create-packup',
			component: (resolve) => require(['./pages/create/packup.vue'], resolve)
		},
		{
			path: '/create-mnemonic',
			name: 'create-mnemonic',
			component: (resolve) => require(['./pages/create/mnemonic.vue'], resolve)
		},

		{
			path: '/import-index',
			name: 'import-index',
			component: (resolve) => require(['./pages/import/index.vue'], resolve)
		},

		{
			path: '/main-index',
			name: 'main-index',
			component: (resolve) => require(['./pages/main/index.vue'], resolve)
		},
		{
			path: '/wallet-index',
			name: 'wallet-index',
			component: (resolve) => require(['./pages/wallet/index.vue'], resolve)
		},
		{
			path: '/wallet-send',
			name: 'wallet-send',
			component: (resolve) => require(['./pages/wallet/send.vue'], resolve)
		},
		{
			path: '/wallet-receive',
			name: 'wallet-receive',
			component: (resolve) => require(['./pages/wallet/receive.vue'], resolve)
		},
		{
			path: '/news-index',
			name: 'news-index',
			component: (resolve) => require(['./pages/news/index.vue'], resolve),
			meta:{
				keepAlive : true
			}
		},
		{
			path: '/news-detail',
			name: 'news-detail',
			component: (resolve) => require(['./pages/news/detail.vue'], resolve)
		},
		{
			path: '/mine-index',
			name: 'mine-index',
			component: (resolve) => require(['./pages/mine/index.vue'], resolve)
		},
		{
			path: '/mine-tx-his',
			name: 'mine-tx-his',
			component: (resolve) => require(['./pages/mine/tx-his.vue'], resolve)
		},
		{
			path: '/mine-tx-hisInfo',
			name: 'mine-tx-hisInfo',
			component: (resolve) => require(['./pages/mine/tx-hisInfo.vue'], resolve)
		},
		{
			path: '/mine-addrs',
			name: 'mine-addrs',
			component: (resolve) => require(['./pages/mine/addrs.vue'], resolve),
			meta:{
				keepAlive : false
			}
		},
		{
			path: '/mine-addrInfo',
			name: 'mine-addrInfo',
			component: (resolve) => require(['./pages/mine/addrInfo.vue'], resolve)
		},
		{
			path: '/mine-manage',
			name: 'mine-manage',
			component: (resolve) => require(['./pages/mine/manage.vue'], resolve)
		},
		{
			path: '/mine-manageInfo',
			name: 'mine-manageInfo',
			component: (resolve) => require(['./pages/mine/manageInfo.vue'], resolve)
		},
		{
			path: '/mine-set',
			name: 'mine-set',
			component: (resolve) => require(['./pages/mine/set.vue'], resolve)
		},
		{
			path: '/mine-help',
			name: 'mine-help',
			component: (resolve) => require(['./pages/mine/help.vue'], resolve)
		},
		{
			path: '/mine-about',
			name: 'mine-about',
			component: (resolve) => require(['./pages/mine/about.vue'], resolve)
		},
		{
			path: '/vote-index',
			name: 'vote-index',
			component: (resolve) => require(['./pages/vote/index.vue'], resolve)
		},
		{
			path: '/vote-register',
			name: 'vote-register',
			component: (resolve) => require(['./pages/vote/register.vue'], resolve)
		},
		{
			path: '/vote-votes',
			name: 'vote-votes',
			component: (resolve) => require(['./pages/vote/votes.vue'], resolve)
		},
		{
			path: '/vote-voters',
			name: 'vote-voters',
			component: (resolve) => require(['./pages/vote/voters.vue'], resolve)
		},
		{
			path: '/vote-vote',
			name: 'vote-vote',
			component: (resolve) => require(['./pages/vote/vote.vue'], resolve)
		},
		{
			path: '/vote-votecancel',
			name: 'vote-votecancel',
			component: (resolve) => require(['./pages/vote/votecancel.vue'], resolve)
		}
	]
});

export default router;
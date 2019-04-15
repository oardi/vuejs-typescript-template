import './polyfills';
import Vue from 'vue';

import { App } from './app';
import './style.scss';

new Vue({
	el: '#app',
	render: h => h(App)
});

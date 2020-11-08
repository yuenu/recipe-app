import { createStore } from 'vuex';
import authModule from './modules/auth/index.js';
import requestsModule from './modules/requests/index.js';

const store = createStore({
	modules: {
		auth: authModule,
		requests: requestsModule
	}
});


export default store;
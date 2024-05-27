export const ROUTER_KEYS = {
	LOGIN: { ROOT: '/login', LOGIN: 'login', AUTHORIZED: 'authorized' },
	REGISTER: {
		ROOT: '/register',
		REGISYER: 'register',
		AUTHORIZED: 'authorized',
	},
	HOME: { ROOT: '/', HOME: 'home', AUTHORIZED: 'authorized' },
	TODOS: { ROOT: '/todos', TODOS: 'todos', AUTHORIZED: 'authorized' },
	TODOSDETAILS: {
		ROOT: '/todos/:todoId/',
		TODOSDETAILS: 'todosdetails',
		AUTHORIZED: 'authorized',
	},
	SETTINGS: {
		ROOT: '/settings',
		SETTINGS: 'settings',
		AUTHORIZED: 'authorized',
	},
	RESETPASSWORD: {
		ROOT: '/reset-password/',
		RESETPASSWORD: 'resetpassword',
		AUTHORIZED: 'authorized',
	},
};

export const ROUTER_KEYS = {
	HOME: { ROOT: '/', HOME: 'home', AUTHORIZED: 'authorized' },
	TODOS: { ROOT: '/todos', TODOS: 'todos', AUTHORIZED: 'authorized' },
	TODOSDETAILS: {
		ROOT: '/todos/:todoId/',
		TODOSDETAILS: 'todosdetails',
		AUTHORIZED: 'authorized',
	},
};

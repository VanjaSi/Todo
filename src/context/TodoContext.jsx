import { useState, createContext, useEffect } from 'react';

const TodoContext = createContext();

export function TodoProvider({ children }) {
	const [todos, setTodos] = useState([]);
	const [edit, setEdit] = useState({ todo: null, edit: false });

	const fetchData = async (url, method) => {
		try {
			const res = await fetch(url, method);
			if (!res.ok) throw new Error(' Page could not be found');
			const data = await res.json();
			return data;
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		const fetch = async () => {
			const data = await fetchData('/todos?_sort=id&_order=DESC');
			setTodos(data);
		};
		fetch();
	}, []);

	const deleteTodo = async (id) => {
		await fetchData(`/todos/${id}`, { method: 'DELETE' });

		setTodos(await fetchData('/todos?_sort=id&_order=DESC'));
	};

	const addTodo = async (newTodo) => {
		await fetchData(`/todos/`, {
			method: 'POST',
			body: JSON.stringify(newTodo),
			headers: {
				'Content-type': 'application/json; charset=UTF-8',
			},
		});
		setTodos(await fetchData('/todos?_sort=id&_order=DESC'));
	};

	const editTodo = (todo) => {
		setEdit({ todo: todo, edit: true });
	};

	const updateTodos = async (todo) => {
		await fetchData(`/todos/${todo.id}`, {
			method: 'PUT',
			body: JSON.stringify(todo),
			headers: {
				'Content-type': 'application/json; charset=UTF-8',
			},
		});

		setTodos(await fetchData('/todos?_sort=id&_order=DESC'));
		setEdit({ todo: null, edit: false });
	};

	return (
		<TodoContext.Provider
			value={{ todos, edit, deleteTodo, addTodo, editTodo, updateTodos }}>
			{children}
		</TodoContext.Provider>
	);
}

export default TodoContext;

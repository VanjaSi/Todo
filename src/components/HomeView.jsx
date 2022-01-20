import TodoList from './TodoList';
import TodoContext from '../context/TodoContext';
import { useContext } from 'react';
import AddForm from './AddForm';

function HomeView() {
	const { todos, edit } = useContext(TodoContext);

	return (
		<>
			{edit.edit ? (
				<AddForm />
			) : (
				<div>
					<h3 className='view-title'>List of Todoes</h3>

					{todos ? (
						<div className='row-card'>
							{todos.map((todo) => (
								<TodoList key={todo.id} todo={todo} />
							))}
						</div>
					) : (
						<p>No todos to show</p>
					)}
				</div>
			)}
		</>
	);
}

export default HomeView;

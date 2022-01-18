import TodoList from './TodoList';
import TodoContext from '../context/TodoContext';
import { useContext } from 'react';
import AddForm from './AddForm';

function HomeView() {
	const { todos, edit } = useContext(TodoContext);

	return (
		<div>
			{edit.edit ? (
				<AddForm />
			) : (
				<div>
					<h3>List of Todoes</h3>
					<div className='row'>
						{todos &&
							todos.map((todo) => <TodoList key={todo.id} todo={todo} />)}
					</div>
				</div>
			)}
		</div>
	);
}

export default HomeView;

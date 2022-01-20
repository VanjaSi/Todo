import Card from './shared/Card';
import { useContext } from 'react';

import { FaTimes, FaEdit, FaCheck } from 'react-icons/fa';
import TodoContext from '../context/TodoContext';

function TodoList({ todo }) {
	const { deleteTodo } = useContext(TodoContext);
	const { editTodo } = useContext(TodoContext);

	return (
		<Card>
			<div className='row'>
				<FaEdit className='edit-icon' onClick={() => editTodo(todo)} />
				<FaTimes className='delete-icon' onClick={() => deleteTodo(todo.id)} />
			</div>

			<div className='todo-info'>
				<h3>{todo.text}</h3>
				<h4>{todo.day}</h4>
				<h4>{todo.time}</h4>
			</div>

			{todo.complete && <FaCheck className='check-icon' />}
		</Card>
	);
}

export default TodoList;

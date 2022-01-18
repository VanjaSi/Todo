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
				<FaEdit
					style={{
						color: '#4961a3',
						width: '30px',
						height: '30px',
						cursor: 'pointer',
						display: 'inline-block',
					}}
					onClick={() => editTodo(todo)}
				/>
				<FaTimes
					style={{
						color: 'd30505',
						width: '30px',
						height: '30px',
						cursor: 'pointer',
						display: 'inline-block',
					}}
					onClick={() => deleteTodo(todo.id)}
				/>
			</div>

			<h3>{todo.text}</h3>
			<h4>{todo.time}</h4>

			{todo.complete && (
				<FaCheck
					style={{
						color: 'green',
						width: '60px',
						height: '100px',
						cursor: 'pointer',
					}}
				/>
			)}
		</Card>
	);
}

export default TodoList;

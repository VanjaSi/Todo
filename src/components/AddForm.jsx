import { useState, useEffect, useRef, useContext } from 'react';
import { useNavigate } from 'react-router';
import TodoContext from '../context/TodoContext';
import Error from './shared/Error';

function AddForm({ add }) {
	const [date, setDate] = useState('');
	const [text, setText] = useState('');
	const [time, setTime] = useState('');
	const [isChecked, setIsChecked] = useState();

	const [error, setError] = useState('');
	const { edit, updateTodos, addTodo } = useContext(TodoContext);

	useEffect(() => {
		if (add === 'add') {
			setText('');
			setTime('');
			setDate('');
			setIsChecked('');
		} else {
			setText(edit.todo.text);
			setDate(edit.todo.date);
			setTime(edit.todo.time);
			setIsChecked(edit.todo.complete);
		}
	}, []);

	const dateRef = useRef();
	const navigate = useNavigate();

	const formatText = (e) => {
		setText(e.target.value);
	};
	const formatDate = (e) => {
		const today = new Date(date);
		const selected = new Date(e.target.value);
		const diff = (selected.getTime() - today.getTime()) / (1000 * 60 * 60 * 24);

		if (diff < 0) {
			setError('Previous days cannot be selected');

			return;
		}
		setError('');
		setDate(selected.toDateString());
	};
	const formatTime = (e) => {
		setTime(e.target.value);
	};
	const toggleComplete = (e) => {
		setIsChecked(e.target.checked);
	};
	const handleSubmitAdd = (e) => {
		e.preventDefault();
		if (!text || !date || !time) {
			//Error component
			setError('Fill all the fields');
			// alert('fill all the fields');
			return;
		}
		setError('');
		const newTodo = {
			text,
			time: `${date} at ${time}`,
			complete: isChecked,
		};
		addTodo(newTodo);
		setDate('');
		setTime('');
		setText('');
		navigate('/');
	};
	const handleSubmitEdit = (e) => {
		e.preventDefault();

		updateTodos('todo');
		const newTodo = {
			text,
			time: `${date} at ${time}`,
			complete: isChecked,
			id: edit.todo.id,
		};
		updateTodos(newTodo);
	};

	return (
		<div className='row-column'>
			{error && <Error>{error}</Error>}
			{edit.edit ? <h3>Edit Todo</h3> : ''}
			<form onSubmit={edit.edit ? handleSubmitEdit : handleSubmitAdd}>
				<div className='form-control'>
					<input
						type='text'
						placeholder='Add todo...'
						value={text}
						onChange={formatText}
					/>
				</div>
				<div className='form-control'>
					<input type='date' ref={dateRef} onChange={formatDate} />
				</div>
				<div className='form-control'>
					<input type='time' value={time} onChange={formatTime} />
				</div>
				{edit.edit && (
					<div className='form-control row'>
						<label htmlFor='check' style={{ textAlign: 'left' }}>
							Complete
						</label>
						<input
							id='check'
							type='checkbox'
							value={isChecked}
							onChange={toggleComplete}
							checked={isChecked}
							style={{ width: '30px', color: '#000' }}
						/>
					</div>
				)}
				<div className='form-control submit'>
					<input type='submit' value={edit.edit ? 'Edit Todo' : 'Add Todo'} />{' '}
				</div>
			</form>
		</div>
	);
}

export default AddForm;

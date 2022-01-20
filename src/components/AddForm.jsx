import { useState, useEffect, useRef, useContext } from 'react';
import { useNavigate } from 'react-router';
import TodoContext from '../context/TodoContext';
import DatePicker from 'react-datepicker';
import setHours from 'date-fns/setHours';
import setMinutes from 'date-fns/setMinutes';
import 'react-datepicker/dist/react-datepicker.css';

function AddForm({ add }) {
	const [text, setText] = useState('');
	const [date, setDate] = useState('');
	const [isChecked, setIsChecked] = useState(false);

	const { edit, updateTodos, addTodo } = useContext(TodoContext);

	const inputText = useRef();
	const navigate = useNavigate();

	useEffect(() => {
		inputText.current.focus();
		if (add) {
			setText('');
			setDate('');
			setIsChecked(false);
		} else {
			setText(edit.todo.text);
			setDate(Date.parse(edit.todo.day));
			setIsChecked(edit.todo.complete);
		}
	}, [add, edit.todo.complete, edit.todo.day, edit.todo.text]);

	const handleSubmit = (e, add) => {
		e.preventDefault();
		const day = date ? new Date(date).toDateString() : '';
		const time = date
			? new Date(date).toLocaleTimeString([], {
					hour: '2-digit',
					minute: '2-digit',
			  })
			: '';
		const newTodo = {
			text,
			day,
			time,
			complete: isChecked,
		};
		if (add) {
			addTodo(newTodo);
			navigate('/');
			return;
		} else {
			newTodo.id = edit.todo.id;
			updateTodos(newTodo);
		}
	};

	return (
		<div className='row-column'>
			{edit.edit ? <h3 className='view-title'>Edit Todo</h3> : ''}
			<form
				onSubmit={(e) =>
					add ? handleSubmit(e, true) : handleSubmit(e, false)
				}>
				<div className='form-control'>
					<input
						ref={inputText}
						type='text'
						placeholder='Add todo...'
						value={text}
						onChange={(e) => setText(e.target.value)}
						required
					/>
				</div>
				<div className='form-control'>
					<DatePicker
						className='date-picker'
						selected={date}
						placeholderText={add && 'Click to select a date'}
						onChange={(date) => setDate(date)}
						isClearable
						showTimeSelect
						timeFormat='HH:mm'
						injectTimes={[
							setHours(setMinutes(new Date(), 1), 0),
							setHours(setMinutes(new Date(), 5), 12),
							setHours(setMinutes(new Date(), 59), 23),
						]}
						dateFormat='MMMM d, yyyy h:mm aa'
						minDate={new Date()}
						InputProps={{
							disableUnderline: true,
						}}
					/>
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
							onChange={(e) => setIsChecked(e.target.checked)}
							checked={isChecked}
							style={{ width: '30px', color: '#000' }}
						/>
					</div>
				)}
				<div className='form-control submit'>
					<input type='submit' value={edit.edit ? 'Edit Todo' : 'Add Todo'} />
				</div>
			</form>
		</div>
	);
}

export default AddForm;

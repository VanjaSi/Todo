import AddForm from './AddForm';

function AddView() {
	return (
		<div>
			<h3 className='view-title'>Add todo</h3>
			<AddForm add={true} />
		</div>
	);
}

export default AddView;

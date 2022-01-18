import { FaTimes } from 'react-icons/fa';

function Error({ children }) {
	return (
		<div className='error-holder'>
			<p>{children}</p>
			<FaTimes
				style={{
					color: '#000',
					height: '16px',
					cursor: 'pointer',
					display: 'inline-block',
					position: 'absolute',
					top: '3px',
					right: '-1px',
				}}
			/>
		</div>
	);
}

export default Error;

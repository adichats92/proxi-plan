import { useNavigate } from 'react-router-dom';

const GoBack = () => {
	const navigate = useNavigate();
	const handleClick = () => {
		navigate(-1);
	};

	return (
		<div>
			<button onClick={handleClick}></button>
		</div>
	);
};
export default GoBack;

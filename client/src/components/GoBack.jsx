import { useNavigate } from 'react-router-dom';

const GoBack = () => {
	const navigate = useNavigate();
	const handleGoBackClick = () => {
		navigate(-1);
	};

	return (
		<div>
			<button onClick={handleGoBackClick}></button>
		</div>
	);
};
export default GoBack;

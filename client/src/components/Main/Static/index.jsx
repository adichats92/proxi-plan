import Dynamic from '../Dynamic';
import Radio from './Radio';
import Todos from './Todos';

const Static = () => {
	return (
		<div>
			<h2>Static Parts</h2>
			<Radio />
			<Todos />
			<Dynamic />
		</div>
	);
};

export default Static;

import Community from './Community';
import Map from './Map';
import News from './News';

const Dynamic = () => {
	return (
		<div>
			<h2>Dynamic Part</h2>
			<h2>
				<Community />
				<Map />
				<News />
			</h2>
		</div>
	);
};

export default Dynamic;

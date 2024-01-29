import Community from './Community';
import Map from './Map';
import News from './News';

const Dynamic = () => {
	return (
		<div className='container col-span-4 flex flex-grow justify-around items-center dark:bg-gray-800 dark:text-neutral-200 me-0 pe-0'>
			<Community />
			<Map />
			<News />
		</div>
	);
};

export default Dynamic;

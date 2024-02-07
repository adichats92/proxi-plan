import Radio from './Radio';
import Todos from './Todos';

const SideBar = () => {
	return (
		<>
			<div className='bg-cyan-100 dark:bg-gray-800 dark:text-white min-w-96 fixed top-16 left-0 h-full z-40'>
				<div>
					<Radio />
					<Todos />
				</div>
			</div>
		</>
	);
};

export default SideBar;

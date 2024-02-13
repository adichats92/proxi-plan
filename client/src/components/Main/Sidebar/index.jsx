// import Radio from './Radio';
import Todos from './Todos';

const SideBar = () => {
	return (
		<>
			<div className='bg-white bg-opacity-20 backdrop-blur-md dark:text-white min-w-96 fixed top-16 left-0 h-full'>
				<div>
					{/* <Radio /> */}
					<Todos />
				</div>
			</div>
		</>
	);
};

export default SideBar;

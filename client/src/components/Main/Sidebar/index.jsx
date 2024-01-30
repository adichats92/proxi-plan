import Radio from './Radio';
import Todos from './Todos';

const SideBar = () => {
	return (
		<>
			<div className='md:col-span-2 bg-cyan-100 dark:bg-[#030712] dark:text-neutral-200 px-1 h-full'>
				<div>
					<Radio />
					<Todos />
				</div>
			</div>
		</>
	);
};

export default SideBar;

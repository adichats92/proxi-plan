import { Sidebar } from 'flowbite-react';
import Radio from './Radio';
import Todos from './Todos';

const SideBar = () => {
	return (
		<>
			<div
				className='col-span-2 bg-cyan-100 dark:bg-[#030712] dark:text-neutral-200 p-3 md:p-7'
				style={{ height: '93vh' }}
			>
				<div>
					<Radio />
					<Todos />
				</div>
			</div>
		</>
	);
};

export default SideBar;

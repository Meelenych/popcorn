import React from 'react';

import Navigation from './Navigation';
import MobileMenu from './MobileMenu';

const Header = () => {
	return (
		<div className='h-20 py-5 px-4 bg-gradient-to-b from-[--background-secondary] to-[--background]'>
			<div className='block md:hidden'>
				<MobileMenu />
			</div>
			<div className='hidden md:block '>
				<Navigation />
			</div>
		</div>
	);
};

export default Header;

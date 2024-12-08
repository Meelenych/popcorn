import React from 'react';
import Navigation from './Navigation';
import MobileMenu from './MobileMenu';
import { useRouter } from 'next/router';

const Header = () => {
	const router = useRouter();
	const pagePath = router.pathname.split('/')[1];

	const pageName = pagePath => {
		switch (pagePath) {
			case '':
				return 'Home';
			case 'trending':
				return 'Trending';
			case 'search':
				return 'Search';
			case 'theaters':
				return 'In theaters now';
			case 'series':
				return 'TV Shows';
			default:
				return 'Unknown Page';
		}
	};
	return (
		<div className='h-20 py-5 px-4 bg-gradient-to-b from-[--background-secondary] to-[--background]'>
			<div className='md:hidden flex justify-start items-center h-full'>
				<MobileMenu />
				<h2 className='text-xl text-center w-full'>{pageName(pagePath)}</h2>
			</div>
			<div className='hidden md:block '>
				<Navigation />
			</div>
		</div>
	);
};

export default Header;

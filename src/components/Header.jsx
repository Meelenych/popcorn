import React from 'react';
import Link from 'next/link';

const Header = () => {
	return (
		<div className='text-xl font-light h-20 w-full flex justify-around items-center bg-gradient-to-b from-[--background-secondary] to-[--background]'>
			<Link
				className='link-accent hover:text-[--accent] active:text-[--active]'
				href='/'>
				Home
			</Link>
			<Link
				className='link-accent hover:text-[--accent] active:text-[--active]'
				href='/trending'>
				Trending
			</Link>
			<Link
				className='link-accent hover:text-[--accent] active:text-[--active]'
				href='/search'>
				Search
			</Link>
			<Link
				className='link-accent hover:text-[--accent] active:text-[--active]'
				href='/theaters'>
				In theaters now
			</Link>
			<Link
				className='link-accent hover:text-[--accent] active:text-[--active]'
				href='/series'>
				TV Shows
			</Link>
		</div>
	);
};

export default Header;

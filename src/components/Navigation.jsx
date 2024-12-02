import Link from 'next/link';

const Navigation = () => {
	return (
		<>
			<nav
				className={`flex-col md:flex-row gap-7 md:gap-3 flex justify-around w-full text-xl font-light`}>
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
			</nav>
		</>
	);
};

export default Navigation;

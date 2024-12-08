import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Navigation = () => {
	const pathname = usePathname();

	const activeLink =
		'bg-gradient-to-b from-[--background] to-[--background-secondary] rounded-md link-accent hover:text-[--accent] active:text-[--active]';
	return (
		<>
			<nav
				className={`flex-col md:flex-row gap-7 md:gap-3 flex justify-around w-full text-xl font-light`}>
				<Link
					className={`hover:text-[--accent] active:text-[--active] ${
						pathname === '/' && activeLink
					}`}
					href='/'>
					<div className='py-2 px-6'>Home</div>
				</Link>
				<Link
					className={`hover:text-[--accent] active:text-[--active] ${
						pathname === '/trending' && activeLink
					}`}
					href='/trending'>
					<div className='py-2 px-6'>Trending</div>
				</Link>
				<Link
					className={`hover:text-[--accent] active:text-[--active] ${
						pathname === '/search' && activeLink
					}`}
					href='/search'>
					<div className='py-2 px-6'>Search</div>
				</Link>
				<Link
					className={`hover:text-[--accent] active:text-[--active] ${
						pathname === '/theaters' && activeLink
					}`}
					href='/theaters'>
					<div className='py-2 px-6'>In theaters now</div>
				</Link>
				<Link
					className={`hover:text-[--accent] active:text-[--active] ${
						pathname === '/series' && activeLink
					}`}
					href='/series'>
					<div className='py-2 px-6'>TV Shows</div>
				</Link>
			</nav>
		</>
	);
};

export default Navigation;

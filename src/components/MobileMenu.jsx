import React from 'react';
import { useState } from 'react';
import Navigation from './Navigation';
import s from '../styles/hover.module.css';

const MobileMenu = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	return (
		<div className='relative'>
			{/* Hamburger Icon */}
			<button
				className='p-2 text-[--textColor] hover:text-[--accent] active:text-[--active]'
				onClick={toggleMenu}
				aria-label='Toggle menu'>
				<svg
					className='w-6 h-6'
					fill='none'
					stroke='currentColor'
					viewBox='0 0 24 24'
					xmlns='http://www.w3.org/2000/svg'>
					<path
						strokeLinecap='round'
						strokeLinejoin='round'
						strokeWidth='2'
						d='M4 6h16M4 12h16M4 18h16'></path>
				</svg>
			</button>

			{/* Slide-in Menu */}
			<div
				className={`fixed z-50 top-0 left-0 h-full w-64 bg-gradient-to-r rounded-r-lg from-[--background-secondary] to-[--background] shadow-lg transform transition-transform duration-300 ${
					isMenuOpen ? 'translate-x-0' : '-translate-x-full'
				} ${s.shadowed}`}>
				<div className='p-4'>
					<button
						className='mb-4 p-2 text-[--textColor] hover:text-[--accent] active:text-[--active]'
						onClick={toggleMenu}
						aria-label='Close menu'>
						<svg
							className='w-6 h-6'
							fill='none'
							stroke='currentColor'
							viewBox='0 0 24 24'
							xmlns='http://www.w3.org/2000/svg'>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth='2'
								d='M6 18L18 6M6 6l12 12'></path>
						</svg>
					</button>
					<div className='px-3'>
						<Navigation />
					</div>
				</div>
			</div>

			{/* Overlay */}
			{isMenuOpen && (
				<div
					className='fixed inset-0 bg-black bg-opacity-50'
					onClick={toggleMenu}></div>
			)}
		</div>
	);
};

export default MobileMenu;

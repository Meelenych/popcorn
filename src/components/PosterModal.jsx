import React, { useEffect } from 'react';
import s from '@/styles/hover.module.css';

const PosterModal = ({ posterPath, title, setShowModal }) => {
	useEffect(() => {
		const onKey = e => {
			if (e.key === 'Escape') setShowModal(false);
		};
		window.addEventListener('keydown', onKey);
		return () => window.removeEventListener('keydown', onKey);
	}, [setShowModal]);
	return (
		<div
			className='fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm px-4 py-6'
			aria-modal='true'
			role='dialog'
			aria-label={title ? `Poster for ${title}` : 'Poster modal'}
			onClick={() => setShowModal(false)}>
			<div
				className='relative max-w-xl w-full rounded-sm overflow-hidden shadow-2xl bg-[--background-primary]'
				onClick={e => e.stopPropagation()}>
				<div className='rounded-sm bg-[--background-secondary] p-1'>
					<button
						aria-label='Close modal'
						onClick={() => setShowModal(false)}
						className={`${s.hovered} ${s.shadowed} absolute top-7 right-7 z-10
              rounded-full text-3xl font-medium btn
              border-2 btn-outline hover:bg-[--background-secondary] h-12 w-12`}>
						✕
					</button>
					{posterPath ? (
						<img
							src={`https://www.themoviedb.org/t/p/w500${posterPath}`}
							alt={title}
							className='block w-full h-auto object-contain'
							loading='eager'
						/>
					) : (
						<div className='flex items-center justify-center h-96'>
							<span className='text-sm'>No poster available</span>
						</div>
					)}
					{title && (
						<div className='p-4 text-center'>
							<h2 className='text-xl font-medium'>{title}</h2>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default PosterModal;

import React, { useEffect } from 'react';
import s from '../styles/gradients.module.css';

const Trailer = ({ trailerKey, showTrailer }) => {
	useEffect(() => {
		if (showTrailer) {
			window.scrollTo({
				top: document.documentElement.scrollHeight,
				behavior: 'smooth',
			});
		}
	});

	return (
		<div className='mt-4'>
			{showTrailer && (
				<section>
					<h3
						className={`${s.candy} text-4xl text-center tracking-widest uppercase font-bold text-white p-4 mb-4 `}>
						Trailer
					</h3>
					<iframe
						className='w-full h-[300px] md:h-[800px]'
						src={`https://www.youtube.com/embed/${trailerKey}`}
						title='YouTube trailer'
						allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
						allowFullScreen></iframe>
				</section>
			)}
		</div>
	);
};

export default Trailer;

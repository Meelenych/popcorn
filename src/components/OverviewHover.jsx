import React from 'react';
import s from '../styles/gradient.module.css';

const OverviewHover = ({ movie, pageName }) => {
	return (
		<div className='absolute top-0 left-0 right-0 text-white bg-black bg-opacity-70 opacity-0 hover:opacity-100 h-full rounded-sm overflow-hidden'>
			<div className='relative h-full'>
				<div className={s.abbyss}></div>
				<p
					className={`p-5 text-base sm:text-md lg:text-xs ${
						pageName === '' && 'lg:text-lg'
					}`}>
					{movie?.overview}
				</p>
			</div>
		</div>
	);
};

export default OverviewHover;

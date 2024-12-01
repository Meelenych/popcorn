import React from 'react';

const OverviewHover = ({ movie, pageName }) => {
	return (
		<div className='absolute top-0 left-0 right-0 p-2 text-white bg-black bg-opacity-70 opacity-0 hover:opacity-100 h-full rounded-sm'>
			<p
				className={`p-3 text-base sm:text-md lg:text-xs ${
					pageName === '' && 'lg:text-base'
				}`}>
				{movie?.overview}
			</p>
		</div>
	);
};

export default OverviewHover;

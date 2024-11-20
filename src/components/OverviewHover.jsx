import React from 'react';

const OverviewHover = ({ movie }) => {
	return (
		<div className='absolute top-0 left-0 right-0 p-2 text-white bg-black bg-opacity-70 opacity-0 hover:opacity-100 h-full'>
			<p className='p-10 text-md md:p-5 md:text-xs lg:text-sm xl:p-10'>
				{movie?.overview}
			</p>
		</div>
	);
};

export default OverviewHover;

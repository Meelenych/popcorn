import React from 'react';

const Details = ({
	handleShowCast,
	showCast,
	handleShowReviews,
	showReviews,
	showTrailer,
	handleShowTrailer,
}) => {
	return (
		<div className='grid grid-cols-3 col-span-3 gap-4'>
			<button
				onClick={handleShowCast}
				className='btn'>
				{showCast ? 'Hide cast' : 'Show cast'}
			</button>
			<button
				onClick={handleShowReviews}
				className='btn'>
				{showReviews ? 'Hide reviews' : 'Show reviews'}
			</button>
			<button
				onClick={handleShowTrailer}
				className='btn'>
				{showTrailer ? 'Hide trailer' : 'Show trailer'}
			</button>
		</div>
	);
};

export default Details;

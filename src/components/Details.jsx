import React from 'react';
import Link from 'next/link';

const Details = ({
	handleShowCast,
	showCast,
	handleShowReviews,
	showReviews,
}) => {
	return (
		<div className='grid grid-cols-2 col-span-2 gap-4'>
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
		</div>
	);
};

export default Details;

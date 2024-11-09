import React from 'react';

const Reviews = ({ showReviews, reviews }) => {
	return (
		<div className='mt-4'>
			{showReviews ? (
				reviews.length !== 0 ? (
					<ul className='grid gap-4'>
						{reviews.map(review => (
							<li
								key={review.id}
								className='p-4 bg-[--background-reviews] flex gap-4 rounded-sm'>
								<div>
									<div className='w-32 rounded-sm overflow-hidden'>
										<img
											src={
												review.author_details.avatar_path === null
													? '/images/dummyAvatar.png'
													: `https://www.themoviedb.org/t/p/w440_and_h660_face${review.author_details.avatar_path}`
											}
											alt={review.author}
										/>
									</div>
								</div>
								<div>
									<p className='text-[--active]'>
										Rating: {review.author_details.rating}/10
									</p>
									<p className='text-lg font-semibold'>{review.author}</p>
									<p>{review.content}</p>
								</div>
							</li>
						))}
					</ul>
				) : (
					<p>No reviews available</p>
				)
			) : null}
		</div>
	);
};

export default Reviews;

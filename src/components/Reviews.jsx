import React from 'react';
import s from '../styles/gradient.module.css';

const Reviews = ({ showReviews, reviews }) => {
	console.log('reviews', reviews);
	return (
		<div className='mt-4'>
			{showReviews ? (
				reviews.length !== 0 ? (
					<section>
						<h3
							className={`${s.candy} text-4xl text-center tracking-widest uppercase font-bold text-white p-4 mb-4`}>
							Reviews
						</h3>
						<ul className='grid gap-4 mb-4'>
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
					</section>
				) : (
					<p className='mb-4'>No reviews available</p>
				)
			) : null}
		</div>
	);
};

export default Reviews;

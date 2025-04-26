import React from 'react';
import s from '../styles/gradient.module.css';

const Reviews = ({ showReviews, reviews }) => {
	console.log('reviews', reviews);
	return (
		<div className='mt-4'>
			{showReviews && (
				<section>
					<h3
						className={`${s.candy} text-4xl text-center tracking-widest uppercase font-bold text-white p-4 mb-4`}>
						{reviews?.length > 0
							? reviews?.length > 1
								? 'reviews'
								: 'review'
							: 'No reviews available'}
					</h3>
					<ul className='grid gap-4 mb-4'>
						{reviews.map(review => (
							<li
								key={review.id}
								className='p-4 bg-[--background-reviews] grid grid-cols-1 md:grid-cols-6 gap-4 rounded-sm'>
								<div className='flex flex-row md:flex-col items-start gap-4'>
									<div className='rounded overflow-hidden max-h-64 w-1/3 md:h-auto md:w-auto'>
										<img
											src={
												review.author_details.avatar_path === null
													? '/images/dummyAvatar.png'
													: `https://www.themoviedb.org/t/p/w440_and_h660_face${review.author_details.avatar_path}`
											}
											alt={review.author}
										/>
									</div>
									<div>
										<p className='text-lg text-[--active]'>
											Rating: {review.author_details.rating}/10
										</p>
										<p className='text-lg font-semibold'>{review.author}</p>
										<p className='text-lg font-semibold'>
											{new Date(review?.updated_at).toLocaleDateString('en-US')}
										</p>
									</div>
								</div>
								<div className='sm:col-span-5'>
									<p>{review.content}</p>
								</div>
							</li>
						))}
					</ul>
				</section>
			)}
		</div>
	);
};

export default Reviews;

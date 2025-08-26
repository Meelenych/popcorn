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
								className='p-4 bg-[--background-reviews] grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-9 2xl:grid-cols-12 gap-4 rounded-sm'>
								<div className='flex flex-row md:flex-col items-start gap-4'>
									<div className='rounded overflow-hidden max-h-64 max-w-64 md:h-auto md:w-auto flex items-center justify-center'>
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
								<div className='col-span-1 md:col-span-3 lg:col-span-5 xl:col-span-8 2xl:col-span-11'>
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

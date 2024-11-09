import React from 'react';

const Reviews = ({ showReviews, reviews }) => {
	return (
		<div>
			<div>
				{showReviews ? (
					reviews.length !== 0 ? (
						<ul>
							{reviews.map(review => (
								<li key={review.id}>
									<p>{review.author}</p>
									<p>
										{review.author_details.avatar_path} Avatar
										<img
											className='w-20 h-20'
											src={
												review.author_details.avatar_path === null
													? '/images/dummyAvatar.png'
													: `https://www.themoviedb.org/t/p/w440_and_h660_face${review.author_details.avatar_path}`
											}
											alt={review.author}
										/>
									</p>
									<p>{review.author_details.rating}/10</p>
									<p>{review.content}</p>
								</li>
							))}
						</ul>
					) : (
						<p>No reviews available</p>
					)
				) : null}
			</div>
		</div>
	);
};

export default Reviews;

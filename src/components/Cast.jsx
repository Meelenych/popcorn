import React from 'react';
import Link from 'next/link';
import styles from './MoviesList.module.css';
import s from '../styles/gradients.module.css';

const Cast = ({ showCast, cast }) => {
	return (
		<div className='mt-4'>
			{showCast && (
				<section>
					<h3
						className={`${s.candy} text-4xl text-center tracking-widest uppercase font-bold text-white p-4 mb-4 `}>
						Cast
					</h3>
					<ul className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-4'>
						{cast.map(actor => (
							<li
								key={actor.id}
								className={`text-sm font-medium p-1 bg-[--background-secondary] rounded-sm ${styles.movie__card}`}>
								<Link href={`/actors/${actor.id}`}>
									<div>
										<img
											src={
												actor.profile_path
													? `https://image.tmdb.org/t/p/w342/${actor.profile_path}`
													: `${
															(actor.gender === 2 && '/images/dummyMan.jpg') ||
															(actor.gender === 1 && '/images/dummyWoman.jpg') ||
															(actor.gender === 0 && '/images/dummyZero.jpg')
													  }`
											}
											alt={actor.name}
										/>
										<p className='p-3'>
											{actor.name} {actor.character ? `as ${actor.character}` : null}
										</p>
									</div>
								</Link>
							</li>
						))}
					</ul>
				</section>
			)}
		</div>
	);
};

export default Cast;

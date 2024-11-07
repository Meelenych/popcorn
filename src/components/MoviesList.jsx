import React from 'react';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { fetchApi } from '../pages/api/movies';
import styles from './MoviesList.module.css';

const MoviesList = () => {
	const [movies, setMovies] = useState([]);
	const [loading, setLoading] = useState(false);
	useEffect(() => {
		setLoading(true);

		fetchApi(1)
			.then(movieData => {
				setMovies([...movieData.results]);
				// if (movieData.results.length !== 0) {
				// 	toast.success('Trending movies loaded');
				// } else if (movieData.results.length === 0) {
				// 	toast.error('Oops, no trending movies found!');
				// }
			})
			.catch(err => {
				// toast.error('Fetch error!');
				console.log(err);
			})
			.finally(() => setLoading(false));
	}, []);

	return (
		<div>
			<ul className='grid grid-cols-6 p-6 gap-4'>
				{loading ? (
					<span className='loading loading-spinner text-accent'></span>
				) : (
					movies.map(movie => {
						return (
							<li
								key={movie.id}
								className=''>
								<Link href=''>
									<div
										className={`rounded-sm bg-[--background-secondary] h-[450px] w-[240px] p-1 ${styles.card__shadow} ${styles.movie__card}`}>
										<img
											className={`rounded-sm ${styles.movie__img}`}
											src={`https://www.themoviedb.org/t/p/w440_and_h660_face/${movie.poster_path}`}
											loading='lazy'
											alt={movie.original_title}
											data-src={movie.poster_path}
										/>

										<div className='p-2'>
											<h3 className='uppercase text-[--text-color] text-sm text-ellipsis overflow-hidden whitespace-nowrap'>
												{' '}
												{movie.title}{' '}
											</h3>
											<p className='text-xs font-light'>Genres: {movie.genre_ids}</p>
											<p className='text-xs font-light'>
												Release date: {movie.release_date}
											</p>
										</div>
									</div>
								</Link>
							</li>
						);
					})
				)}
			</ul>
		</div>
	);
};

export default MoviesList;

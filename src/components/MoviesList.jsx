import React from 'react';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { fetchApi } from '../pages/api/movies';
import styles from './MoviesList.module.css';
import LoadMoreBtn from './LoadMoreBtn';

const MoviesList = () => {
	const [loading, setLoading] = useState(false);
	const [movies, setMovies] = useState([]);
	const [page, setPage] = useState(1);
	useEffect(() => {
		setLoading(true);

		fetchApi(page)
			.then(movieData => {
				setMovies([...movieData.results]);
			})
			.catch(err => {
				console.log(err);
			})
			.finally(() => setLoading(false));
	}, []);

	//=================LOAD MORE====================
	useEffect(() => {
		if (page !== 1) {
			setLoading(true);
			fetchApi(page)
				.then(movieData => {
					setMovies(prevMovies => [...prevMovies, ...movieData.results]);
				})
				.catch(err => {
					console.log(err);
				})
				.finally(() => setLoading(false));
		}
	}, [page]);

	const loadMore = () => {
		setPage(page + 1);
	};

	return (
		<div>
			<ul className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-7 p-6 gap-6'>
				{loading ? (
					<span className='loading loading-spinner text-accent'></span>
				) : (
					movies.map(movie => {
						return (
							<li
								key={movie.id}
								className='flex justify-center'>
								<Link href={`/movie/${movie.id}`}>
									<div
										className={`rounded-sm bg-[--background-secondary] h-[420px] max-w-[240px] p-1 ${styles.card__shadow} ${styles.movie__card}`}>
										<img
											className={`rounded-sm ${styles.movie__img}`}
											src={`https://www.themoviedb.org/t/p/w440_and_h660_face/${movie.poster_path}`}
											loading='lazy'
											alt={movie.original_title}
											data-src={movie.poster_path}
										/>

										<div className='p-2'>
											<h3 className='uppercase text-[--text-color] text-sm text-ellipsis overflow-hidden whitespace-nowrap'>
												{movie.title}
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
				{movies.length !== 0 && <LoadMoreBtn onClick={loadMore} />}
			</ul>
		</div>
	);
};

export default MoviesList;

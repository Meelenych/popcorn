import React from 'react';
import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { fetchApi } from '../pages/api/movies';
import styles from './MoviesList.module.css';
import LoadMoreBtn from './LoadMoreBtn';
import { fetchGenres } from '@/pages/api/genres';

const MoviesList = () => {
	const [loading, setLoading] = useState(false);
	const [movies, setMovies] = useState([]);
	const [page, setPage] = useState(1);
	const [genres, setGenres] = useState([]);
	const router = useRouter();

	const memoizedMovies = useMemo(() => movies, [movies]);

	useEffect(() => {
		setLoading(true);
		fetchApi(page)
			.then(movieData => {
				setMovies(prevMovies => [...prevMovies, ...movieData.results]);
			})
			.catch(err => {
				console.log(err);
			})
			.finally(() => setLoading(false));
	}, [page]);

	const loadMore = () => {
		setPage(page + 1);
	};

	useEffect(() => {
		fetchGenres().then(result => setGenres(result));
	}, []);

	// Function to convert genre ids to genre names
	const getGenreNames = genreIds => {
		return genreIds
			.map(id => genres?.find(genre => genre.id === id)) // Find genre objects by ID
			.filter(genre => genre) // Ensure the genre exists
			.map(genre => genre.name) // Get the name of each genre
			.join(', '); // Join the names into a single string
	};

	return (
		<div>
			<ul className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-7 p-6 gap-6'>
				{loading ? (
					<span className='loading loading-spinner text-accent'></span>
				) : (
					memoizedMovies.map((movie, index) => {
						return (
							<li
								key={`${movie.id}-${index}`}
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
											<p className='text-xs font-light text-ellipsis overflow-hidden whitespace-nowrap'>
												Genres: {getGenreNames(movie.genre_ids)}
											</p>
											<p className='text-xs font-light'>
												Release date:{' '}
												{new Date(movie?.release_date).toLocaleDateString('en-US')}
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

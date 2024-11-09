import React, { useState, useEffect, useMemo, useRef } from 'react';
import Link from 'next/link';
import { fetchApi } from '../pages/api/movies';
import styles from './MoviesList.module.css';
import LoadMoreBtn from './LoadMoreBtn';
import { fetchGenres } from '@/pages/api/genres';

const MoviesList = ({ movies, submitValue, loadMoreSearchResults }) => {
	const [loading, setLoading] = useState(false);
	const [moviesCollection, setMoviesCollection] = useState([]);
	const [page, setPage] = useState(1);
	const [resultsLength, setResultsLength] = useState(0);
	const [genres, setGenres] = useState([]);
	const firstNewMovieRef = useRef(null); // Reference for the first new movie in the batch
	const memoizedMovies = useMemo(() => movies, [movies]);

	// Effect to fetch movies or search results
	useEffect(() => {
		setLoading(true);

		if (submitValue === '') {
			// Fetch trending movies
			fetchApi(page)
				.then(movieData => {
					setMoviesCollection(prevMovies => [
						...prevMovies, // Append the new results
						...movieData.results,
					]);
					setResultsLength(movieData.results.length);
				})
				.catch(err => console.error(err))
				.finally(() => setLoading(false));
		} else {
			// When searching, just set the movies collection
			setMoviesCollection(memoizedMovies);
			setLoading(false);
		}
	}, [submitValue, memoizedMovies, page]);

	// Load more movies when the button is clicked
	const loadMore = () => {
		if (submitValue === '') {
			// Load more trending movies
			setPage(prevPage => prevPage + 1); // Increment page for pagination
		} else {
			// Load more search results
			loadMoreSearchResults(); // Call the provided function to load more search results
		}
	};

	// Fetch genres when the component mounts
	useEffect(() => {
		fetchGenres().then(result => setGenres(result));
	}, []);

	// Utility to get genre names from genre ids
	const getGenreNames = genreIds => {
		return genreIds
			.map(id => genres?.find(genre => genre.id === id))
			.filter(genre => genre)
			.map(genre => genre.name)
			.join(', ');
	};

	// Scroll to the first new movie in the batch
	useEffect(() => {
		// Only scroll if there are new movies added and the first new movie ref is set
		if (moviesCollection.length > 0 && firstNewMovieRef.current) {
			// Scroll to the first new movie element
			firstNewMovieRef.current.scrollIntoView({
				behavior: 'smooth',
				block: 'start', // Ensures it aligns at the top of the viewport
			});
		}
	}, [moviesCollection]); // Trigger when the moviesCollection changes

	return (
		<div>
			<ul className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-7 p-6 gap-6'>
				{loading ? (
					<span className='loading loading-spinner text-accent'></span>
				) : (
					moviesCollection?.map((movie, index) => (
						<li
							key={`${movie.id}-${index}`}
							className='flex justify-center'
							ref={
								index === moviesCollection.length - resultsLength
									? firstNewMovieRef
									: null
							} // Assign the ref to the first new movie
						>
							<Link href={`/movie/${movie.id}`}>
								<div
									className={`rounded-sm bg-[--background-secondary] h-[420px] w-[240px] p-1 ${styles.card__shadow} ${styles.movie__card}`}>
									<img
										className='rounded-sm'
										src={
											movie.poster_path
												? `https://www.themoviedb.org/t/p/w440_and_h660_face/${movie.poster_path}`
												: '/images/dummy.jpg'
										}
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
					))
				)}
				{resultsLength >= 20 && <LoadMoreBtn onClick={loadMore} />}
			</ul>
		</div>
	);
};

export default MoviesList;

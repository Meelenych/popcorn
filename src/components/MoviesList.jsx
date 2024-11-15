import React, { useState, useEffect, useMemo, useRef } from 'react';
import Link from 'next/link';
import { fetchApi } from '../pages/api/movies';
import styles from './MoviesList.module.css';
import LoadMoreBtn from './LoadMoreBtn';
import { fetchGenres } from '@/pages/api/genres';
import MovieCard from './MovieCard';

const MoviesList = ({ movies, submitValue, loadMoreSearchResults }) => {
	const [loading, setLoading] = useState(false);
	const [moviesCollection, setMoviesCollection] = useState([]);
	const [page, setPage] = useState(1);
	const [resultsLength, setResultsLength] = useState(0);
	const [genres, setGenres] = useState([]);
	const firstNewMovieRef = useRef(null); // Reference for the first new movie in the batch
	const memoizedMovies = useMemo(() => movies, [movies]);
	const ref = moviesCollection.length - resultsLength ? firstNewMovieRef : null;

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
	}, [submitValue, page]);

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

	// Scroll to the first new movie in the batch
	useEffect(() => {
		if (moviesCollection.length > 0 && firstNewMovieRef.current) {
			firstNewMovieRef.current.scrollIntoView({
				behavior: 'smooth',
				block: 'start',
			});
		}
	}, [moviesCollection]);

	return (
		<div>
			<ul className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 p-6 gap-6'>
				{loading ? (
					<span className='loading loading-spinner text-accent'></span>
				) : (
					moviesCollection?.map((movie, index) => (
						<MovieCard
							movie={movie}
							index={index}
							genres={genres}
							ref={ref}
						/>
					))
				)}
				<LoadMoreBtn onClick={loadMore} />
			</ul>
		</div>
	);
};

export default MoviesList;

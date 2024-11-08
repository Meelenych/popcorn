import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import MoviesList from '@/components/MoviesList';
import { fetchApi } from '../pages/api/movies'; // Assuming this fetches trending movies

const TrendingPage = () => {
	const [movies, setMovies] = useState([]);
	const [page, setPage] = useState(1); // For pagination

	// Fetch trending movies when the component mounts or page changes
	useEffect(() => {
		const fetchTrendingMovies = async () => {
			try {
				const movieData = await fetchApi(page);
				setMovies(prevMovies => [...prevMovies, ...movieData.results]); // Append new movies
			} catch (error) {
				console.error('Error fetching trending movies:', error);
			}
		};

		fetchTrendingMovies();
	}, [page]);

	// Function to load more movies when the user clicks the button
	const loadMoreMovies = () => {
		setPage(prevPage => prevPage + 1); // Increment the page to fetch the next set of movies
	};

	return (
		<Layout>
			<MoviesList
				movies={movies} // Pass the movies state to MoviesList
				submitValue={''} // No search query for trending page
				loadMoreSearchResults={loadMoreMovies} // Function to load more movies
			/>
		</Layout>
	);
};

export default TrendingPage;

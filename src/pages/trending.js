import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import MoviesList from '@/components/MoviesList';
import { fetchApi } from '../pages/api/movies';

const TrendingPage = () => {
	const [movies, setMovies] = useState([]);
	const [page, setPage] = useState(1);

	useEffect(() => {
		const fetchTrendingMovies = async () => {
			try {
				const movieData = await fetchApi(page);
				setMovies(prevMovies => [...prevMovies, ...movieData.results]);
			} catch (error) {
				console.error('Error fetching trending movies:', error);
			}
		};

		fetchTrendingMovies();
	}, [page]);

	const loadMoreMovies = () => {
		setPage(prevPage => prevPage + 1);
	};

	return (
		<Layout>
			<MoviesList
				movies={movies}
				submitValue={''}
				loadMoreSearchResults={loadMoreMovies}
			/>
		</Layout>
	);
};

export default TrendingPage;

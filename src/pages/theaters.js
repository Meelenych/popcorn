import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import MoviesList from '@/components/MoviesList';
import { fetchNowPlaying } from '../pages/api/movies';

const TheatersPage = () => {
	const [movies, setMovies] = useState([]);
	const [page, setPage] = useState(1);

	useEffect(() => {
		const fetchNowPlayingMovies = async () => {
			try {
				const movieData = await fetchNowPlaying(page);
				setMovies(prevMovies => [...prevMovies, ...movieData.results]);
			} catch (error) {
				console.error('Error fetching trending movies:', error);
			}
		};

		fetchNowPlayingMovies();
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

export default TheatersPage;

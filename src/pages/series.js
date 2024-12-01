import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import MoviesList from '@/components/MoviesList';
import { fetchTrendingSeries } from './api/series';

const SeriesPage = () => {
	const [series, setSeries] = useState([]);
	const [page, setPage] = useState(1);

	useEffect(() => {
		const fetchTrending = async () => {
			try {
				const serieData = await fetchTrendingSeries(page);
				setSeries(prevSeries => [...prevSeries, ...serieData.results]);
			} catch (error) {
				console.error('Error fetching trending movies:', error);
			}
		};

		fetchTrending();
	}, [page]);

	const loadMoreMovies = () => {
		setPage(prevPage => prevPage + 1);
	};

	return (
		<Layout>
			<MoviesList
				movies={series}
				submitValue={''}
				loadMoreSearchResults={loadMoreMovies}
			/>
		</Layout>
	);
};

export default SeriesPage;

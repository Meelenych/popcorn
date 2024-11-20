import React, { useState, useEffect, useMemo } from 'react';
import LoadMoreBtn from './LoadMoreBtn';
import { fetchGenres } from '@/pages/api/genres';
import MovieCard from './MovieCard';

const MoviesList = ({ movies, loadMoreSearchResults }) => {
	const [genres, setGenres] = useState([]);
	const memoizedMovies = useMemo(() => movies, [movies]);

	useEffect(() => {
		fetchGenres().then(result => setGenres(result));
	}, []);

	return (
		<div>
			<ul className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 p-6 gap-6'>
				{memoizedMovies?.map((movie, index) => (
					<MovieCard
						movie={movie}
						index={index}
						genres={genres}
					/>
				))}
				<LoadMoreBtn onClick={loadMoreSearchResults} />
			</ul>
		</div>
	);
};

export default MoviesList;

import React, { useMemo } from 'react';
import LoadMoreBtn from './LoadMoreBtn';
import MovieCard from './MovieCard';

const MoviesList = ({ movies, loadMoreSearchResults }) => {
	const memoizedMovies = useMemo(() => movies, [movies]);

	return (
		<div>
			<ul className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-7 p-6 gap-6'>
				{memoizedMovies?.map((movie, index) => (
					<MovieCard key={movie.id + index} movie={movie} index={index} />
				))}
				<LoadMoreBtn onClick={loadMoreSearchResults} />
			</ul>
		</div>
	);
};

export default MoviesList;

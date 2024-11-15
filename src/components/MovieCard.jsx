import React from 'react';
import Link from 'next/link';
import { getGenreNames } from '@/helpers/genres';
import styles from './MoviesList.module.css';

const MovieCard = ({ movie, index, genres, ref }) => {
	return (
		<div>
			<li
				key={`${movie.id}-${index}`}
				ref={ref}
				className='flex justify-center'>
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
								Genres: {getGenreNames(movie.genre_ids, genres)}
							</p>
							<p className='text-xs font-light'>
								Release date:{' '}
								{new Date(movie?.release_date).toLocaleDateString('en-US')}
							</p>
						</div>
					</div>
				</Link>
			</li>
		</div>
	);
};

export default MovieCard;

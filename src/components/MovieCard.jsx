import React from 'react';
import Link from 'next/link';
import { getGenreNames } from '@/helpers/genres';
import OverviewHover from './OverviewHover';
import s from '../styles/hover.module.css';
import { useRouter } from 'next/router';

const MovieCard = ({ movie, index, genres }) => {
	const router = useRouter();
	const pageName = router.pathname.split('/')[1];

	console.log('pageName', pageName, typeof pageName);
	console.log('movie-serie', movie);
	return (
		<li
			key={`${movie.id}-${index}`}
			className='flex justify-center'>
			<Link
				href={pageName === 'series' ? `/serie/${movie.id}` : `/movie/${movie.id}`}>
				<div
					className={`rounded-sm bg-[--background-secondary] h-[440px] w-[240px] p-1 ${
						s.shadowed
					} ${s.hovered} ${pageName === '' && 'h-auto w-auto'}`}>
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
							Release date: {new Date(movie?.release_date).toLocaleDateString('en-US')}
						</p>
						<p className='text-xs text-[--active]'>
							Rating: {movie.vote_average.toFixed()}/10
						</p>
					</div>
					{(pageName === 'actors' || pageName === '') && (
						<OverviewHover movie={movie} />
					)}
				</div>
			</Link>
		</li>
	);
};

export default MovieCard;

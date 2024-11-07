import React from 'react';
import { useEffect } from 'react';
import { fetchTrendingMovie } from '@/pages/api/movies';
import { useState } from 'react';
import Link from 'next/link';

const Hero = () => {
	const [heroMovies, setHeroMovies] = useState([]);

	useEffect(() => {
		fetchTrendingMovie()
			.then(movieData => {
				setHeroMovies([...movieData.results]);
			})
			.catch(err => {
				console.log(err);
			});
	}, [heroMovies]);
	console.log('heroMovies', heroMovies);

	return (
		<div className='h-full'>
			<h1 className='text-3xl mb-5 text-center'>Popcorn time</h1>
			<ul className='grid grid-cols-1 sm:grid-cols-3 gap-16'>
				{heroMovies.slice(0, 3).map(movie => {
					return (
						<li
							key={movie.id}
							className='flex justify-center'>
							<Link href=''>
								<div className={`rounded-sm bg-[--background-secondary] p-1 `}>
									<img
										className={`rounded-sm`}
										src={`https://www.themoviedb.org/t/p/w440_and_h660_face/${movie.poster_path}`}
										loading='lazy'
										alt={movie.original_title}
										data-src={movie.poster_path}
									/>

									<div className='p-2'>
										<h3 className='uppercase text-[--text-color] text-sm text-ellipsis overflow-hidden whitespace-nowrap'>
											{movie.title}
										</h3>
										<p className='text-xs font-light'>Genres: {movie.genre_ids}</p>
										<p className='text-xs font-light'>
											Release date: {movie.release_date}
										</p>
									</div>
								</div>
							</Link>
						</li>
					);
				})}
			</ul>
		</div>
	);
};

export default Hero;

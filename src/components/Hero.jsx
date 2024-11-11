import React, { useEffect, useState, useRef } from 'react';
import { fetchTopMovie } from '@/pages/api/movies';
import Link from 'next/link';
import styles from './MoviesList.module.css';
import { fetchGenres } from '@/pages/api/genres';

const Hero = () => {
	const [heroMovies, setHeroMovies] = useState([]);
	const [randomMovies, setRandomMovies] = useState([]);
	const [genres, setGenres] = useState([]);
	const intervalRef = useRef(null);

	useEffect(() => {
		fetchTopMovie()
			.then(movieData => {
				setHeroMovies(movieData.results);
				console.log('hero', movieData.results);
			})
			.catch(err => {
				console.log(err);
			});
	}, []);

	useEffect(() => {
		if (heroMovies.length === 0) return; // Don't start the interval if no movies are loaded

		// Show the first 3 movies immediately
		setRandomMovies(heroMovies.slice(0, 3));

		// Get random movies after heroMovies is populated
		const getRandomMovies = (movies, num) => {
			const shuffled = [...movies].sort(() => Math.random() - 0.5); // Shuffle the array
			return shuffled.slice(0, num); // Pick the first `num` items
		};

		// Set the interval to update randomMovies
		intervalRef.current = setInterval(() => {
			setRandomMovies(getRandomMovies(heroMovies, 3));
		}, 30000);

		// Clean up the interval on unmount
		return () => clearInterval(intervalRef.current);
	}, [heroMovies]); // Runs when heroMovies is set

	useEffect(() => {
		fetchGenres().then(result => setGenres(result));
	}, []);

	// Function to convert genre ids to genre names
	const getGenreNames = genreIds => {
		return genreIds
			.map(id => genres?.find(genre => genre.id === id)) // Find genre objects by ID
			.filter(genre => genre) // Ensure the genre exists
			.map(genre => genre.name) // Get the name of each genre
			.join(', '); // Join the names into a single string
	};

	return (
		<div className='h-full'>
			<h1 className='text-3xl mb-5 text-center'>Popcorn time</h1>
			<ul className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-16'>
				{randomMovies.map(movie => {
					return (
						<li
							key={movie.id}
							className={`flex justify-center ${styles.movie__card}`}>
							<Link href={`/movie/${movie.id}`}>
								<div className={`rounded-sm bg-[--background-secondary] p-1 relative`}>
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
										<p className='text-xs font-light text-ellipsis overflow-hidden whitespace-nowrap'>
											Genres: {getGenreNames(movie.genre_ids)}
										</p>
										<p className='text-xs font-light'>
											Release date:{' '}
											{new Date(movie?.release_date).toLocaleDateString('en-US')}
										</p>
										<p className='text-sm text-[--active]'>
											Rating : {movie?.vote_average.toFixed()}/10
										</p>
									</div>
									<div className='absolute top-0 left-0 right-0 p-2 text-base text-white bg-black bg-opacity-70 opacity-0 hover:opacity-100 h-full'>
										<p className='p-10 md:p-6 xl:p-10'>{movie?.overview}</p>
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

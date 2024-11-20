import React, { useEffect, useState, useRef } from 'react';
import { fetchUpcoming } from '@/pages/api/movies';
import { fetchGenres } from '@/pages/api/genres';
import MovieCard from './MovieCard';

const Hero = () => {
	const [heroMovies, setHeroMovies] = useState([]);
	const [randomMovies, setRandomMovies] = useState([]);
	const [genres, setGenres] = useState([]);
	const intervalRef = useRef(null);

	useEffect(() => {
		fetchUpcoming()
			.then(movieData => {
				setHeroMovies(movieData.results);
				console.log('hero', movieData.results);
			})
			.catch(err => {
				console.log(err);
			});
	}, []);

	useEffect(() => {
		if (heroMovies.length === 0) return;
		setRandomMovies(heroMovies.slice(0, 3));
		const getRandomMovies = (movies, num) => {
			const shuffled = [...movies].sort(() => Math.random() - 0.5);
			return shuffled.slice(0, num);
		};
		// Start the interval to fetch new random movies every 15 seconds
		intervalRef.current = setInterval(() => {
			setRandomMovies(getRandomMovies(heroMovies, 3));
		}, 15000);
		return () => clearInterval(intervalRef.current);
	}, [heroMovies]);

	useEffect(() => {
		fetchGenres().then(result => setGenres(result));
	}, []);

	return (
		<div className='h-full'>
			<h1 className='text-3xl mb-5 text-center'>Popcorn time</h1>
			<ul className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-16'>
				{randomMovies.map((movie, index) => {
					return (
						<MovieCard
							movie={movie}
							index={index}
							genres={genres}
						/>
					);
				})}
			</ul>
		</div>
	);
};

export default Hero;

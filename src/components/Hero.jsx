import React, { useEffect, useState, useRef } from 'react';
import { fetchUpcoming } from '@/pages/api/movies';
import { fetchGenres } from '@/pages/api/genres';
import MovieCard from './MovieCard';

const Hero = () => {
	const [heroMovies, setHeroMovies] = useState([]);
	const [randomMovies, setRandomMovies] = useState([]);
	const [genres, setGenres] = useState([]);
	const [page, setPage] = useState(1);
	const intervalRef = useRef(null);

	useEffect(() => {
		fetchUpcoming(page)
			.then(movieData => {
				setHeroMovies([...movieData.results]);
				// console.log('hero', movieData, heroMovies);
				setInterval(() => {
					setPage(page + 1);
					setHeroMovies([...heroMovies, ...movieData.results]);
					// console.log('hero2', movieData, heroMovies);
				}, 35000);
			})
			.catch(err => {
				console.log(err);
			});
		return () => clearInterval();
	}, [page]);

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
		}, 30000);
		return () => clearInterval(intervalRef.current);
	}, [heroMovies]);

	useEffect(() => {
		fetchGenres().then(result => setGenres(result));
	}, []);

	return (
		<div className='h-full'>
			<h1 className='text-3xl mb-5 text-center'>Popcorn time</h1>
			<ul className='grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-16'>
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

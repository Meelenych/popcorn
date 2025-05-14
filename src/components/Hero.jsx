import React, { useEffect, useState, useRef } from 'react';
import { fetchUpcoming } from '@/pages/api/movies';
import { fetchGenres } from '@/pages/api/genres';
import MovieCard from './MovieCard';
import CountdownTimer from './Countdown';

const Hero = () => {
	const [heroMovies, setHeroMovies] = useState([]);
	const [randomMovies, setRandomMovies] = useState([]);
	const [initialSeconds, setInitialSeconds] = useState(30);
	const [genres, setGenres] = useState([]);
	const [page, setPage] = useState(1);

	const getRandomMovies = (movies, num) => {
		const shuffled = [...movies].sort(() => Math.random() - 0.5);
		return shuffled.slice(0, num);
	};

	const fetchMovies = async pageNumber => {
		try {
			const movieData = await fetchUpcoming(pageNumber);
			setHeroMovies(prevMovies => [...prevMovies, ...movieData.results]);
		} catch (err) {
			console.error('Error fetching movies:', err);
		}
	};

	useEffect(() => {
		fetchGenres().then(setGenres);
		fetchMovies(1);
	}, []);

	useEffect(() => {
		if (heroMovies.length > 0) {
			setRandomMovies(getRandomMovies(heroMovies, 3));

			const interval = setInterval(() => {
				setRandomMovies(getRandomMovies(heroMovies, 3));
				setInitialSeconds(30);
				// Keep fetching new pages until page 5
				setPage(prev => {
					if (prev < 5) {
						fetchMovies(prev + 1);
						return prev + 1;
					}
					return prev;
				});
			}, 30000);

			return () => clearInterval(interval);
		}
	}, [heroMovies.length]);

	console.log('heroMovies', heroMovies, randomMovies);
	return (
		<div className='h-full'>
			<h1 className='text-3xl mb-5 text-center'>Popcorn time</h1>
			<CountdownTimer initialSeconds={initialSeconds} />
			<ul className='grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-16'>
				{randomMovies.map((movie, index) => {
					return <MovieCard movie={movie} index={index} genres={genres} />;
				})}
			</ul>
		</div>
	);
};

export default Hero;

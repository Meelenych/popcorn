import React, { useEffect, useState, useRef } from 'react';
import { fetchUpcoming } from '@/pages/api/movies';
import { fetchGenres } from '@/pages/api/genres';
import MovieCard from './MovieCard';

const Hero = () => {
	const [heroMovies, setHeroMovies] = useState([]);
	const [randomMovies, setRandomMovies] = useState([]);
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
		fetchGenres().then(result => setGenres(result));
	}, []);

	useEffect(() => {
		let fetchInterval;
		const startInterval = () => {
			fetchInterval = setInterval(() => {
				setPage(prevPage => {
					if (prevPage < 5) return prevPage + 1;
					clearInterval(fetchInterval);
					return prevPage;
				});
			}, 5000);
		};
		fetchMovies(page);
		startInterval();
		return () => clearInterval(fetchInterval);
	}, [page]);

	useEffect(() => {
		setRandomMovies(heroMovies.slice(0, 3));
		const randomInterval = setInterval(() => {
			setRandomMovies(getRandomMovies(heroMovies, 3));
		}, 30000);

		return () => clearInterval(randomInterval);
	}, [heroMovies]);

	console.log('heroMovies', heroMovies);
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

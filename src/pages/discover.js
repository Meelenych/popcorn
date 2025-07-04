import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import MoviesList from '@/components/MoviesList';
import { fetchApiDiscover } from './api/discover';
import { fetchGenres } from '@/pages/api/genres';
import { getGenreNames } from '@/helpers/genres';

const DiscoverPage = () => {
	const [movies, setMovies] = useState([]);
	const [genres, setGenres] = useState([]);
	const [selectedFilters, setSelectedFilters] = useState({
		primary_release_year: '',
		genre: [],
		include_adult: false,
	});
	const [searchPage, setSearchPage] = useState(1);
	const [yearInput, setYearInput] = useState('');

	// Load genres on mount
	useEffect(() => {
		fetchGenres().then(result => setGenres(result));
	}, []);

	// Run discover search when filters or input changes
	useEffect(() => {
		handleSearch();
	}, [selectedFilters]);

	const handleSearch = async () => {
		setSearchPage(1);
		try {
			const movieData = await fetchApiDiscover({
				page: 1,
				primary_release_year: selectedFilters.primary_release_year,
				genre: selectedFilters.genre.join(','),
				include_adult: selectedFilters.include_adult,
			});
			setMovies(movieData.results);
		} catch (error) {
			console.error('Error fetching movies:', error);
		}
	};

	const loadMoreSearchResults = async () => {
		try {
			const nextPage = searchPage + 1;
			const movieData = await fetchApiDiscover({
				page: nextPage,
				primary_release_year: selectedFilters.primary_release_year,
				genre: selectedFilters.genre.join(','),
				include_adult: selectedFilters.include_adult,
			});
			setMovies(prev => [...prev, ...movieData.results]);
			setSearchPage(nextPage);
		} catch (error) {
			console.error('Error loading more movies:', error);
		}
	};

	const toggleGenre = id => {
		setSelectedFilters(prev => {
			const alreadySelected = prev.genre.includes(id);
			const updatedGenres = alreadySelected
				? prev.genre.filter(g => g !== id)
				: [...prev.genre, id];

			return { ...prev, genre: updatedGenres };
		});
	};

	const toggleAdult = () => {
		setSelectedFilters(prev => ({
			...prev,
			include_adult: !prev.include_adult,
		}));
	};

	console.log(yearInput, typeof yearInput);
	return (
		<Layout>
			<div className='mt-6'>
				<h3 className='w-full'> Filteres available: </h3>
				<button className='btn btn-outline m-2' onClick={toggleAdult}>
					{selectedFilters.include_adult ? 'Adult: ON ✔️' : 'Adult: OFF ❌'}
				</button>
				<div className='flex'>
					<input
						name='year'
						className='input input-bordered m-2'
						value={yearInput}
						onChange={e => setYearInput(e.target.value)}
						placeholder='Enter year (e.g., 2022)'
					/>
					<button
						className='btn btn-accent m-2'
						type='button'
						onClick={() =>
							setSelectedFilters(prev => ({
								...prev,
								primary_release_year: yearInput,
							}))
						}>
						Apply Year
					</button>
				</div>
				{genres.map(genre => (
					<button
						key={genre.id}
						className={`btn m-2 ${
							selectedFilters.genre.includes(genre.id) ? 'hidden' : 'btn-outline'
						}`}
						onClick={() => toggleGenre(genre.id)}>
						{genre.name}
					</button>
				))}
			</div>

			<div className='mt-6'>
				<h3>Filters applied:</h3>

				{/* Applied Year */}
				{selectedFilters.primary_release_year && (
					<button
						className='btn btn-outline m-2'
						onClick={() =>
							setSelectedFilters(prev => ({
								...prev,
								primary_release_year: '',
							}))
						}>
						Year: {selectedFilters.primary_release_year} ❌
					</button>
				)}

				{/* Applied Genres */}
				{genres
					.filter(genre => selectedFilters.genre.includes(genre.id))
					.map(genre => (
						<button
							key={genre.id}
							className='btn btn-outline m-2'
							onClick={() => toggleGenre(genre.id)}>
							{genre.name} ❌
						</button>
					))}
			</div>
			<MoviesList movies={movies} loadMoreSearchResults={loadMoreSearchResults} />
		</Layout>
	);
};

export default DiscoverPage;

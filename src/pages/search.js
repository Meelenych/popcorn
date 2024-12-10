import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import MoviesList from '@/components/MoviesList';
import SearchInput from '@/components/SearchInput';
import { fetchApiSearch } from './api/movies';

const SearchPage = () => {
	const searchSample = [
		'die hard',
		'avengers',
		'terminator',
		'alien',
		'mission impossible',
		'star trek',
		'the dark knight',
		'the matrix',
		'star wars',
		'x-men',
	];

	const [movies, setMovies] = useState([]);
	const [submitValue, setSubmitValue] = useState(
		searchSample[Math.floor(Math.random() * searchSample.length)],
	);
	const [searchPage, setSearchPage] = useState(1);

	useEffect(() => {
		const initialSearch = async () => {
			try {
				const movieData = await fetchApiSearch(submitValue, 1);
				setMovies(movieData.results);
			} catch (error) {
				console.error('Error fetching initial movies:', error);
			}
		};

		initialSearch();
		handleSearch(submitValue);
	}, []);

	const handleSearch = async value => {
		setSubmitValue(value);
		setSearchPage(1); // Reset page on new search
		try {
			const movieData = await fetchApiSearch(value, 1);
			setMovies(movieData.results);
		} catch (error) {
			console.error('Error fetching movies:', error);
		}
	};

	const loadMoreSearchResults = async () => {
		try {
			const movieData = await fetchApiSearch(submitValue, searchPage + 1);
			setMovies(prevMovies => [...prevMovies, ...movieData.results]);
			setSearchPage(prevPage => prevPage + 1);
		} catch (error) {
			console.error('Error fetching more search results:', error);
		}
	};

	// console.log('search movies', submitValue, movies);

	return (
		<Layout>
			<SearchInput onSearch={handleSearch} />
			<MoviesList
				movies={movies}
				submitValue={submitValue}
				loadMoreSearchResults={loadMoreSearchResults}
			/>
		</Layout>
	);
};

export default SearchPage;

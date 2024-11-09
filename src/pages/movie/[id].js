import React from 'react';
import { useState, Suspense } from 'react';
import { useRouter } from 'next/router';
import { fetchApiMovie } from '../api/movies';
import { fetchApiCredits, fetchApiReviews } from '../api/movies';
import { useEffect } from 'react';
import Link from 'next/link';
import Loading from '../loading';

import BackButton from '@/components/BackBtn';
import Details from '@/components/Details';
import Layout from '@/components/Layout';
import Cast from '@/components/Cast';
import Reviews from '@/components/Reviews';

const MovieId = () => {
	const [movie, setMovie] = useState(null);
	const [cast, setCast] = useState([]);
	const [showCast, setShowCast] = useState(false);
	const [reviews, setReviews] = useState([]);
	const [showReviews, setShowReviews] = useState(false);
	const router = useRouter();
	const { id } = router.query;

	useEffect(() => {
		if (id) {
			fetchApiMovie(id).then(result => {
				setMovie(result);
				console.log(result);
			});
		}
	}, [id]);
	console.log('movie', movie);

	const handleShowCast = () => {
		if (!showCast) {
			fetchApiCredits(id).then(castData => {
				setCast(castData.cast);
				console.log('castData.cast', castData.cast);
			});
		}
		setShowCast(!showCast);
	};

	const handleShowReviews = () => {
		if (!showReviews) {
			fetchApiReviews(id).then(reviewsData => {
				setReviews(reviewsData.results);
				console.log('reviewsData', reviewsData);
			});
		}
		setShowReviews(!showReviews);
	};

	return (
		<Layout>
			<nav className='grid grid-cols-3 gap-4'>
				<BackButton />
				<Details
					handleShowCast={handleShowCast}
					showCast={showCast}
					handleShowReviews={handleShowReviews}
					showReviews={showReviews}
				/>
			</nav>

			<div className='pt-4 flex flex-col md:flex-row gap-6'>
				<div
					className={`rounded-sm bg-[--background-secondary] p-1 w-full md:w-1/3 h-[720px] relative`}>
					<img
						className='rounded-sm w-full h-full object-cover'
						style={{ objectPosition: '50% 30%' }}
						src={`https://www.themoviedb.org/t/p/w440_and_h660_face/${movie?.poster_path}`}
						loading='lazy'
						alt={movie?.original_title}
						data-src={movie?.poster_path}
					/>
				</div>
				<div className='w-full md:w-1/2'>
					<h1 className='text-xl font-medium'>{movie?.title}</h1>
					{movie?.tagline && <p>Slogan: {movie?.tagline}</p>}
					<p>Overview: {movie?.overview}</p>
					<p>
						Genres:{' '}
						{movie?.genres.map((genre, index) => (
							<span key={genre.id}>
								{genre.name}
								{index === movie.genres.length - 1 ? '' : ', '}
							</span>
						))}
					</p>
					<p>
						Country:{' '}
						{movie?.production_countries.map((production_country, index) => (
							<span key={index}>
								{production_country.name}
								{index === movie.production_countries.length - 1 ? '' : ', '}
							</span>
						))}
					</p>
					<p>
						Production:{' '}
						{movie?.production_companies.map((production_company, index) => (
							<span key={index}>
								{production_company.name}
								{index === movie.production_companies.length - 1 ? '' : ', '}
							</span>
						))}
					</p>
					<p>For adults: {movie?.adult ? 'yes' : 'no'}</p>
					<p>Budget: ${movie?.budget.toLocaleString('en-US')}</p>
					<p>Revenue: ${movie?.revenue.toLocaleString('en-US')}</p>
					<p>Popularity: {movie?.popularity}</p>
					<p>
						Release date: {new Date(movie?.release_date).toLocaleDateString('en-US')}
					</p>
					<p>Runtime: {movie?.runtime} min</p>
					<p>Rating : {movie?.vote_average.toFixed()}/10</p>
					<p>Video: {movie?.video ? 'available' : 'not available'}</p>
					{movie?.homepage && (
						<p>
							Homepage:{' '}
							<Link
								className='underline hover:text-[--accent]'
								href={movie.homepage}
								target='_blank'
								rel='noopener noreferrer'>
								{movie.homepage}
							</Link>
						</p>
					)}
				</div>
			</div>
			<Suspense fallback={<Loading />}>
				<Cast
					showCast={showCast}
					cast={cast}
				/>
				<Reviews
					showReviews={showReviews}
					reviews={reviews}
				/>
			</Suspense>
		</Layout>
	);
};

export default MovieId;

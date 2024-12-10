import React from 'react';
import { useState, Suspense, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import {
	fetchApiMovie,
	fetchApiCredits,
	fetchApiReviews,
	fetchTrailer,
} from '../api/movies';
import Link from 'next/link';
import Loading from '../loading';
import BackButton from '@/components/BackBtn';
import Details from '@/components/Details';
import Layout from '@/components/Layout';
import Trailer from '@/components/Trailer';
import Cast from '@/components/Cast';
import Reviews from '@/components/Reviews';
import styles from '../../styles/gradient.module.css';
import s from '../../styles/hover.module.css';

const MovieId = () => {
	const [movie, setMovie] = useState(null);
	const [cast, setCast] = useState([]);
	const [showCast, setShowCast] = useState(false);
	const [reviews, setReviews] = useState([]);
	const [showReviews, setShowReviews] = useState(false);
	const [trailers, setTrailers] = useState(null);
	const [showTrailer, setShowTrailer] = useState(false);
	const [directors, setDirectors] = useState([]);
	const router = useRouter();
	const { id } = router.query;
	// Refs for scrolling
	const trailerRef = useRef(null);
	const castRef = useRef(null);
	const reviewsRef = useRef(null);

	useEffect(() => {
		if (id) {
			fetchApiMovie(id).then(result => {
				setMovie(result);
				console.log(result);
			});
		}
	}, [id]);
	console.log('movie', movie);

	const handleShowTrailer = () => {
		if (!showTrailer) {
			fetchTrailer(id).then(trailerData => {
				setTrailers(trailerData.results);
				console.log('trailer', trailerData.results);
			});
			trailerRef.current?.scrollIntoView({ behavior: 'smooth' });
		}
		setShowTrailer(!showTrailer);
	};

	const handleShowCast = () => {
		if (!showCast) {
			fetchApiCredits(id).then(castData => {
				setCast(castData.cast);
				setDirectors(
					castData.crew.filter(crewMember => crewMember.job === 'Director'),
				);
				// console.log('castData.cast', castData.cast, castData);
				console.log(
					'crew',
					castData.crew.filter(crewMember => crewMember.job === 'Director'),
				);
			});
			castRef.current?.scrollIntoView({ behavior: 'smooth' });
		}
		setShowCast(!showCast);
	};

	const handleShowReviews = () => {
		if (!showReviews) {
			fetchApiReviews(id).then(reviewsData => {
				setReviews(reviewsData.results);
				console.log('reviewsData', reviewsData);
			});
			reviewsRef.current?.scrollIntoView({ behavior: 'smooth' });
		}
		setShowReviews(!showReviews);
	};

	return (
		<Layout>
			<nav className='grid grid-cols-4 gap-4'>
				<BackButton />
				<Details
					handleShowCast={handleShowCast}
					showCast={showCast}
					handleShowReviews={handleShowReviews}
					showReviews={showReviews}
					handleShowTrailer={handleShowTrailer}
					showTrailer={showTrailer}
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
					{movie?.homepage && (
						<p className='text-ellipsis overflow-hidden'>
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
					{movie?.production_companies.length !== 0 && (
						<ul className='bg-white/90 p-3 rounded flex justify-center'>
							{movie?.production_companies.map(company => {
								return (
									<li
										key={company.id}
										className='mr-4 last:mr-0'>
										<img
											src={`https://image.tmdb.org/t/p/w500${
												company.logo_path ? company.logo_path : null
											}`}
											alt={company.name}
											width={200}
											onError={e => (e.target.src = '/images/logodummy.svg')}
										/>
									</li>
								);
							})}
						</ul>
					)}
				</div>
				<div className='w-full md:w-1/6'>
					{showCast && (
						<>
							<h4
								className={`${styles.candy} text-4xl uppercase font-bold tracking-widest md:text-xl text-white text-center p-4 md:p-1 mt-4 md:mt-0`}>
								{directors.length > 1 ? 'Directors' : 'Director'}
							</h4>
							<ul className='flex justify-center'>
								{directors.map(director => {
									return (
										<li
											key={director.id}
											className={`${s.hovered} mt-4 mr-4 last:mr-0 bg-[--background-secondary] p-1 rounded text-center`}>
											<Link
												href={`/actors/${director.id}`}
												className=''>
												<img
													src={`https://image.tmdb.org/t/p/w342/${director.profile_path}`}
													alt={director.name}
												/>
												{director.name}
											</Link>
										</li>
									);
								})}
							</ul>
						</>
					)}
				</div>
			</div>
			<Suspense fallback={<Loading />}>
				<div ref={trailerRef}>
					<Trailer
						showTrailer={showTrailer}
						trailers={trailers}
					/>
				</div>
				<div ref={castRef}>
					<Cast
						showCast={showCast}
						cast={cast}
					/>
				</div>
				<div ref={reviewsRef}>
					<Reviews
						showReviews={showReviews}
						reviews={reviews}
					/>
				</div>
			</Suspense>
		</Layout>
	);
};

export default MovieId;

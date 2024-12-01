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
import s from '../../styles/hover.module.css';
import OverviewHover from '@/components/OverviewHover';

const SerieId = () => {
	const [serie, setSerie] = useState(null);
	const [cast, setCast] = useState([]);
	const [showCast, setShowCast] = useState(false);
	const [reviews, setReviews] = useState([]);
	const [showReviews, setShowReviews] = useState(false);
	const [trailers, setTrailers] = useState(null);
	const [showTrailer, setShowTrailer] = useState(false);
	const router = useRouter();
	const { id } = router.query;
	// Refs for scrolling
	const trailerRef = useRef(null);
	const castRef = useRef(null);
	const reviewsRef = useRef(null);

	useEffect(() => {
		if (id) {
			fetchApiMovie(id, 'tv').then(result => {
				setSerie(result);
				console.log('series result', result);
			});
		}
	}, [id]);
	console.log('serie', serie);

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
				console.log('castData.cast', castData.cast);
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
			</nav>

			<div className='pt-4 flex flex-col md:flex-row gap-6'>
				<div
					className={`rounded-sm bg-[--background-secondary] p-1 w-full md:w-1/3 h-[720px] relative`}>
					<img
						className='rounded-sm w-full h-full object-cover'
						style={{ objectPosition: '50% 30%' }}
						src={`https://www.themoviedb.org/t/p/w440_and_h660_face/${serie?.poster_path}`}
						loading='lazy'
						alt={serie?.original_title}
						data-src={serie?.poster_path}
					/>
				</div>
				<div className='w-full md:w-1/2'>
					<h1 className='text-xl font-medium'>{serie?.title}</h1>
					{serie?.tagline && <p>Slogan: {serie?.tagline}</p>}
					<p>Overview: {serie?.overview}</p>
					<p>
						Genres:{' '}
						{serie?.genres.map((genre, index) => (
							<span key={genre.id}>
								{genre.name}
								{index === serie.genres.length - 1 ? '' : ', '}
							</span>
						))}
					</p>
					<p>
						Country:{' '}
						{serie?.production_countries.map((production_country, index) => (
							<span key={index}>
								{production_country.name}
								{index === serie.production_countries.length - 1 ? '' : ', '}
							</span>
						))}
					</p>
					<p>
						Production:{' '}
						{serie?.production_companies.map((production_company, index) => (
							<span key={index}>
								{production_company.name}
								{index === serie.production_companies.length - 1 ? '' : ', '}
							</span>
						))}
					</p>
					<p>For adults: {serie?.adult ? 'yes' : 'no'}</p>
					<div>
						Created by:{' '}
						{serie?.created_by.map((creator, index, id) => {
							return (
								<div key={id + index}>
									<Link
										className='relative underline hover:text-[--text-color] group'
										href={serie.homepage}>
										<div className='absolute bottom-5 left-0 bg-[--background-secondary] p-1 rounded hidden group-hover:block'>
											<img
												src={`https://image.tmdb.org/t/p/w500${creator.profile_path}`}
												alt={creator.name}
												width={50}
											/>
										</div>
										<span>{creator.name}</span>
									</Link>
									<span>{index === serie.created_by.length - 1 ? '' : ', '}</span>
								</div>
							);
						})}
					</div>
					<p>Popularity: {serie?.popularity}</p>
					<p>
						Release date:{' '}
						{new Date(serie?.first_air_date).toLocaleDateString('en-US')}
					</p>
					<p>
						Last episode date:{' '}
						{new Date(serie?.last_air_date).toLocaleDateString('en-US')}
					</p>
					<p>Seasons: {serie?.number_of_seasons}</p>
					<p>Episodes: {serie?.number_of_episodes}</p>
					<p>Status: {serie?.status}</p>
					<p>Rating : {serie?.vote_average.toFixed()}/10</p>
					{serie?.homepage && (
						<p className='text-ellipsis overflow-hidden'>
							Homepage:{' '}
							<Link
								className='underline hover:text-[--text-color]'
								href={serie.homepage}
								target='_blank'
								rel='noopener noreferrer'>
								{serie.homepage}
							</Link>
						</p>
					)}
					<div>
						<h3>Seasons</h3>
						<div className='grid grid-cols-3 gap-3'>
							{serie?.seasons.map(season => {
								return (
									<div
										key={season.id}
										className={`relative group bg-[--background-secondary] p-1 rounded ${
											(s.shadowed, s.hovered)
										}`}>
										<h4>{season.name}</h4>
										<img
											src={
												season.poster_path
													? `https://image.tmdb.org/t/p/w500${season.poster_path}`
													: '/images/dummy.jpg'
											}
											alt={season.name}
										/>
										<p>
											Air Date: {new Date(season.air_date).toLocaleDateString('en-US')}
										</p>
										<p>Episodes: {season.episode_count}</p>
										<p className='text-[--active]'>
											Rating: {season?.vote_average.toFixed()}/10
										</p>
										<OverviewHover movie={season} />
									</div>
								);
							})}
						</div>
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default SerieId;

import React, { useEffect, useState, useMemo } from 'react';
import { fetchActor, fetchFilmography } from '../api/actors';
import { useRouter } from 'next/router';
import Layout from '@/components/Layout';
import BackButton from '@/components/BackBtn';
import MoviesList from '@/components/MoviesList';
import { getPopularityLabel } from '../../helpers/popularity';
import s from '../../styles/gradient.module.css';

const Actor = () => {
	const visibleAmount = 13;
	const router = useRouter();
	const { id } = router.query;
	const [actorData, setActorData] = useState(null);
	const [filmography, setFilmography] = useState([]);
	const [visibleCastCount, setVisibleCastCount] = useState(visibleAmount);

	useEffect(() => {
		if (id) {
			fetchActor(id)
				.then(actorData => {
					setActorData(actorData);
					console.log('actorData', actorData);
				})
				.catch(err => {
					console.log('Error fetching actor:', err);
				});

			fetchFilmography(id)
				.then(filmographyData => {
					setFilmography(filmographyData);
					console.log('filmographyData', filmographyData);
				})
				.catch(err => {
					console.log('Error fetching actor:', err);
				});
		}
	}, [id]);

	const loadMoreMovies = () => {
		setVisibleCastCount(c => c + visibleAmount);
	};

	const displayedListCast = useMemo(
		() => filmography?.cast?.slice(0, visibleCastCount) || [],
		[filmography.cast, visibleCastCount],
	);

	const displayedListCrew = useMemo(
		() => filmography?.crew?.slice(0, visibleCastCount) || [],
		[filmography.crew, visibleCastCount],
	);

	if (!actorData) {
		return <div>Loading...</div>;
	}

	return (
		<Layout>
			<BackButton />
			<section className='mt-4'>
				<div className='flex gap-4 flex-col md:flex-row'>
					<div className='w-full md:w-1/4'>
						<img
							className='rounded-sm bg-[--background-secondary] p-1'
							src={
								actorData.profile_path
									? `https://www.themoviedb.org/t/p/w440_and_h660_face/${actorData.profile_path}`
									: actorData?.gender === 2
									? '/images/dummyMan.jpg'
									: '/images/dummyWoman.jpg'
							}
							loading='lazy'
							alt={actorData.name}
							data-src={actorData.profile_path}
						/>
					</div>
					<div className='w-full lg:w-1/2'>
						<h1 className='text-3xl mb-4'>{actorData.name}</h1>
						{actorData.birthday && <p>Birthday: {actorData.birthday}</p>}
						{actorData.deathday && <p>Deathday: {actorData.deathday}</p>}
						{actorData.place_of_birth && <p>Place of birth: {actorData.place_of_birth}</p>}
						{actorData.popularity && (
							<p>Popularity: {getPopularityLabel(actorData.popularity)}</p>
						)}
						<p>{actorData.biography}</p>
					</div>
				</div>
			</section>
			<section className='mt-4'>
				<h3
					className={`${s.candy} text-4xl text-center tracking-widest uppercase font-bold text-white p-4 mb-4`}>
					Filmography
				</h3>
				<MoviesList
					movies={displayedListCast}
					submitValue={''}
					loadMoreSearchResults={loadMoreMovies}
				/>
			</section>
			{filmography?.crew?.length !== 0 && (
				<section className='mt-4'>
					<h3
						className={`${s.candy} text-4xl text-center tracking-widest uppercase font-bold text-white p-4 mb-4`}>
						Filmography as director
					</h3>
					<MoviesList
						movies={displayedListCrew}
						submitValue={''}
						loadMoreSearchResults={loadMoreMovies}
					/>
				</section>
			)}
		</Layout>
	);
};

export default Actor;

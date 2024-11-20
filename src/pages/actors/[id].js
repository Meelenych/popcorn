import React, { useEffect, useState } from 'react';
import { fetchActor, fetchFilmography } from '../api/actors';
import { useRouter } from 'next/router';
import Layout from '@/components/Layout';
import BackButton from '@/components/BackBtn';
import s from '../../styles/gradient.module.css';
import MovieCard from '@/components/MovieCard';

const Actor = () => {
	const router = useRouter();
	const { id } = router.query;
	const [actorData, setActorData] = useState(null);
	const [filmography, setFilmography] = useState([]);

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
		}

		fetchFilmography(id)
			.then(filmographyData => {
				setFilmography(filmographyData);
				console.log('filmographyData', filmographyData);
			})
			.catch(err => {
				console.log('Error fetching actor:', err);
			});
	}, [id]);

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
									: '/images/dummy.jpg'
							}
							loading='lazy'
							alt={actorData.name}
							data-src={actorData.profile_path}
						/>
					</div>
					<div className='w-full lg:w-1/2'>
						<h1 className='text-3xl mb-4'>{actorData.name}</h1>
						<p>{actorData.biography}</p>
					</div>
				</div>
			</section>
			<section className='mt-4'>
				<h3
					className={`${s.candy} text-4xl text-center tracking-widest uppercase font-bold text-white p-4 mb-4`}>
					Filmography
				</h3>
				<ul className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-4'>
					{filmography?.cast?.map((movie, index) => {
						return (
							<MovieCard
								movie={movie}
								index={index}
							/>
						);
					})}
				</ul>
			</section>
		</Layout>
	);
};

export default Actor;

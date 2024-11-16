import React, { useEffect, useState } from 'react';
import { fetchActor, fetchFilmography } from '../api/actors';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Layout from '@/components/Layout';
import BackButton from '@/components/BackBtn';
import styles from '../../components/MoviesList.module.css';
import s from '../../styles/gradients.module.css';

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
					<div className='w-full md:w-1/4 '>
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
				<ul className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4'>
					{filmography?.cast?.map(movie => {
						return (
							<li
								key={movie.id}
								className={`flex justify-center ${styles.movie__card} text-sm font-medium p-1 bg-[--background-secondary] rounded-sm relative`}>
								<Link href={`/movie/${movie.id}`}>
									<div>
										<img
											className='rounded-sm'
											src={
												movie.poster_path
													? `https://www.themoviedb.org/t/p/w440_and_h660_face/${movie.poster_path}`
													: '/images/dummy.jpg'
											}
											loading='lazy'
											alt={movie.original_title}
											data-src={movie.poster_path}
										/>
										<div className='p-2'>
											<h3 className='uppercase text-[--text-color] text-sm'>
												{movie.title}
											</h3>
											<p className='text-[--text-color]'>
												Release year:{' '}
												{new Date(movie?.release_date)
													.toLocaleDateString('en-US')
													.slice(-4)}
											</p>
											<p className='text-[--active]'>
												Rating: {movie.vote_average.toFixed()}/10
											</p>
										</div>
									</div>
									<div className='absolute top-0 left-0 right-0 p-2 text-white bg-black bg-opacity-70 opacity-0 hover:opacity-100 h-full'>
										<p className='p-10'>{movie?.overview}</p>
									</div>
								</Link>
							</li>
						);
					})}
				</ul>
			</section>
		</Layout>
	);
};

export default Actor;

import React, { useEffect, useState } from 'react';
import { fetchActor, fetchFilmography } from '../api/actors'; // Ensure correct import path
import { useRouter } from 'next/router';
import Link from 'next/link';
import Layout from '@/components/Layout';
import BackButton from '@/components/BackBtn';
import styles from '../../components/MoviesList.module.css';

const Actor = () => {
	const router = useRouter();
	const { id } = router.query; // Get actor ID from URL query
	const [actorData, setActorData] = useState(null);
	const [filmography, setFilmography] = useState([]); // Add state for filmography data

	useEffect(() => {
		if (id) {
			// Make sure `id` is available before calling the API
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
	}, [id]); // Re-run effect if `id` changes

	if (!actorData) {
		return <div>Loading...</div>; // Show loading state while data is being fetched
	}

	return (
		<Layout>
			<BackButton />
			<section className='mt-4'>
				<h1 className='text-3xl mb-4'>{actorData.name}</h1>
				<p>{actorData.biography}</p>
			</section>
			<section className='mt-4'>
				<h2 className='text-2xl mb-4'>Filmography</h2>
				<ul className='grid grid-cols-5 gap-4'>
					{filmography?.cast?.map(movie => {
						return (
							<li
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
											<p className='text-lg'>{movie.title}</p>
											<p className='text-[--active]'>
												Rating: {movie.vote_average.toFixed()}/10
											</p>
										</div>
									</div>
								</Link>
								<div className='absolute top-0 left-0 right-0 p-2 text-white bg-black bg-opacity-50 opacity-0 hover:opacity-100 h-full'>
									<p className='p-10'>{movie?.overview}</p>
								</div>
							</li>
						);
					})}
				</ul>
			</section>
		</Layout>
	);
};

export default Actor;

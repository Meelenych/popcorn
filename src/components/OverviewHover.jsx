import Trailer from './Trailer';
import { fetchTrailer } from '@/pages/api/movies';
import s from '../styles/gradient.module.css';
import { useEffect, useState } from 'react';

const OverviewHover = ({ movie, pageName }) => {
	const [trailers, setTrailers] = useState([]);

	useEffect(() => {
		fetchTrailer(movie.id)
			.then(trailerData => {
				console.log('OverviewHover trailer', trailerData.results);
				setTrailers(trailerData.results);
			})
			.catch(err => {
				console.error(err);
			});
	}, [movie]);

	console.log('movie', movie);
	return (
		<div className='absolute top-0 left-0 right-0 text-white bg-black bg-opacity-70 opacity-0 hover:opacity-100 h-[85.5%] sm:h-[88.5%] rounded-sm overflow-hidden'>
			<div className='relative h-full'>
				{pageName !== '' && <div className={s.abbyss}></div>}
				<Trailer trailers={trailers} showTrailer={true} autoplay={true} />
				<p
					className={`p-5 text-base sm:text-md lg:text-md absolute bottom-0 left-0 bg-black/70 backdrop-blur-md ${s.grainy}`}>
					{movie?.overview}
				</p>
			</div>
		</div>
	);
};

export default OverviewHover;

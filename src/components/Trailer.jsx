import React, { Suspense, useEffect } from 'react';
import s from '../styles/gradients.module.css';
import Loading from '@/pages/loading';

const Trailer = ({ trailers, showTrailer }) => {
	// useEffect(() => {
	// 	if (trailer) {
	// 		window.scrollTo({
	// 			top: document.documentElement.scrollHeight,
	// 			behavior: 'smooth',
	// 		});
	// 	}
	// });

	return (
		<div className='mt-4'>
			{showTrailer && (
				<section>
					<h3
						className={`${s.candy} text-4xl text-center tracking-widest uppercase font-bold text-white p-4 mb-4 `}>
						{trailers?.length > 1 ? 'trailers' : 'trailer'}
					</h3>
					{trailers?.map(trailer => {
						return (
							trailer.type === 'Trailer' && (
								<Suspense fallback={Loading}>
									<div className='bg-[--background-secondary] p-1 rounded-sm mb-4'>
										<h4 className='text-center text-xl uppercase text-white mb-1 font-medium'>
											{trailer.name}
										</h4>
										<iframe
											className='w-full h-[190px] sm:h-[350px] md:h-[410px] lg:h-[640px] xl:h-[850px]'
											src={`https://www.youtube.com/embed/${trailer.key}`}
											title='YouTube trailer'
											allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
											allowFullScreen></iframe>
									</div>
								</Suspense>
							)
						);
					})}
				</section>
			)}
		</div>
	);
};

export default Trailer;

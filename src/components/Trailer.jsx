import React, { Suspense } from 'react';
import s from '../styles/gradient.module.css';
import Loading from '@/pages/loading';

const Trailer = ({ trailers, showTrailer, autoplay }) => {
	console.log('trailers', trailers);
	return (
		<div className='mt-4'>
			{showTrailer && (
				<section>
					{!autoplay && (
						<h3
							className={`${s.candy} text-4xl text-center tracking-widest uppercase font-bold text-white p-4 mb-4 `}>
							{trailers?.length > 0
								? trailers?.length > 1
									? 'trailers'
									: `trailer`
								: 'No trailers available'}
						</h3>
					)}

					{trailers?.length !== 0 &&
						trailers?.map(trailer => {
							return (
								trailer.type === 'Trailer' && (
									<Suspense fallback={Loading}>
										<div
											className={
												!autoplay && 'bg-[--background-secondary] p-1 rounded-sm mb-4'
											}>
											<h4 className='text-center text-xl uppercase text-white mb-1 font-medium'>
												{!autoplay && trailer.name}
											</h4>
											<div
												className={`relative w-full overflow-hidden' ${
													autoplay ? 'h-screen' : 'h-auto'
												}`}>
												<iframe
													className={
														autoplay
															? 'absolute top-[-25%] left-[-135%] w-[180vh] h-[120vh] max-w-none z-0'
															: 'w-full h-[190px] sm:h-[350px] md:h-[410px] lg:h-[640px] xl:h-[850px]'
													}
													src={`https://www.youtube.com/embed/${trailer.key}?${
														autoplay
															? 'autoplay=1&mute=1&modestbranding=1&rel=0&controls=0&showinfo=0'
															: 'autoplay=0'
													}&mute=1`}
													title='YouTube trailer'
													allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
													allowFullScreen></iframe>
											</div>
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

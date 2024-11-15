// Utility to get genre names from genre ids
export const getGenreNames = (genreIds, genres) => {
	return genreIds
		.map(id => genres?.find(genre => genre.id === id))
		.filter(genre => genre)
		.map(genre => genre.name)
		.join(', ');
};

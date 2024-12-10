export const getPopularityLabel = popularity => {
	if (popularity > 50) return 'Very popular';
	if (popularity > 15) return 'Popular';
	return 'Less known';
};

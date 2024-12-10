export const getPopularityLabel = popularity => {
	if (popularity > 50) return 'Very popular';
	if (popularity > 25) return 'Popular';
	return 'Less known';
};

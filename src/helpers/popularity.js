export const getPopularityLabel = popularity => {
	if (popularity > 20) return 'Very popular';
	if (popularity > 15) return 'Popular';
	return 'Less known';
};

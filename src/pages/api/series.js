const API_KEY = '112103a89f43817e1ae7d8a60b354bbb';
const baseUrl = `https://api.themoviedb.org/3/`;

// TV Trending
async function fetchTrendingSeries(page) {
	const params = `trending/tv/day?api_key=${API_KEY}&page=${page}&include_adult=false`;
	const url = baseUrl + params;

	const response = await fetch(url);
	if (!response.ok) {
		throw new Error('Failed to fetch trending series data');
	}
	const trending = await response.json();
	return trending;
}

export { fetchTrendingSeries };

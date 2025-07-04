// /api/discover.js or wherever it's located
const API_KEY = '112103a89f43817e1ae7d8a60b354bbb';
const baseUrl = `https://api.themoviedb.org/3/`;

async function fetchApiDiscover({
	page = 1,
	genre = '',
	include_adult = false,
	primary_release_year = '',
}) {
	const searchParams = new URLSearchParams({
		api_key: API_KEY,
		language: 'en-US',
		page: String(page),
		include_adult: include_adult.toString(),
		sort_by: 'popularity.desc',
	});

	if (genre) {
		searchParams.append('with_genres', genre);
	}

	if (primary_release_year && /^\d{4}$/.test(primary_release_year)) {
		searchParams.append('primary_release_year', primary_release_year);
	}

	const url = `${baseUrl}discover/movie?${searchParams.toString()}`;

	console.log('💬 Discover URL:', url); // <- Use this to debug in the console

	const response = await fetch(url);
	if (!response.ok) {
		throw new Error('Failed to fetch filtered movie data');
	}
	return await response.json();
}

export { fetchApiDiscover };

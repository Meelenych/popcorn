const API_KEY = '112103a89f43817e1ae7d8a60b354bbb';
const baseUrl = `https://api.themoviedb.org/3/`;

// Trending
async function fetchApi(page) {
	const params = `trending/movie/day?api_key=${API_KEY}&page=${page}&include_adult=false`;
	const url = baseUrl + params;

	const response = await fetch(url);
	if (!response.ok) {
		throw new Error('Failed to fetch trending data');
	}
	const trending = await response.json();
	return trending;
}

export { fetchApi };

// Search
async function fetchApiSearch(submitValue, page) {
	const searchParams = `search/movie?api_key=${API_KEY}&language=en-US&query=${submitValue}&page=${page}&include_adult=true`;
	const url = baseUrl + searchParams;

	const response = await fetch(url);
	if (!response.ok) {
		throw new Error('Failed to fetch search data');
	}
	const searchResults = await response.json();
	return searchResults;
}

export { fetchApiSearch };

// Movie id page
async function fetchApiMovie(IdValue, type = 'movie') {
	const searchParams = `${type}/${IdValue}?api_key=${API_KEY}&language=en-US`;
	const url = baseUrl + searchParams;

	const response = await fetch(url);
	if (!response.ok) {
		throw new Error('Failed to fetch movie data');
	}
	const movie = await response.json();
	return movie;
}

export { fetchApiMovie };

// Credits
async function fetchApiCredits(IdValue) {
	const searchParams = `movie/${IdValue}/credits?api_key=${API_KEY}&language=en-US`;
	const url = baseUrl + searchParams;

	const response = await fetch(url);
	if (!response.ok) {
		throw new Error('Failed to fetch credits data');
	}
	const credits = await response.json();
	return credits;
}

export { fetchApiCredits };

// Reviews
async function fetchApiReviews(IdValue) {
	const searchParams = `movie/${IdValue}/reviews?api_key=${API_KEY}&language=en-US`;
	const url = baseUrl + searchParams;

	const response = await fetch(url);
	if (!response.ok) {
		throw new Error('Failed to fetch reviews data');
	}
	const reviews = await response.json();
	return reviews;
}

export { fetchApiReviews };

// Top movies

async function fetchTopMovie() {
	const params = `movie/top_rated?api_key=${API_KEY}&include_adult=false&include_video=true&language=en-US&page=1&sort_by=popularity.desc`;
	const url = baseUrl + params;

	const response = await fetch(url);
	if (!response.ok) {
		throw new Error('Failed to fetch top movie data');
	}
	const topMovie = await response.json();
	return topMovie;
}

export { fetchTopMovie };

// Trailers
async function fetchTrailer(IdValue) {
	const params = `movie/${IdValue}/videos?api_key=${API_KEY}`;
	const url = baseUrl + params;

	const response = await fetch(url);
	if (!response.ok) {
		throw new Error('Failed to fetch trailer data');
	}

	const trailer = await response.json();
	return trailer;
}

export { fetchTrailer };

// Upcoming
async function fetchUpcoming(page) {
	const params = `movie/upcoming?api_key=${API_KEY}&page=${page}&include_adult=false`;
	const url = baseUrl + params;

	const response = await fetch(url);
	if (!response.ok) {
		throw new Error('Failed to fetch upcoming data');
	}
	const upcoming = await response.json();
	return upcoming;
}

export { fetchUpcoming };

// Now playing
async function fetchNowPlaying(page) {
	const params = `movie/now_playing?api_key=${API_KEY}&page=${page}&include_adult=false`;
	const url = baseUrl + params;

	const response = await fetch(url);
	if (!response.ok) {
		throw new Error('Failed to fetch now playing data');
	}
	const nowPlaying = await response.json();
	return nowPlaying;
}

export { fetchNowPlaying };

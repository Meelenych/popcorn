const API_KEY = '112103a89f43817e1ae7d8a60b354bbb';
const baseUrl = `https://api.themoviedb.org/3/`;

//==================HOME PAGE=====================
async function fetchApi(page) {
	const params = `trending/movie/day?api_key=${API_KEY}&page=${page}&include_adult=false`;
	const url = baseUrl + params;

	const fetchA = await fetch(url).then(response => {
		console.log('response', response);
		return response.json();
	});
	return fetchA;
}

export { fetchApi };

//==================SEARCH PAGE=====================
async function fetchApiSearch(submitValue, page) {
	const searchParams = `search/movie?api_key=${API_KEY}&language=en-US&query=${submitValue}&page=${page}&include_adult=false`;
	const url = baseUrl + searchParams;

	const fetchA = await fetch(url).then(response => {
		// console.log("response search", response);
		return response.json();
	});
	return fetchA;
}

export { fetchApiSearch };

//==================MOVIE PAGE=====================
async function fetchApiMovie(IdValue) {
	const searchParams = `movie/${IdValue}?api_key=${API_KEY}&language=en-US`;
	const url = baseUrl + searchParams;

	const fetchA = await fetch(url).then(response => {
		console.log('MOVIE IdValue', response);
		return response.json();
	});
	return fetchA;
}

export { fetchApiMovie };

//==================CREDITS=====================
async function fetchApiCredits(IdValue) {
	const searchParams = `movie/${IdValue}/credits?api_key=${API_KEY}&language=en-US`;
	const url = baseUrl + searchParams;

	const fetchA = await fetch(url).then(response => {
		console.log('Credits', response);
		return response.json();
	});
	return fetchA;
}

export { fetchApiCredits };

//==================REVIEWS=====================
async function fetchApiReviews(IdValue) {
	const searchParams = `movie/${IdValue}/reviews?api_key=${API_KEY}&language=en-US`;
	const url = baseUrl + searchParams;

	const fetchA = await fetch(url).then(response => {
		console.log('Reviews', response);
		return response.json();
	});
	return fetchA;
}

export { fetchApiReviews };

// Top movies

async function fetchTopMovie() {
	const params = `movie/top_rated?api_key=${API_KEY}&include_adult=false&include_video=true&language=en-US&page=1&sort_by=popularity.desc`;
	const url = baseUrl + params;

	const fetchA = await fetch(url).then(response => {
		console.log('response', response);
		return response.json();
	});
	return fetchA;
}

export { fetchTopMovie };

// Trailers

async function fetchTrailer(IdValue) {
	const params = `movie/${IdValue}/videos?api_key=${API_KEY}`;
	const url = baseUrl + params;

	const response = await fetch(url);
	if (!response.ok) {
		throw new Error('Failed to fetch actor data');
	}

	const trailer = await response.json();
	return trailer;
}

export { fetchTrailer };

const API_KEY = '112103a89f43817e1ae7d8a60b354bbb';
const baseUrl = `https://api.themoviedb.org/3/`;

async function fetchActor(person_id) {
	const params = `person/${person_id}?api_key=${API_KEY}`;
	const url = baseUrl + params;

	const response = await fetch(url);
	if (!response.ok) {
		throw new Error('Failed to fetch actor data');
	}

	const actorData = await response.json();
	return actorData;
}

export { fetchActor };

async function fetchFilmography(person_id) {
	const params = `person/${person_id}/movie_credits?api_key=${API_KEY}`;
	const url = baseUrl + params;

	const response = await fetch(url);
	if (!response.ok) {
		throw new Error('Failed to fetch actor data');
	}

	const filmographyData = await response.json();
	return filmographyData;
}

export { fetchFilmography };

const fetchGenres = async () => {
	try {
		const response = await fetch(
			'https://api.themoviedb.org/3/genre/movie/list?api_key=112103a89f43817e1ae7d8a60b354bbb&language=en-US',
		);
		const data = await response.json();
		return data.genres; // Array of genre objects [{id, name}, ...]
	} catch (error) {
		console.error('Error fetching genres:', error);
	}
};

export { fetchGenres };

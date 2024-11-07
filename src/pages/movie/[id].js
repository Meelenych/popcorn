import React from 'react';
import { useState } from 'react';
import { useRouter } from 'next/router';

const MovieId = () => {
	const [movie, setMovie] = useState(null);
	const router = useRouter();
	const { id } = router.query;

	return <div>Movie id: {id}</div>;
};

export default MovieId;

import React, { useEffect, useState } from 'react';

const CountdownTimer = ({ initialSeconds }) => {
	const [seconds, setSeconds] = useState(initialSeconds);

	useEffect(() => {
		if (seconds <= 0) setSeconds(initialSeconds);

		const interval = setInterval(() => {
			setSeconds(prev => prev - 1);
		}, 1000);

		return () => clearInterval(interval);
	}, [seconds]);

	return <p className='mb-5'>New movies in {seconds} sec</p>;
};

export default CountdownTimer;

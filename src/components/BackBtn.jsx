import { useRouter } from 'next/router';

const BackButton = () => {
	const router = useRouter();

	const handleBack = () => {
		router.back();
	};

	return (
		<button
			onClick={handleBack}
			className='back-button'>
			Go Back
		</button>
	);
};

export default BackButton;

import s from '@/styles/hover.module.css';

export default function GoUp() {
	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		});
	};

	return (
		<>
			<button
				onClick={scrollToTop}
				className={`${s.hovered} ${s.shadowed} fixed bottom-5 right-5 z-50 font-normal btn rounded-full btn-outline hover:bg-[--background-secondary] h-24 w-24`}>
				↑ Go up
			</button>
		</>
	);
}

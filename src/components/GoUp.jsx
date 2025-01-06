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
				className={`${s.hovered} ${s.shadowed} fixed bottom-20 right-7 z-50 text-3xl font-normal btn border-2 rounded-full btn-outline hover:bg-[--background-secondary] h-12 w-12`}>
				↑
			</button>
		</>
	);
}

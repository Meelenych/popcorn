import Layout from '@/components/Layout';
import Hero from '@/components/Hero';

export default function Home() {
	return (
		<Layout>
			<main className='grid grid-rows-[20px_1fr_20px] items-center justify-items-center '>
				<Hero />
			</main>
			<footer className='row-start-3 flex gap-6 flex-wrap items-center justify-center'></footer>
		</Layout>
	);
}

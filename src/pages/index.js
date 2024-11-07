import Layout from '@/components/Layout';

export default function Home() {
	return (
		<Layout>
			<main className='grid grid-rows-[20px_1fr_20px] items-center justify-items-center '>
				<h1 className='text-3xl'>Popcorn time</h1>
			</main>
			<footer className='row-start-3 flex gap-6 flex-wrap items-center justify-center'></footer>
		</Layout>
	);
}

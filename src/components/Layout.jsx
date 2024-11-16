import localFont from 'next/font/local';
import Header from './Header';
import GoUp from './GoUp';
// import Footer from './Footer';

const geistSans = localFont({
	src: '../pages/fonts/GeistVF.woff',
	variable: '--font-geist-sans',
	weight: '100 900',
});

const Layout = ({ children }) => {
	return (
		<div
			className={`${geistSans.variable} min-h-screen font-[family-name:var(--font-geist-sans)] `}>
			<Header />
			<main className='h-max bg-[--background] text-[--accent] px-4 relative'>
				<div className=''>{children}</div>
				<GoUp />
			</main>
			{/* <Footer /> */}
		</div>
	);
};

export default Layout;

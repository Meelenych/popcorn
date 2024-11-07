import React from 'react';
import styles from './Button.module.css';

const LoadMoreBtn = ({ onClick }) => {
	return (
		<div className='flex justify-center'>
			<button
				type='submit'
				className={`max-h-[420px] w-[240px] p-3 rounded-sm ${styles.Button}`}
				onClick={onClick}>
				Load more...
			</button>
		</div>
	);
};

export default LoadMoreBtn;

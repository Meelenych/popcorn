import React, { useState } from 'react';

const SearchInput = ({ onSearch }) => {
	const [searchValue, setSearchValue] = useState('');

	const handleChange = e => {
		setSearchValue(e.target.value);
	};

	const handleSubmit = e => {
		e.preventDefault();
		onSearch(searchValue);
	};

	return (
		<form
			onSubmit={handleSubmit}
			className='flex justify-center w-full gap-2'>
			<label className='input input-bordered flex items-center gap-2 w-full max-w-60 md:max-w-96'>
				<input
					type='text'
					className='grow'
					placeholder='Type a key word'
					value={searchValue}
					onChange={handleChange}
				/>
				<svg
					xmlns='http://www.w3.org/2000/svg'
					viewBox='0 0 16 16'
					fill='currentColor'
					className='h-4 w-4 opacity-70'>
					<path
						fillRule='evenodd'
						d='M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z'
						clipRule='evenodd'
					/>
				</svg>
			</label>
			<button
				type='submit'
				onClick={handleSubmit}
				className='btn btn-accent'>
				Search
			</button>
		</form>
	);
};

export default SearchInput;

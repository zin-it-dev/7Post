import { FormEvent, useState } from 'react';
import { Form } from 'react-bootstrap';
import { useNavigate, useSearchParams } from 'react-router';

const Search = () => {
	const [searchParams, setSearchParams] = useSearchParams();
	const [searchQuery, setSearchQuery] = useState<string>(searchParams.get('keyword') || '');

	const navigate = useNavigate();

	const handleSearch = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setSearchParams({ keyword: searchQuery });
		navigate(`/?keyword=${encodeURIComponent(searchQuery)}`);
	};

	return (
		<Form
			className='me-auto mt-2 mt-lg-0'
			method='get'
			onSubmit={handleSearch}>
			<Form.Control
				type='search'
				className='rounded-5 fs-6'
				placeholder='Search'
				name='keyword'
				value={searchQuery}
				required={true}
				onChange={(event) => setSearchQuery(event.target.value)}
			/>
		</Form>
	);
};

export default Search;

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import PetList from '../Pets/PetList';
import useBreedList from '../Breeds/useBreedList';
import fetchSearch from './fetchSearch';

const ANIMALS = ['bird', 'cat', 'dog', 'rabbit', 'reptile'];

const SearchParams = () => {
	const [requestParams, setRequestParams] = useState({
		animal: '',
		breed: '',
		location: '',
	});
	const [animal, setAnimal] = useState('');
	const [breeds, status] = useBreedList(animal) as [
		string[],
		'error' | 'success' | 'loading'
	];

	const results = useQuery(['search', requestParams], fetchSearch);
	const pets = results?.data?.pets ?? [];

	return (
		<div className='search-params'>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					const formData = new FormData(e.target as HTMLFormElement);
					const obj = {
						animal: (formData.get('animal') as string) ?? '',
						breed: (formData.get('breed') as string) ?? '',
						location: (formData.get('location') as string) ?? '',
					};
					setRequestParams(obj);
				}}
			>
				<label htmlFor='location'>
					Location
					<input id='location' name='location' placeholder='Location' />
				</label>
				<label htmlFor='animal'>
					Animal
					<select
						id='animal'
						value={animal}
						onChange={(e) => {
							setAnimal(e.target.value);
						}}
					>
						<option />
						{ANIMALS.map((animal) => (
							<option key={animal}>{animal}</option>
						))}
					</select>
				</label>
				<label htmlFor='breed'>
					Breed
					<select id='breed' name='breed' disabled={breeds.length === 0}>
						<option />
						{breeds.map((breed) => (
							<option key={breed}>{breed}</option>
						))}
					</select>
				</label>
				<button>Submit</button>
			</form>
			<PetList pets={pets} />
		</div>
	);
};

export default SearchParams;

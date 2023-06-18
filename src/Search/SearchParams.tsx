import { useState, useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import AdoptedPetContext from '../AdoptedPetContext';
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
	const [breeds] = useBreedList(animal) as [string[]];

	const [adoptedPet] = useContext(AdoptedPetContext);

	const results = useQuery(['search', requestParams], fetchSearch);
	const pets = results?.data?.pets ?? [];

	return (
		<div className='my-0 mx-auto flex w-11/12 justify-between'>
			<form
				className='mb-10 flex flex-col items-center justify-center rounded-lg bg-emerald-50 p-10 shadow-lg'
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
				{adoptedPet.name ? (
					<div className='pet image-container'>
						<img src={adoptedPet.images[0]} alt={adoptedPet.name} />
					</div>
				) : null}
				<label htmlFor='location'>
					Location
					<input
						type='text'
						id='location'
						name='location'
						className='search-input'
						placeholder='Location'
					/>
				</label>
				<label htmlFor='animal'>
					Animal
					<select
						id='animal'
						value={animal}
						className='search-input'
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
					<select
						id='breed'
						name='breed'
						className='search-input grayed-out-disabled'
						disabled={breeds.length === 0}
					>
						<option />
						{breeds.map((breed) => (
							<option key={breed}>{breed}</option>
						))}
					</select>
				</label>
				<button className='color rounded border-none bg-emerald-600 px-6 py-2 text-white hover:opacity-50'>
					Submit
				</button>
			</form>
			<PetList pets={pets} />
		</div>
	);
};

export default SearchParams;

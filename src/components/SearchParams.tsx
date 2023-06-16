import { useState, useEffect } from 'react';
import Results from './Results';
import useBreedList from '../utils/useBreedList';

interface PetProps {
	pets: { [k: string]: string }[];
}

const ANIMALS = ['bird', 'cat', 'dog', 'rabbit', 'reptile'];

const SearchParams = () => {
	const [location, setLocation] = useState('');
	const [animal, setAnimal] = useState('');
	const [breed, setBreed] = useState('');
	const [pets, setPets] = useState<{ [k: string]: string }[] | []>([]);
	const [breeds] = useBreedList(animal);

	const requestPets = async () => {
		const response = await fetch(
			`http://pets-v2.dev-apis.com/pets?animals=${animal}&location=${location}&breed=${breed}`
		);
		const data: PetProps = await response.json();

		setPets(data.pets);
	};

	useEffect(() => {
		requestPets();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div className='search-params'>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					requestPets();
				}}
			>
				<label htmlFor='location'>
					Location
					<input
						id='location'
						value={location}
						placeholder='Location'
						onChange={(e) => setLocation(e.target.value)}
					/>
				</label>
				<label htmlFor='animal'>
					Animal
					<select
						id='animal'
						value={animal}
						onChange={(e) => {
							setAnimal(e.target.value);
							setBreed('');
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
						disabled={breeds.length === 0}
						value={breed}
						onChange={(e) => setBreed(e.target.value)}
					>
						<option />
						{breeds.map((breed) => (
							<option key={breed}>{breed}</option>
						))}
					</select>
				</label>
				<button>Submit</button>
			</form>
			<div>
				<Results pets={pets} />
			</div>
		</div>
	);
};

export default SearchParams;
